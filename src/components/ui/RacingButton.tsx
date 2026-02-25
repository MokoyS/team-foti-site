"use client";

import Link from "next/link";
import { ReactNode } from "react";

/**
 * Variants :
 * - primary : fond blanc, texte noir  → CTA principal (panier, checkout…)
 * - ghost   : contour blanc/20        → action secondaire
 * - yellow  : contour + texte jaune   → lien accentué
 */
export type ButtonVariant = "primary" | "ghost" | "yellow";

const base =
  "inline-flex items-center justify-center gap-2 font-heading font-semibold text-sm tracking-wide rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 select-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-background px-5 py-2.5 hover:bg-white/90 active:scale-[0.98]",
  ghost:
    "border border-white/20 text-foreground/80 px-5 py-2.5 hover:border-white/40 hover:text-foreground hover:bg-white/[0.04] active:scale-[0.98]",
  yellow:
    "border border-accent-yellow/40 text-accent-yellow px-5 py-2.5 hover:border-accent-yellow hover:bg-accent-yellow/[0.06] active:scale-[0.98]",
};

/** Petite flèche droite discrète */
function Arrow() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 14 14"
      fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
      aria-hidden
    >
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

/* ---- Link version ---- */
interface RacingButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  arrow?: boolean;
}

export function RacingButton({
  href,
  children,
  variant = "ghost",
  className = "",
  external = false,
  arrow = false,
}: RacingButtonProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group ${base} ${variants[variant]} ${className}`}
    >
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

/* ---- Button version ---- */
interface RacingButtonButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  arrow?: boolean;
}

export function RacingButtonButton({
  children,
  variant = "ghost",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  arrow = false,
}: RacingButtonButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group ${base} ${variants[variant]} disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
    >
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
