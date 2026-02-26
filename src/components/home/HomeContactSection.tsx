"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function HomeContactSection() {
  return (
    <ScrollReveal>
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 md:py-24">
        <SectionHeader eyebrow="CONTACT" title="Contact" />

        {/* CTA card pleine largeur avec image fond */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="relative rounded-2xl overflow-hidden min-h-[320px] sm:min-h-[360px] flex items-end"
        >
          {/* Image fond */}
          <Image
            src="/Photos%20/resultats-podiums/Podium%20Champ%20france.jpg"
            alt="Team Foti — Podium Championnat de France"
            fill
            className="object-cover object-top"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />

          {/* Gradient par-dessus l'image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

          {/* Contenu positionné en bas à gauche */}
          <div className="relative z-10 p-8 sm:p-12 w-full sm:max-w-lg">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-yellow mb-3 opacity-80">
              Loriol-sur-Drôme · Drôme (26)
            </p>
            <h3 className="font-heading font-bold italic text-2xl sm:text-3xl text-white leading-snug mb-4">
              Une question ? Un projet ?<br />
              <span className="text-accent-yellow">On vous répond.</span>
            </h3>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Atelier, boutique, compétition — l&apos;équipe Foti est disponible pour vous accompagner.
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 font-heading font-semibold text-sm text-white border border-white/30 rounded-lg px-5 py-2.5 transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-[0.98]"
            >
              Nous contacter
              <svg
                width="14" height="14" viewBox="0 0 14 14"
                fill="none" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              >
                <path d="M2 7h10M8 3l4 4-4 4" />
              </svg>
            </Link>
          </div>

          {/* Numéro de téléphone flottant en bas à droite */}
          <div className="absolute bottom-8 right-8 z-10 text-right hidden sm:block">
            <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mb-1">Téléphone</p>
            <p className="font-heading font-bold text-white/70 text-lg">04 75 61 XX XX</p>
          </div>
        </motion.div>

      </section>
    </ScrollReveal>
  );
}
