"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function HomeContactSection() {
  const { t } = useLocale();

  return (
    <ScrollReveal>
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 border-t border-white/10">
        <h2 className="font-heading font-bold italic text-2xl text-accent-yellow tracking-tight mb-4">
          {t("home.contactTitle")}
        </h2>
        <p className="text-foreground/80 text-sm md:text-base mb-6">
          {t("home.contactTeaser")}
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-3 border border-accent-red text-accent-red font-heading font-bold italic rounded-xl transition btn-glow-red hover:bg-accent-red/10"
        >
          {t("home.contactCta")}
        </Link>
      </section>
    </ScrollReveal>
  );
}
