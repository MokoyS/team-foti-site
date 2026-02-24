/**
 * Couche données : Strapi si NEXT_PUBLIC_STRAPI_URL est défini, sinon données statiques.
 * À utiliser dans les Server Components (async).
 */

import {
  fetchStrapiProducts,
  fetchStrapiProductBySlug,
  fetchStrapiArticles,
  fetchStrapiPalmares,
  isStrapiEnabled,
} from "@/lib/strapi";
import { products as staticProducts, getProductBySlug as getStaticProductBySlug } from "@/lib/data/products";
import { articles as staticArticles, palmares as staticPalmares } from "@/lib/data/articles";
import type { Product } from "@/lib/data/products";
import type { Article } from "@/lib/data/articles";

export type ProductData = Product;
export type ArticleData = Article;
export type PalmaresEntry = { year: string; title: string; event: string };

/** Liste des produits (Strapi si activé, sinon statique). Quand Strapi est activé, on utilise toujours sa réponse (0, 1 ou N produits). */
export async function getProducts(): Promise<ProductData[]> {
  const fromStrapi = await fetchStrapiProducts();
  if (isStrapiEnabled() && Array.isArray(fromStrapi)) return fromStrapi as ProductData[];
  return staticProducts;
}

/** Produit par slug (Strapi ou statique). */
export async function getProductBySlug(slug: string): Promise<ProductData | undefined> {
  const fromStrapi = await fetchStrapiProductBySlug(slug);
  if (fromStrapi) return fromStrapi as ProductData;
  return getStaticProductBySlug(slug);
}

/** Produits phares (limit). */
export async function getFeaturedProducts(limit = 6): Promise<ProductData[]> {
  const list = await getProducts();
  return list.slice(0, limit);
}

/** Liste des articles (Strapi si activé, sinon statique). */
export async function getArticles(): Promise<ArticleData[]> {
  const fromStrapi = await fetchStrapiArticles();
  if (isStrapiEnabled() && Array.isArray(fromStrapi)) return fromStrapi as ArticleData[];
  return staticArticles;
}

/** Palmarès (Strapi si activé, sinon statique). */
export async function getPalmares(): Promise<PalmaresEntry[]> {
  const fromStrapi = await fetchStrapiPalmares();
  if (isStrapiEnabled() && Array.isArray(fromStrapi)) return fromStrapi;
  return staticPalmares;
}

export { isStrapiEnabled };
