"use client";

import { ZoomParallax } from "@/components/ui/zoom-parallax";

export function HomeZoomParallax() {
  return (
    <section className="relative" aria-label="Galerie karting">
      <ZoomParallax
        src="/hero.jpg"
        alt="Team Foti en piste"
        sublabel="40 ans à la limite"
        label="Team Foti"
      />
    </section>
  );
}
