"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/contexts/LocaleContext";
import { useCartStore } from "@/lib/store/cart-store";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, setLocale, t } = useLocale();
  const totalItems = useCartStore((s) => s.totalItems());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/shop", label: t("nav.shop") },
    { href: "/about", label: t("nav.about") },
    { href: "/team", label: t("nav.team") },
    { href: "/actualite", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-4 left-0 right-0 mx-auto w-[calc(100%-2rem)] max-w-5xl z-[100] rounded-xl transition-all duration-300 md:w-[calc(100%-3rem)] ${
        scrolled
          ? "bg-white/[0.06] backdrop-blur-xl border border-white/20"
          : "bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]"
      }`}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-10 lg:gap-16 h-14 px-4 sm:px-6">
        <Link
          href="/"
          className="font-heading font-extrabold italic text-lg tracking-tight text-accent-yellow hover:text-accent-yellow/90 transition justify-self-start"
        >
          TEAM FOTI
        </Link>

        <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 min-w-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-heading text-sm font-medium whitespace-nowrap ${
                pathname === link.href
                  ? "text-accent-yellow"
                  : "text-foreground/90 hover:text-accent-yellow transition"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-foreground/90"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <button
            type="button"
            onClick={() => setLocale(locale === "fr" ? "en" : "fr")}
            className="text-xs font-mono uppercase text-foreground/70 hover:text-accent-yellow transition"
            aria-label="Changer la langue"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <Link
            href="/cart"
            className="relative p-2 rounded-lg hover:bg-white/5 transition"
            aria-label={t("nav.cart")}
          >
            <svg
              className="w-5 h-5 text-accent-yellow"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-red rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-white/10"
          >
            <nav className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block font-heading text-sm font-medium py-2 rounded-lg ${
                    pathname === link.href ? "text-accent-yellow" : "text-foreground/90 hover:text-accent-yellow hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
