# Pixel Perfect — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Corriger le glitch ScrollReveal, lisser le parallax, et créer la page `/galerie` avec BentoGrid + zoom in-place.

**Architecture:** Corrections chirurgicales sur 2 composants existants + création de 2 nouveaux fichiers (`src/app/galerie/page.tsx` et `src/components/home/GaleriePageContent.tsx`). Aucune dépendance externe ajoutée — Framer Motion `layoutId` pour le zoom.

**Tech Stack:** Next.js 15 App Router, Framer Motion, Tailwind CSS, next/image

> ⚠️ Pas de test suite configuré sur ce projet. La vérification se fait par `npm run build` (lint + build) et inspection visuelle en dev.

---

## Task 1 : Fix ScrollReveal — supprimer le glitch de fin

**Files:**
- Modify: `src/components/ui/ScrollReveal.tsx`

**Step 1 : Lire le fichier actuel**

```
src/components/ui/ScrollReveal.tsx
```

Constater : `stiffness: 100, damping: 20` → ratio damping/stiffness faible = overshoot.
`filter: blur(8px)` sur initial/whileInView = artefacts GPU potentiels.

**Step 2 : Appliquer la correction**

Remplacer le contenu complet par :

```tsx
"use client";

import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const y = direction === "up" ? 24 : -24;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 28,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Changements clés :
- `stiffness: 100 → 80` + `damping: 20 → 28` : ratio ~0.35, plus amorti, sans overshoot
- Suppression de `filter: blur()` : plus robuste cross-browser

**Step 3 : Vérifier le build**

```bash
npm run build
```

Attendu : ✓ Compiled successfully, 0 erreurs.

**Step 4 : Commit**

```bash
git add src/components/ui/ScrollReveal.tsx
git commit -m "fix(animation): increase spring damping in ScrollReveal to remove end-glitch"
```

---

## Task 2 : Fix ParallaxGallery — lisser le mouvement

**Files:**
- Modify: `src/components/home/ParallaxGallery.tsx`

**Step 1 : Identifier les deux problèmes**

Dans `ParallaxGallery.tsx` :
1. `const SPEEDS = [-280, -180, 0, 180, 280]` ligne ~91 → valeurs trop grandes, cartes hors écran
2. Dans `ParallaxItem`, `x` est un `useTransform` direct → aucun amortissement → mouvements brusques

**Step 2 : Appliquer les corrections**

**Correction A** — Réduire les vitesses (ligne ~91) :

```tsx
const SPEEDS = [-100, -60, 0, 60, 100];
```

**Correction B** — Ajouter `useSpring` dans `ParallaxItem` :

Remplacer la fonction `ParallaxItem` entière :

```tsx
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
```

`useSpring` est déjà importé en haut du fichier — pas de nouvel import nécessaire.

**Step 3 : Vérifier le build**

```bash
npm run build
```

Attendu : ✓ Compiled successfully.

**Step 4 : Commit**

```bash
git add src/components/home/ParallaxGallery.tsx
git commit -m "fix(animation): reduce parallax speeds and add useSpring smoothing"
```

---

## Task 3 : Bouton galerie sur la Home Page

**Files:**
- Modify: `src/app/page.tsx`

**Step 1 : Localiser le bloc ParallaxGallery**

Dans `src/app/page.tsx`, trouver :
```tsx
{/* Galerie parallax */}
<ParallaxGallery title="En piste" />
```

**Step 2 : Ajouter le bouton en dessous**

Remplacer ce bloc par :

```tsx
{/* Galerie parallax */}
<ParallaxGallery title="En piste" />
<div className="mt-2 mb-10 text-center">
  <RacingButton href="/galerie" variant="yellow" arrow>
    ACCÉDER À LA GALERIE
  </RacingButton>
</div>
```

`RacingButton` est déjà importé dans `page.tsx` — pas de nouvel import.

**Step 3 : Vérifier le build**

```bash
npm run build
```

Attendu : ✓ Compiled successfully.

**Step 4 : Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(home): add gallery CTA button below parallax section"
```

---

## Task 4 : Créer GaleriePageContent

**Files:**
- Create: `src/components/home/GaleriePageContent.tsx`

**Step 1 : Créer le composant**

```tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BentoGrid, BentoCell } from "@/components/ui/BentoGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";

// ---------------------------------------------------------------------------
// Photos
// ---------------------------------------------------------------------------

const PHOTOS = [
  // Résultats / podiums (en avant)
  { src: "/Photos%20/resultats-podiums/21_OPENKART_Salbris_22022026-_T5A4369.jpg", alt: "Open Kart Salbris 2026", caption: "Open Kart · Salbris 2026" },
  { src: "/Photos%20/resultats-podiums/Podium%20Champ%20france.jpg", alt: "Podium Championnat de France", caption: "Podium — Champ. de France" },
  { src: "/Photos%20/resultats-podiums/podium%20Champ%C3%A0onnat%20de%20France.jpeg", alt: "Podium Championnat de France", caption: "Championnat de France" },
  { src: "/Photos%20/resultats-podiums/Podium%20KArt%20MAg%20pers.jpeg", alt: "Podium Kart Mag", caption: "Podium — Kart Mag" },
  // Pilotes
  { src: "/Photos%20/Pilotes/Salbris%20Hugo.jpg", alt: "Hugo — Salbris", caption: "Hugo · Salbris" },
  { src: "/Photos%20/Pilotes/Hugo%20Cesare%20Varennes%20-%20Copie.jpg", alt: "Hugo et Cesare — Varennes", caption: "Hugo & Cesare · Varennes" },
  { src: "/Photos%20/Pilotes/Salbris%202.jpg", alt: "Salbris — en course", caption: "En course · Salbris" },
  { src: "/Photos%20/Pilotes/Salbris%203.jpg", alt: "Salbris — bataille", caption: "Bataille · Salbris" },
  { src: "/Photos%20/Pilotes/Clement%20Salbris%20-%20Copie.jpg", alt: "Clément — Salbris", caption: "Clément · Salbris" },
  { src: "/Photos%20/Pilotes/Clement%20Salbris%202%20-%20Copie.jpg", alt: "Clément — Salbris 2", caption: "Clément · Salbris" },
  { src: "/Photos%20/Pilotes/Alexis%20Salbris%20-%20Copie.jpg", alt: "Alexis — Salbris", caption: "Alexis · Salbris" },
  { src: "/Photos%20/Pilotes/Alexis%20Varennes%20-%20Copie.jpg", alt: "Alexis — Varennes", caption: "Alexis · Varennes" },
  { src: "/Photos%20/Pilotes/Antho%20Salbris%20-%20Copie.jpg", alt: "Anthony — Salbris", caption: "Anthony · Salbris" },
  { src: "/Photos%20/Pilotes/Antho%20Varennes%20-%20Copie.jpg", alt: "Anthony — Varennes", caption: "Anthony · Varennes" },
  { src: "/Photos%20/Pilotes/Noa%20varennes%20-%20Copie.jpg", alt: "Noa — Varennes", caption: "Noa · Varennes" },
  { src: "/Photos%20/Pilotes/Jade%20salbris%20-%20Copie.jpg", alt: "Jade — Salbris", caption: "Jade · Salbris" },
  { src: "/Photos%20/Pilotes/Valentin.jpg", alt: "Valentin", caption: "Valentin" },
  { src: "/Photos%20/Pilotes/Alexandre%20Varennes%20-%20Copie.jpg", alt: "Alexandre — Varennes", caption: "Alexandre · Varennes" },
];

// ---------------------------------------------------------------------------
// Lightbox overlay (zoom in-place via layoutId)
// ---------------------------------------------------------------------------

function Lightbox({
  photo,
  onClose,
}: {
  photo: (typeof PHOTOS)[0];
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          layoutId={`gallery-photo-${photo.src}`}
          className="relative w-[min(90vw,900px)] aspect-[3/2] rounded-xl overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            className="object-cover"
            sizes="min(90vw, 900px)"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="font-sans text-base font-medium text-white">{photo.caption}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// PhotoTile
// ---------------------------------------------------------------------------

function PhotoTile({
  photo,
  colSpan,
  rowSpan,
  onSelect,
}: {
  photo: (typeof PHOTOS)[0];
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  onSelect: () => void;
}) {
  return (
    <BentoCell colSpan={colSpan} rowSpan={rowSpan} className="p-0 overflow-hidden cursor-pointer group">
      <motion.div
        layoutId={`gallery-photo-${photo.src}`}
        className="relative w-full h-full min-h-[200px]"
        onClick={onSelect}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            colSpan === 2
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <p className="font-sans text-sm font-medium text-white drop-shadow">{photo.caption}</p>
        </div>
      </motion.div>
    </BentoCell>
  );
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export function GaleriePageContent() {
  const [selected, setSelected] = useState<(typeof PHOTOS)[0] | null>(null);

  // Bento pattern : grande (2×2), puis 2 normales, puis grille uniforme
  const hero = PHOTOS[0];
  const featured = PHOTOS.slice(1, 3);
  const rest = PHOTOS.slice(3);

  return (
    <main className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="GALERIE" title="En piste avec la Team Foti" />

        <BentoGrid className="mt-10 auto-rows-[220px]">
          {/* Hero photo — grande */}
          <PhotoTile photo={hero} colSpan={2} rowSpan={2} onSelect={() => setSelected(hero)} />

          {/* 2 photos moyennes */}
          {featured.map((photo) => (
            <PhotoTile key={photo.src} photo={photo} onSelect={() => setSelected(photo)} />
          ))}

          {/* Reste — grille uniforme */}
          {rest.map((photo) => (
            <PhotoTile key={photo.src} photo={photo} onSelect={() => setSelected(photo)} />
          ))}
        </BentoGrid>
      </div>

      {/* Lightbox */}
      {selected && <Lightbox photo={selected} onClose={() => setSelected(null)} />}
    </main>
  );
}
```

**Step 2 : Vérifier le build**

```bash
npm run build
```

Attendu : ✓ Compiled successfully.

---

## Task 5 : Créer la route /galerie/page.tsx

**Files:**
- Create: `src/app/galerie/page.tsx`

**Step 1 : Créer le fichier**

```tsx
import type { Metadata } from "next";
import { GaleriePageContent } from "@/components/home/GaleriePageContent";

export const metadata: Metadata = {
  title: "Galerie | Team Foti",
  description:
    "Photos de la Team Foti en compétition — karting KZ2, OK-Junior, Rotax. Podiums, pilotes et moments de course.",
};

export default function GaleriePage() {
  return <GaleriePageContent />;
}
```

**Step 2 : Vérifier le build complet**

```bash
npm run build
```

Attendu : ✓ Compiled successfully, route `/galerie` apparaît dans la liste.

**Step 3 : Vérifier visuellement en dev**

```bash
npm run dev
```

Checklist :
- [ ] `/` → bouton "ACCÉDER À LA GALERIE" visible sous la galerie parallax
- [ ] Clic bouton → navigation vers `/galerie`
- [ ] `/galerie` → grille Bento avec photo hero grande (2×2)
- [ ] Hover sur une photo → overlay caption apparaît
- [ ] Clic photo → zoom animé vers overlay fullscreen
- [ ] Clic fond ou ✕ → fermeture
- [ ] Touche Escape → fermeture
- [ ] `/` → ScrollReveal des cartes sans saut à la fin
- [ ] `/` → Parallax galerie fluide sans saccade

**Step 4 : Commit final**

```bash
git add src/app/galerie/page.tsx src/components/home/GaleriePageContent.tsx
git commit -m "feat(galerie): add /galerie page with BentoGrid and zoom in-place lightbox"
```
