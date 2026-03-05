"use client";

import {
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useReducedMotion,
  motion,
  MotionValue,
} from "framer-motion";
import { useRef, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
  aspect?: "portrait" | "landscape" | "square";
  glow?: "yellow" | "red";
}

// ---------------------------------------------------------------------------
// Layout constants
// ---------------------------------------------------------------------------

const DIMS = {
  portrait:  { w: 280, h: 420 },
  landscape: { w: 460, h: 310 },
  square:    { w: 340, h: 340 },
} as const;

const DEFAULT_ASPECTS: Array<keyof typeof DIMS> = [
  "portrait", "landscape", "square",
  "portrait", "landscape", "square",
  "portrait",
];

const GAP = 28;
const SIDE_PAD = 100;
const SECTION_VH = 400;

// ---------------------------------------------------------------------------
// Placeholder photos
// ---------------------------------------------------------------------------

const PLACEHOLDER_PHOTOS: GalleryPhoto[] = [
  {
    src: "/Photos%20/resultats-podiums/21_OPENKART_Salbris_22022026-_T5A4369.jpg",
    alt: "Open Kart Salbris 2026 — Team Foti en course",
    caption: "Open Kart Salbris — Fév. 2026",
    glow: "yellow",
  },
  {
    src: "/Photos%20/Pilotes/Salbris%20Hugo.jpg",
    alt: "Pilote Hugo en course à Salbris",
    caption: "En course — Salbris",
    glow: "red",
  },
  {
    src: "/Photos%20/resultats-podiums/Podium%20Champ%20france.jpg",
    alt: "Podium Championnat de France — Team Foti",
    caption: "Podium — Champ. de France",
    glow: "yellow",
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
  },
];

// ---------------------------------------------------------------------------
// Utility: compute total rail width in px
// ---------------------------------------------------------------------------

function computeTotalWidth(photos: GalleryPhoto[]): number {
  if (photos.length === 0) return 0;
  const cardsWidth = photos.reduce((acc, p, i) => {
    const aspect = p.aspect ?? DEFAULT_ASPECTS[i % DEFAULT_ASPECTS.length];
    return acc + DIMS[aspect].w + GAP;
  }, 0) - GAP; // remove trailing gap
  return cardsWidth + SIDE_PAD * 2;
}

// ---------------------------------------------------------------------------
// HCard — individual card with Y/rotate parallax
// NOTE: each HCard creates 4 MotionValues. Fine for ≤10 cards; profile before scaling.
// ---------------------------------------------------------------------------

function HCard({
  photo,
  index,
  scrollYProgress,
  reduceMotion,
}: {
  photo: GalleryPhoto;
  index: number;
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
}) {
  const aspect = photo.aspect ?? DEFAULT_ASPECTS[index % DEFAULT_ASPECTS.length];
  const { w, h } = DIMS[aspect];
  const dir = index % 2 === 0 ? 1 : -1;

  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [dir * -45, dir * 45]
  );
  const y = useSpring(rawY, { stiffness: 70, damping: 28 });

  const rawRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [0, 0, 0] : [dir * -2, 0, dir * 2]
  );
  const rotate = useSpring(rawRotate, { stiffness: 55, damping: 22 });

  const accentColor = photo.glow === "yellow" ? "#FFD700" : "#FF0000";
  const glowShadow =
    photo.glow === "yellow"
      ? "0 0 36px -4px rgba(255,215,0,0.28)"
      : "0 0 36px -4px rgba(255,0,0,0.22)";

  return (
    <motion.div
      style={{ y, rotate, width: w, height: h, boxShadow: glowShadow }}
      className="relative shrink-0 rounded-xl overflow-hidden will-change-transform"
      whileHover={reduceMotion ? undefined : { scale: 1.04, transition: { type: "spring", stiffness: 320, damping: 22 } }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover"
        sizes={`${w}px`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />

      {/* Caption — slides up on hover */}
      {photo.caption && (
        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
          whileHover={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10 pointer-events-none"
        >
          <p className="font-sans text-sm font-semibold text-white drop-shadow-md">
            {photo.caption}
          </p>
        </motion.div>
      )}

      {/* Corner accent lines — top-left and bottom-right */}
      <div
        className="absolute top-3 left-3 w-6 h-6 pointer-events-none"
        style={{ borderTop: `2px solid ${accentColor}`, borderLeft: `2px solid ${accentColor}`, opacity: 0.7 }}
      />
      <div
        className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none"
        style={{ borderBottom: `2px solid ${accentColor}`, borderRight: `2px solid ${accentColor}`, opacity: 0.7 }}
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// ParallaxGallery — main export (API unchanged)
// ---------------------------------------------------------------------------

export function ParallaxGallery({
  photos = PLACEHOLDER_PHOTOS,
  title,
}: {
  photos?: GalleryPhoto[];
  title?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion() ?? false;

  // Init to 0; gallery won't scroll until viewport is measured — avoids layout shift
  const [vw, setVw] = useState(0);
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const totalWidth = useMemo(() => computeTotalWidth(photos), [photos]);

  // Clamp to 0: if content is narrower than viewport, don't scroll backward
  const translateEnd = vw === 0 || shouldReduce ? 0 : Math.min(0, -(totalWidth - vw));

  const rawX = useTransform(scrollYProgress, [0, 1], [0, translateEnd]);
  const x = useSpring(rawX, { stiffness: 90, damping: 30, restDelta: 0.001 });

  const scrollVel = useVelocity(scrollYProgress);
  const blurSpring = useSpring(scrollVel, { stiffness: 80, damping: 20 });
  const blurFilter: MotionValue<string> = useTransform(blurSpring, (v) => {
    if (shouldReduce) return "none";
    const abs = Math.abs(v);
    return abs > 0.25 ? `blur(${Math.min((abs - 0.25) * 10, 5)}px)` : "none";
  });

  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3]);

  if (photos.length === 0) return null;

  return (
    <>
      {/* ── DESKTOP: scroll-jacked horizontal ─────────────────────────── */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${SECTION_VH}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          {title && (
            <motion.div
              style={{ opacity: titleOpacity }}
              className="max-w-7xl mx-auto px-6 w-full pt-12 shrink-0 z-10"
            >
              <SectionHeader eyebrow="GALLERY" title={title} />
            </motion.div>
          )}

          <div className="flex-1 relative overflow-hidden">
            <motion.div
              style={{ x, filter: blurFilter, paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD, gap: GAP }}
              className="absolute top-0 bottom-0 left-0 flex items-center"
            >
              {photos.map((photo, i) => (
                <HCard
                  key={photo.src}
                  photo={photo}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  reduceMotion={shouldReduce}
                />
              ))}
            </motion.div>
          </div>

          {/* Racing progress bar */}
          <div className="shrink-0 px-12 pb-8 z-10">
            <div className="relative h-px bg-white/10 overflow-hidden rounded-full">
              <motion.div
                style={{ scaleX: progressScaleX, originX: 0 }}
                className="absolute inset-0 bg-accent-yellow rounded-full"
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/20">
                En piste
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/20">
                {photos.length} photos
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: staggered vertical ────────────────────────────────── */}
      <div className="md:hidden py-10 px-4">
        {title && (
          <div className="mb-6">
            <SectionHeader eyebrow="GALLERY" title={title} />
          </div>
        )}
        <div className="flex flex-col gap-5">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: shouldReduce ? 0 : i * 0.06, type: "spring", stiffness: 200, damping: 26 }}
              className="relative rounded-xl overflow-hidden aspect-[3/2]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="calc(100vw - 2rem)"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
              {photo.caption && (
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                  <p className="font-sans text-sm font-semibold text-white">{photo.caption}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
