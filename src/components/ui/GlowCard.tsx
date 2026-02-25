"use client";

import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glow?: "yellow" | "red" | "none";
}

/**
 * Carte sobre : bordure fine, hover discret (pas de glow).
 */
export function GlowCard({
  children,
  className = "",
}: GlowCardProps) {
  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-carbon-800/80 backdrop-blur-sm transition-colors duration-200 hover:border-white/[0.14] ${className}`}
    >
      {children}
    </div>
  );
}
