"use client";

/**
 * Séparateur : barre fine blanc / noir / blanc / noir.
 */
export function RacingSeparator({ className = "" }: { className?: string }) {
  return <div className={`separator-stripe w-full ${className}`} aria-hidden />;
}
