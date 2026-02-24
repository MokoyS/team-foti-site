/**
 * Client Strapi côté serveur (Next.js). Les appels sont faits depuis le serveur
 * vers Strapi, donc pas de CORS navigateur → Strapi.
 */

const _envUrl = typeof globalThis !== "undefined" ? (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env?.NEXT_PUBLIC_STRAPI_URL : undefined;
const STRAPI_URL = (typeof _envUrl === "string" ? _envUrl.replace(/\/$/, "") : "") || "";

export function isStrapiEnabled(): boolean {
  return typeof STRAPI_URL === "string" && STRAPI_URL.length > 0;
}

function getStrapiUrl(path: string): string {
  if (!STRAPI_URL) return "";
  return `${STRAPI_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

async function strapiFetch<T>(path: string): Promise<T | null> {
  if (!isStrapiEnabled()) return null;
  const url = getStrapiUrl(path);
  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    } as RequestInit);
    if (!res.ok) {
      console.warn(`[Strapi] ${url} → ${res.status} ${res.statusText}. Vérifiez les permissions Public (find/findOne) et que Strapi tourne.`);
      return null;
    }
    return res.json() as Promise<T>;
  } catch (err) {
    console.warn("[Strapi] Erreur fetch:", err instanceof Error ? err.message : url);
    return null;
  }
}

// ——— Format réponses Strapi v4 (attributes) et v5 (champs à la racine, documentId)
interface StrapiProductAttrs {
  name: string;
  slug: string;
  description?: string;
  price: number | string;
  stock?: number;
  category?: { data?: { name?: string }; name?: string };
}
interface StrapiArticleAttrs {
  title: string;
  slug: string;
  content?: string;
  type: string;
  date: string;
  image_cover?: { url?: string } | null;
}
interface StrapiPalmaresAttrs {
  year: string;
  title: string;
  event: string;
  order?: number;
}

type StrapiProductEntry = { id?: number; documentId?: string; attributes?: StrapiProductAttrs };

function mapProduct(entry: StrapiProductEntry): {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  stock: number;
} {
  const attrs = entry.attributes ?? (entry as unknown as StrapiProductAttrs);
  const cat = attrs.category?.data?.name ?? (attrs.category as { name?: string } | undefined)?.name ?? attrs.category;
  return {
    id: String(entry.documentId ?? entry.id ?? ""),
    name: attrs.name ?? "",
    slug: attrs.slug ?? "",
    description: attrs.description ?? "",
    price: Number(attrs.price ?? 0),
    category: typeof cat === "string" ? cat : (cat as { name?: string })?.name ?? "Produit",
    stock: Number(attrs.stock ?? 0),
  };
}

type StrapiArticleEntry = { id?: number; documentId?: string; attributes?: StrapiArticleAttrs };

function mapArticle(entry: StrapiArticleEntry): {
  id: string;
  title: string;
  slug: string;
  content: string;
  type: "News" | "Transfert" | "Résultat";
  date: string;
  image_cover?: string;
} {
  const attrs = entry.attributes ?? (entry as unknown as StrapiArticleAttrs);
  const rawCover = attrs.image_cover ?? (entry as unknown as StrapiArticleAttrs).image_cover;
  const coverUrl = rawCover && typeof rawCover === "object" && rawCover?.url
    ? (rawCover.url.startsWith("http") ? rawCover.url : getStrapiUrl(rawCover.url))
    : undefined;
  return {
    id: String(entry.documentId ?? entry.id),
    title: attrs.title ?? "",
    slug: attrs.slug ?? "",
    content: attrs.content ?? "",
    type: (attrs.type === "News" || attrs.type === "Transfert" || attrs.type === "Résultat" ? attrs.type : "News") as "News" | "Transfert" | "Résultat",
    date: attrs.date ?? new Date().toISOString().slice(0, 10),
    image_cover: coverUrl || undefined,
  };
}

type StrapiPalmaresEntry = { id?: number; attributes?: StrapiPalmaresAttrs };

function mapPalmares(entry: StrapiPalmaresEntry): { year: string; title: string; event: string } {
  const attrs = entry.attributes || (entry as unknown as StrapiPalmaresAttrs);
  return {
    year: attrs.year ?? "",
    title: attrs.title ?? "",
    event: attrs.event ?? "",
  };
}

/** Produits depuis Strapi (côté serveur). Retourne null si Strapi désactivé ou erreur. */
export async function fetchStrapiProducts(): Promise<{ id: string; name: string; slug: string; description: string; price: number; category: string; stock: number }[] | null> {
  const raw = await strapiFetch<unknown>("/api/products?publicationState=live");
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const arr = Array.isArray(o.data) ? o.data : (o.data && typeof o.data === "object" && Array.isArray((o.data as Record<string, unknown>).data)) ? (o.data as Record<string, unknown[]>).data : null;
  if (!Array.isArray(arr)) return null;
  return arr.map((e: unknown) => mapProduct(e as StrapiProductEntry));
}

/** Un produit par slug depuis Strapi. */
export async function fetchStrapiProductBySlug(slug: string): Promise<{ id: string; name: string; slug: string; description: string; price: number; category: string; stock: number } | null> {
  const data = await strapiFetch<{ data?: unknown[] }>(`/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&publicationState=live`);
  if (!data?.data?.[0]) return null;
  return mapProduct(data.data[0] as StrapiProductEntry);
}

/** Articles depuis Strapi (avec image de couverture peuplée). */
export async function fetchStrapiArticles(): Promise<{ id: string; title: string; slug: string; content: string; type: "News" | "Transfert" | "Résultat"; date: string; image_cover?: string }[] | null> {
  const data = await strapiFetch<{ data?: unknown[] }>("/api/articles?publicationState=live&sort[0]=date:desc&populate=image_cover");
  if (!data?.data || !Array.isArray(data.data)) return null;
  return data.data.map((e: unknown) => mapArticle(e as StrapiArticleEntry));
}

/** Palmarès depuis Strapi. */
export async function fetchStrapiPalmares(): Promise<{ year: string; title: string; event: string }[] | null> {
  const data = await strapiFetch<{ data?: unknown[] }>("/api/palmares-entries?sort[0]=order:desc");
  if (!data?.data || !Array.isArray(data.data)) return null;
  return data.data.map((e: unknown) => mapPalmares(e as StrapiPalmaresEntry));
}
