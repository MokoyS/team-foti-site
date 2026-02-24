"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";
import { BentoGrid, BentoCell } from "@/components/ui/BentoGrid";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function HomeAboutSection() {
  const { t } = useLocale();

  return (
    <ScrollReveal>
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-16 border-t border-white/10">
        <BentoGrid className="max-w-4xl">
          <BentoCell colSpan={2}>
            <h2 className="font-heading font-bold italic text-2xl text-accent-yellow tracking-tight mb-4">
              {t("home.aboutTitle")}
            </h2>
            <p className="text-foreground/85 text-sm md:text-base leading-relaxed">
              {t("home.aboutTeaser")}
            </p>
          </BentoCell>
          <BentoCell>
            <div className="flex flex-col justify-center h-full">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 border border-accent-yellow text-accent-yellow font-heading font-bold italic rounded-xl transition btn-glow-yellow hover:bg-accent-yellow/10"
              >
                {t("home.aboutCta")}
              </Link>
            </div>
          </BentoCell>
        </BentoGrid>
      </section>
    </ScrollReveal>
  );
}
