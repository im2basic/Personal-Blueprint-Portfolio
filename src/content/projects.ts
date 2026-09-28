export interface Project {
  slug: string
  /** Window title bar, e.g. "FlipSide.exe — build 1.0.0 ✓" */
  windowTitle: string
  name: string
  tagline: string
  platform: 'iOS' | 'Web' | 'iOS + Web'
  /** Short blurb shown on the card in the Featured Projects grid */
  cardBlurb: string
  overview: string
  problem: string
  solution: string
  architecture: string[]
  stack: string[]
  links: { label: string; url: string }[]
  lessons: string[]
  /** Screenshot paths under /public/projects/<slug>/ — to be added */
  screenshots: string[]
}

export const projects: Project[] = [
  {
    slug: 'munchi',
    windowTitle: 'Munchi.exe — build 1.0.0 ✓',
    name: 'Munchi',
    tagline: 'Photograph your fridge, cook tonight',
    platform: 'iOS',
    cardBlurb:
      'AI reads your fridge from a photo and turns what is already there into recipes you can cook tonight, plus pantry tracking and a food-waste savings tracker.',
    overview:
      'Munchi walks you through your kitchen shelf by shelf, identifies every ingredient from the photos, and ranks recipes by what you can actually make right now: Cook Now uses only what you have, Almost There needs one or two things that go straight onto a shopping list.',
    problem:
      'A full fridge and no dinner idea is a daily problem, and the cost of it lands in the bin: households throw away food they forgot they owned. Recipe apps answer the wrong question, asking what you want to cook instead of what you already have.',
    solution:
      'A multi-zone kitchen tour captures fridge, freezer, spice drawer and pantry, then one batched vision call names everything at once. Recognized items become a pantry with freshness tracking, which feeds a recipe pipeline that ranks by ingredient coverage and cooks down food-waste savings into a running total.',
    architecture: [
      'Flutter app (Riverpod, go_router) on a Convex TypeScript backend, with every model and vendor key confined to Convex actions so the client never holds one',
      'Multi-zone onboarding scan: photos upload as they are taken, then a single batched Gemini vision call identifies ingredients across all zones at once',
      'Recipe pipeline with a fingerprinted query cache (30-day TTL) in front of a third-party recipe API, and AI-authored recipes only as filler below a minimum result count, deduplicated by dish key',
      'Allergy and diet safety filter that discards unsafe recipes rather than trying to repair them',
      'RevenueCat subscriptions on StoreKit 2 with a Convex HTTP webhook: events ordered against stored timestamps so a redelivery cannot revoke an active subscriber, and cancellation never revokes access before expiration',
      'Supabase Auth migrated from Clerk behind a dual-issuer transition, so builds already in the field kept working through the cutover',
      'OneSignal digest notifications scheduled from Convex crons; PostHog on the onboarding and paywall funnel',
      '39 Flutter test files and 52 Convex backend test files covering the scan, quota, purchase and sync paths',
    ],
    stack: ['Flutter', 'Dart', 'Riverpod', 'Convex (TypeScript)', 'Gemini', 'Supabase Auth', 'RevenueCat (StoreKit 2)', 'OneSignal', 'PostHog'],
    links: [
      { label: 'App Store', url: 'https://apps.apple.com/us/app/munchi-fridge-to-recipes/id6802906604' },
      { label: 'Website', url: 'https://munchimunchii.com' },
    ],
    lessons: [
      'Cache the expensive call, not the cheap one: fingerprinting recipe queries kept vendor and model spend flat while the pantry kept changing.',
      'Subscription webhooks are ordering problems first: a cancellation is not an expiration, and a redelivered event must never take access away.',
      'Batching one vision call across every photo beat calling per photo on both accuracy and cost, because the model sees the whole kitchen as context.',
    ],
    screenshots: [],
  },
  {
    slug: 'flipside',
    windowTitle: 'FlipSide.exe — build 1.0.0 ✓',
    name: 'FlipSide',
    tagline: 'Real-time debate fact-checking',
    platform: 'iOS',
    cardBlurb:
      'Speak a claim, get a sourced fact-check card seconds later. Live audio → STT → claim extraction → verification, in real time.',
    overview:
      'FlipSide listens to live conversation or debate, extracts factual claims as they are spoken, and surfaces sourced fact-check cards within seconds — with per-speaker attribution.',
    problem:
      'In live debates and conversations, false claims spread faster than anyone can look them up. By the time you fact-check manually, the conversation has moved on.',
    solution:
      'A streaming pipeline that never interrupts: microphone audio streams to Deepgram for live transcription, Groq extracts check-worthy claims from the transcript, and Gemini verifies each claim against sources — all orchestrated so a card appears while the topic is still being discussed. Speaker A/B toggling attributes claims to the right person.',
    architecture: [
      'Streaming STT via Deepgram WebSocket with KeepAlive/CloseStream draining and idle-flush for short claims',
      'Claim extraction on Groq (low latency), verification on Gemini — each stage independently tunable',
      'All API keys isolated behind Supabase Edge Functions; the app never holds provider keys',
      'Per-user quota enforcement and RPC lockdown (security-definer functions) so no client can drain another user’s quota',
      'Debate persistence + stats (streaks, monthly counts) computed server-side via Postgres RPC',
      'Subscription paywall (Superwall + RevenueCat), PostHog analytics',
    ],
    stack: ['Swift', 'SwiftUI', 'Deepgram', 'Groq', 'Gemini', 'Supabase (Auth, Postgres, Edge Functions, Storage)', 'RevenueCat', 'Superwall', 'PostHog'],
    links: [],
    lessons: [
      'Latency budgets rule everything in a real-time pipeline — each stage was chosen for speed first, then quality tuned within that budget.',
      'Silent failure is the enemy: surfacing pipeline errors in the UI turned “it doesn’t work” bugs into fixable, specific ones.',
      'Security hardening (key isolation, quota RPCs) is much cheaper to build before launch than after.',
    ],
    screenshots: [],
  },
  {
    slug: 'pocketworship',
    windowTitle: 'PocketWorship.exe — build 1.0.0 ✓',
    name: 'PocketWorship',
    tagline: 'Worship presentation, from your pocket',
    platform: 'iOS + Web',
    cardBlurb:
      'A full worship-presentation app: plan services, present slides, and live-stream lyrics to any screen — offline-first with cloud sync.',
    overview:
      'PocketWorship lets worship teams plan services, manage songs with chords and keys, and present slides — with real-time streaming to web viewers so any device becomes a display via QR code.',
    problem:
      'Small churches rely on aging presentation software tied to a single computer. Volunteers need something that works on the device already in their pocket, keeps working without internet, and doesn’t require extra hardware.',
    solution:
      'An offline-first iOS app backed by a custom sync engine: everything persists locally in SQLite and synchronizes in the background to Supabase. Presentations stream in real time over Supabase Realtime channels — the congregation or a streaming device just scans a QR code.',
    architecture: [
      'Offline-first local persistence with GRDB (SQLite) and background sync to Supabase',
      'Custom sync engine: server-anchored cursors (immune to client clock skew), FK-ordered merge, last-write-wins conflict resolution, retry with failure marking',
      'Real-time slide streaming via Supabase Realtime + Edge Functions; QR-code viewer join, no extra hardware',
      'Multi-tenant church provisioning with row-level security across every table',
      'Conversion-optimized 13-step onboarding (survey → personalized paywall) feeding PostHog + RevenueCat subscriber attributes',
      '65+ unit tests over the sync pipeline and data layer',
    ],
    stack: ['Swift', 'SwiftUI', 'GRDB (SQLite)', 'Supabase (Auth, Postgres, Realtime, Storage, Edge Functions)', 'RevenueCat', 'PostHog'],
    links: [{ label: 'Website', url: 'https://pocketworship.com/' }],
    lessons: [
      'Never trust the client clock — sync cursors must be anchored to the server or rows silently vanish.',
      'Offline-first is an architecture decision, not a feature you bolt on later.',
      'Onboarding is part of the product: investment-building steps before the paywall measurably change conversion.',
    ],
    screenshots: [],
  },
  {
    slug: 'stampkit',
    windowTitle: 'StampKit.exe — build 1.0.0 ✓',
    name: 'StampKit',
    tagline: 'Loyalty platform for local business',
    platform: 'iOS + Web',
    cardBlurb:
      'A multi-tenant digital stamp-card platform: customer web app, admin dashboard, iOS app, and Apple Wallet passes — one monorepo.',
    overview:
      'StampKit gives coffee shops and local businesses a complete digital loyalty program: customers join from the web in seconds and get an Apple Wallet card instantly — no app download required.',
    problem:
      'Paper stamp cards get lost and can’t be measured; existing loyalty SaaS is expensive and generic. Businesses need branded loyalty with real anti-fraud and campaign tools, without enterprise pricing.',
    solution:
      'A multi-tenant platform where each business gets a branded subdomain storefront, a self-serve onboarding wizard with live preview, an admin Scan Mode with per-staff PINs, and research-backed loyalty mechanics (endowed progress, post-redemption re-engagement) built into the engine itself.',
    architecture: [
      'pnpm monorepo: customer web app, admin dashboard, iOS app (XcodeGen + branded xcconfigs), shared config package',
      'Zod-validated tenant config with category presets; theming flows from one TenantTheme token set across web and iOS',
      '21 Postgres tables with full row-level security; geo lookup via a nearby-locations RPC',
      '10 Supabase Edge Functions: stamp issuance (velocity limits, self-stamp blocking, endowed-card rollover), reward redemption, web join, tenant provisioning, campaign send with push → Wallet pass → email fallback, Stripe webhooks with refund clawback',
      'Web-first join: email OTP → instant Apple Wallet card; rotating QR tokens against screenshot fraud',
      'Stripe subscription billing; MapKit JS store locator',
    ],
    stack: ['TypeScript', 'Next.js', 'Supabase', 'PostgreSQL', 'Stripe', 'Swift/SwiftUI', 'Apple Wallet (PassKit)', 'MapKit JS', 'pnpm workspaces'],
    links: [],
    lessons: [
      'Multi-tenancy is a day-one decision — RLS policies and tenant config touch every table and every screen.',
      'Behavioral research (endowed progress, goal gradient) is most valuable when encoded in the engine, not left as advice.',
      'A monorepo with a shared config package keeps three apps honest about one source of truth.',
    ],
    screenshots: [],
  },
  {
    slug: 'deckly',
    windowTitle: 'Deckly.exe — build 1.0.0 ✓',
    name: 'Deckly',
    tagline: 'SaaS tooling for TCG vendors',
    platform: 'Web',
    cardBlurb:
      'Full-stack SaaS for Pokémon card vendors: live card search and pricing, inventory, sales history, and tiered pricing.',
    overview:
      'Deckly gives trading-card vendors the tools big marketplaces keep to themselves: real-time card data, inventory management, sales history, and tiered pricing — in a fast, mobile-first web app.',
    problem:
      'TCG vendors juggle spreadsheets, marketplace tabs, and price-checking apps. Inventory, pricing, and sales data live in different places and go stale fast.',
    solution:
      'One platform: search any card with live pricing and images from external TCG data sources, track inventory and sales, and manage tiered pricing structures — with auth, billing, and analytics production-ready from day one.',
    architecture: [
      'Next.js/React front-end with responsive, mobile-first UI in Tailwind',
      'Supabase Postgres schema optimized for vendor inventories, sales history, and tiered pricing',
      'RESTful integrations with the Pokémon TCG API for real-time card search, pricing, and image retrieval; eBay integration for marketplace workflows',
      'Clerk authentication, Stripe subscription billing, PostHog product analytics',
      'Deployed on Vercel',
    ],
    stack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS', 'Supabase (Postgres)', 'Clerk', 'Stripe', 'PostHog', 'Vercel'],
    links: [{ label: 'Live site', url: 'https://www.decklytcg.com/' }],
    lessons: [
      'External data APIs need a caching and normalization layer — never render third-party responses directly.',
      'Mobile-first matters double for vendors who manage inventory from a phone at card shows.',
    ],
    screenshots: [],
  },
  {
    slug: 'dewy',
    windowTitle: 'Dewy.exe — build 1.0.0 ✓',
    name: 'Dewy',
    tagline: 'Skincare habits, gamified',
    platform: 'iOS',
    cardBlurb:
      'A gamified skincare companion: streaks, an evolving character, AI skin analysis, and XP — habit science with personality.',
    overview:
      'Dewy turns a skincare routine into a habit loop: complete your routine to keep your character glowing, earn XP and levels, and get AI-powered skin analysis from a photo.',
    problem:
      'Skincare routines fail for the same reason gym habits do — no feedback loop. Nothing tells you the streak matters until your skin does, weeks later.',
    solution:
      'A character whose state mirrors your consistency (glowing → tired → zombie), streak mechanics with real stakes, AI skin analysis via Gemini for personalized feedback, and social features (friends, XP) — monetized with StoreKit 2 subscriptions.',
    architecture: [
      'SwiftUI with a state-driven avatar system (six health states tied to streak integrity)',
      'Gemini-powered skin analysis with enforced scan quotas',
      'Supabase backend: auth with consent flow, XP/levels, friend system with acceptance rewards',
      'StoreKit 2 subscriptions with restore purchases; shop system for character/scene unlocks via remote CDN art',
      'Privacy manifest, camera permissions, and deep-link scheme configured for App Store review',
      '39 unit tests over the data layer',
    ],
    stack: ['Swift', 'SwiftUI', 'Supabase', 'Gemini', 'StoreKit 2', 'PostHog'],
    links: [],
    lessons: [
      'Gamification only works when the mechanic has stakes — a character that can visibly decay beats a number that only goes up.',
      'App Store compliance (privacy manifests, permission strings, IAP review rules) deserves a checklist pass before every submission.',
    ],
    screenshots: [],
  },
]
