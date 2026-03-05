# Design — Galerie scroll horizontal avec parallaxe

**Date:** 2026-02-27
**Composant:** `ParallaxGallery` (remplace l'existant dans `src/components/home/ParallaxGallery.tsx`)

---

## Objectif

Quand l'utilisateur scrolle et atteint la section galerie, le scroll Y est "consommé" par un sticky container qui le traduit en défilement horizontal. Une fois toutes les photos défilées, le scroll vertical reprend normalement. Effets parallaxe créatifs.

---

## Architecture technique

### Principe scroll-jacking

```
<section style="height: (N+1) × 100vh">     ← réserve de scroll
  <div style="sticky; top: 0; height: 100vh">
    [titre section]
    <motion.div style={{ x: translateX }}>   ← rail horizontal
      <Card /> × N
    </motion.div>
    [progress bar racing]
  </div>
</section>
```

- `N` = nombre de photos (7 par défaut)
- Section height = `(N + 1) * 100vh` → donne assez de scroll pour tout traverser
- `scrollYProgress [0 → 1]` via Framer Motion `useScroll({ target: sectionRef, offset: ["start start", "end end"] })`
- `translateX = useTransform(scrollYProgress, [0, 1], [0, -(totalRailWidth - viewportWidth)])`
- `useSpring` pour smooth le translateX

### Calcul du totalRailWidth

```
totalRailWidth = Σ(card widths) + gaps + padding
```

Widths par type :
- Portrait (3:4) → `w-[250px]`
- Paysage (16:9) → `w-[500px]`
- Carré (1:1) → `w-[380px]`

7 photos avec alternance : portrait → paysage → carré → portrait → paysage → carré → portrait
Gap : `gap-6` (24px)

---

## Effets parallaxe

1. **Background** : grande image de piste en position absolute derrière le rail, défile à 30% de la vitesse → profondeur perçue
2. **Y-offset par carte** : chaque carte a un décalage vertical sinusoïdal basé sur sa position dans le rail (`-20px → 0 → +20px`)
3. **rotateY léger** : les cartes hors champ ont `rotateY: ±5deg`, s'annule au centre
4. **Scale active** : la carte la plus proche du centre scale légèrement (`1.02`)
5. **Blur velocity** : flou léger quand le scroll est rapide (réutilise le pattern existant avec `useVelocity`)

---

## Progress bar

Barre de progression racing jaune (`accent-yellow`) en bas de la section sticky. Largeur = `scrollYProgress × 100%`. Avec marqueurs pour chaque photo.

---

## Titre de section

`SectionHeader eyebrow="GALLERY" title="En piste"` — position sticky en haut à gauche, s'estompe légèrement au fur et à mesure du défilement.

---

## Mobile (< md)

Scroll vertical normal. Cartes en colonne. Animation stagger au scroll avec `RevealSection` ou `motion` + `whileInView`. Pas de scroll-jacking.

---

## Fichiers modifiés

- `src/components/home/ParallaxGallery.tsx` — remplacement complet du composant

---

## Non modifié

- `src/app/page.tsx` — l'appel `<ParallaxGallery title="En piste" />` reste identique
- Les données photos (`PLACEHOLDER_PHOTOS`) — réutilisées avec ajout d'un champ `aspect`
