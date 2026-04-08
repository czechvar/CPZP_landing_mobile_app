# CPZP_landing_mobile_app

## Project Overview
Mobile landing page for ČPZP app. Follows same stack as CPZP_landing_maminky and CZPP_Landingpage (Vite + Vanilla JS + CSS variables + Swiper).

## Stack
- Build tool: Vite 6
- JS: Vanilla ES modules
- CSS: Plain CSS with CSS custom properties
- Libraries: Swiper 11
- Output: `dist/` (compressed, delivered to client)
- Hosting: Vercel (dev preview for designer review)

## Pages
1. **Homepage** — desktop + mobile views
2. **Subpage** — desktop + mobile views

## Reference Projects
- `../CZPP_Landingpage` — most mature reference, use as primary pattern
- `../CPZP_landing_maminky` — earlier version

## Delivery
- Final: compressed `dist/` folder handed to client
- Dev preview: Vercel deployment for designer sign-off

## Setup & Development

### 1. Install dependencies
```bash
npm install
```

### 2. Dev server
```bash
npm run dev
```

### 3. Production build
```bash
npm run build
```
Output goes to `dist/` — zip this folder for client delivery.

### 4. Preview built output
```bash
npm run serve
```

## Vercel deployment
Push the source to GitHub, connect to Vercel. Vercel will auto-detect Vite and run `npm install && npm run build`.
Set build output directory to `dist` (Vite default — usually auto-detected).

## Image assets note
All images are stored locally in `img/`. SVG icons use `.svg` extension, photos use `.jpg`/`.png`.
The `dist/img/` folder must contain these images for the dist to be complete.
