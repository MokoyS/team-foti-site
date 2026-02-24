import Link from "next/link";
import { ArticleCard } from "@/components/competition/ArticleCard";
import { getArticles } from "@/lib/data/get-data";
import { TranslatedTitle } from "@/components/TranslatedTitle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compétition | Team Foti",
  description: "Actualités, transferts et palmarès du service compétition Team Foti.",
};

export default async function CompetitionPage() {
  const articles = await getArticles();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      <h1 className="font-heading font-bold italic text-3xl text-accent-yellow mb-10">
        <TranslatedTitle translationKey="competition.title" />
      </h1>
      <section id="news" className="mb-16">
        <h2 className="font-heading font-semibold text-xl text-foreground/90 mb-6">
          <TranslatedTitle translationKey="competition.news" />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground/90 mb-4">
            <TranslatedTitle translationKey="competition.transfers" />
          </h2>
          <p className="text-foreground/70 text-sm mb-4">
            Les annonces de pilotes rejoignant la Team sont publiées ici.
          </p>
          <Link
            href="/competition/transferts"
            className="text-accent-yellow hover:underline text-sm"
          >
            Voir les transferts →
          </Link>
        </div>
        <div>
          <h2 className="font-heading font-semibold text-xl text-foreground/90 mb-4">
            <TranslatedTitle translationKey="competition.palmares" />
          </h2>
          <p className="text-foreground/70 text-sm mb-4">
            Titres mondiaux et européens de la Team Foti.
          </p>
          <Link
            href="/competition/palmares"
            className="text-accent-yellow hover:underline text-sm"
          >
            Voir le palmarès →
          </Link>
        </div>
      </section>
    </div>
  );
}
