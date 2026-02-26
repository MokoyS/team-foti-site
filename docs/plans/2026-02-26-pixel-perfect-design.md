# Design — Pixel Perfect (Approche A chirurgicale)

Date : 2026-02-26
Statut : Approuvé

## Contexte

Finalisation UI/UX du site Team Foti. Corrections ciblées de bugs d'animation
et ajout d'une page galerie dédiée.

---

## 1. Fix ScrollReveal — glitch à la fin

**Fichier** : `src/components/ui/ScrollReveal.tsx`

**Cause** : `damping: 20` avec `stiffness: 100` → spring sous-amorti → overshoot.
L'animation `filter: blur()` crée des artefacts GPU cross-browser.

**Correction** :
- `stiffness: 80, damping: 28`
- Supprimer `filter: blur()` de `initial` et `whileInView` → opacité seule

---

## 2. Fix Parallax — mouvement incohérent

**Fichier** : `src/components/home/ParallaxGallery.tsx`

**Cause** : `SPEEDS = [-280, -180, 0, 180, 280]` trop élevés → cartes hors écran.
Les `useTransform` directs sans amortissement créent des sauts brusques.

**Correction** :
- `SPEEDS = [-100, -60, 0, 60, 100]`
- Dans `ParallaxItem` : wrapper le `x` issu de `useTransform` avec
  `useSpring(x, { stiffness: 80, damping: 25 })`

---

## 3. Bouton galerie sur la Home Page

**Fichier** : `src/app/page.tsx`

Ajouter sous `<ParallaxGallery>` un bouton centré :

```tsx
<div className="mt-6 text-center">
  <RacingButton href="/galerie" variant="yellow" arrow>
    ACCÉDER À LA GALERIE
  </RacingButton>
</div>
```

---

## 4. Page /galerie

### Route

- `src/app/galerie/page.tsx` — Server Component avec `generateMetadata`

### Composant UI

- `src/components/home/GaleriePageContent.tsx` — Client Component

### Photos

Toutes les images `.jpg` / `.jpeg` de :
- `public/Photos /Pilotes/`
- `public/Photos /resultats-podiums/`

Exclure : `.html`, `.htm`, `.pdf`, `.docx`, `.xls`, `.png` non visuels

### Layout

`BentoGrid` existant avec pattern :
- Cellule 1 : `colSpan=2, rowSpan=2` (grande hero photo)
- Cellules 2–3 : `colSpan=1, rowSpan=1`
- Cellules 4+ : `colSpan=1` (grille uniforme 3 cols)

### Zoom in-place

Framer Motion `layoutId` shared layout animation :
- Clic sur une photo → `motion.div` avec le même `layoutId` s'anime vers un
  overlay fullscreen centré (backdrop noir semi-transparent)
- Clic sur l'overlay ou la photo agrandie → fermeture
- Touche `Escape` → fermeture

### Performance

`next/image` avec `fill` et `sizes` adaptés à chaque taille de cellule.

---

## Fichiers touchés

| Fichier | Action |
|---|---|
| `src/components/ui/ScrollReveal.tsx` | Modifier spring params + retirer blur |
| `src/components/home/ParallaxGallery.tsx` | Réduire SPEEDS + ajouter useSpring |
| `src/app/page.tsx` | Ajouter bouton galerie |
| `src/app/galerie/page.tsx` | Créer |
| `src/components/home/GaleriePageContent.tsx` | Créer |
