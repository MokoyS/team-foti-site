# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install --legacy-peer-deps   # install deps (--legacy-peer-deps required)
npm run dev                      # dev server on http://localhost:3000
npm run build                    # production build (ESLint skipped, run lint separately)
npm run lint                     # run ESLint
npm start                        # serve production build
```

No test suite is configured.

## Architecture

**Next.js 15 App Router** — all pages live under `src/app/`. Each route has a `page.tsx` that renders a Server Component (data fetching) and delegates UI to a Client Component in `src/components/<section>/`.

### Data layer (`src/lib/`)

The site uses a **dual data strategy**: Strapi CMS when `NEXT_PUBLIC_STRAPI_URL` is set, otherwise falls back to static data files.

- `src/lib/strapi.ts` — Strapi v4/v5 API client (server-side only, 8 s timeout, `next: { revalidate: 60 }`)
- `src/lib/data/get-data.ts` — **the single entry point** for all data. Always use `getProducts()`, `getArticles()`, `getPalmares()` here rather than calling Strapi or static files directly.
- `src/lib/data/products.ts`, `articles.ts`, `team.ts` — static fallback data

### State

- **Cart**: Zustand store with LocalStorage persistence (`src/lib/store/cart-store.ts`, key: `team-foti-cart`)
- **Locale**: React Context (`src/contexts/LocaleContext.tsx`, key: `team-foti-locale`) — FR/EN toggle, stored in `localStorage`. Use `useLocale()` hook to access `t()`, `locale`, `setLocale`.

### i18n

All UI strings live in `src/lib/i18n/translations.ts` (flat `fr`/`en` objects). Access via `t("section.key")` from `useLocale()`. Adding a new string requires updating both `fr` and `en` objects.

### Theming

Tailwind config (`tailwind.config.ts`) defines:
- Colors: `background`, `foreground`, `anthracite` (#0a0a0a), `carbon-{800,700,600,500}`, `accent-yellow` (#FFD700), `accent-red` (#FF0000)
- Fonts: `font-heading` (Play), `font-sans` (Poppins), `font-mono` (Geist Mono)
- Shadows: `glow`, `glow-red`, `card-glow`, `card-glow-red`

### Routes

| Path | Description |
|------|-------------|
| `/` | Home |
| `/shop` | Product catalogue |
| `/shop/[slug]` | Product detail |
| `/cart` | Cart |
| `/checkout` | 3-step checkout (shipping → payment → confirmation) |
| `/about` | About page |
| `/team` | Team page |
| `/actualite` | Competition news/articles |
| `/competition` | Competition section |
| `/contact` | Contact page |
| `/mentions-legales` | Legal mentions |
| `/cgv` | Terms & conditions |

API routes: `src/app/api/` (Stripe webhook handling).

### Images

Photos are served from `public/Photos /` (note the trailing space in the directory name). Reference them as `/Photos%20/...` in code. Remote images are allowed from Strapi uploads, Cloudinary, and Unsplash (configured in `next.config.mjs`).

## Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337   # omit to use static data
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...  # omit for simulated checkout
NEXT_PUBLIC_SITE_URL=https://teamfoti.com        # for SEO/sitemap
```

## Deployment

- **Frontend**: Vercel (auto-deploy from `main`)
- **Backend CMS**: Strapi on Railway (Postgres in prod, SQLite in dev at `../team-foti-strapi`)
- See `DEPLOY.md` for full Railway + Vercel environment variable setup
