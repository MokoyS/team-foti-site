# Team Foti — Site E-commerce & Vitrine

Plateforme Next.js pour la Team Foti : boutique (karts, consommables, merchandising) et vitrine compétition.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — thème Anthracite #121212, accents Jaune #FFD700 et Rouge #FF0000
- **Zustand** — panier persistant (LocalStorage)
- **Framer Motion** — transitions et micro-animations
- **Stripe** — paiement (optionnel ; démo sans clé possible)
- **Strapi** — backend CMS optionnel (voir `../team-foti-strapi`)

## Démarrage

```bash
npm install --legacy-peer-deps
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Créez un fichier `.env.local` à la racine :

```env
# Stripe (optionnel — sans clé, le checkout propose "Simuler la commande")
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Strapi (optionnel — pour charger produits/actualités depuis le CMS)
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# SEO (optionnel)
NEXT_PUBLIC_SITE_URL=https://teamfoti.com
```

## Fonctionnalités

- **Accueil** : Hero avec image, produits phares, actualités
- **Boutique** : catalogue, fiche produit, ajout au panier
- **Panier** : persistance LocalStorage, modification des quantités
- **Checkout** : 3 étapes (livraison → paiement → confirmation), Stripe ou simulation
- **Compétition** : actualités, transferts, palmarès (timeline)
- **i18n** : switcher FR/EN (nav + footer)
- **SEO** : metadata, sitemap.xml, robots.txt
- **Juridique** : bandeau cookie RGPD, mentions légales, CGV

## Build

```bash
npm run build
npm start
```

## Backend Strapi

Un backend Strapi est disponible dans **`../team-foti-strapi`** avec les content types : Category, Product, Article, Palmares. Pour l’utiliser :

1. Lancer Strapi : `cd ../team-foti-strapi && npm run develop`
2. Créer un admin sur http://localhost:1337/admin et configurer les permissions Public (find, findOne) pour chaque type
3. Renseigner `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` dans `.env.local` du site
4. Adapter `src/lib/data/` pour appeler l’API Strapi (voir exemples dans la doc Strapi)

Par défaut, le site utilise les données statiques dans `src/lib/data/`.
