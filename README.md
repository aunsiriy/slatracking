# PEA-SLA Tracking System

A real, buildable/deployable Vite + React app, migrated from the `design_handoff_pea_sla_phase2` click-through prototype (10 HTML pages, React-via-CDN + Babel-in-browser, no build step).

## What changed vs. the prototype

- **Build tooling**: Vite multi-page app instead of CDN React/Babel-standalone. Each page is a real Vite entry (`index.html`, `ba-sla-master.html`, etc.) that loads a bundled JS module instead of loose `<script type="text/babel">` tags.
- **React**: self-hosted production UMD build (`public/vendor/react*.production.min.js`) instead of the unpkg CDN — no runtime network dependency, version-pinned via `package.json`.
- **No Babel at runtime**: the original `.jsx` files never actually used JSX syntax (`React.createElement` calls throughout), so Vite/esbuild compiles them directly — Babel-standalone is gone.
- **Same page logic, same look**: every page's markup, inline `<style>` block, and JSX component code is carried over verbatim. Cross-page navigation hrefs were remapped from the original spaced filenames (`"Landing Page.html"`) to URL-safe kebab-case (`index.html`, `ba-sla-master.html`, ...) — see the table below.
- **Bug fixed**: `src/shared/ba-sla-data.jsx`'s `flattenBaLevels()` read `window.BA_GROUPS` instead of the local `BA_GROUPS` constant. The original prototype only worked because Babel-standalone downleveled `const`/`let` to `var` (which attaches to `window`); real ES modules don't do that, so this same-file self-reference threw and left the BA & SLA Master page blank. Fixed to read the local constant directly.
- **Broken asset fixed**: the landing page's hero background referenced a non-existent `container10-mrth48bg-f5pb.png`; pointed to `assets/hero-bg.jpg` instead.

## Page map

| Original file | New URL |
|---|---|
| Landing Page.html | `/` (index.html) |
| BA SLA Master.html | `/ba-sla-master.html` |
| BA Structure View.html | `/ba-structure-view.html` |
| SLA Overview.html | `/sla-overview.html` |
| SLA Report Form.html | `/sla-report-form.html` |
| SLA Report Form Level2.html | `/sla-report-form-level2.html` |
| SLA Status Tracking.html | `/sla-status-tracking.html` |
| Learning Form.html | `/learning-form.html` |
| P1-P11 Overview.html | `/p1-p11-overview.html` |
| QIR Annual Form.html | `/qir-annual-form.html` |

## Project structure

```
public/            static assets served as-is (design system bundle, icons.css, logo, org tree data, vendor React)
src/shared/         modules shared by 2+ pages (icons, BA/SLA data + admin panel, P1-P11 data)
src/pages/<page>/   each page's data.jsx + app.jsx + entry.js (import order mirrors the original <script> order)
*.html              one Vite entry per page (flat, at project root — matches the original's flat layout)
```

## Develop

```bash
npm install
npm run dev
```

## Build & deploy

```bash
npm run build    # outputs static site to dist/
npm run preview  # serve the production build locally to sanity-check it
```

`dist/` is a fully static site (HTML + JS + CSS + assets) — upload it as-is to any static host (Vercel, Netlify, GitHub Pages, S3, nginx, etc.). No server-side runtime is required.

## Known gaps (carried over from the prototype)

- No backend — all data is in-memory mock data, resets on reload.
- Excel import/export on the SLA Master page are UI-only stubs.
- Role-based access control is data-driven only (no route guard) — see `design_handoff_pea_sla_phase2/README.md` for full details on prototype scope.
