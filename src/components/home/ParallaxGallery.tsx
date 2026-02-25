"use client";

import {
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  motion,
  useMotionValue,
} from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useRef, useState } from "react";
import Image from "next/image";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GalleryPhoto {
  src: string;
  alt: string;
  /** Données télémétrie affichées en overlay */
  telemetry?: {
    lat?: string;
    speed?: string;
    rpm?: string;
    label?: string;
  };
  /** Légende affichée au hover */
  caption?: string;
  /** Couleur de la bordure glow : "yellow" | "red" (défaut : alterner) */
  glow?: "yellow" | "red";
}

interface ParallaxGalleryProps {
  photos?: GalleryPhoto[];
  title?: string;
}

// ---------------------------------------------------------------------------
// Données placeholder (karting compétition) – remplacées par Strapi
// ---------------------------------------------------------------------------

const PLACEHOLDER_PHOTOS: GalleryPhoto[] = [
  {
    src: "/images home/kartrace.png",
    alt: "Kart en course",
    caption: "En piste — Team Foti",
  },
  {
    src: "/images home/kartrace2.png",
    alt: "Course karting",
    caption: "Karting compétition",
  },
  {
    src: "/images home/groupefoti.png",
    alt: "Le groupe Team Foti",
    caption: "Team Foti",
  },
  {
    src: "/images home/hyzax.png",
    alt: "Hyzax karting",
    caption: "Hyzax — Partenaire",
  },
  {
    src: "/images home/hyzax2.png",
    alt: "Hyzax en action",
    caption: "Hyzax Racing",
  },
];

// ---------------------------------------------------------------------------
// Sous-composant : carte photo avec tilt 3D
// ---------------------------------------------------------------------------

function PhotoCard({
  photo,
  index,
  x,
  blurAmount,
}: {
  photo: GalleryPhoto;
  index: number;
  x: ReturnType<typeof useMotionValue<number>>;
  blurAmount: ReturnType<typeof useSpring>;
}) {
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ rotateX: -dy * 8, rotateY: dx * 8 });
  }

  function onMouseLeave() {
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
  }

  const blurFilter = useTransform(blurAmount, (v) => {
    const abs = Math.abs(v);
    return abs > 80 ? `blur(${Math.min((abs - 80) / 40, 4)}px)` : "blur(0px)";
  });

  return (
    <motion.div
      ref={cardRef}
      style={{ x, filter: blurFilter }}
      className="relative shrink-0 w-[min(72vw,400px)] sm:w-[340px] md:w-[400px] lg:w-[440px] will-change-transform"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
    >
      {/* Carte avec tilt 3D */}
      <motion.div
        animate={tilt}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
        className="rounded-lg overflow-hidden"
      >
        {/* Image */}
        <div className="relative aspect-[3/2] bg-carbon-800 overflow-hidden rounded-lg">
          <img
            src={photo.src}
            alt={photo.alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
            loading="lazy"
            decoding="async"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          {/* Légende hover */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-0 left-0 right-0 px-4 py-3 z-20 pointer-events-none"
          >
            <p className="font-sans text-sm font-medium text-white drop-shadow">
              {photo.caption ?? photo.alt}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export function ParallaxGallery({ photos = PLACEHOLDER_PHOTOS, title }: ParallaxGalleryProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Vitesse de scroll pour le motion blur
  const scrollVelocity = useVelocity(scrollYProgress);
  const blurAmount = useSpring(scrollVelocity, { stiffness: 80, damping: 20 });

  // Chaque photo a une vitesse de déplacement X différente (effet parallax)
  const speeds = [-280, -180, 0, 180, 280];
  const xValues = speeds.map((speed) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTransform(scrollYProgress, [0, 1], [-speed / 2, speed / 2])
  );

  // Mobile : scroll horizontal natif (désactivé sur desktop)
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      {/* Header */}
      {title && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="GALLERY" title={title} />
        </div>
      )}

      {/* ---- DESKTOP : parallax horizontal au scroll ---- */}
      <div className="hidden md:flex items-center justify-center gap-5 h-[320px] lg:h-[360px] relative">
        {photos.map((photo, i) => (
          <PhotoCard
            key={i}
            photo={photo}
            index={i}
            x={xValues[i % xValues.length]}
            blurAmount={blurAmount}
          />
        ))}
      </div>

      {/* ---- MOBILE : stack vertical ---- */}
      <div
        ref={trackRef}
        className="md:hidden flex flex-col gap-5 px-4"
      >
        {photos.map((photo, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden">
            <div className="relative aspect-[3/2] bg-carbon-800">
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                <p className="font-sans text-sm font-medium text-white">{photo.caption ?? photo.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient masques latéraux desktop */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
