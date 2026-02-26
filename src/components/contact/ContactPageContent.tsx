"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function IconPin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconPhone({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
    </svg>
  );
}
function IconMail({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function IconClock({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
  );
}
function IconInstagram({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
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

const CONTACT_ITEMS = [
  {
    icon: <IconPin />,
    label: "GPS · ADRESSE",
    content: (
      <p className="text-foreground/90">
        Loriol-sur-Drôme<span className="text-foreground/50">, France (26)</span>
      </p>
    ),
  },
  {
    icon: <IconPhone />,
    label: "TEAM MANAGER · ALEXIS GARCIA",
    content: (
      <a href="tel:+33475610000" className="text-foreground/90 hover:text-foreground transition tabular-nums">
        Contactez l&apos;atelier directement
      </a>
    ),
  },
  {
    icon: <IconMail />,
    label: "EMAIL · ATELIER",
    content: (
      <a href="mailto:contact@teamfoti.com" className="text-foreground/90 hover:text-foreground transition">
        contact@teamfoti.com
      </a>
    ),
  },
  {
    icon: <IconInstagram />,
    label: "INSTAGRAM",
    content: (
      <a
        href="https://www.instagram.com/fotiteamracing/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/90 hover:text-accent-yellow transition"
      >
        @fotiteamracing
      </a>
    ),
  },
  {
    icon: <IconClock />,
    label: "HORAIRES · OUVERTURE",
    content: (
      <div>
        <p className="text-foreground/80 tabular-nums">Lun – Ven <span className="text-foreground/50">·</span> 09h00 – 18h00</p>
        <p className="text-foreground/50 text-xs mt-1">Sur rendez-vous pour visites et essais</p>
      </div>
    ),
  },
];

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Préparation moteur Foti",
    text: "Des heures au banc d'essai. Chaque moteur sort de l'atelier de Sébastien Foti certifié à sa puissance maximale.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Suivi compétition complet",
    text: "Engagement, réglages piste, stratégie course, télémétrie. Alexis Garcia coordonne chaque manche pour votre pilote.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    title: "Boutique Monster K & Foti",
    text: "Châssis Monster K, moteurs préparés, consommables Lexoil et Vega. Le matériel qu'on utilise nous-mêmes.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Formation Mini → KZ",
    text: "Programme pilotes dès 8 ans. Coaching Enzo, Fred et Mallo. Nous avons formé les plus grands — votre enfant peut être le prochain.",
  },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

function ContactHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div ref={ref} className="relative h-[70vh] w-full overflow-hidden -mt-24 mb-0">
      <motion.div style={{ y }} className="absolute inset-0 h-[120%]">
        <Image src="/images home/hyzax2.png" alt="Atelier Team Foti" fill priority className="object-cover object-center opacity-50" sizes="100vw" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
      <motion.div style={{ opacity }} className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-8 pb-16 max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.15 }}
          className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent-yellow mb-3 opacity-80"
        >
          Loriol-sur-Drôme · Drôme, France
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 80, damping: 20 }}
          className="font-heading font-extrabold italic text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
        >
          L&apos;atelier est ouvert.<br />
          <span className="text-accent-yellow">La performance n&apos;attend pas.</span>
        </motion.h1>
      </motion.div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export function ContactPageContent() {
  return (
    <div className="min-h-screen bg-background bg-carbon-texture">
      <ContactHero />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* --- Intro --- */}
        <section className="py-16 md:py-24">
          <ScrollReveal>
            <SectionHeader eyebrow="DIRECT LINE" title="Nous joindre" />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div className="space-y-6">
              {[
                "L'atelier est ouvert. Que vous soyez pilote professionnel, amateur passionné ou structure en quête d'un partenaire sérieux — Alexis Garcia vous répond directement.",
                "Contactez-nous pour un devis préparation Monster K, un moteur Foti Prep, ou simplement pour parler de votre prochain départ en compétition.",
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
                Depuis 1978, nous cultivons une relation directe avec nos pilotes. Sébastien Foti a bâti cette réputation sur la transparence et le résultat. Alexis Garcia continue dans le même esprit.
              </p>
              <blockquote className="border-l-2 border-accent-yellow pl-5 py-1">
                <p className="font-heading italic text-xl text-foreground/90 leading-snug">
                  &laquo;&nbsp;Un coup de fil suffit. On est là.&nbsp;&raquo;
                </p>
                <footer className="font-mono text-[10px] tracking-widest uppercase text-foreground/40 mt-2">
                  Alexis Garcia · Team Manager
                </footer>
              </blockquote>
            </motion.div>
          </div>
        </section>

        {/* --- Coordonnées --- */}
        <section className="pb-16 md:pb-24">
          <ScrollReveal>
            <SectionHeader eyebrow="COORDONNÉES" title="L'atelier" />
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="rounded-xl border border-white/[0.1] bg-carbon-800/80 overflow-hidden"
          >
            <div className="px-4 py-2.5 border-b border-white/[0.08] flex items-center gap-2 bg-black/30">
              <span className="w-2 h-2 rounded-full bg-accent-red/90 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-accent-yellow/80" />
              <span className="w-2 h-2 rounded-full bg-green-500/70" />
              <span className="font-mono text-[10px] text-foreground/50 uppercase tracking-[0.2em] ml-2">
                COORDONNÉES · TEAM FOTI
              </span>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {CONTACT_ITEMS.map(({ icon, label, content }, i) => (
                <motion.div
                  key={label}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 sm:p-8 font-mono text-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/80">
                    {icon}
                  </div>
                  <div>
                    <p className="text-foreground/40 text-xs uppercase tracking-wider mb-1">{label}</p>
                    {content}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Liens réseaux sociaux */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3 mt-6"
          >
            {[
              { label: "Instagram", href: "https://www.instagram.com/fotiteamracing/", icon: "IG" },
              { label: "Facebook", href: "https://www.facebook.com/TeamFoti/", icon: "FB" },
              { label: "LinkedIn", href: "https://www.linkedin.com/company/team-foti/", icon: "LI" },
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg border border-white/[0.08] text-foreground/60 font-mono text-xs uppercase tracking-wider hover:border-accent-yellow/40 hover:text-accent-yellow transition-all duration-200"
              >
                <span className="font-heading font-bold text-accent-yellow/70">{icon}</span>
                {label}
              </a>
            ))}
          </motion.div>
        </section>

        {/* --- Services --- */}
        <section className="pb-16 md:pb-24">
          <ScrollReveal>
            <SectionHeader eyebrow="SERVICES" title="Ce qu'on fait pour vous" />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SERVICES.map(({ icon, title, text }, i) => (
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
                  <h3 className="font-heading font-bold italic text-foreground tracking-tight mb-2">{title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Photo --- */}
        <ScrollReveal>
          <div className="relative rounded-xl overflow-hidden aspect-[21/9] mb-16 md:mb-24">
            <Image src="/Photos%20/resultats-podiums/Podium%20KArt%20MAg%20pers.jpeg" alt="Podium Kart Mag — Team Foti" fill className="object-cover object-top" sizes="(max-width: 1280px) 100vw, 1280px" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
            <div className="absolute bottom-6 left-8">
              <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">Podium Kart Mag — Team Foti</span>
            </div>
          </div>
        </ScrollReveal>

        {/* --- CTA final --- */}
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden mb-24">
            <Image src="/images home/hyzax.png" alt="Hyzax Team Foti" fill className="object-cover opacity-40" sizes="(max-width: 1280px) 100vw, 1280px" />
            <div className="absolute inset-0 bg-gradient-to-b from-carbon-800/80 to-background/95" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 p-10 sm:p-14">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-yellow mb-2 opacity-70">Votre prochain départ</p>
                <h2 className="font-heading font-extrabold italic text-2xl sm:text-3xl text-white leading-snug">
                  Prêt à passer<br />
                  <span className="text-accent-yellow">à la vitesse supérieure ?</span>
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Link href="/shop" className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-background font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:bg-white/90 active:scale-[0.98]">
                  Voir la boutique
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                    <path d="M2 7h10M8 3l4 4-4 4" />
                  </svg>
                </Link>
                <Link href="/team" className="group inline-flex items-center gap-2.5 px-6 py-3 border border-white/20 text-foreground/80 font-heading font-semibold text-sm rounded-lg transition-all duration-200 hover:border-white/40 hover:bg-white/[0.04] active:scale-[0.98]">
                  L'équipe
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
}
