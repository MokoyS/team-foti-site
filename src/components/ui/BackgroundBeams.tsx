"use client";

import { useMemo } from "react";

interface BackgroundBeamsProps {
  className?: string;
  /** Nombre de lignes/beams (défaut 3) */
  count?: number;
}

/**
 * Effet de "beams" très discret en arrière-plan (inspiration Aceternity).
 * À placer en absolute dans une section sombre.
 */
export function BackgroundBeams({ className = "", count = 3 }: BackgroundBeamsProps) {
  const beams = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${15 + i * 28}%`,
        width: "1px",
        gradient:
          "linear-gradient(to bottom, transparent, rgba(255,215,0,0.03), transparent)",
      })),
    [count]
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {beams.map((beam) => (
        <div
          key={beam.id}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: beam.left,
            width: beam.width,
            background: beam.gradient,
          }}
        />
      ))}
    </div>
  );
}
