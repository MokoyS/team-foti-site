# Production Ready Audit — SEO, Design, Code, Identité Karting

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rendre le site Team Foti production-ready 2026 : SEO complet sur toutes les pages, images optimisées, correction de violations hooks, cohérence animations Framer Motion, design racing pro sur la page compétition, et traductions manquantes.

**Architecture:** Next.js 15 App Router — les pages sont des Server Components qui exportent `metadata` / `generateMetadata`. Les composants UI (`RevealSection`, `SectionHeader`, `RacingButton`, `RacingSeparator`) sont déjà dans `/components/ui/` et doivent être appliqués partout de façon cohérente. Les animations Framer Motion doivent toutes utiliser `type: "spring"` pour une sensation de vitesse homogène.

**Tech Stack:** Next.js 15, Tailwind CSS, Framer Motion, Zustand, TypeScript strict.

---

## Contexte codebase (à lire avant de commencer)

- **Données** : `src/lib/data/get-data.ts` est le seul point d'entrée pour les données (produits, articles, palmarès). Ne jamais appeler `strapi.ts` directement.
- **i18n** : `src/lib/i18n/translations.ts` contient les objets `fr` et `en`. La fonction `t("section.key")` vient du hook `useLocale()` dans `src/contexts/LocaleContext.tsx`. Toute nouvelle clé doit être ajoutée aux deux langues.
- **Composants UI** : `src/components/ui/` — utiliser `SectionHeader`, `RevealSection`, `RacingButton`, `RacingSeparator` pour la cohérence visuelle.
- **Couleurs** : `accent-yellow` = `#FFD700`, `accent-red` = `#FF0000`, `background` = `#0a0a0a`, `carbon-800/700/600/500` définis en CSS var.
- **Polices** : `font-heading` = Play (bold italic pour titres), `font-sans` = Poppins (corps), `font-mono` = Geist Mono (labels techniques/data).
- **Images locales** : dans `public/Photos /` (espace dans le nom) — référencer comme `/Photos%20/...`. Les images distantes (Strapi, Cloudinary) sont gérées dans `next.config.mjs`.

---

## Bloc 1 — SEO

### Task 1 : Metadata page d'accueil

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Ajouter l'export `metadata`**

Dans `src/app/page.tsx`, ajouter cet export **avant** `export const dynamic`:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Foti | L'excellence du karting depuis 1978",
  description:
    "Écurie familiale fondée par Sébastien Foti. Champion d'Europe KZ2 et OK-Junior. Boutique karts, moteurs préparés, châssis Monster K. Loriol-sur-Drôme.",
  openGraph: {
    title: "Team Foti | Karting d'excellence depuis 1978",
    description:
      "Préparateur de champions. Boutique karts et pièces. De la compétition internationale à votre garage.",
    url: "https://teamfoti.com",
    siteName: "Team Foti",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Foti | Karting d'excellence",
    description: "Champion d'Europe. Boutique karts et pièces. Loriol-sur-Drôme.",
  },
};
```

**Step 2: Vérifier visuellement**

Lancer `npm run dev` et ouvrir http://localhost:3000. Inspecter `<head>` dans DevTools → onglet Elements. Vérifier que `<title>` = "Team Foti | L'excellence du karting depuis 1978" et que les balises `<meta name="description">` et `<meta property="og:title">` sont présentes.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat(seo): add metadata to home page"
```

---

### Task 2 : generateMetadata dynamique sur la page produit

**Files:**
- Modify: `src/app/shop/[slug]/page.tsx`

**Step 1: Ajouter `generateMetadata`**

Remplacer le contenu complet de `src/app/shop/[slug]/page.tsx` par :

```tsx
import Link from "next/link";
import { getProductBySlug } from "@/lib/data/get-data";
import { ProductPageContent } from "@/components/shop/ProductPageContent";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = slug ? await getProductBySlug(slug) : undefined;

  if (!product) {
    return {
      title: "Produit introuvable | Team Foti",
      description: "Ce produit n'existe pas ou a été retiré de la boutique.",
    };
  }

  return {
    title: `${product.name} | Team Foti – Engineering Store`,
    description: product.description
      ? product.description.slice(0, 155)
      : `${product.name} — disponible dans la boutique Team Foti. Matériel karting de compétition.`,
    openGraph: {
      title: `${product.name} | Team Foti`,
      description: product.description?.slice(0, 155) ?? `${product.name} — Team Foti Engineering Store`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = slug ? await getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <p className="text-foreground/70">Produit introuvable.</p>
        <Link href="/shop" className="text-accent-yellow mt-4 inline-block">
          Retour boutique
        </Link>
      </div>
    );
  }

  return <ProductPageContent product={product} />;
}
```

**Step 2: Vérifier**

Naviguer vers http://localhost:3000/shop/[un-slug-valide] (voir les données statiques dans `src/lib/data/products.ts` pour trouver un slug). Le `<title>` dans `<head>` doit afficher le nom du produit.

**Step 3: Commit**

```bash
git add src/app/shop/\[slug\]/page.tsx
git commit -m "feat(seo): add dynamic generateMetadata to product page"
```

---

### Task 3 : Sitemap — ajouter les articles, retirer cart/checkout

**Files:**
- Modify: `src/app/sitemap.ts`

**Step 1: Remplacer le contenu de `src/app/sitemap.ts`**

```tsx
import { MetadataRoute } from "next";
import { getProducts, getArticles } from "@/lib/data/get-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://teamfoti.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/shop`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/actualite`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/competition`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/competition/transferts`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${base}/competition/palmares`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/mentions-legales`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cgv`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  const [products, articles] = await Promise.all([getProducts(), getArticles()]);

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((a) => a.slug)
    .map((a) => ({
      url: `${base}/actualite/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
```

**Step 2: Vérifier**

Lancer `npm run build && npm start`. Ouvrir http://localhost:3000/sitemap.xml. Vérifier :
- `/cart` et `/checkout` absents
- Les slugs produits présents
- Les slugs articles présents (si données statiques, vérifier `src/lib/data/articles.ts` pour les slugs disponibles)

**Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): add article slugs to sitemap, remove cart and checkout"
```

---

### Task 4 : HeroBackground — image décorative aria-hidden

**Files:**
- Modify: `src/components/home/HeroBackground.tsx`

**Step 1: Ajouter `aria-hidden` et rendre l'intention explicite**

Dans `HeroBackground.tsx`, sur le composant `<Image>`, remplacer :

```tsx
alt=""
```

par :

```tsx
alt=""
aria-hidden
role="presentation"
```

**Step 2: Vérifier**

Dans DevTools, inspecter l'image hero → vérifier `aria-hidden="true"` et `role="presentation"`. Aucun changement visuel attendu.

**Step 3: Commit**

```bash
git add src/components/home/HeroBackground.tsx
git commit -m "fix(a11y): mark hero background image as decorative"
```

---

## Bloc 2 — ParallaxGallery : hooks + next/image

### Task 5 : Corriger la violation Rules of Hooks et migrer vers next/image

Le problème : `useTransform` est appelé dans une boucle `.map()` (ligne ~198), ce qui viole les Rules of Hooks. La solution est d'extraire un composant `ParallaxTrack` qui reçoit l'index et appelle `useTransform` de façon stable.

**Files:**
- Modify: `src/components/home/ParallaxGallery.tsx`

**Step 1: Remplacer le contenu complet de `ParallaxGallery.tsx`**

```tsx
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

const SPEEDS = [-280, -180, 0, 180, 280];

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
  const x = useTransform(scrollYProgress, [0, 1], [-speed / 2, speed / 2]);
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
```

**Step 2: Vérifier**

- Lancer `npm run dev`
- Naviguer vers http://localhost:3000 et scroller jusqu'à la galerie
- Les photos doivent se déplacer en parallaxe au scroll
- Ouvrir la console DevTools → zéro warning "React Hook called conditionally"
- Sur mobile (DevTools responsive), les photos doivent s'afficher en stack vertical

**Step 3: Commit**

```bash
git add src/components/home/ParallaxGallery.tsx
git commit -m "fix: refactor ParallaxGallery to fix hooks violation and migrate to next/image"
```

---

## Bloc 3 — Translations manquantes + Page Compétition

### Task 6 : Ajouter les clés de traduction manquantes

**Files:**
- Modify: `src/lib/i18n/translations.ts`

**Context:** La page compétition utilise `t("competition.title")`, `t("competition.news")`, `t("competition.transfers")`, `t("competition.palmares")` — ces clés sont absentes de `translations.ts`. Elles s'affichent donc littéralement comme `"competition.title"` en UI. Bug critique.

**Step 1: Ajouter le bloc `competition` dans les deux locales**

Dans `translations.ts`, dans la locale `fr`, ajouter après le bloc `blog`:

```ts
competition: {
  title: "Compétition",
  news: "Actualité course",
  transfers: "Transferts",
  palmares: "Palmarès",
  transfersIntro: "Les annonces des pilotes rejoignant la Team Foti.",
  palmaresIntro: "Titres mondiaux et européens de la Team Foti.",
  noTransfers: "Aucun transfert pour le moment.",
  viewTransfers: "Voir les transferts",
  viewPalmares: "Voir le palmarès",
},
```

Dans la locale `en`, ajouter après le bloc `blog`:

```ts
competition: {
  title: "Competition",
  news: "Race news",
  transfers: "Transfers",
  palmares: "Hall of Fame",
  transfersIntro: "Driver announcements joining Team Foti.",
  palmaresIntro: "World and European titles of Team Foti.",
  noTransfers: "No transfers yet.",
  viewTransfers: "View transfers",
  viewPalmares: "View hall of fame",
},
```

**Step 2: Vérifier**

Naviguer vers http://localhost:3000/competition. Le H1 doit afficher "Compétition" (et non "competition.title").

**Step 3: Commit**

```bash
git add src/lib/i18n/translations.ts
git commit -m "fix(i18n): add missing competition translation keys"
```

---

### Task 7 : Redesign de la page compétition

**Files:**
- Modify: `src/app/competition/page.tsx`

**Context:** La page actuelle est visuellement nue (div simple, liens texte). Elle doit utiliser les composants UI existants pour être au même niveau que About et Contact.

**Step 1: Remplacer le contenu complet de `src/app/competition/page.tsx`**

```tsx
import { getArticles } from "@/lib/data/get-data";
import { ArticleCard } from "@/components/competition/ArticleCard";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RacingButton } from "@/components/ui/RacingButton";
import { RacingSeparator } from "@/components/ui/RacingSeparator";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Compétition | Team Foti – The Race Feed",
  description: "Actualités course, transferts et palmarès du service compétition Team Foti. Résultats et news de l'écurie.",
};

export default async function CompetitionPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête de page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-0">
        <RevealSection>
          <SectionHeader
            eyebrow="RACE FEED"
            title="Compétition"
          />
          <p className="text-foreground/50 text-sm font-mono max-w-lg -mt-4 mb-12">
            Résultats, transferts, palmarès. La Team Foti en piste.
          </p>
        </RevealSection>
      </div>

      {/* Section Actualité */}
      <RevealSection beams>
        <section id="news" className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-yellow/70 mb-6">
            ACTUALITÉ COURSE
          </h2>
          {articles.length === 0 ? (
            <p className="text-foreground/50 font-mono text-sm">Aucune actualité pour le moment.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </section>
      </RevealSection>

      <RacingSeparator />

      {/* Liens Transferts & Palmarès */}
      <RevealSection>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Transferts */}
            <div className="group p-8 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-accent-red/30 hover:bg-accent-red/[0.03] transition-all duration-300">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-red mb-3">
                RECRUTEMENT
              </p>
              <h2 className="font-heading font-bold italic text-2xl text-foreground mb-3">
                Transferts
              </h2>
              <p className="text-foreground/50 text-sm font-mono leading-relaxed mb-6">
                Les annonces des pilotes rejoignant la Team Foti.
              </p>
              <RacingButton href="/competition/transferts" variant="ghost" arrow>
                Voir les transferts
              </RacingButton>
            </div>

            {/* Palmarès */}
            <div className="group p-8 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-accent-yellow/30 hover:bg-accent-yellow/[0.03] transition-all duration-300">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-yellow mb-3">
                HALL OF FAME
              </p>
              <h2 className="font-heading font-bold italic text-2xl text-foreground mb-3">
                Palmarès
              </h2>
              <p className="text-foreground/50 text-sm font-mono leading-relaxed mb-6">
                Titres mondiaux et européens de la Team Foti depuis 1978.
              </p>
              <RacingButton href="/competition/palmares" variant="ghost" arrow>
                Voir le palmarès
              </RacingButton>
            </div>

          </div>
        </section>
      </RevealSection>
    </div>
  );
}
```

**Step 2: Vérifier**

Naviguer vers http://localhost:3000/competition. La page doit avoir :
- Un `SectionHeader` avec eyebrow "RACE FEED"
- La grille d'articles
- Deux cartes racing avec glow rouge/jaune pour Transferts et Palmarès
- Les `RacingButton` vers les sous-pages

**Step 3: Commit**

```bash
git add src/app/competition/page.tsx
git commit -m "feat(design): redesign competition page with racing UI components"
```

---

### Task 8 : Redesign de la page transferts

**Files:**
- Modify: `src/app/competition/transferts/page.tsx`

**Step 1: Remplacer le contenu complet**

```tsx
import { getArticles } from "@/lib/data/get-data";
import { RevealSection } from "@/components/ui/RevealSection";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RacingButton } from "@/components/ui/RacingButton";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transferts | Team Foti – Recrutement pilotes",
  description: "Annonces des pilotes rejoignant la Team Foti. Recrutements et arrivées dans l'écurie.",
};

export default async function TransfertsPage() {
  const articles = await getArticles();
  const transferts = articles.filter((a) => a.type === "Transfert");

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        <RevealSection>
          <SectionHeader eyebrow="RECRUTEMENT" title="Transferts" />
          <p className="text-foreground/50 text-sm font-mono max-w-lg -mt-4 mb-12">
            Les pilotes qui rejoignent la Team Foti.
          </p>
        </RevealSection>

        {transferts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-mono text-foreground/40 text-sm">Aucun transfert pour le moment.</p>
            <div className="mt-8">
              <RacingButton href="/competition" variant="ghost" arrow>
                Retour compétition
              </RacingButton>
            </div>
          </div>
        ) : (
          <ul className="space-y-4 pb-24">
            {transferts.map((a, i) => (
              <li
                key={a.id}
                className="group relative rounded-xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8 hover:border-accent-red/30 hover:bg-accent-red/[0.03] transition-all duration-300"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Barre latérale rouge */}
                <div className="absolute left-0 top-4 bottom-4 w-[2px] bg-accent-red/40 rounded-full group-hover:bg-accent-red transition-colors duration-300" />
                <div className="pl-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent-red">
                      TRANSFERT
                    </span>
                    <time
                      className="font-mono text-[10px] text-foreground/30 uppercase"
                      dateTime={a.date}
                    >
                      {new Date(a.date).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="font-heading font-bold italic text-lg text-foreground group-hover:text-accent-yellow transition-colors duration-300 mb-2">
                    {a.title}
                  </h2>
                  {a.content && (
                    <p className="text-foreground/60 text-sm leading-relaxed">{a.content}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Vérifier**

Naviguer vers http://localhost:3000/competition/transferts. Si des données statiques existent avec `type: "Transfert"`, les cartes racing doivent s'afficher. Sinon, le message "Aucun transfert" avec le bouton retour doit être visible.

**Step 3: Commit**

```bash
git add src/app/competition/transferts/page.tsx
git commit -m "feat(design): redesign transfers page with racing card components"
```

---

## Bloc 4 — Cohérence animations Framer Motion

### Task 9 : Harmoniser les animations hero (spring partout)

**Files:**
- Modify: `src/components/about/AboutPageContent.tsx`
- Modify: `src/components/contact/ContactPageContent.tsx`
- Modify: `src/components/home/HeroContent.tsx`

**Context:** Les eyebrows et certains éléments dans les héros utilisent `{ duration: 0.5 }` ou `{ delay: 0.2, duration: 0.6 }` — pas de spring. Les titres H1 utilisent déjà `type: "spring"`. L'objectif : unifier toutes les animations d'entrée sur le même ressort.

**Step 1: `AboutPageContent.tsx` — hero eyebrow**

Dans la fonction `AboutHero`, trouver la `motion.p` (eyebrow) et remplacer sa `transition` :

```tsx
// Avant
transition={{ delay: 0.2, duration: 0.6 }}

// Après
transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.15 }}
```

**Step 2: `ContactPageContent.tsx` — hero eyebrow**

Dans la fonction `ContactHero`, même correction sur la `motion.p` :

```tsx
// Avant
transition={{ delay: 0.2, duration: 0.6 }}

// Après
transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.15 }}
```

**Step 3: `HeroContent.tsx` — eyebrow et fade-in buttons**

Trouver la `motion.p` eyebrow (ligne ~16) et le `motion.div` des boutons (ligne ~39) :

```tsx
// eyebrow — Avant
transition={{ delay: 0.05, duration: 0.5 }}

// eyebrow — Après
transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.05 }}

// buttons — Avant
transition={{ delay: 0.4, duration: 0.3 }}

// buttons — Après
transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.4 }}
```

**Step 4: Vérifier**

Naviguer vers / → /about → /contact et observer les animations d'entrée. Elles doivent toutes avoir le même ressort fluide, sans coupure brusque.

**Step 5: Commit**

```bash
git add src/components/about/AboutPageContent.tsx src/components/contact/ContactPageContent.tsx src/components/home/HeroContent.tsx
git commit -m "feat(animation): unify all hero animations to spring physics"
```

---

## Bloc 5 — Build final

### Task 10 : `npm run build` et correction des erreurs éventuelles

**Step 1: Lancer le build**

```bash
cd /Users/maximelebas/Documents/MELIOZ/Hyzax/team-foti-site
npm run build
```

**Expected output:** `✓ Compiled successfully` avec 0 erreurs TypeScript et 0 erreurs ESLint (ESLint est désactivé pendant le build selon `next.config.mjs`, mais TypeScript est vérifié).

**Step 2: Si erreurs TypeScript**

Les erreurs les plus probables :
- Import `Metadata` manquant dans un fichier → ajouter `import type { Metadata } from "next";`
- Type incompatible sur `generateMetadata` → s'assurer que la signature est `async function generateMetadata({ params }: ProductPageProps): Promise<Metadata>`

**Step 3: Lancer lint séparément**

```bash
npm run lint
```

Corriger toutes les erreurs signalées (warnings ignorables, mais pas d'erreurs `error`).

**Step 4: Commit final**

```bash
git add -A
git commit -m "build: production-ready audit complete — SEO, design, animations, hooks"
```

---

## Récapitulatif des fichiers modifiés

| Fichier | Raison |
|---------|--------|
| `src/app/page.tsx` | Metadata home |
| `src/app/shop/[slug]/page.tsx` | generateMetadata dynamique produit |
| `src/app/sitemap.ts` | Ajout articles, suppression cart/checkout |
| `src/components/home/HeroBackground.tsx` | aria-hidden image décorative |
| `src/components/home/ParallaxGallery.tsx` | Fix hooks + next/image |
| `src/lib/i18n/translations.ts` | Clés competition.* manquantes |
| `src/app/competition/page.tsx` | Redesign racing |
| `src/app/competition/transferts/page.tsx` | Redesign racing |
| `src/components/about/AboutPageContent.tsx` | Spring animations |
| `src/components/contact/ContactPageContent.tsx` | Spring animations |
| `src/components/home/HeroContent.tsx` | Spring animations |
