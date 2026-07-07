# Personal Portfolio PRD — v2

> v2 revisions (2026-07-06): full-stack product engineer positioning, 5 featured projects locked,
> scroll-scrubbed transition, DOM-over-canvas architecture, single animation engine (GSAP),
> simplified mobile experience, repeat-visitor & reduced-motion paths, SEO/analytics added.

## Project Vision

Create a premium, one-page portfolio that tells the story of turning an idea into a finished product.

The portfolio should not feel like a traditional website. It should feel like a guided experience where the visitor watches a blueprint transform into a real application.

Primary goals:

- Impress recruiters within 30–60 seconds.
- Delight developers who explore further.
- Demonstrate frontend engineering, animation, UX, and polish.
- Keep navigation simple and fast.

---

# Positioning

**Full-stack product engineer.** The story is not "I write frontend code" — it's "I take ideas all the way to shipped products": iOS apps, web apps, backends, payments, analytics.

This aligns the personal brand with the site's own theme: Blueprint → Build → Production is literally what the featured projects demonstrate.

---

# Design Philosophy

**Theme: Blueprint → Build → Production**

Everything begins as a blueprint and becomes a finished object.

Every animation reinforces the same story:

Idea → Blueprint → Development → Production

Avoid flashy effects for the sake of using Three.js. Every movement should have purpose.

**Bridging the two aesthetics.** The site uses two visual languages — CAD blueprint and retro desktop windows. They are connected deliberately:

- Blueprint = the **design phase** (idea, drafting, wireframe)
- Retro `.exe` windows = the **shipped product** ("it compiled — here's the running program")

The windows are the *payoff* of the build story, not random nostalgia. Small touches sell the connection: title bars read `Project.exe — build 1.0.0 ✓`, window chrome uses the blueprint palette, opening a window plays a brief "compiling → done" beat.

---

# Architecture Principle (Critical)

**All content lives in the DOM. Three.js is the stage, never the container.**

- Text, cards, buttons, and windows are real HTML — selectable, crawlable, screen-reader accessible.
- The Three.js canvas renders *behind* the content: blueprint plane, grid, depth, particles, lighting, camera.
- GSAP coordinates the camera (canvas) and the content "materialization" (DOM) on a single timeline so they read as one scene.
- The render loop pauses when the scene is static (frameloop="demand") to protect battery and Lighthouse scores.

This is what makes Lighthouse 95+, SEO, and accessibility achievable alongside the 3D experience.

---

# User Experience Flow

## Scene 1 — Blueprint Landing

Camera starts directly above a large drafting table.

Environment:
- Dark navy blueprint
- Fine construction grid
- White drafting lines
- Subtle depth
- CAD-inspired aesthetic

Animation:
- Blueprint lines draw themselves.
- Name appears as if drafted.
- Navigation outlines appear.
- Small terminal initializes.

Example terminal:

```
Initializing portfolio.build()

Loading modules...
Preparing components...
```

The visitor immediately understands this is a portfolio about building software.

**Repeat visitors & reduced motion:**
- A subtle "skip" affordance (e.g. `[ skip intro ]` in JetBrains Mono) appears after ~1s.
- `sessionStorage` flag: on revisit within a session, the intro plays at ~2× speed or is skipped entirely.
- `prefers-reduced-motion`: skip straight to the built state with a simple fade — no camera move, no line drawing.

---

## Scene 2 — Camera Transition (Signature Moment)

**Scroll-scrubbed.** The transition progress is bound to scroll position — the visitor controls the pace, can reverse it, and is never locked out. Implemented with GSAP ScrollTrigger scrubbing a timeline that drives both the R3F camera and DOM element states.

As the visitor scrolls, the camera lowers from a top-down CAD view to an eye-level perspective. Simultaneously:

- Blueprint lines extrude into depth.
- Cards rise from the paper.
- Typography fills in.
- Buttons gain color.
- UI materializes.

The visual message:

"This started as an idea and became a real product."

After this transition, camera movement becomes subtle.

---

## Scene 3 — Main Portfolio

Once the transition finishes, the visitor sees a clean recruiter-friendly portfolio.

Sections:

1. Hero
2. About
3. Featured Projects
4. Experience
5. Skills
6. Contact

Everything exists on one page. No routing. No page changes.

---

## Scene 4 — Project Windows

Clicking a project opens a retro desktop-style application window.

Animation:

Project Card → Expands → Unfolds → Transforms into `Project.exe` Window

The window contains:

- Overview
- Problem
- Solution
- Architecture
- Tech Stack
- Screenshots
- Live Demo / App Store link
- GitHub
- Lessons Learned

Closing returns the visitor to the exact scroll position.

---

## Scene 5 — Contact

End with:

```
Build Successful ✓
```

Visitor is invited to connect. No giant CTA. Simple. Professional.

---

# Camera System

The camera tells the story.

Opening:
- Top-down
- Architectural

Transition:
- Scroll-scrubbed lowering
- Slight tilt

Main Portfolio:
- Mostly static
- Tiny parallax
- Very subtle pans
- Gentle push-ins when appropriate

Project Windows:
- Small zoom toward selected card
- Pull back when closed

Never make camera movement distracting.

---

# Three.js Usage

Three.js should support the experience rather than dominate it.

Use Three.js for:

- Camera
- Lighting
- Blueprint plane
- Depth
- Smooth transitions
- Small particles
- Mouse parallax
- Perspective

Avoid:

- Random spinning objects
- Flying through space
- Heavy particle systems
- Distracting visual effects
- Rendering any text or interactive content in-canvas

---

# Blueprint Visual Language

Everything follows one animation rule:

Wireframe → Outline → Skeleton → Finished Component

Examples:

- Buttons: outline → filled button
- Cards: wireframe rectangle → finished project card
- Typography: outline → filled
- Images: placeholder → actual screenshot

---

# Navigation

Sticky top navigation.

Sections:

- About
- Projects
- Experience
- Skills
- Contact

Smooth scrolling. No routing.

---

# Retro Window System

Used only for deeper content.

Windows include:

- `Project.exe` (one per featured project)
- `Resume.pdf`
- `Experience.exe`
- `TechStack.exe`
- `About.txt` (optional)

Design inspiration:

- Windows 95 / 98 chrome, reinterpreted in the blueprint palette (not gray-on-gray)
- Do not copy PostHog directly — take inspiration from the nostalgic desktop feel while maintaining modern visual quality
- Every window reinforces the "shipped product" framing: version numbers, build-success checkmarks, mono-font status bars

---

# Homepage Content

## Hero

Large headline. Example:

**Hi, I'm Anisong.**

**I turn ideas into shipped products — iOS apps, web platforms, and everything in between.**

Buttons:

- View Projects
- Download Resume

---

## Featured Projects (5)

Each project opens its own `Project.exe` window.

1. **FlipSide** — Real-time debate fact-checking iOS app. Live audio → Deepgram STT → Groq claim extraction → Gemini fact-check pipeline, Supabase backend. *The technical showstopper — lead with it.*
2. **PocketWorship** — Worship planning iOS app. Custom sync engine (server-anchored cursors, FK-ordered merge), RevenueCat subscriptions, Supabase, conversion-optimized onboarding.
3. **StampKit** — Multi-tenant loyalty platform. pnpm monorepo: customer web app, admin dashboard, iOS app, Apple Wallet passes, Stripe billing, 10 Supabase Edge Functions. *The breadth story.*
4. **Deckly** — Web app for Pokémon card vendors. Next.js, Supabase, Clerk auth, Stripe payments, eBay + Pokémon TCG API integrations. *The pure-web story.*
5. **Dewy** — Gamified skincare iOS app. Streaks, character/avatar system, AI skin analysis (Gemini), StoreKit 2 subscriptions. *The consumer-fun story.*

Each window's content follows the standard structure (Problem / Solution / Architecture / Stack / Screenshots / Links / Lessons Learned).

---

## Experience

Short timeline. Detailed information lives inside `Experience.exe`.

---

## Skills

Compact overview. Detailed stack opens inside `TechStack.exe`.

Organize by product layer, matching the full-stack positioning: iOS (Swift/SwiftUI), Web (React/Next.js/TypeScript), Backend (Supabase/Postgres/Edge Functions), Product (payments, analytics, onboarding, App Store shipping).

---

## Contact

- Email
- GitHub
- LinkedIn
- Resume

---

# Animation Guidelines

Timing: fast, premium, responsive. No long waits.

Recommended durations:

- Hover: 100–150ms
- Card expansion: 250ms
- Camera transition: scroll-scrubbed (spans ~100–150vh of scroll; no fixed duration)
- Window open: 250–350ms
- Blueprint draw: 0.5–1.5 seconds

Everything should feel polished.

---

# Color Palette

- Background: `#091D3B`
- Grid: subtle cyan
- Primary text: white
- Accent Blue: `#69B8FF`
- Success: `#00D084`
- Construction Accent: `#FFB547`

---

# Typography

- Headings: Geist
- Body: Inter
- Technical Labels: JetBrains Mono

---

# Tech Stack

## Core

- React
- TypeScript
- Vite
- Three.js
- React Three Fiber
- Drei

## Animation

- GSAP + ScrollTrigger (single animation engine — owns the scroll timeline, camera, and DOM materialization)
- CSS transitions for micro-interactions (hover, focus)

> Framer Motion removed: two animation systems fighting over the same elements causes jank and bundle bloat. GSAP handles everything Framer would.

## Styling

- Tailwind CSS
- class-variance-authority for component variants

> shadcn/ui removed: its neutral design language clashes with the blueprint/retro aesthetic, and every component would need heavy restyling. The site's small component set (buttons, cards, windows, nav) is custom-built.

## State

- Zustand (scene phase, active window, scroll progress)

## Utilities

- React Use
- clsx

## Icons

- Lucide React

## Analytics

- PostHog (recruiter behavior: which projects get opened, resume downloads, time to contact)

## Deployment

- Vercel

---

# Responsive Strategy

**Desktop (≥1024px):** full experience — WebGL blueprint scene, scroll-scrubbed camera transition, parallax.

**Mobile / tablet:** simplified, still on-theme:

- No WebGL camera move. The blueprint aesthetic is kept via CSS/SVG — line-draw animations (SVG stroke-dashoffset), grid background, blueprint-to-built crossfade on scroll.
- All content, windows, and interactions work identically (windows open as full-screen sheets on small viewports).
- Fast, reliable, and honest to the theme without risking 60fps on mid-range phones.

**Low-end / no-WebGL devices:** the mobile path doubles as the fallback. Feature-detect WebGL and device memory; degrade gracefully to the CSS/SVG experience.

---

# Performance Goals

- Lighthouse 95+ (all categories)
- 60 FPS animations on desktop
- Three.js loaded lazily, only on capable desktop viewports
- `frameloop="demand"` — no rendering while the scene is idle
- DPR capped at 2
- Lazy-load project screenshots
- Font subsetting + `font-display: swap`

---

# SEO & Sharing

- All content server-visible HTML (see Architecture Principle) — fully crawlable
- Meta title/description written for recruiters
- OG image: a blueprint-styled card with name + role (links get shared in Slack/email — this is the first impression before the site loads)
- Favicon: blueprint-style monogram

---

# Accessibility

- `prefers-reduced-motion` honored globally (skip intro, disable parallax, instant window opens)
- Full keyboard navigation, including opening/closing project windows (Esc closes)
- Focus trapped inside open windows; restored to the triggering card on close
- Semantic landmarks (`nav`, `main`, `section`) — the canvas is `aria-hidden`
- Color contrast checked against `#091D3B` background

---

# Success Criteria

A recruiter should understand within one minute:

- Who I am
- What I build
- My strongest projects
- My experience
- How to contact me

A developer should leave thinking:

"This portfolio tells a story and demonstrates excellent frontend craftsmanship."

The portfolio should feel memorable because of its thoughtful experience — not because of excessive effects.
