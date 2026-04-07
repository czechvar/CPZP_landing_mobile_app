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

## Figma Designs

### Desktop
- Homepage: https://www.figma.com/proto/9NsCEHyA6RdGXeF6GPuVj6/%C4%8CPZP---app-landing-page?page-id=0%3A1&node-id=6-157&viewport=4579%2C339%2C0.46&t=DIUON5F3EhZRtSnm-1&scaling=min-zoom&content-scaling=fixed
- Subpage: https://www.figma.com/proto/9NsCEHyA6RdGXeF6GPuVj6/%C4%8CPZP---app-landing-page?page-id=0%3A1&node-id=2209-570&viewport=1300%2C-966%2C0.19&t=lE43fu6gs2WG6O5F-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2209%3A570

### Mobile
- Homepage: in the same Figma file (next page after desktop HP)
- Subpage: https://www.figma.com/proto/9NsCEHyA6RdGXeF6GPuVj6/%C4%8CPZP---app-landing-page?page-id=0%3A1&node-id=2205-2068&viewport=1300%2C-966%2C0.19&t=lE43fu6gs2WG6O5F-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2205%3A2068

### Figma File (design/dev mode)
- File key: `9NsCEHyA6RdGXeF6GPuVj6`
- File URL: https://www.figma.com/file/9NsCEHyA6RdGXeF6GPuVj6/ČPZP---app-landing-page

## Reference Projects
- `../CZPP_Landingpage` — most mature reference, use as primary pattern
- `../CPZP_landing_maminky` — earlier version

## Delivery
- Final: compressed `dist/` folder handed to client
- Dev preview: Vercel deployment for designer sign-off

## Setup & Development

### 1. Download Figma image assets (one-time, run locally)
```bash
bash img/download-assets.sh
```
This downloads all section images, logos, icons, and decorative elements from Figma (URLs valid ~7 days).
After downloading, the same images are also needed in `dist/img/` — copy them there or rebuild.

### 2. Install dependencies
```bash
npm install
```

### 3. Dev server
```bash
npm run dev
```

### 4. Production build
```bash
npm run build
```
Output goes to `dist/` — zip this folder for client delivery.

### 5. Preview built output
```bash
npm run serve
```

## Vercel deployment
Push the source to GitHub, connect to Vercel. Vercel will auto-detect Vite and run `npm install && npm run build`.
Set build output directory to `dist` (Vite default — usually auto-detected).

## Image assets note
All images reference local `img/` paths. Run `bash img/download-assets.sh` locally before first build.
The `dist/img/` folder must contain the downloaded images for the dist to be complete.
