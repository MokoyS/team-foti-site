"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export interface ZoomParallaxImage {
  src: string;
  alt?: string;
}

interface ZoomParallaxProps {
  /**
   * src : image principale (plein écran)
   * label : texte court affiché en overlay (optionnel)
   */
  src: string;
  alt?: string;
  label?: string;
  sublabel?: string;
}

export function ZoomParallax({ src, alt = "", label, sublabel }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Image zoom : 1 → 1.5 (zoom progressif mais pas excessif)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  // Overlay : disparaît à mi-scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // Overlay texte : monte légèrement en sortant
  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-20%"]);

  const isExternal = src.startsWith("http");

  return (
    <div ref={container} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Image zoomée */}
        <motion.div style={{ scale }} className="absolute inset-0 will-change-transform">
          {isExternal ? (
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
          {/* Gradient en bas pour transition douce vers la suite */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80" />
        </motion.div>

        {/* Overlay texte */}
        {(label || sublabel) && (
          <motion.div
            style={{ opacity: overlayOpacity, y: textY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
          >
            {sublabel && (
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent-yellow mb-3 opacity-80">
                {sublabel}
              </span>
            )}
            {label && (
              <h2 className="font-heading font-bold italic text-4xl sm:text-6xl md:text-7xl text-white tracking-tight drop-shadow-xl">
                {label}
              </h2>
            )}
            {/* Indicateur de scroll */}
            <div className="absolute bottom-10 flex flex-col items-center gap-2 animate-bounce">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
                Scroll
              </span>
              <svg width="16" height="24" viewBox="0 0 16 24" fill="none" className="text-white/50">
                <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.5"/>
                <motion.rect
                  x="6.5" y="4" width="3" height="5" rx="1.5" fill="currentColor"
                  animate={{ y: [4, 10, 4] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/** Rétro-compat : accepte aussi un tableau d'images (affiche juste la première) */
export function ZoomParallaxGallery({ images }: { images: ZoomParallaxImage[] }) {
  const first = images[0];
  return <ZoomParallax src={first?.src ?? ""} alt={first?.alt} />;
}
