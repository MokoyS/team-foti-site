import { getArticles } from "@/lib/data/get-data";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RacingButton } from "@/components/ui/RacingButton";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transferts | Team Foti – Recrutement pilotes",
  description: "Annonces des pilotes rejoignant la Team Foti. Recrutements et arrivées dans l'écurie.",
};

export default async function TransfertsPage() {
  const articles = await getArticles();
  const transferts = articles.filter((a) => a.type === "Transfert");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <RevealSection>
          <SectionHeader eyebrow="RECRUTEMENT" title="Transferts" />
          <p className="text-foreground/50 text-sm font-mono max-w-lg -mt-4 mb-12">
            Les pilotes qui rejoignent la Team Foti.
          </p>
        </RevealSection>

        {transferts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-mono text-foreground/40 text-sm">Aucun transfert pour le moment.</p>
            <div className="mt-8">
              <RacingButton href="/competition" variant="ghost" arrow>
                Retour compétition
              </RacingButton>
            </div>
          </div>
        ) : (
          <ul className="space-y-4 pb-24">
            {transferts.map((a, i) => (
              <li
                key={a.id}
                className="group relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 hover:border-accent-red/30 hover:bg-accent-red/[0.03] transition-all duration-300"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Barre latérale rouge */}
                <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-accent-red/40 rounded-full group-hover:bg-accent-red transition-colors duration-300" />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-red">
                      TRANSFERT
                    </span>
                    <time
                      className="font-mono text-[10px] text-foreground/30 uppercase"
                      dateTime={a.date}
                    >
                      {new Date(a.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="font-heading font-bold italic text-lg text-foreground group-hover:text-accent-yellow transition-colors duration-300 mb-2">
                    {a.title}
                  </h2>
                  {a.content && (
                    <p className="text-foreground/60 text-sm leading-relaxed">{a.content}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
