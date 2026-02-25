"use client";

import { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  /** Beams + grain + télémétrie discrets */
  beams?: boolean;
}

export function RevealSection({
  children,
  className = "",
  beams = false,
}: RevealSectionProps) {
  return (
    <ScrollReveal className={`relative ${className}`}>
      {beams && (
        <>
          <NoiseOverlay />
          <BackgroundBeams />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </ScrollReveal>
  );
}
