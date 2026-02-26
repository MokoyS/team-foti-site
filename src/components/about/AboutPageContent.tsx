"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { wallOfFame } from "@/lib/data/team";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STATS = [
  { value: "1978", unit: "", label: "Fondation" },
  { value: "46", unit: "ans", label: "d'existence" },
  { value: "2", unit: "×", label: "Champion d'Europe" },
  { value: "3", unit: "gen.", label: "Passion Foti" },
];

const VALUES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Expertise moteur",
    text: "Sébastien Foti a consacré 46 ans à la préparation moteur. Chaque bloc sort du banc d'essai avec une puissance certifiée — aucun compromis.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    title: "Palmarès continental",
    text: "Champion d'Europe KZ2, OK et OK-Junior. Nos pilotes ont porté nos couleurs aux sommets de la compétition internationale depuis les circuits CIK/FIA.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Formation pilotes",
    text: "Nous travaillons avec la FFSA pour former les jeunes talents. De la catégorie Mini à la KZ, notre pôle coaching accompagne chaque pilote vers son meilleur niveau.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Ancrage régional",
    text: "Basés près de Lyon, actifs sur la piste Actua et dans la Ligue Rhône-Alpes. Une présence locale forte avec un rayonnement national et européen.",
  },
];

const TIMELINE: TimelineItem[] = [
  {
    year: "1978",
    title: "Fondation par Sébastien Foti",
    description: "Sébastien Foti commence à préparer ses propres karts par passion de la mécanique. Ce défi personnel devient rapidement une quête de puissance absolue qui fonde la réputation de l'écurie.",
  },
  {
    year: "1990s",
    title: "L'atelier devient une référence",
    description: "La maîtrise de la préparation moteur attire les meilleurs pilotes de la région. L'atelier Foti s'impose comme une référence incontournable. Des noms comme Fisichella et Panis débutent leur carrière dans notre structure.",
  },
  {
    year: "2000s",
    title: "Import PCR & ouverture nationale",
    description: "L'écurie importe la marque PCR, élargissant son offre châssis. Participation croissante aux championnats nationaux. Le nom Foti résonne bien au-delà de Rhône-Alpes.",
  },
  {
    year: "2012",
    title: "Alexis Garcia, Team Manager",
    description: "Alexis Garcia prend les rênes de la gestion sportive. L'écurie s'étend, structure sa formation jeunes et renforce ses partenariats techniques.",
  },
  {
    year: "2019",
    title: "Champion d'Europe KZ2 — Lonato",
    description: "Couronnement européen en KZ2 sur le circuit de Lonato. La Team Foti confirme son statut de préparateur de pointe sur la scène internationale.",
  },
  {
    year: "2022",
    title: "Monster K & Yuri Serafini",
    description: "Développement du châssis Monster K en partenariat avec Yuri Serafini. Un châssis conçu spécifiquement pour les réglages Foti, disponible en exclusivité chez l'écurie.",
  },
  {
    year: "2024",
    title: "Champion d'Europe OK-Junior",
    description: "Nouveau titre continental. L'aventure familiale continue, portée par la même exigence qu'en 1978 — et l'ambition intacte de dominer les circuits du monde entier.",
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
// Hero
// ---------------------------------------------------------------------------

function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-[70vh] w-full overflow-hidden -mt-24 mb-0">
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

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

      <motion.div
        style={{ opacity }}
        className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-8 pb-16 max-w-5xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.15 }}
          className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent-yellow mb-3 opacity-80"
        >
          Fondé en 1978 · Sébastien Foti
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
                "Tout a commencé il y a près de 50 ans. Sébastien Foti, passionné de mécanique, commence à préparer ses propres karts. Ce qui n'était qu'un défi personnel devient une quête de puissance absolue.",
                "De fil en aiguille, son talent et son exigence font de son nom une icône mondiale du Karting. Sébastien Foti n'est pas qu'un préparateur ; c'est un architecte de la performance.",
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
                Aujourd&apos;hui, la relève est en piste. Alexis Garcia et son cousin Enzo portent l&apos;héritage avec la même ferveur. De l&apos;importation de la marque PCR dans les années 2000 au développement actuel des châssis Monster K avec Yuri Serafini, l&apos;aventure continue. Notre palmarès parle pour nous.
              </p>
              <blockquote className="border-l-2 border-accent-yellow pl-5 py-1">
                <p className="font-heading italic text-xl text-foreground/90 leading-snug">
                  &laquo;&nbsp;La performance se construit à l&apos;atelier avant de s&apos;exprimer en piste.&nbsp;&raquo;
                </p>
                <footer className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 mt-2">
                  Sébastien Foti · Fondateur
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
              src="/Photos%20/resultats-podiums/21_OPENKART_Salbris_22022026-_T5A4369.jpg"
              alt="Open Kart Salbris 2026 — Team Foti"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
            <div className="absolute bottom-6 left-8">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
                Open Kart Salbris — Fév. 2026
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* --- Wall of Fame --- */}
        <section className="pb-16 md:pb-24">
          <ScrollReveal>
            <SectionHeader eyebrow="WALL OF FAME" title="Nos pilotes emblématiques" />
            <p className="text-foreground/40 text-sm font-mono mb-10 -mt-4">
              Ils ont porté nos couleurs. Ils ont forgé notre légende.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {wallOfFame.map(({ name, years, category }, i) => (
              <motion.div
                key={name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="group flex items-center gap-4 p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-accent-yellow/30 hover:bg-accent-yellow/[0.03] transition-all duration-300"
              >
                <div className="shrink-0 w-10 h-10 rounded-lg bg-accent-yellow/10 border border-accent-yellow/20 flex items-center justify-center">
                  <span className="font-heading font-bold text-accent-yellow text-xs">
                    {name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-bold italic text-foreground text-sm truncate group-hover:text-accent-yellow transition-colors">
                    {name}
                  </p>
                  <p className="font-mono text-[10px] text-foreground/40 uppercase tracking-wider mt-0.5">
                    {category} · {years}
                  </p>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-accent-yellow/50 group-hover:text-accent-yellow transition-colors" aria-hidden>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </motion.div>
            ))}
          </div>
        </section>

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
