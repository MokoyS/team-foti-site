"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ContactPageContent() {
  return (
    <div className="min-h-screen bg-background bg-carbon-texture">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24">
        <ScrollReveal>
          <h1 className="font-heading font-extrabold italic text-3xl sm:text-4xl text-accent-yellow tracking-tight mb-2">
            Contact
          </h1>
          <p className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-6">
            Direct Line
          </p>
          <p className="text-foreground/90 text-lg font-heading italic mb-12">
            L&apos;excellence technique ne prend pas de rendez-vous. Contactez notre atelier.
          </p>
        </ScrollReveal>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="rounded-xl border border-white/[0.06] bg-carbon-800/80 backdrop-blur-sm overflow-hidden"
        >
          {/* En-tête type écran télémétrie */}
          <div className="px-4 py-2 border-b border-white/[0.06] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-red/80" />
            <span className="w-2 h-2 rounded-full bg-accent-yellow/60" />
            <span className="w-2 h-2 rounded-full bg-green-500/60" />
            <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest ml-2">
              COORDONNÉES · TEAM FOTI
            </span>
          </div>
          <div className="p-6 sm:p-8 font-mono text-sm space-y-6">
            <div>
              <p className="text-foreground/40 text-xs uppercase tracking-wider mb-1">
                GPS · ADRESSE
              </p>
              <p className="text-foreground/90">
                Loriol-sur-Drôme<span className="text-foreground/50">, France</span>
              </p>
            </div>
            <div>
              <p className="text-foreground/40 text-xs uppercase tracking-wider mb-1">
                LIGNE DIRECTE
              </p>
              <a
                href="tel:+33475520000"
                className="text-accent-yellow hover:text-accent-yellow/80 transition tabular-nums"
              >
                +33 4 75 52 00 00
              </a>
            </div>
            <div>
              <p className="text-foreground/40 text-xs uppercase tracking-wider mb-1">
                EMAIL · ATELIER
              </p>
              <a
                href="mailto:contact@teamfoti.com"
                className="text-accent-yellow hover:text-accent-yellow/80 transition"
              >
                contact@teamfoti.com
              </a>
            </div>
            <div className="pt-4 border-t border-white/[0.06]">
              <p className="text-foreground/40 text-xs uppercase tracking-wider mb-1">
                HORAIRES · OUVERTURE
              </p>
              <p className="text-foreground/80 tabular-nums">
                Lun – Ven <span className="text-foreground/50">·</span> 09h00 – 18h00
              </p>
              <p className="text-foreground/60 text-xs mt-1">
                Sur rendez-vous pour visites et essais
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
