# Sinister/Edit — Video Editing Portfolio

[![Checks](https://github.com/pralav-25/Editing_Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/pralav-25/Editing_Portfolio/actions/workflows/ci.yml)

An editorial portfolio for short-form, sports, and story-led video work. The
site pairs embedded project reels with an interactive, motion-led presentation
designed around pace, sound, and visual rhythm.

[View editing work on Instagram](https://www.instagram.com/ig_sinisterrrr/)

## Highlights

- Responsive portfolio layout for desktop and mobile
- Click-to-load project reels with direct links to the original work
- Only one embedded player is mounted at a time; Close player stops and unloads it
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
pnpm typecheck
pnpm lint
pnpm build
```

## Project structure

- `app/page.tsx` — portfolio content and interactions
- `app/globals.css` — visual system, responsive layout, and motion
- `app/layout.tsx` — page metadata and social-sharing configuration
- `public/` — favicon and social-preview assets

## Update the selected reels

Edit the `projects` array in [app/page.tsx](app/page.tsx). Each entry contains the
title, category (`type`), description (`note`), original post (`href`), and player
URL (`embed`). Keep `href` and `embed` pointed at the same Instagram post. Give
each project a unique `index` for player state and a unique title for its React key.

After editing, check the original link, **Load reel**, **Close player**, and
Escape. Load a second reel while the first is open to confirm that only the
selected player remains mounted. Also check the direct link when an embed is
unavailable.

## Deployment

`pnpm build` exports a static site to `dist/client` and verifies the homepage and
its referenced assets. `vercel.json` explicitly selects this public output and
avoids treating the build as a Cloudflare Worker. `pnpm start` previews the export.
The existing Vercel integration deploys changes to `main`.

## Media behavior

Instagram is contacted only after a visitor selects **Load reel**. Closing a
player or selecting another reel removes the previous iframe. Escape also closes
the player; focus returns to its load button. Original links
remain available if an embed is blocked or requires an Instagram login.

Lint covers authored application code; the bundled Shadcn primitives retain their
upstream implementation and are checked by TypeScript and the production build.

For an independent deployment, set `SITE_URL` to its public origin to generate
canonical and social URLs. On Vercel, the project production hostname is used
automatically when available.
