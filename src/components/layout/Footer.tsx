"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/contexts/LocaleContext";

function IconInstagram({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconFacebook({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconLinkedIn({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/fotiteamracing/",
    icon: <IconInstagram />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/TeamFoti/",
    icon: <IconFacebook />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/team-foti/",
    icon: <IconLinkedIn />,
  },
];

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-white/10 bg-background mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Logo + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <Link href="/" aria-label="Team Foti — Accueil">
              <div className="relative h-8 w-[84px]">
                <Image
                  src="/logo.svg"
                  alt="Logo Team Foti"
                  fill
                  className="object-contain object-left"
                  sizes="84px"
                />
              </div>
            </Link>
            <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-foreground/30">
              Fondé en 1978 · Loriol-sur-Drôme
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/60">
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

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-foreground/50 hover:border-accent-yellow/40 hover:text-accent-yellow transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

        </div>

        <div className="mt-6 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-foreground/30 font-mono" suppressHydrationWarning>
            © {new Date().getFullYear()} Team Foti. {t("footer.rights")}
          </p>
          <p className="text-xs text-foreground/20 font-mono">
            Monster K · Lexoil · Vega · FFSA
          </p>
        </div>
      </div>
    </footer>
  );
}
