# PEA-SLA Tracking System

A real, buildable/deployable Next.js (App Router) app, migrated from a Vite multi-page app, itself migrated from the `design_handoff_pea_sla_phase2` click-through prototype (10 HTML pages, React-via-CDN + Babel-in-browser, no build step).

## What changed vs. the Vite app

- **Build tooling**: Next.js App Router instead of a Vite multi-page app. Each former `*.html` entry is now a route under `app/` (`app/page.jsx` for `/`, `app/ba-sla-master/page.jsx` for `/ba-sla-master`, etc.).
- **Routing**: cross-page navigation uses `next/link` (`<Link href="/...">`) and clean paths instead of `.html` filenames; the couple of imperative "back"/"switch" button actions still use `window.location.href`, just with clean paths.
- **Images**: the repeated logo images now render through `next/image`.
- **React**: still resolved as a single shared instance across the app. The precompiled, sourceless design-system bundle in `public/_ds` (no build step of its own) reads `window.React` and calls its own hooks directly, so `app/react-globals-bridge.jsx` exposes the npm `react` instance Next.js hydrates with as `window.React` before that bundle's components ever render — see the comment in that file for why this matters. The old self-hosted UMD `react`/`react-dom` scripts are gone; `react`/`react-dom` are now regular npm dependencies.
- **Env vars**: none existed (no `VITE_*` usage anywhere in app code), so there was nothing to rename to `NEXT_PUBLIC_*`.
- **Same page logic, same look**: every page's component code, inline styles (now per-route `page.css` files), and behavior is carried over as-is. The only functional code changes were the routing/image swaps above, `'use client'` boundaries, and moving `org-tree-data` from a 1.1MB global `<script>` (`window.ORG_TREE`) to a real ES module import (`src/shared/org-tree-data.js`) to remove a load-order race.

## Page map

| Route |
|---|
| `/` |
| `/ba-sla-master` |
| `/ba-structure-view` |
| `/sla-overview` |
| `/sla-report-form` |
| `/sla-report-form-level2` |
| `/sla-status-tracking` |
| `/learning-form` |
| `/p1-p11-overview` |
| `/qir-annual-form` |

## Project structure

```
public/                     static assets served as-is (design system bundle, icons.css, logo, vendor scripts)
src/shared/                  modules shared by 2+ routes (icons, BA/SLA data + admin panel, P1-P11 data, org tree)
app/layout.jsx                root layout: design-system <link> tags, beforeInteractive <Script>s, React bridge
app/react-globals-bridge.jsx  bridges npm React to window.React for the design-system bundle's hooks
app/<route>/page.jsx          server component: sets the route's <title>, renders view.jsx
app/<route>/view.jsx           'use client' wrapper: imports that route's data.jsx/app.jsx (order matters) + page.css
app/<route>/*-data.jsx         that route's mock data (still window-global style, unchanged from the Vite app)
app/<route>/*-app.jsx          that route's component tree (still React.createElement style, unchanged apart from
                               the routing/image/export edits described above)
app/<route>/page.css           that route's original inline <style> block, extracted verbatim
```

## Develop

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build
npm start
```

Deploys to Vercel with zero extra config (`vercel.json` just pins `framework: nextjs`).

## Known gaps (carried over from the prototype)

- No backend — all data is in-memory mock data, resets on reload.
- Excel import/export on the SLA Master page are UI-only stubs.
- Role-based access control is data-driven only (no route guard) — see `design_handoff_pea_sla_phase2/README.md` for full details on prototype scope.
