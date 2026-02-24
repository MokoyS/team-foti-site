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
          className="object-cover opacity-50"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-background/60 pointer-events-none" />
    </div>
  );
}
