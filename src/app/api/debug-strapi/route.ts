import { NextResponse } from "next/server";

/**
 * Debug : ce que le serveur Next.js reçoit depuis Strapi /api/products.
 * À appeler sur l’URL de prod (ex. https://ton-site.vercel.app/api/debug-strapi)
 * pour vérifier que Vercel voit bien les produits.
 * À supprimer ou désactiver en production si besoin.
 */
export async function GET() {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ?? "";
  const url = base ? `${base}/api/products?publicationState=live` : "";

  const out: {
    strapiUrlSet: boolean;
    strapiUrlHost: string;
    fetchUrl: string;
    ok: boolean;
    status: number;
    statusText: string;
    hasData: boolean;
    dataLength?: number;
    dataIsArray: boolean;
    raw?: unknown;
    error?: string;
  } = {
    strapiUrlSet: !!base,
    strapiUrlHost: base ? new URL(base).host : "",
    fetchUrl: url || "(vide)",
    ok: false,
    status: 0,
    statusText: "",
    hasData: false,
    dataIsArray: false,
  };

  if (!url) {
    return NextResponse.json({
      ...out,
      error: "NEXT_PUBLIC_STRAPI_URL non défini. Définis-la sur Vercel et redéploie.",
    });
  }

  try {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    out.ok = res.ok;
    out.status = res.status;
    out.statusText = res.statusText;

    const raw = await res.json().catch(() => null);
    out.raw = raw;

    if (raw && typeof raw === "object") {
      const arr = Array.isArray(raw.data) ? raw.data : (raw as { data?: { data?: unknown[] } }).data?.data;
      out.dataIsArray = Array.isArray(arr);
      out.hasData = Array.isArray(arr) && arr.length > 0;
      out.dataLength = Array.isArray(arr) ? arr.length : undefined;
    }
  } catch (e) {
    out.error = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(out);
}
