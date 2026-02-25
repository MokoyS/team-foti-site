"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const STATS = [
  { value: "40", unit: "ans", label: "d'expertise" },
  { value: "🏆", unit: "", label: "Champion d'Europe" },
  { value: "2", unit: "gen.", label: "Famille Foti" },
];

export function HomeAboutSection() {
  return (
    <ScrollReveal>
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24">
        <SectionHeader eyebrow="ABOUT" title="À propos" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* --- Colonne gauche : image + stats flottantes --- */}
          <div className="relative">
            {/* Image principale */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images home/groupefoti.png"
                alt="L'équipe Team Foti"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Vignette bas */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Badge "40 ans" flottant */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute -bottom-5 -right-4 sm:-right-6 bg-accent-yellow text-black rounded-lg px-4 py-3 shadow-xl"
            >
              <div className="font-heading font-bold text-2xl leading-none">40</div>
              <div className="font-mono text-[10px] uppercase tracking-widest mt-0.5">ans</div>
            </motion.div>
          </div>

          {/* --- Colonne droite : texte + stats + CTA --- */}
          <div className="flex flex-col gap-8">
            {/* Accroche */}
            <div>
              <h3 className="font-heading font-bold italic text-xl sm:text-2xl text-foreground leading-snug mb-4">
                Une institution familiale du karting,{" "}
                <span className="text-accent-yellow">fondée par les Foti.</span>
              </h3>
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
                Expertise technique, palmarès en Championnat d'Europe et en France.
                Nous accompagnons le père de famille comme le pilote professionnel —
                de l'atelier à la grille de départ.
              </p>
            </div>

            {/* Stats en ligne */}
            <div className="flex gap-6 sm:gap-10 border-t border-white/10 pt-6">
              {STATS.map(({ value, unit, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <div className="font-heading font-bold text-2xl sm:text-3xl text-accent-yellow leading-none">
                    {value}
                    {unit && (
                      <span className="text-base font-normal text-foreground/50 ml-0.5">{unit}</span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-heading font-semibold text-sm text-foreground/80 border border-white/20 rounded-lg px-5 py-2.5 transition-all duration-200 hover:border-white/40 hover:text-foreground hover:bg-white/[0.04] active:scale-[0.98]"
            >
              En savoir plus
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
            </div>
          </div>

        </div>
      </section>
    </ScrollReveal>
  );
}
