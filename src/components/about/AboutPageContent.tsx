"use client";

import { motion } from "framer-motion";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const manifesto = {
  title: "40 ans à la limite",
  paragraphs: [
    "Quarante ans que nous poussons les trajectoires au millimètre. Depuis Loriol-sur-Drôme, la Team Foti est devenue une référence européenne : pas par hasard, mais par la rigueur du réglage, la précision des chronos et la confiance des pilotes.",
    "Nous sommes préparateurs de champions. Notre héritage familial repose sur une règle simple : la performance se construit à l’atelier avant de s’exprimer en piste. Châssis, carbu, grip, télémétrie — chaque détail compte.",
    "De la WSK au Championnat d’Europe, nos couleurs ont croisé celles des plus grandes écuries. Aujourd’hui, nous mettons cette expertise au service du pilote du dimanche comme du professionnel. L’excellence technique ne se démode pas.",
  ],
};

const timelineData: TimelineItem[] = [
  {
    year: "1984",
    title: "Fondation à Loriol-sur-Drôme",
    description:
      "Création de la structure familiale. Premiers karts préparés en Drôme. Début d’une aventure tournée vers la compétition et le service aux pilotes.",
  },
  {
    year: "1992",
    title: "Premiers titres nationaux",
    description:
      "Les pilotes Foti s’imposent en France. L’atelier devient une référence pour les réglages et la préparation moteur.",
  },
  {
    year: "2005",
    title: "Ouverture européenne",
    description:
      "Participation aux championnats WSK et CIK. Développement de la télémétrie et des réglages fine piste.",
  },
  {
    year: "2019",
    title: "Champion d’Europe KZ2 – Lonato",
    description:
      "Couronnement européen en KZ2. La Team Foti confirme son statut de préparateur de pointe sur la scène internationale.",
  },
  {
    year: "2024",
    title: "Champion d’Europe OK-Junior",
    description:
      "Nouveau titre continental. L’écurie poursuit son engagement en formation et en compétition de haut niveau.",
  },
];

export function AboutPageContent() {
  return (
    <div className="min-h-screen bg-background bg-carbon-texture">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <ScrollReveal>
          <h1 className="font-heading font-extrabold italic text-3xl sm:text-4xl text-accent-yellow tracking-tight mb-4">
            À propos
          </h1>
          <p className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-12">
            Notre histoire
          </p>
        </ScrollReveal>

        {/* Manifeste */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="glass rounded-xl p-8 sm:p-10 border border-white/[0.06]"
          >
            <h2 className="font-heading font-extrabold italic text-2xl sm:text-3xl text-foreground tracking-tight mb-8">
              {manifesto.title}
            </h2>
            <div className="space-y-6 text-foreground/90 text-base leading-relaxed">
              {manifesto.paragraphs.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Timeline */}
        <section>
          <ScrollReveal delay={0.1}>
            <h2 className="font-heading font-bold italic text-xl text-accent-yellow tracking-tight mb-2">
              Repères
            </h2>
            <p className="font-mono text-xs text-foreground/50 mb-10">
              Cliquez sur une date pour afficher le détail.
            </p>
          </ScrollReveal>
          <Timeline items={timelineData} />
        </section>
      </div>
    </div>
  );
}
