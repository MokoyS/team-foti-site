import { getArticles } from "@/lib/data/get-data";
import { ActualitePageContent } from "@/components/competition/ActualitePageContent";
import type { Metadata } from "next";

/** Données Strapi à la requête. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Actualité | Team Foti – The Race Feed",
  description: "Résultats, transferts et news. La Team Foti en piste et en atelier.",
};

export default async function ActualitePage() {
  const articles = await getArticles();
  return <ActualitePageContent articles={articles} />;
}
