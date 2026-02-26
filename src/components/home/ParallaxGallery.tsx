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
  telemetry?: {
    lat?: string;
    speed?: string;
    rpm?: string;
    label?: string;
  };
  caption?: string;
  glow?: "yellow" | "red";
}

interface ParallaxGalleryProps {
  photos?: GalleryPhoto[];
  title?: string;
}

// ---------------------------------------------------------------------------
// Données placeholder
// ---------------------------------------------------------------------------

const PLACEHOLDER_PHOTOS: GalleryPhoto[] = [
  {
    src: "/Photos%20/resultats-podiums/21_OPENKART_Salbris_22022026-_T5A4369.jpg",
    alt: "Open Kart Salbris 2026 — Team Foti en course",
    caption: "Open Kart Salbris — Fév. 2026",
    glow: "yellow",
    telemetry: { label: "OPEN KART · SALBRIS", speed: "105", rpm: "14.800" },
  },
  {
    src: "/Photos%20/Pilotes/Salbris%20Hugo.jpg",
    alt: "Pilote Hugo en course à Salbris",
    caption: "En course — Salbris",
    glow: "red",
    telemetry: { label: "KZ2 · SALBRIS", speed: "112", rpm: "15.200" },
  },
  {
    src: "/Photos%20/resultats-podiums/Podium%20Champ%20france.jpg",
    alt: "Podium Championnat de France — Team Foti",
    caption: "Podium — Champ. de France",
    glow: "yellow",
    telemetry: { label: "CHAMP. FRANCE · PODIUM" },
  },
  {
    src: "/Photos%20/Pilotes/Hugo%20Cesare%20Varennes%20-%20Copie.jpg",
    alt: "Hugo et Cesare au Circuit de Varennes",
    caption: "Circuit de Varennes",
    glow: "red",
  },
  {
    src: "/Photos%20/Pilotes/Salbris%202.jpg",
    alt: "Bataille en piste à Salbris — karting compétition",
    caption: "Salbris — Bataille en piste",
    glow: "yellow",
    telemetry: { label: "ROTAX MAX · SALBRIS" },
  },
  {
    src: "/Photos%20/Pilotes/Clement%20Salbris%20-%20Copie.jpg",
    alt: "Clément en course à Salbris",
    caption: "Clément — Salbris",
    glow: "red",
  },
  {
    src: "/Photos%20/resultats-podiums/Podium%20KArt%20MAg%20pers.jpeg",
    alt: "Podium Kart Mag — Team Foti",
    caption: "Podium — Kart Mag",
    glow: "yellow",
    telemetry: { label: "KART MAG · PODIUM" },
  },
];

const SPEEDS = [-100, -60, 0, 60, 100];

// ---------------------------------------------------------------------------
// PhotoCard — tilt 3D au hover
// ---------------------------------------------------------------------------

function PhotoCard({
  photo,
  x,
  blurAmount,
}: {
  photo: GalleryPhoto;
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
      onMouseLeave={() => { setTilt({ rotateX: 0, rotateY: 0 }); setHovered(false); }}
    >
      <motion.div
        animate={tilt}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ perspective: 800, transformStyle: "preserve-3d" }}
        className="rounded-lg overflow-hidden"
      >
        <div className="relative aspect-[3/2] bg-carbon-800 overflow-hidden rounded-lg">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
            sizes="(max-width: 640px) 72vw, (max-width: 768px) 340px, (max-width: 1024px) 400px, 440px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
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
// ParallaxItem — un seul useTransform par composant (corrige la violation hooks)
// ---------------------------------------------------------------------------

function ParallaxItem({
  photo,
  speed,
  scrollYProgress,
  blurAmount,
}: {
  photo: GalleryPhoto;
  speed: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  blurAmount: ReturnType<typeof useSpring>;
}) {
  const rawX = useTransform(scrollYProgress, [0, 1], [-speed / 2, speed / 2]);
  const x = useSpring(rawX, { stiffness: 80, damping: 25 });
  return <PhotoCard photo={photo} x={x} blurAmount={blurAmount} />;
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

  const scrollVelocity = useVelocity(scrollYProgress);
  const blurAmount = useSpring(scrollVelocity, { stiffness: 80, damping: 20 });

  return (
    <section ref={sectionRef} className="relative py-16 md:py-20 overflow-hidden">
      {title && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader eyebrow="GALLERY" title={title} />
        </div>
      )}

      {/* DESKTOP : parallax */}
      <div className="hidden md:flex items-center justify-center gap-5 h-[320px] lg:h-[360px] relative">
        {photos.map((photo, i) => (
          <ParallaxItem
            key={i}
            photo={photo}
            speed={SPEEDS[i % SPEEDS.length]}
            scrollYProgress={scrollYProgress}
            blurAmount={blurAmount}
          />
        ))}
      </div>

      {/* MOBILE : stack vertical */}
      <div className="md:hidden flex flex-col gap-5 px-4">
        {photos.map((photo, i) => (
          <div key={i} className="relative rounded-lg overflow-hidden">
            <div className="relative aspect-[3/2] bg-carbon-800">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) calc(100vw - 2rem)"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                <p className="font-sans text-sm font-medium text-white">{photo.caption ?? photo.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gradients masques latéraux desktop */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
    </section>
  );
}
