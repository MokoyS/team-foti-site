"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { teamMembers } from "@/lib/data/team";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const STATS = [
  { value: "4", unit: "", label: "Membres core" },
  { value: "40", unit: "ans", label: "d'expertise" },
  { value: "2", unit: "×", label: "Champion d'Europe" },
  { value: "100", unit: "%", label: "Famille" },
];

const PILLARS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Réglages châssis",
    text: "Chaque centième compte. Nos ingénieurs piste optimisent géométrie et grip pour extraire le maximum de chaque circuit.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07" opacity="0.3" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
    title: "Télémétrie & données",
    text: "Analyse en temps réel des trajectoires, freinages et accélérations. La décision technique appuyée par les chiffres.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    title: "Suivi saison",
    text: "De l'engagement au podium : gestion logistique, relation avec les organisateurs, préparation mentale du pilote.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Formation jeunes",
    text: "Programme jeunes pilotes dès 8 ans. Nos coachs transmettent les fondamentaux de la conduite de compétition.",
  },
];

const fadeUp = {
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

function TeamHero() {
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
          className="object-cover object-top opacity-60"
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
          Loriol-sur-Drôme · Fondé en 1984
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 80, damping: 20 }}
          className="font-heading font-extrabold italic text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
        >
          Les hommes<br />
          <span className="text-accent-yellow">derrière la victoire.</span>
        </motion.h1>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export function TeamPageContent() {
  return (
    <div className="min-h-screen bg-background bg-carbon-texture">
      <TeamHero />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* --- Manifeste --- */}
        <section className="py-16 md:py-24">
          <ScrollReveal>
            <SectionHeader eyebrow="THE CREW" title="Notre équipe" />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div className="space-y-6">
              {[
                "Derrière chaque podium, il y a une équipe. La Team Foti, c'est une famille d'ingénieurs, de mécaniciens et de coaches qui partagent une obsession commune : la performance.",
                "Chaque membre apporte son expertise — réglages, télémétrie, préparation physique et mentale — pour offrir aux pilotes les meilleures conditions de compétition possibles.",
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
                Deux générations Foti se relaient en piste et à l&apos;atelier. L&apos;héritage familial se transmet avec la même exigence qu&apos;en 1984 — et l&apos;ambition intacte de conquérir de nouveaux titres.
              </p>
              <blockquote className="border-l-2 border-accent-yellow pl-5 py-1">
                <p className="font-heading italic text-xl text-foreground/90 leading-snug">
                  &laquo;&nbsp;Nous ne préparons pas que des karts — nous préparons des champions.&nbsp;&raquo;
                </p>
                <footer className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 mt-2">
                  Marco Foti · Directeur Technique
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

        {/* --- Membres --- */}
        <section className="py-16 md:py-24">
          <ScrollReveal>
            <SectionHeader eyebrow="L'ÉQUIPE TECHNIQUE" title="Les visages" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <TeamMemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </section>

        {/* --- Piliers --- */}
        <section className="pb-16 md:pb-24">
          <ScrollReveal>
            <SectionHeader eyebrow="MÉTHODE" title="Notre approche" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PILLARS.map(({ icon, title, text }, i) => (
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

        {/* --- Photo --- */}
        <ScrollReveal>
          <div className="relative rounded-xl overflow-hidden aspect-[21/9] mb-16 md:mb-24">
            <Image
              src="/images home/kartrace2.png"
              alt="Team Foti en compétition"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
            <div className="absolute bottom-6 left-8">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">
                En piste — Team Foti
              </span>
            </div>
          </div>
        </ScrollReveal>

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
                  Rejoindre l'aventure
                </p>
                <h2 className="font-heading font-extrabold italic text-2xl sm:text-3xl text-white leading-snug">
                  Vous voulez courir<br />
                  <span className="text-accent-yellow">avec les meilleurs ?</span>
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
                  href="/about"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 border border-white/20 text-foreground/80 font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98]"
                >
                  Notre histoire
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
