# Sinister/Edit — Video Editing Portfolio

An editorial portfolio for short-form, sports, and story-led video work. The
site pairs embedded project reels with an interactive, motion-led presentation
designed around pace, sound, and visual rhythm.

[View editing work on Instagram](https://www.instagram.com/ig_sinisterrrr/)

## Highlights

- Responsive portfolio layout for desktop and mobile
- Embedded project reels with direct links to the original work
- Pointer and scroll-based scene motion
- Reduced-motion support for visitors who prefer less animation
- Semantic sections for selected work, process, profile, and contact
- Open Graph and social-sharing metadata

## Stack

- React 19
- TypeScript
- Vinext and Vite
- Tailwind CSS
- Cloudflare tooling
- Lucide icons

## Run locally

Requirements: Node.js 22.13 or newer and pnpm.

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm lint
pnpm build
```

## Project structure

- `app/page.tsx` — portfolio content and interactions
- `app/globals.css` — visual system, responsive layout, and motion
- `app/layout.tsx` — page metadata and social-sharing configuration
- `public/` — favicon and social-preview assets

## Status

The source is active. A new public deployment URL is being prepared; the former
deployment has intentionally not been linked here because it is unavailable.
