"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";

export function HeroContent() {
  const { t } = useLocale();

  return (
    <div className="relative z-10 flex min-h-[100vh] flex-col items-center justify-center px-4 pt-20 pb-24">
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
        className="mt-5 text-center font-mono text-sm text-foreground/80 sm:text-base"
      >
        {t("home.heroSubtitle")}
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        className="mt-8"
      >
        <Link
          href="/shop"
          className="inline-block rounded-xl bg-accent-yellow px-6 py-3 font-heading font-bold text-background shadow-lg transition btn-glow-yellow hover:shadow-glow"
        >
          {t("home.heroCta")}
        </Link>
      </motion.div>
    </div>
  );
}
