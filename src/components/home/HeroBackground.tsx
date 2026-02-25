"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Image de fond du Hero avec parallaxe au scroll (scrollY).
 * L'image se déplace plus lentement que le scroll pour créer un effet de profondeur.
 */
export function HeroBackground() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -180]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 right-0 h-[120%] w-full"
      >
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-background/40 pointer-events-none" aria-hidden />
      {/* Fondu bas vers le noir pour fusionner avec la section suivante */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" aria-hidden />
    </div>
  );
}
