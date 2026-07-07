# Personal Portfolio — Blueprint → Build → Production

One-page portfolio for Anisong Chanthalalay. A CAD blueprint draws itself, then a scroll-scrubbed
Three.js camera lowers from top-down to eye-level as the site "materializes" — wireframes extrude,
outlined type fills in, buttons gain color. Project deep-dives open as retro `.exe` windows: the
shipped-product payoff of the blueprint story.

Full spec: [`docs/PRD.md`](docs/PRD.md)

## Stack

Vite · React 19 · TypeScript · Three.js / React Three Fiber / Drei · GSAP + ScrollTrigger ·
Tailwind CSS v4 · Zustand

## Commands

```sh
npm run dev       # dev server
npm run build     # typecheck + production build
npm run preview   # serve the production build
npm run resume    # regenerate public/resume.pdf from resume/resume.html
npm run og        # regenerate public/og.png from scripts/og.html
npm run verify    # headless-Chromium screenshot pass (needs `npm run preview` on :4173)
```

`resume`/`og`/`verify` use the Playwright-cached Chromium at
`~/Library/Caches/ms-playwright/chromium-1223/` via `playwright-core`.

## Architecture notes

- **DOM over canvas.** All content is real HTML (crawlable, screen-reader accessible); the Three.js
  canvas is a fixed, `aria-hidden` background. `frameloop="demand"` — the scene only renders when
  scroll/mouse actually change.
- **One animation engine.** GSAP ScrollTrigger scrubs a single timeline driving both the R3F camera
  (via the `scrollState` singleton in `src/lib/scrollState.ts`) and DOM materialization.
- **Two modes**, decided once at load (`src/lib/capabilities.ts`): `full` (desktop + WebGL + motion
  OK) gets the 3D scene; `lite` (mobile / reduced-motion / no WebGL) gets a CSS-grid blueprint with
  the same content and windows.
- **Windows** (`src/windows/`) are modal, focus-trapped, Esc-closable; scroll position is preserved
  on close.
- All copy lives in `src/content/` — edit `site.ts` / `projects.ts`, never the components.

## Remaining content TODOs

- Project screenshots: drop images into `public/projects/<slug>/` and list them in each project's
  `screenshots` array in `src/content/projects.ts`.
- Add App Store / GitHub links to projects as they go live (`links` arrays).
