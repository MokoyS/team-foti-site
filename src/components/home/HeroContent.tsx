"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";

export function HeroContent() {
  const { t } = useLocale();

  return (
    <div className="relative z-10 flex min-h-[100vh] flex-col items-center justify-center px-4 pt-20 pb-24">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.05 }}
        className="font-mono text-[10px] tracking-[0.35em] uppercase text-accent-yellow/70 mb-4"
      >
        Fondé en 1978 · Sébastien Foti
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.1 }}
        className="font-heading text-4xl font-extrabold italic tracking-tight text-accent-yellow drop-shadow-lg text-center max-w-4xl sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {t("home.heroTitle")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.25 }}
        className="mt-5 text-center font-mono text-sm text-foreground/70 sm:text-base max-w-lg"
      >
        {t("home.heroSubtitle")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
        className="mt-8 flex flex-col sm:flex-row items-center gap-3"
      >
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2.5 rounded-lg bg-white text-background px-6 py-3 font-heading font-semibold text-sm transition-all duration-200 hover:bg-accent-yellow active:scale-[0.98] shadow-glow"
        >
          {t("home.heroCta")}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
            <path d="M2 7h10M8 3l4 4-4 4" />
          </svg>
        </Link>
        <Link
          href="/about"
          className="group inline-flex items-center gap-2.5 rounded-lg border border-white/25 text-foreground/80 px-6 py-3 font-heading font-semibold text-sm transition-all duration-200 hover:border-accent-yellow/60 hover:text-accent-yellow hover:bg-accent-yellow/[0.06] active:scale-[0.98]"
        >
          {t("home.heroCtaSecondary")}
        </Link>
      </motion.div>
    </div>
  );
}
