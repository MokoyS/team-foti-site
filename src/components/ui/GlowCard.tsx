"use client";

import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glow?: "yellow" | "red" | "none";
}

/**
 * Carte avec bordure fine et lueur au survol (jaune ou rouge).
 */
export function GlowCard({
  children,
  className = "",
  glow = "yellow",
}: GlowCardProps) {
  const glowClass =
    glow === "yellow"
      ? "card-glow-yellow hover:border-accent-yellow/30"
      : glow === "red"
        ? "card-glow-red hover:border-accent-red/25"
        : "";
  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-carbon-800/80 backdrop-blur-sm transition-all duration-300 ${glowClass} ${className}`}
    >
      {children}
    </div>
  );
}
