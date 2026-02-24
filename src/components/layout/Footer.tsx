"use client";

import Link from "next/link";
import { useLocale } from "@/contexts/LocaleContext";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-white/10 bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-heading font-bold italic text-accent-yellow">
            TEAM FOTI
          </p>
          <nav className="flex items-center gap-6 text-sm text-foreground/70">
            <Link href="/contact" className="hover:text-accent-yellow transition">
              {t("nav.contact")}
            </Link>
            <Link href="/mentions-legales" className="hover:text-accent-yellow transition">
              {t("nav.legal")}
            </Link>
            <Link href="/cgv" className="hover:text-accent-yellow transition">
              {t("nav.cgv")}
            </Link>
          </nav>
        </div>
        <p className="text-center text-xs text-foreground/50 mt-6" suppressHydrationWarning>
          © {new Date().getFullYear()} Team Foti. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
