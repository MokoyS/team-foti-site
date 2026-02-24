"use client";

import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className = "" }: BentoGridProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
    >
      {children}
    </div>
  );
}

interface BentoCellProps {
  children: ReactNode;
  className?: string;
  /** Span en colonnes (1 par défaut). Ex: 2 = double largeur sur grille 3 col. */
  colSpan?: 1 | 2 | 3;
  /** Span en lignes (1 par défaut). */
  rowSpan?: 1 | 2;
}

export function BentoCell({
  children,
  className = "",
  colSpan = 1,
  rowSpan = 1,
}: BentoCellProps) {
  const spanClass =
    colSpan === 2
      ? "md:col-span-2"
      : colSpan === 3
        ? "md:col-span-3"
        : "";
  const rowClass = rowSpan === 2 ? "md:row-span-2" : "";
  return (
    <div
      className={`glass rounded-xl p-6 border border-white/[0.06] transition-shadow duration-300 hover:glass-border-glow ${spanClass} ${rowClass} ${className}`}
    >
      {children}
    </div>
  );
}
