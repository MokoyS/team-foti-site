# Horizontal Scroll Gallery Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace `ParallaxGallery` with a scroll-jacked horizontal gallery — when the section is on screen, scrolling Y drives translateX across masonry-style cards; vertical scroll resumes after.

**Architecture:** Sticky container + Framer Motion `useScroll` → `useTransform` → `useSpring`. Section height = `700vh` to "consume" enough vertical scroll. Each card has independent Y/rotate parallax via its own `useTransform`. Mobile fallback: staggered vertical stack with `whileInView`.

**Tech Stack:** Next.js 15 App Router, Framer Motion v12, Tailwind CSS, TypeScript

---

## Task 1: Replace `ParallaxGallery.tsx` with the horizontal scroll version

**Files:**
- Modify: `src/components/home/ParallaxGallery.tsx` (full rewrite)

---

### Step 1: Read the current file (required before editing)

Open and read `src/components/home/ParallaxGallery.tsx` in full.

---

### Step 2: Write the new component

Replace the entire file content with:

```tsx
"use client";

import {
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  motion,
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

const GAP = 28;          // px between cards
const SIDE_PAD = 100;    // px padding left/right of rail
const SECTION_VH = 700;  // vh height of the scroll-jacking section

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
  const cardsWidth = photos.reduce((acc, p, i) => {
    const aspect = p.aspect ?? DEFAULT_ASPECTS[i % DEFAULT_ASPECTS.length];
    return acc + DIMS[aspect].w + GAP;
  }, 0) - GAP; // remove trailing gap
  return cardsWidth + SIDE_PAD * 2;
}

// ---------------------------------------------------------------------------
// HCard — individual card with Y/rotate parallax
// ---------------------------------------------------------------------------

function HCard({
  photo,
  index,
  scrollYProgress,
}: {
  photo: GalleryPhoto;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const aspect = photo.aspect ?? DEFAULT_ASPECTS[index % DEFAULT_ASPECTS.length];
  const { w, h } = DIMS[aspect];
  const dir = index % 2 === 0 ? 1 : -1;

  // Y: alternating cards drift in opposite directions as rail scrolls
  const rawY = useTransform(scrollYProgress, [0, 1], [dir * -45, dir * 45]);
  const y = useSpring(rawY, { stiffness: 70, damping: 28 });

  // Subtle Z-rotation oscillation
  const rawRotate = useTransform(scrollYProgress, [0, 0.5, 1], [dir * -2, 0, dir * 2]);
  const rotate = useSpring(rawRotate, { stiffness: 55, damping: 22 });

  const glowShadow =
    photo.glow === "yellow"
      ? "0 0 36px -4px rgba(255,215,0,0.28)"
      : "0 0 36px -4px rgba(255,0,0,0.22)";

  return (
    <motion.div
      style={{ y, rotate, width: w, height: h, boxShadow: glowShadow }}
      className="relative shrink-0 rounded-xl overflow-hidden will-change-transform cursor-pointer"
      whileHover={{ scale: 1.04, transition: { type: "spring", stiffness: 320, damping: 22 } }}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        className="object-cover transition-transform duration-700 hover:scale-105"
        sizes={`${w}px`}
      />
      {/* Dark vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15 pointer-events-none" />

      {/* Caption — slides up on hover */}
      {photo.caption && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="absolute bottom-0 left-0 right-0 px-4 py-3 z-10 pointer-events-none"
        >
          <p className="font-sans text-sm font-semibold text-white drop-shadow-md">
            {photo.caption}
          </p>
        </motion.div>
      )}

      {/* Corner accent line */}
      <div
        className="absolute top-3 left-3 w-6 h-6 pointer-events-none"
        style={{
          borderTop: `2px solid ${photo.glow === "yellow" ? "#FFD700" : "#FF0000"}`,
          borderLeft: `2px solid ${photo.glow === "yellow" ? "#FFD700" : "#FF0000"}`,
          opacity: 0.7,
        }}
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

  // Viewport width — read client-side after mount
  const [vw, setVw] = useState(1440);
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

  // X translation: rail starts at x=0 (left pad only), ends fully scrolled
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalWidth - vw)]
  );
  const x = useSpring(rawX, { stiffness: 90, damping: 30, restDelta: 0.001 });

  // Motion blur on fast scroll
  const scrollVel = useVelocity(scrollYProgress);
  const blurSpring = useSpring(scrollVel, { stiffness: 80, damping: 20 });
  const blurFilter = useTransform(blurSpring, (v) => {
    const abs = Math.abs(v);
    return abs > 0.25 ? `blur(${Math.min((abs - 0.25) * 10, 5)}px)` : "none";
  });

  // Progress bar width
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Faded entry — title fades out gently as gallery scrolls in
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3]);

  return (
    <>
      {/* ── DESKTOP: scroll-jacked horizontal ─────────────────────────── */}
      <div
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: `${SECTION_VH}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
          {/* Section title */}
          {title && (
            <motion.div
              style={{ opacity: titleOpacity }}
              className="max-w-7xl mx-auto px-6 w-full pt-12 shrink-0 z-10"
            >
              <SectionHeader eyebrow="GALLERY" title={title} />
            </motion.div>
          )}

          {/* Horizontal rail */}
          <div className="flex-1 relative overflow-hidden">
            <motion.div
              style={{ x, filter: blurFilter }}
              className="absolute top-0 bottom-0 left-0 flex items-center gap-7"
              style={{ x, filter: blurFilter, paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
            >
              {photos.map((photo, i) => (
                <HCard
                  key={i}
                  photo={photo}
                  index={i}
                  scrollYProgress={scrollYProgress}
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
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06, type: "spring", stiffness: 200, damping: 26 }}
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
```

**Note — TypeScript issue to fix:** The `motion.div` for the rail has a duplicate `style` prop (declared twice). Fix by merging into one:

```tsx
<motion.div
  style={{ x, filter: blurFilter, paddingLeft: SIDE_PAD, paddingRight: SIDE_PAD }}
  className="absolute top-0 bottom-0 left-0 flex items-center gap-7"
>
```

Also remove the `className="flex items-center gap-7"` inline gap since padding is on style — keep the gap in `className`.

---

### Step 3: Verify the TypeScript builds

```bash
cd /Users/maximelebas/Documents/MELIOZ/Hyzax/team-foti-site && npx tsc --noEmit
```

Expected: no errors. If there are type errors fix them before continuing.

Common issue: `useSpring` receiving a `MotionValue<string>` when the type expects number. The `blurFilter` transform uses a string output — wrap the `motion.div filter` in a regular `style` object, not as a typed motion value directly (it's a `MotionValue<string>` which Framer accepts as a style value).

---

### Step 4: Start dev server and test visually

```bash
cd /Users/maximelebas/Documents/MELIOZ/Hyzax/team-foti-site && npm run dev
```

Navigate to `http://localhost:3000` and:
1. Scroll past the Hero and "About" sections
2. Reach the Gallery section — it should now occupy a sticky full-height viewport
3. Continue scrolling — the photos should sweep horizontally from right to left
4. After the last photo passes, vertical scroll should resume normally
5. Check the yellow progress bar at the bottom
6. Resize to mobile width — vertical stacked layout should appear

---

### Step 5: Tune if needed

If the scroll feels too fast or too slow, adjust `SECTION_VH` in the constants:
- Too fast → increase `SECTION_VH` (e.g., 800)
- Too slow → decrease (e.g., 500)

If cards don't align vertically (cut off), check that the sticky container height calculation is correct and that `overflow-hidden` is on the right parent.

---

### Step 6: Commit

```bash
cd /Users/maximelebas/Documents/MELIOZ/Hyzax/team-foti-site
git add src/components/home/ParallaxGallery.tsx docs/plans/
git commit -m "feat(gallery): horizontal scroll-jacked gallery with parallax

Replaces ParallaxGallery with sticky scroll-jacking:
- Framer Motion scrollYProgress → translateX on horizontal rail
- Masonry card sizes: portrait/landscape/square alternating
- Per-card Y/rotate parallax via useTransform
- Motion blur on fast scroll via useVelocity
- Racing yellow progress bar
- Mobile: staggered whileInView vertical stack"
```

---

## Tuning Reference

| Constant      | Default | Effect                                         |
|---------------|---------|------------------------------------------------|
| `SECTION_VH`  | 700     | Total vertical scroll budget for the gallery   |
| `GAP`         | 28      | Horizontal gap between cards (px)              |
| `SIDE_PAD`    | 100     | Left/right padding of the rail (px)            |
| `DIMS`        | ...     | Card width/height per aspect ratio             |
| stiffness/damping | 90/30 | Smoothness of horizontal movement (spring)  |
