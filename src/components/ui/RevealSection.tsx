"use client";

import { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { BackgroundBeams } from "@/components/ui/BackgroundBeams";

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  /** Affiche des beams discrets en arrière-plan */
  beams?: boolean;
}

export function RevealSection({
  children,
  className = "",
  beams = false,
}: RevealSectionProps) {
  return (
    <ScrollReveal className={`relative ${className}`}>
      {beams && <BackgroundBeams />}
      {children}
    </ScrollReveal>
  );
}
