import { getArticles } from "@/lib/data/get-data";
import { ArticleCard } from "@/components/competition/ArticleCard";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RacingButton } from "@/components/ui/RacingButton";
import { RacingSeparator } from "@/components/ui/RacingSeparator";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Compétition | Team Foti – The Race Feed",
  description: "Actualités course, transferts et palmarès du service compétition Team Foti. Résultats et news de l'écurie.",
};

export default async function CompetitionPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête de page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-0">
        <RevealSection>
          <SectionHeader
            eyebrow="RACE FEED"
            title="Compétition"
          />
          <p className="text-foreground/50 text-sm font-mono max-w-lg -mt-4 mb-12">
            Résultats, transferts, palmarès. La Team Foti en piste.
          </p>
        </RevealSection>
      </div>

      {/* Section Actualité */}
      <RevealSection beams>
        <section id="news" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-yellow/70 mb-6">
            ACTUALITÉ COURSE
          </h2>
          {articles.length === 0 ? (
            <p className="text-foreground/50 font-mono text-sm">Aucune actualité pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </section>
      </RevealSection>

      <RacingSeparator />

      {/* Liens Transferts & Palmarès */}
      <RevealSection>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Transferts */}
            <div className="group p-8 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-accent-red/30 hover:bg-accent-red/[0.03] transition-all duration-300">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-red mb-3">
                RECRUTEMENT
              </p>
              <h2 className="font-heading font-bold italic text-2xl text-foreground mb-3">
                Transferts
              </h2>
              <p className="text-foreground/50 text-sm font-mono leading-relaxed mb-6">
                Les annonces des pilotes rejoignant la Team Foti.
              </p>
              <RacingButton href="/competition/transferts" variant="ghost" arrow>
                Voir les transferts
              </RacingButton>
            </div>

            {/* Palmarès */}
            <div className="group p-8 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-accent-yellow/30 hover:bg-accent-yellow/[0.03] transition-all duration-300">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-yellow mb-3">
                HALL OF FAME
              </p>
              <h2 className="font-heading font-bold italic text-2xl text-foreground mb-3">
                Palmarès
              </h2>
              <p className="text-foreground/50 text-sm font-mono leading-relaxed mb-6">
                Titres mondiaux et européens de la Team Foti depuis 1978.
              </p>
              <RacingButton href="/competition/palmares" variant="ghost" arrow>
                Voir le palmarès
              </RacingButton>
            </div>

          </div>
        </section>
      </RevealSection>
    </div>
  );
}
