# Déploiement Team Foti – Production Ready

Ce document liste toutes les **variables d’environnement** à configurer pour déployer le backend Strapi sur **Railway** (avec Postgres) et le frontend Next.js sur **Vercel**.

---

## 1. Railway (Backend Strapi – team-foti-strapi)

À renseigner dans **Railway** → ton projet → **Variables**.

| Variable | Obligatoire | Description | Exemple |
|----------|-------------|-------------|---------|
| `NODE_ENV` | Oui | Environnement | `production` |
| `DATABASE_URL` | Oui (prod) | URL PostgreSQL fournie par Railway (Postgres) | `postgresql://user:pass@host:5432/railway` |
| `DATABASE_SSL` | Optionnel | Activer SSL pour Postgres (souvent `true` sur Railway) | `true` |
| `FRONTEND_URL` | Oui (prod) | URL du site Next.js (Vercel) pour CORS | `https://ton-site.vercel.app` ou `https://www.teamfoti.com` |
| `APP_KEYS` | Oui | Clés Strapi (générer avec `openssl rand -base64 32`) | 4 clés séparées par des virgules |
| `API_TOKEN_SALT` | Oui | Salt pour les tokens (générer avec `openssl rand -base64 32`) | |
| `ADMIN_JWT_SECRET` | Oui | Secret JWT admin (générer avec `openssl rand -base64 32`) | |
| `TRANSFER_TOKEN_SALT` | Oui | Salt pour les transfer tokens (générer avec `openssl rand -base64 32`) | |
| `JWT_SECRET` | Oui | Secret JWT (générer avec `openssl rand -base64 32`) | |
| `CLOUDINARY_CLOUD_NAME` | Oui (si upload) | Nom du cloud Cloudinary | |
| `CLOUDINARY_API_KEY` | Oui (si upload) | Clé API Cloudinary | |
| `CLOUDINARY_API_SECRET` | Oui (si upload) | Secret API Cloudinary | |
| `HOST` | Optionnel | Écoute (Railway fixe souvent ça) | `0.0.0.0` |
| `PORT` | Optionnel | Port (Railway injecte souvent `PORT`) | `1337` |

**En local (dev)** : pas besoin de `DATABASE_URL` → SQLite est utilisé automatiquement (fichier `.tmp/data.db`). Le projet inclut la dépendance `pg` pour PostgreSQL en production.

**Génération des secrets Strapi** (une fois) :
```bash
openssl rand -base64 32   # à lancer 4 fois pour APP_KEYS (4 clés en une ligne, séparées par des virgules)
openssl rand -base64 32   # API_TOKEN_SALT
openssl rand -base64 32   # ADMIN_JWT_SECRET
openssl rand -base64 32   # TRANSFER_TOKEN_SALT
openssl rand -base64 32   # JWT_SECRET
```

---

## 2. Vercel (Frontend Next.js – team-foti-site)

À renseigner dans **Vercel** → ton projet → **Settings** → **Environment Variables**.

| Variable | Obligatoire | Description | Exemple |
|----------|-------------|-------------|---------|
| `NEXT_PUBLIC_STRAPI_URL` | Oui (pour le CMS) | URL publique de l’API Strapi (Railway) | `https://team-foti-strapi.up.railway.app` |
| `NEXT_PUBLIC_SITE_URL` | Recommandé | URL du site (sitemap, robots, canonical) | `https://www.teamfoti.com` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Optionnel | Clé publique Stripe (paiement) | `pk_live_...` |

**Important** :  
- Sans `NEXT_PUBLIC_STRAPI_URL`, le site utilise les **données statiques** (pas d’appel à Strapi).  
- Les images Next.js (`next/image`) sont autorisées depuis l’hostname de `NEXT_PUBLIC_STRAPI_URL` et depuis `res.cloudinary.com` (config dans `next.config.mjs`).

---

## 3. Récapitulatif à copier-coller

### Railway (Backend)

```env
NODE_ENV=production
DATABASE_URL=<fourni par Railway Postgres>
DATABASE_SSL=true
FRONTEND_URL=https://ton-domaine-vercel.vercel.app
APP_KEYS=<clé1>,<clé2>,<clé3>,<clé4>
API_TOKEN_SALT=<openssl rand -base64 32>
ADMIN_JWT_SECRET=<openssl rand -base64 32>
TRANSFER_TOKEN_SALT=<openssl rand -base64 32>
JWT_SECRET=<openssl rand -base64 32>
CLOUDINARY_CLOUD_NAME=<ton cloud name>
CLOUDINARY_API_KEY=<ta clé>
CLOUDINARY_API_SECRET=<ton secret>
HOST=0.0.0.0
PORT=1337
```

### Vercel (Frontend)

```env
NEXT_PUBLIC_STRAPI_URL=https://ton-app-strapi.railway.app
NEXT_PUBLIC_SITE_URL=https://ton-domaine.vercel.app
```

(Optionnel : `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` pour le paiement.)

---

## 4. Ordre de déploiement recommandé

1. **Railway** : Créer un service Postgres, puis un service pour Strapi. Lier la variable `DATABASE_URL` au Postgres Railway. Déployer `team-foti-strapi` (build : `npm run build`, start : `npm run start`).
2. **Railway** : Renseigner `FRONTEND_URL` avec l’URL Vercel (tu peux mettre une URL temporaire puis la mettre à jour après le déploiement Vercel).
3. **Vercel** : Déployer `team-foti-site` en renseignant `NEXT_PUBLIC_STRAPI_URL` avec l’URL publique du Strapi sur Railway.
4. Revenir sur Railway et mettre à jour `FRONTEND_URL` avec l’URL finale du site (custom domain si besoin).

---

## 5. Scripts Strapi (déjà conformes)

- **Build** : `npm run build` → `strapi build`
- **Start** : `npm run start` → `strapi start`

Railway exécute en général `npm run build` puis `npm run start` (ou la commande de start définie dans le dashboard).
