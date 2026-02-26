import { MetadataRoute } from "next";
import { getProducts, getArticles } from "@/lib/data/get-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://teamfoti.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/actualite`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/competition`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/competition/transferts`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/competition/palmares`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cgv`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const [products, articles] = await Promise.all([getProducts(), getArticles()]);

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${base}/actualite/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
