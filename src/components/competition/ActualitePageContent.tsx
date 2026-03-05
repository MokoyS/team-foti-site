"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { ArticleCardElite } from "@/components/competition/ArticleCardElite";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Article, ArticleType } from "@/lib/data/articles";

interface ActualitePageContentProps {
  articles: Article[];
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 90, damping: 20, delay: i * 0.1 },
  }),
};

const FILTERS: { label: string; value: ArticleType | "Tous" }[] = [
  { label: "Tous", value: "Tous" },
  { label: "Résultats", value: "Résultat" },
  { label: "Transferts", value: "Transfert" },
  { label: "News", value: "News" },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function ActualiteHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-[70vh] w-full overflow-hidden -mt-24 mb-0">
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        <Image
          src="/Photos%20/resultats-podiums/21_OPENKART_Salbris_22022026-_T5A4369.jpg"
          alt="Open Kart Salbris 2026 — Team Foti"
          fill
          priority
          className="object-cover object-center opacity-65"
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
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent-yellow mb-3 opacity-80"
        >
          Résultats · Transferts · News
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 80, damping: 20 }}
          className="font-heading font-extrabold italic text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
        >
          Le paddock<br />
          <span className="text-accent-yellow">en direct.</span>
        </motion.h1>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export function ActualitePageContent({ articles }: ActualitePageContentProps) {
  const [activeFilter, setActiveFilter] = useState<ArticleType | "Tous">("Tous");

  const filtered = activeFilter === "Tous"
    ? articles
    : articles.filter((a) => a.type === activeFilter);

  return (
    <div className="min-h-screen bg-background bg-carbon-texture">
      <ActualiteHero />


      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* --- Intro --- */}
        <section className="py-16 md:py-24">
          <ScrollReveal>
            <SectionHeader eyebrow="THE RACE FEED" title="Actualité" />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div className="space-y-6">
              {[
                "Chronos, podiums, arrivées en équipe et décisions de paddock. Suivez la saison Team Foti en temps réel, depuis l'engagement jusqu'au podium.",
                "Nos journalistes embarqués sur chaque manche relaient les résultats, les transferts et les coulisses de la compétition européenne.",
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
                Des résultats bruts aux analyses trajectoires, nous documentons chaque compétition pour que rien ne soit perdu — ni le dixième de seconde, ni l&apos;émotion du dépassement.
              </p>
              <blockquote className="border-l-2 border-accent-yellow pl-5 py-1">
                <p className="font-heading italic text-xl text-foreground/90 leading-snug">
                  &laquo;&nbsp;Les données ne mentent pas. Le chrono non plus.&nbsp;&raquo;
                </p>
                <footer className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 mt-2">
                  Luca Foti · Ingénieur Piste
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* --- Filtres --- */}
        <ScrollReveal>
          <SectionHeader eyebrow="ARTICLES" title="La une" />
          <div className="flex flex-wrap gap-2 mb-10 -mt-2">
            {FILTERS.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => setActiveFilter(value)}
                className={`px-4 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all duration-150 ${
                  activeFilter === value
                    ? "bg-accent-yellow/10 border border-accent-yellow/30 text-accent-yellow"
                    : "border border-white/[0.08] text-foreground/50 hover:border-white/20 hover:text-foreground/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* --- Articles --- */}
        <section className="pb-16 md:pb-24">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/10 mb-6" aria-hidden>
                <circle cx="24" cy="24" r="20" /><path d="M16 24h16M24 16v16" strokeLinecap="round" />
              </svg>
              <p className="font-heading italic text-foreground/40 text-lg">Aucun article pour cette catégorie</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.08 } },
                hidden: {},
              }}
            >
              {filtered.map((a, i) => (
                <ArticleCardElite key={a.id} article={a} index={i} />
              ))}
            </motion.div>
          )}
        </section>

        {/* --- Photo --- */}
        <ScrollReveal>
          <div className="relative rounded-xl overflow-hidden aspect-[21/9] mb-16 md:mb-24">
            <Image
              src="/Photos%20/Pilotes/Salbris%203.jpg"
              alt="Pilotes Team Foti en course à Salbris"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
            <div className="absolute bottom-6 left-8">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
                Salbris — Team Foti en course
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* --- CTA final --- */}
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden mb-24">
            <Image
              src="/images home/hyzax2.png"
              alt="Hyzax Team Foti"
              fill
              className="object-cover opacity-40"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-carbon-800/80 to-background/95" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 p-10 sm:p-14">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-yellow mb-2 opacity-70">
                  Restez connectés
                </p>
                <h2 className="font-heading font-extrabold italic text-2xl sm:text-3xl text-white leading-snug">
                  Suivez chaque<br />
                  <span className="text-accent-yellow">drapeau à damier.</span>
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link
                  href="/competition/palmares"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-background font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-white/90 active:scale-[0.98]"
                >
                  Voir le palmarès
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 border border-white/20 text-foreground/80 font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98]"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
