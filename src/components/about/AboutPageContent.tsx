"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STATS = [
  { value: "40", unit: "ans", label: "d'existence" },
  { value: "2", unit: "×", label: "Champion d'Europe" },
  { value: "1984", unit: "", label: "Fondation" },
  { value: "2", unit: "gen.", label: "Famille Foti" },
];

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Expertise technique",
    text: "40 ans de réglages, de moteurs préparés et de trajectoires optimisées. Notre savoir-faire est transmis de génération en génération.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    title: "Palmarès européen",
    text: "Champion d'Europe KZ2 en 2019, Champion d'Europe OK-Junior en 2024. Nos couleurs ont brillé sur les plus grands circuits du continent.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Accompagnement",
    text: "Du pilote professionnel au père de famille : nous adaptons notre suivi à chaque profil. Technique, logistique, équipement — tout sous un même toit.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Ancrage local",
    text: "Basés à Loriol-sur-Drôme depuis 1984, nous sommes une institution du karting régional et national, reconnue bien au-delà des frontières françaises.",
  },
];

const TIMELINE: TimelineItem[] = [
  {
    year: "1984",
    title: "Fondation à Loriol-sur-Drôme",
    description: "Création de la structure familiale Foti. Premiers karts préparés en Drôme. Début d'une aventure tournée vers la compétition et le service aux pilotes.",
  },
  {
    year: "1992",
    title: "Premiers titres nationaux",
    description: "Les pilotes Foti s'imposent en France. L'atelier devient une référence pour les réglages châssis et la préparation moteur.",
  },
  {
    year: "2005",
    title: "Ouverture européenne",
    description: "Participation aux championnats WSK et CIK. Développement des outils de télémétrie et des réglages fine piste.",
  },
  {
    year: "2012",
    title: "Extension de la boutique",
    description: "Ouverture d'une boutique complète de pièces et consommables karting. L'offre s'étend aux pilotes amateurs et aux familles.",
  },
  {
    year: "2019",
    title: "Champion d'Europe KZ2 — Lonato",
    description: "Couronnement européen en KZ2. La Team Foti confirme son statut de préparateur de pointe sur la scène internationale.",
  },
  {
    year: "2024",
    title: "Champion d'Europe OK-Junior",
    description: "Nouveau titre continental. L'écurie poursuit son engagement en formation jeunes pilotes et en compétition de haut niveau.",
  },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 90, damping: 20, delay: i * 0.1 },
  }),
};

// ---------------------------------------------------------------------------
// Composant Hero de page
// ---------------------------------------------------------------------------

function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-[70vh] w-full overflow-hidden -mt-24 mb-0">
      {/* Image parallax */}
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        <Image
          src="/images home/groupefoti.png"
          alt="Team Foti"
          fill
          priority
          className="object-cover object-top opacity-70"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

      {/* Texte */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-8 pb-16 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent-yellow mb-3 opacity-80"
        >
          Loriol-sur-Drôme · Fondé en 1984
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 80, damping: 20 }}
          className="font-heading font-extrabold italic text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
        >
          40 ans<br />
          <span className="text-accent-yellow">à la limite.</span>
        </motion.h1>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export function AboutPageContent() {
  return (
    <div className="min-h-screen bg-background bg-carbon-texture">
      {/* Hero */}
      <AboutHero />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* --- Manifeste --- */}
        <section className="py-16 md:py-24">
          <ScrollReveal>
            <SectionHeader eyebrow="MANIFESTE" title="Notre histoire" />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div className="space-y-6">
              {[
                "Quarante ans que nous poussons les trajectoires au millimètre. Depuis Loriol-sur-Drôme, la Team Foti est devenue une référence européenne : pas par hasard, mais par la rigueur du réglage, la précision des chronos et la confiance des pilotes.",
                "Nous sommes préparateurs de champions. Notre héritage familial repose sur une règle simple : la performance se construit à l'atelier avant de s'exprimer en piste. Châssis, carbu, grip, télémétrie — chaque détail compte.",
              ].map((p, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="text-foreground/80 text-base sm:text-lg leading-relaxed"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-foreground/80 text-base sm:text-lg leading-relaxed">
                De la WSK au Championnat d&apos;Europe, nos couleurs ont croisé celles des plus grandes écuries. Aujourd&apos;hui, nous mettons cette expertise au service du pilote du dimanche comme du professionnel. L&apos;excellence technique ne se démode pas.
              </p>
              {/* Citation */}
              <blockquote className="border-l-2 border-accent-yellow pl-5 py-1">
                <p className="font-heading italic text-xl text-foreground/90 leading-snug">
                  &laquo;&nbsp;La performance se construit à l&apos;atelier avant de s&apos;exprimer en piste.&nbsp;&raquo;
                </p>
                <footer className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 mt-2">
                  Team Foti
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* --- Stats --- */}
        <section className="py-12 border-t border-b border-white/[0.07]">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map(({ value, unit, label }, i) => (
              <motion.div
                key={label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="font-heading font-extrabold text-3xl sm:text-4xl text-accent-yellow leading-none">
                  {value}
                  {unit && <span className="text-xl text-foreground/40 ml-1">{unit}</span>}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/40 mt-2">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Valeurs --- */}
        <section className="py-16 md:py-24">
          <ScrollReveal>
            <SectionHeader eyebrow="ADN" title="Ce qui nous définit" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {VALUES.map(({ icon, title, text }, i) => (
              <motion.div
                key={title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group flex gap-5 p-6 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-300"
              >
                <div className="shrink-0 mt-0.5 text-accent-yellow/70 group-hover:text-accent-yellow transition-colors duration-300">
                  {icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold italic text-foreground tracking-tight mb-2">
                    {title}
                  </h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Photo secondaire --- */}
        <ScrollReveal>
          <div className="relative rounded-xl overflow-hidden aspect-[21/9] mb-16 md:mb-24">
            <Image
              src="/images home/kartrace.png"
              alt="Karting Team Foti en piste"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
            <div className="absolute bottom-6 left-8">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
                En compétition — Team Foti
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* --- Timeline --- */}
        <section className="pb-16 md:pb-24">
          <ScrollReveal>
            <SectionHeader eyebrow="HISTOIRE" title="Repères" />
            <p className="text-foreground/40 text-sm font-mono mb-10 -mt-4">
              Cliquez sur une date pour afficher le détail.
            </p>
          </ScrollReveal>
          <Timeline items={TIMELINE} />
        </section>

        {/* --- CTA final --- */}
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden mb-24">
            <Image
              src="/images home/hyzax.png"
              alt="Hyzax Team Foti"
              fill
              className="object-cover opacity-40"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-carbon-800/80 to-background/95" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 p-10 sm:p-14">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-yellow mb-2 opacity-70">
                  Votre prochain départ
                </p>
                <h2 className="font-heading font-extrabold italic text-2xl sm:text-3xl text-white leading-snug">
                  Prêt à passer<br />
                  <span className="text-accent-yellow">à la vitesse supérieure ?</span>
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-background font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
                >
                  Nous contacter
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </Link>
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 border border-white/20 text-foreground/80 font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98]"
                >
                  Voir la boutique
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
