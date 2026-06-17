# Radnik Exports — Website Redesign

A fresh, premium redesign of [radnikexports.com](https://www.radnikexports.com) — repositioning Radnik
from a dated Wix template into a 50-year, technology-led apparel & technical-textile manufacturing house.

## Stack
- **Vite + React + TypeScript**
- **Tailwind CSS v3** (design tokens in `tailwind.config.js`)
- **Framer Motion + Lenis** — smooth scroll, masked text reveals, scroll-linked parallax, and a
  pinned horizontal value-chain section (`src/components/motion/*`, `HorizontalChain.tsx`)
- **React Router v7** — 7 pages

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
```

## Design system (light, photo-forward)
- **Type:** AspektaVF (the variable Apple/SF-style sans shared with the Dansen project,
  `public/fonts/AspektaVF.woff2`) for everything · JetBrains Mono for data labels / eyebrows.
- **Palette:** warm paper `#FBFAF6` (default bg) · white `#FFFFFF` · warm **sand** `#EFEAE0`
  (secondary section tone) · ink `#17171B` (text) · charcoal `#1C1B20` (used sparingly for one dark
  moment) · Radnik **red** `#E11226` accent. White-dominant; sections alternate paper → sand → red.
- **Imagery:** photo-rich — color photos via `.ph` (subtle grade) and `.bw` for select galleries;
  a scrolling collection marquee, full-bleed feature band, and per-page galleries.
- **Motion:** Lenis smooth scroll; word-by-word masked headline reveals; clip-path image wipes +
  scroll parallax (`src/components/motion/Img.tsx`); a pinned horizontal "How we work" value chain.
  All respect `prefers-reduced-motion`.

## Pages
`/` Home · `/about` · `/capabilities` · `/infrastructure` · `/clients` · `/sustainability` · `/contact`

## Content & images
- All copy and figures are drawn from Radnik's real site + official OGTC company profile
  (see `.research/` for the raw scrape, brief, and image manifest). Structured facts live in `src/data/site.ts`.
- Real Radnik photos were scraped into `public/images/` and color-graded via the duotone treatment.
  Three stock template images from the old Wix site were discarded; the home hero uses a real factory photo.

## Notes for the client handoff
- **Designer count:** the official `/design` page says *14 designers / 65%*; the OGTC company profile says
  *20 / 70%*. This build uses the polished **20 / 70%** — confirm the current figure with Radnik.
- **Client logos** are rendered as typographic brand names (not trademarked logo files) — cleaner and
  avoids logo-resolution/usage issues. Swap to real logos if Radnik provides approved assets.
- **Contact form** composes a pre-filled email via `mailto:` (no backend). Wire to a real endpoint
  (Formspree, a serverless function, etc.) for production lead capture.
