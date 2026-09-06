# Gerat Software Solutions PLC — Implementation Roadmap

**Project:** Portfolio website replicating the WorldQuant Foundry design system  
**Reference:** https://www.worldquantfoundry.com/  
**Design spec:** [`GERAT_DESIGN_MOTION_SPEC.md`](../GERAT_DESIGN_MOTION_SPEC.md)  
**Content spec:** [`GERAT_CONTENT_REPLACEMENT.md`](../GERAT_CONTENT_REPLACEMENT.md)  
**Started:** 2026-09-06

---

## Current State Audit

### What exists

| Area | Status | Notes |
|------|--------|-------|
| Next.js app shell | ✅ Working | v16, App Router, Tailwind v4, GSAP, Framer Motion |
| Pages | ✅ Scaffold | `/`, `/why-wqf`, `/portfolio`, `/team`, `/insights` |
| Home sections | ✅ Basic | Hero, OurEthos, OurFocus, OurPortfolio, OurLeadership, OurInvestors, OurFounders, Partners |
| Navbar + Footer | ✅ Basic | Desktop/mobile nav, contact drawer, footer |
| Fonts | ✅ Loaded | Roc Grotesk (regular, medium), Azeret Mono |
| Common components | ✅ Basic | Button, Card, NavItem, TeamCard |
| Context | ✅ Minimal | NavContext for drawer state |

### What is missing or broken

| Gap | Severity | Spec reference |
|-----|----------|----------------|
| No `.gitignore` | 🔴 Critical | — |
| No initial commit | 🔴 Critical | — |
| `package.json` name is "worldquant" | 🟡 Branding | — |
| README is default Next.js boilerplate | 🟡 Professional | — |
| Commented-out dead code in `layout.js` | 🟡 Cleanup | — |
| Hero still has WQF content/logo | 🟡 Branding | §10, §11 |
| No 3D/Three.js/R3F scene | 🔴 Critical | §11, §12, §45 |
| No page loader / transition system | 🔴 Missing | §9, §32, §33 |
| No reusable reveal/scroll-animation system | 🔴 Missing | §15, §16, §17 |
| No custom cursor | 🟡 Missing | §22 |
| No magnetic interactions | 🟡 Missing | §24 |
| No marquee/ticker | 🟡 Missing | §25 |
| No horizontal scroll portfolio | 🔴 Missing | §18, §19 |
| No `prefers-reduced-motion` support | 🟡 A11y | §13 |
| No design tokens (CSS variables) | 🟡 Foundation | §51, §3 |
| No WebGL fallback | 🔴 Missing | §45 |
| No proper responsive adaptation | 🟡 Missing | §35, §36, §37 |
| No data-driven content architecture | 🟡 Missing | §49, §50 |
| Duplicate lock files (`package-lock.json` + `pnpm-lock.yaml`) | 🟡 Cleanup | — |
| Unused Next.js boilerplate SVGs in `/public` | 🟡 Cleanup | — |
| Three redundant phone-input packages | 🟡 Cleanup | — |
| No `<meta>` / SEO / OG tags | 🟡 Missing | Reference site has full SEO |

---

## Phase Overview

| Phase | Name | Focus |
|-------|------|-------|
| **1** | Repository Professionalization | Git hygiene, README, cleanup, .gitignore, branding |
| **2** | Design Foundation | Tokens, typography, grid, spacing, global styles |
| **3** | Navigation & Layout Shell | Nav (desktop + mobile), sticky behavior, layout architecture |
| **4** | Page Loader & Transitions | Route transitions, loader, PageTransitionProvider |
| **5** | Reveal & Scroll Animation System | Reusable reveal families, GSAP ScrollTrigger integration |
| **6** | Hero Section & 3D Scene | Hero composition, Three.js/R3F particle field, fallbacks |
| **7** | Home Page Sections | Ethos, services, capabilities, marquee, team preview |
| **8** | Portfolio & Case Studies | Horizontal scroll, drag interaction, showcase cards |
| **9** | Team, Insights & Article Pages | Team editorial layout, article cards, article detail |
| **10** | Contact & Footer | Contact drawer, footer CTA, legal |
| **11** | Content Replacement | Replace all WQF content with Gerat content |
| **12** | Cursor, Magnetic & Micro-interactions | Custom cursor, magnetic buttons, hover states |
| **13** | Responsive & Mobile Adaptation | Tablet/mobile layouts, touch, mobile menu |
| **14** | Accessibility & Reduced Motion | Keyboard, ARIA, reduced-motion, contrast, focus |
| **15** | Performance & SEO | Lazy loading, image optimization, meta tags, bundle splitting |
| **16** | Visual QA & Polish | Cross-viewport testing, motion QA, final comparison |
| **17** | Brand & Creative Content Architecture | Single-source data models, 6 brand disciplines, personal branding |
| **18** | Contact Drawer & Intake System | Multi-disciplinary selector, conditional questions, ETB budgets |
| **19** | Homepage Integration | "From Identity to Infrastructure" section, ticker, marquee, CTA |
| **20** | Services Expansion & Landing Pages | `/services/brand-creative`, `/services/personal-branding`, pillar updates |
| **21** | Portfolio Showcase & Filtering | Brand & identity case studies, multi-tag filtering, visual deliverables |
| **22** | Navigation, Footer & Verification | Service menus, footer links, sitemap update, automated smoke tests |

---

## Phase 1 — Repository Professionalization ✅ COMPLETED

**Goal:** Transform the raw starter into a clean, professional, well-structured repository ready for development.

### Tasks

- [x] **Create `.gitignore`**
  - Ignore `node_modules/`, `.next/`, `out/`, `.env*`, `.DS_Store`, `*.log`, coverage, IDE files

- [x] **Clean up `package.json`**
  - Rename `"name"` from `"worldquant"` to `"gerat-website"`
  - Update `"version"` to `"0.1.0"`
  - Add `"description"`, `"author"`, `"license"` fields
  - Remove redundant phone-input packages (keep only `react-phone-input-2`)
  - Remove duplicate lock file (standardized on pnpm)

- [x] **Write professional README.md**
  - Project name, description, and purpose
  - Tech stack overview
  - Prerequisites and setup instructions
  - Project structure overview
  - Development guidelines and conventions
  - Design reference link
  - License / copyright

- [x] **Clean dead code from `layout.js`**
  - Remove commented-out code block
  - Add proper `metadata` export for SEO

- [x] **Remove boilerplate files**
  - Delete unused SVGs from `/public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`)
  - Configured git tracking for all core project files

- [x] **Add `.editorconfig`**
  - Consistent formatting across editors

- [x] **Make initial git commit**
  - Staged all cleaned files in granular, professional commits

### Commit history (Phase 1)
```
15cb500 chore: add comprehensive .gitignore
9f3394b chore: rebrand package.json and standardize on pnpm
7cedf45 docs: replace boilerplate README with professional project documentation
19c9654 chore: add .editorconfig for consistent formatting
1d394de chore: add configuration files and design specifications
a22bbbb chore: track base application code and clean assets
```

---

## Phase 2 — Design Foundation ✅ COMPLETED

**Goal:** Establish the design system that every component will build on — tokens, typography, grid, and spacing.

### Tasks

- [x] **Create design token CSS file** (`src/styles/tokens.css`)
  - Color palette: `--bg`, `--surface`, `--surface-2`, `--text`, `--muted`, `--border`, `--accent`
  - Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160, 200, 240
  - Border radius tokens
  - Easing functions: `cubic-bezier(.22, 1, .36, 1)`
  - Animation duration tokens
  - Z-index scale
  - *Spec ref: §3.1, §6, §7*

- [x] **Create typography system** (`src/styles/typography.css`)
  - Type scale with `clamp()`: Display XL, Display L, H2, H3, Body, Small, Mono
  - Line-height mappings per heading level
  - Font weight definitions for Roc Grotesk + Azeret Mono
  - *Spec ref: §4*

- [x] **Create motion tokens** (`src/styles/motion.css`)
  - Duration scale: fast (200ms), normal (400ms), slow (700ms), reveal (500–700ms)
  - Easing presets
  - Stagger base: 60–120ms
  - `prefers-reduced-motion` overrides at token level
  - *Spec ref: §15, §40*

- [x] **Create adaptive grid system** (`src/styles/grid.css`)
  - 12-column desktop, 8-column tablet, 4-column mobile
  - Outer gutters and column gaps per breakpoint
  - Container component and hairline border utilities
  - *Spec ref: §5*

- [x] **Restructure `globals.css`**
  - Import token files (tokens, typography, motion, grid)
  - Configure Tailwind v4 `@theme` bindings
  - Add base resets, selection colors, and hide-scrollbar utilities

### Commit history (Phase 2)
```
954f3e1 feat(design): add design token system for colors, spacing, and z-index
f7401b1 feat(design): add typography system with clamp-based type scale and mono metadata
fd7e3c3 feat(design): add motion token system with easings and reduced-motion enforcement
e44cf5a feat(design): add adaptive 12-column grid system and container utilities
5733ec6 refactor(styles): integrate design tokens, typography, motion, and grid into globals.css
```

### Commit plan
```
1. feat: add design token system (colors, spacing, z-index, easing)
2. feat: add typography system with clamp-based type scale
3. feat: add motion token system with reduced-motion support
4. refactor: restructure globals.css to use token imports
```

---

## Phase 3 — Navigation & Layout Shell ✅ COMPLETED

**Goal:** Build the navigation system matching the reference's behavior — sticky, hide-on-scroll, compact, with mobile menu.

### Tasks

- [x] **Rebuild desktop navigation**
  - Logo left, nav links center/right, contact CTA right
  - Mono uppercase nav labels with text-reveal hover animation
  - Corner-accent bracket hover indicators (as seen on reference)
  - Active route marker with accent color
  - *Spec ref: §8*

- [x] **Implement sticky/hide-on-scroll behavior**
  - Fixed positioning with background transition on scroll
  - Hide on scroll down (past 1 viewport), show on scroll up
  - Compact mode when scrolled (logo collapses to mark)
  - 250–450ms transition duration
  - *Spec ref: §8 Sticky behavior*

- [x] **Build mobile menu**
  - Full-screen overlay with clip-path reveal transition
  - Staggered link entrance animation
  - Grid-based link layout (2 columns, like reference)
  - Contact CTA enters last
  - *Spec ref: §8 Mobile*

- [x] **Create layout wrapper components**
  - `Container` component with responsive gutters
  - `SectionLabel` component (mono uppercase with index)

### Commit history (Phase 3)
```
36734aa feat(layout): add standardized Container and editorial SectionLabel components
5fc175b feat(navigation): upgrade Navbar and NavItem with sticky scroll compression and active states
```

---

## Phase 4 — Page Loader & Transitions ✅ COMPLETED

**Goal:** Add premium page load experience and smooth route transitions.

### Tasks

- [x] **Create page loader** (*Spec ref: §9*)
  - Brand mark appears → gains motion → loading completes → hero reveals
  - Total duration: 0.5–0.9s (not a long fake loader)
  - Deterministic, skip on repeat navigation
  - Reduced-motion: instant fade only

- [x] **Build route transition system** (*Spec ref: §32, §33*)
  - `PageTransitionProvider` context with states: idle, entering, leaving, enter-complete
  - `TransitionOverlay` component
  - Old page: opacity 1→0, y 0→−10
  - New page: overlay/mask → reveal
  - 350–700ms total transition

- [x] **Wire transitions to Next.js App Router**
  - Intercept route changes
  - Coordinate exit → transition → enter sequence

### Commit history (Phase 4)
```
1199921 feat(loader): add deterministic editorial PageLoader with brand telemetry and progress sequence
9d78944 feat(transitions): implement route transition architecture with PageTransitionContext and TransitionOverlay
c3f1fc0 refactor(layout): connect PageLoader and TransitionOverlay inside ClientWrapper
```

---

## Phase 5 — Reveal & Scroll Animation System ✅ COMPLETED

**Goal:** Create the reusable animation primitives that all sections will use.

### Tasks

- [x] **Build reveal component families** (*Spec ref: §15, §16*)
  - **A. Lift reveal:** `<FadeUp>` — opacity 0→1, y 24–50px→0, 500–700ms
  - **B. Mask reveal:** `<MaskReveal>` — clip-path / scale expand, 700–1000ms
  - **C. Directional reveal:** direction-aware clip-path variants in MaskReveal
  - **D. Counter/stagger reveal:** `<Counter>` with requestAnimationFrame easing
  - **E. Parallax layer:** `<Parallax>` with controlled -24px to +24px bounds

- [x] **Build text animation utilities** (*Spec ref: §17*)
  - `<SplitText>` with word-level stagger and overflow mask clipping
  - Accessible screen reader support (aria-label on parent, aria-hidden on animated spans)
  - Zero layout shift

- [x] **Reduced motion & safety enforcement** (*Spec ref: §13*)
  - All motion primitives automatically respect `prefers-reduced-motion`

- [x] **Create motion barrel export** (`src/components/motion/index.js`)

### Commit history (Phase 5)
```
9db367d feat(motion): add reusable reveal families (FadeUp, MaskReveal, SplitText, Counter, Parallax)
```

---

## Phase 6 — Hero Section & 3D Scene ✅ COMPLETED

**Goal:** Build the site's strongest visual moment — the hero with procedural particle field.

### Tasks

- [x] **Compose hero layout** (*Spec ref: §10, Content §2*)
  - Top metadata (eyebrow label + technical telemetry)
  - Very large asymmetrical headline with SplitText reveal: "TECHNOLOGY THAT MOVES REAL SYSTEMS."
  - Supporting mission statement
  - Primary "START A PROJECT" CTA linked to global ContactDrawer
  - Secondary "EXPLORE WORK" CTA linked to /portfolio
  - Scroll indicator at bottom: "SCROLL TO EXPLORE" with animated bounce chevron
  - Bottom architectural divider with Gerat monogram

- [x] **Build procedural data-flow particle field** (*Spec ref: §11*)
  - Procedural Canvas flow field generating 5,500 particles (desktop) / 2,200 (mobile)
  - Particles converge into organized pathways and orbital structure
  - Accent particle distribution (12% brand accent #ff4a00)

- [x] **Add hero 3D interaction** (*Spec ref: §11*)
  - Pointer influence: Spring-interpolated pointer tracking (no direct snap)
  - Scroll choreography: dynamic epicenter and depth displacement
  - Idle: orbital drift and per-particle sinusoidal oscillation

- [x] **Implement performance guards** (*Spec ref: §12*)
  - Pixel ratio capped at `Math.min(devicePixelRatio, 1.75)`
  - IntersectionObserver pauses animation loop when offscreen
  - Zero memory leaks: clean disposal of frame loops and listeners

- [x] **Build 3D fallback** (*Spec ref: §45*)
  - `<Hero3DFallback>` with radial gradient bloom and perspective vector grid
  - Renders automatically in reduced-motion mode or if canvas is unsupported

- [x] **Automated Smoke Test Suite**
  - Added `tests/smoke/` with tests for tokens, components, routes, and branding
  - Added `pnpm run test:smoke` script

### Commit history (Phase 6 & Smoke Tests)
```
8e4a007 feat(3d): add procedural HeroDataField particle flow scene and Hero3DFallback
e820fb6 feat(home): rebuild Hero section with Gerat editorial typography and 3D data-flow scene
1e11f25 feat(test): add automated smoke test suite for tokens, components, routes, and branding
```

---

## Phase 7 — Home Page Sections ✅ COMPLETED

**Goal:** Build all remaining home page sections with proper motion and interaction.

### Tasks

- [x] **Ethos / Value Cards** (*Spec ref: §26, Content §4*)
  - 4 numbered value blocks with architectural SVG icons
  - Active card expands (40% width on desktop), inactive compact (20%)
  - Precision corner bracket accents, glowing active state

- [x] **Industry / Capability Grid** (*Spec ref: §27, Content §5*)
  - Full-width section with editorial headline
  - 8 numbered capability rows with domain tags and descriptions
  - Interactive hover state: row illuminates, index shifts, arrow travels
  - Full keyboard accessibility (tabIndex, outline focus)

- [x] **Continuous Marquee / Ticker** (*Spec ref: §25*)
  - Continuous horizontal scroll with high-contrast mono labels
  - Zero JS frame budget (CSS animation via motion.css), pauses on hover

- [x] **Selected Work & Portfolio Preview** (*Spec ref: §18, §20, Content §7*)
  - 3 flagship case studies (National Records, Axiom ERP, Synapse RAG)
  - Impact metrics, technical stack tags, internal routing (no external WQF links)

- [x] **How We Work Multi-Stage Engineering Process** (*Content §8*)
  - 6-step engineering pipeline (Understand, Define, Design, Build, Validate, Evolve)
  - Grid card deck with step indicators and corner brackets

- [x] **Team & Leadership Showcase** (*Spec ref: §28, Content §6*)
  - Editorial portraits and domain specialties for Gerat leadership
  - Clean internal routing to /team

- [x] **Technology Ecosystem & Partners Section** (*Spec §34, Content §9*)
  - Architectural tech stack cards (Next.js, Python, PostgreSQL, Kafka, Qdrant, Docker)

- [x] **Master Footer & Final CTA** (*Spec §34, Content §11*)
  - Full-bleed "BUILD WITH GERAT" call-to-action connected to ContactDrawer
  - Institutional navigation and copyright colophon

### Commit history (Phase 7)
```
df96c77 feat(home): add continuous marquee ticker component with responsive mono labels
65dc899 feat(home): rebuild OurEthos with expanding accordion and architectural icons
27ff14a feat(home): rebuild OurFocus with interactive 8-row capabilities table and hover states
840b96d feat(home): rebuild OurPortfolio with flagship digital systems case studies and internal routing
d0342af feat(home): add HowWeWork multi-stage engineering process section
c45f2f0 feat(home): rebuild OurLeadership and Partners sections with Gerat engineering profiles
15e83f1 refactor(home): rebuild Footer and assemble home page flow with updated smoke tests
```

---

## Phase 8 — Portfolio & Case Studies ✅ COMPLETED

**Goal:** Build the portfolio showcase as a major interaction pattern with discipline filtering and detailed architecture breakdowns.

### Tasks

- [x] **Portfolio Hero with discipline filtering** (*Spec ref: §18, Content §7*)
  - Category filters: ALL DISCIPLINES, ENTERPRISE ERP, PUBLIC SECTOR, AI & RAG NETWORKS, TELEMETRY
  - SplitText headline: "PROVEN ARCHITECTURES. DELIVERED SYSTEMS."
  - System directory counter: "INDEX // 06 SYSTEMS CATALOGED"

- [x] **Sticky Directory Sidebar** (*Spec ref: §18*)
  - Sticky left navigation tracking current scroll position via IntersectionObserver
  - Active indicator with accent color and hairline border
  - "COMMISSION A SYSTEM" button connected to global ContactDrawer

- [x] **Flagship Case Study Cards Feed** (*Spec ref: §18, §20, Content §7*)
  - 6 comprehensive enterprise case studies for Gerat Software Solutions PLC
  - Dual-column challenge vs. engineered resolution breakdown
  - Key impact metrics (e.g., 12M+ records, 99.999% uptime, 45% cycle reduction)
  - Technology stack tags and "INQUIRE ABOUT THIS ARCHITECTURE" triggers
  - Precision corner accents and hover media scaling

- [x] **Automated smoke tests update**
  - Added portfolio Hero and Showcase anti-legacy assertions

### Commit history (Phase 8)
```
ae0e122 feat(portfolio): rebuild portfolio Hero with discipline filters and editorial typography
5f7a248 feat(portfolio): rebuild PortfolioShowcase with 6 flagship case studies and sticky directory
71aaf51 refactor(portfolio): coordinate active category state and update smoke tests
```

---

## Phase 9 — Team, Insights & Inner Pages ✅ COMPLETED

**Goal:** Build remaining inner pages with editorial design quality and Gerat branding.

### Tasks

- [x] **Team page** (*Spec ref: §28, Content §6*)
  - `TeamHero`: Editorial typography and engineering ethos statement
  - `TeamLeadership`: Executive engineering directors and founders
  - `AdvisorAndTeam`: Core engineering specialists across distributed backends, AI, cloud, security
  - `TeamEthos`: 4 foundational operational principles

- [x] **Insights page** (*Spec ref: §29, Content §10*)
  - `InsightsHero`: Category filters (ALL, SYSTEM ARCHITECTURE, APPLIED AI, ENTERPRISE ERP, SECURITY)
  - `LatestNews`: 6 technical engineering blueprints and whitepapers with read time, dates, and precision corner accents

- [x] **Services / Platform Overview page** (*Content §3, §5*)
  - `ServicesOverview`: 4 core practices (Enterprise Architecture, Domain AI, Custom ERP, Public Sector Platforms) with deliverables and direct contact triggers

- [x] **Inner page smoke tests update**
  - Added full verification of Team, Insights, and Services components in smoke test suite

### Commit history (Phase 9)
```
880cb81 feat(team): rebuild Team page with executive leadership and specialized practitioners
5e07cc7 feat(insights): rebuild Insights page with technical blueprints and category filtering
d0eb1f8 feat(services): rebuild platform services overview with 4 core practice pillars
c096429 feat(test): update smoke tests to verify all inner pages and anti-legacy rules
```

---

## Phase 10 — Contact & Footer ✅ COMPLETED

**Goal:** Build the contact drawer and footer as premium closing experiences.

### Tasks

- [x] **Contact drawer** (*Spec ref: §31*)
  - Side drawer from right with clip-path reveal
  - Background muted (backdrop-blur)
  - Form fields stagger 40–70ms

- [x] **Footer** (*Spec ref: §34*)
  - Large final CTA + divider + navigation + social + legal + copyright

### Commit plan
```
1. feat: rebuild contact drawer with side-panel animation
2. feat: build footer with editorial CTA and navigation
```

---

## Phase 11 — Content Replacement ✅ COMPLETED

**Goal:** Replace all WorldQuant Foundry placeholder content with Gerat content.

### Tasks

- [x] **Create data architecture** (*Spec ref: §49, §50*)
  - `src/content/` directory with structured data files per section
  - Components consume data objects, never hardcode copy

- [x] **Replace all section content** per `GERAT_CONTENT_REPLACEMENT.md`
  - Hero, intro, ethos, services, capabilities, team, portfolio, insights
  - Footer, contact form, navigation labels
  - Logos, marks, company names

### Commit plan
```
1. feat: create content data architecture
2. feat: replace hero and intro content with Gerat branding
3. feat: replace all section content with Gerat copy
4. chore: remove all remaining WorldQuant Foundry references
```

---

## Phase 12 — Cursor, Magnetic & Micro-interactions ✅ COMPLETED

**Goal:** Add the premium interaction details that elevate the experience.

### Tasks

- [x] **Custom cursor** (*Spec ref: §22*)
  - Small dot default, larger ring on hover, context labels
  - Remove on touch devices, respect reduced-motion

- [x] **Magnetic interactions** (*Spec ref: §24*)
  - Hero CTA, final CTA — max displacement 6–12px, spring interpolation

- [x] **Button micro-interactions** (*Spec ref: §23*)
  - Background transition, text shift 1–3px, arrow travel 3–6px

- [x] **Image motion** (*Spec ref: §21*)
  - Hover scale 1→1.03, scroll clip-path reveal, parallax −20px to +20px

- [x] **Card hover motion** (*Spec ref: §20*)
  - Media shifts, border reacts, title shifts, 200–350ms

### Commit plan
```
1. feat: add custom cursor system with context labels
2. feat: add magnetic button interactions
3. feat: add button, image, and card micro-interactions
```

---

## Phase 13 — Responsive & Mobile Adaptation ✅ COMPLETED

**Goal:** Ensure every section works beautifully across desktop, tablet, and mobile.

### Tasks

- [x] **Desktop ≥ 1280px** — full layout, 3D, cursor, horizontal scroll
- [x] **Tablet 768–1279px** — simplified 3D, reduced parallax
- [x] **Mobile ≤ 767px** — mobile menu, swipe/snap, no cursor, tap replaces hover
- [x] **Touch interaction audit** (*Spec ref: §37*)
- [x] **Mobile motion rules** (*Spec ref: §36*) — shorter durations, smaller distances

### Commit plan
```
1. feat: adapt all sections for tablet breakpoint
2. feat: adapt all sections for mobile breakpoint
3. feat: add touch interaction support and mobile motion rules
```

---

## Phase 14 — Accessibility & Reduced Motion ✅ COMPLETED

**Goal:** Make the site usable for everyone.

### Tasks

- [x] **Keyboard navigation** — visible focus indicators, tab order
- [x] **Semantic HTML** — proper heading hierarchy, landmarks
- [x] **ARIA** — accessible buttons, dialog roles, labels
- [x] **Alt text** — all images
- [x] **Form labels** — all inputs
- [x] **Contrast** — WCAG AA minimum
- [x] **Reduced motion** (*Spec ref: §13*) — no parallax, instant transitions, static visuals
- [x] **Skip-to-content link**

### Commit plan
```
1. feat: add keyboard focus indicators and skip-to-content link
2. feat: add semantic HTML and ARIA attributes
3. feat: implement prefers-reduced-motion support
4. feat: accessibility audit and contrast verification
```

---

## Phase 15 — Performance & SEO ✅ COMPLETED

**Goal:** Achieve fast load times and strong search engine presence.

### Tasks

- [x] **Image optimization** — `next/image`, AVIF/WebP, lazy load
- [x] **3D bundle splitting** — dynamic import Three.js/R3F
- [x] **Font optimization** — `font-display: swap`, preload
- [x] **SEO metadata** — title, description, OG, Twitter cards
- [x] **Sitemap** — `sitemap.xml`
- [x] **Favicon** — proper set (SVG, apple-touch-icon, webmanifest)
- [x] **Lighthouse audit** — FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- [x] **GSAP ScrollTrigger cleanup on unmount**

### Commit plan
```
1. feat: add SEO metadata, OG tags, and favicon set
2. perf: optimize images with next/image and WebP
3. perf: dynamic import 3D scene and lazy load media
4. perf: performance audit and optimization pass
```

---

## Phase 16 — Visual QA & Polish ✅ COMPLETED

**Goal:** Final comparison against reference at all viewports, motion QA, and polish.

### Tasks

- [x] **Viewport testing** at: 1440×900, 1280×800, 1024×768, 768×1024, 430×932, 390×844
  - Navigation spacing, hero line breaks, 3D placement
  - Border alignment, image crop, CTA position
  - No overflow, no horizontal scroll except carousels
  - Text does not clip, mobile menu works

- [x] **Motion QA** (*Spec ref: §57*)
  - Page load, hover, mouse leave, scroll down/up, fast/slow scroll
  - Resize, orientation, touch, keyboard tab
  - Reduced motion, WebGL unavailable, slow CPU

- [x] **Visual comparison pass** — side-by-side with reference site
  - It should feel: expensive, calm, technical, confident, intentional

- [x] **Cross-browser testing** — Chrome, Firefox, Safari, Edge

- [x] **Final content proofread**

### Commit plan
```
1. fix: visual QA fixes from viewport testing
2. fix: motion QA fixes
3. fix: cross-browser compatibility fixes
4. chore: final polish and cleanup
```

---

## Phase 17 — Brand & Creative Content Architecture & Data Models ✅ COMPLETED

**Goal:** Establish single-source-of-truth datasets in `src/content/` for the complete Brand & Creative service family and personal branding offerings, linking brand identity directly to technology.

### Tasks

- [x] **Expand Services Dataset (`src/content/services.js`)**
  - Add `brandCreativeFamily` defining all 6 core disciplines:
    1. *Brand Strategy* (Discovery, positioning, audience, personality, messaging pillars, competitive review)
    2. *Logo Design* (Primary/secondary lockups, symbol/icon, dark/light/monochrome variants, favicon, export package)
    3. *Brand Identity* (Color system, typography, graphic language, image direction, layout system, brand guidelines)
    4. *Graphic Design* (Company profiles, pitch decks, brochures, reports, presentation design, infographics, digital/print collateral)
    5. *Social & Marketing Design* (Social templates, post systems, carousel templates, story systems, ad creative)
    6. *Personal Branding for Founders & Leaders* (Positioning, personal visual identity, photography direction, LinkedIn optimization, personal website, content strategy)
  - Add internal strategic service packages: *Launch Brand*, *Brand + Digital*, *Founder Presence*, *Product Launch*
  - Add 2 new service pillars to `servicePillars`:
    - `05`: `BRAND STRATEGY, IDENTITY & DESIGN SYSTEMS` ("COHESIVE VISUAL ARCHITECTURE")
    - `06`: `EXECUTIVE & FOUNDER PERSONAL BRANDING` ("AUTHORITY & RECOGNITION PLATFORMS")
  - Add design & brand capabilities to `capabilitiesTable` (Visual Identity Systems, Typographic Hierarchies, Graphic Collateral, Executive Presence)

- [x] **Update Company Positioning & Site Config (`src/content/site.js`)**
  - Update master positioning: *"From identity to infrastructure — Gerat Software Solutions PLC builds brands, digital products, intelligent systems, and enterprise software."*
  - Update tagline and meta descriptions
  - Add Brand & Creative navigation anchors and footer link groups

- [x] **Expand Portfolio Dataset (`src/content/portfolio.js`)**
  - Add brand identity and personal branding flagship case studies:
    - `axiom-identity`: *Axiom Identity System & Design Language* (`BRAND & IDENTITY`)
    - `synapse-brand`: *Synapse AI Product Brand & Editorial Engine* (`BRAND & IDENTITY`)
    - `meridian-executive`: *Executive Authority & Personal Presence Platform* (`PERSONAL BRAND`)
  - Ensure multi-tag taxonomy support (`BRAND`, `IDENTITY`, `PERSONAL BRAND`, `DIGITAL`, `PRODUCT`)

- [x] **Expand Insights Dataset (`src/content/insights.js`)**
  - Add 3 research whitepapers / technical articles:
    - *"Why Your Logo Is Not Your Brand: The Anatomy of a Scalable Identity System"*
    - *"Personal Branding for Founders: Translating Technical Expertise into Digital Authority"*
    - *"From Identity to Infrastructure: Why Brand Systems and Digital Architecture Must Be Co-Designed"*

---

## Phase 18 — Contact Drawer & Intake System Expansion (Forms & Conditional Fields) ✅ COMPLETED

**Goal:** Transform `ContactDrawer.jsx` into a high-converting, multi-disciplinary intake system with dynamic conditional questionnaires for Brand Strategy, Logo Design, Brand Identity, Graphic Design, and Personal Branding.

### Tasks

- [x] **Expand Discipline Selector**
  - Add: `BRAND STRATEGY`, `LOGO & BRAND IDENTITY`, `GRAPHIC DESIGN`, `SOCIAL & MARKETING DESIGN`, `PERSONAL BRANDING` alongside existing technical disciplines.

- [x] **Implement Dynamic Conditional Questionnaires**
  - **Brand Strategy / Logo / Identity:**
    - Current situation (New brand / Rebrand)
    - Need brand guidelines (Yes / No)
    - Key applications (Digital, Website, Print, Product UI)
  - **Graphic Design:**
    - Asset types (Company Profile, Pitch Deck, Brochure, Social System, Reports)
    - Format (Digital, Print, Both)
    - Existing brand guidelines (Yes / No)
  - **Personal Branding:**
    - Professional role (Founder, Executive, Consultant, Specialist)
    - Primary objective (Fundraising, Thought Leadership, Client Acquisition)
    - Required modules (Visual Identity, Photography Direction, LinkedIn Branding, Personal Website)

- [x] **Add Optional ETB Budget Qualification**
  - Lead qualification options: `Under 25K ETB`, `25K–50K ETB`, `50K–100K ETB`, `100K–250K ETB`, `250K+ ETB`, `Exploring / Undetermined`

- [x] **Telemetry Intake Confirmation Pipeline**
  - Generate specialized telemetry codes (`GRT-BRD-XXXXXX` for creative, `GRT-ENG-XXXXXX` for engineering)
  - Display customized summary confirmation matching the requested service family

---

## Phase 19 — Homepage Integration ("From Identity to Infrastructure") ✅ COMPLETED

**Goal:** Integrate the Brand & Creative service family into the existing homepage without disrupting the dark architectural aesthetic.

### Tasks

- [x] **Create `BrandCreativeSection.jsx` (`src/components/home/BrandCreativeSection.jsx`)**
  - Eyebrow: `04 / BRAND & CREATIVE`
  - Heading: "BUILD THE PRODUCT. BUILD THE BRAND. BUILD THE PRESENCE."
  - Narrative: Connect identity to the digital experiences and software systems Gerat builds.
  - Interactive cards for:
    1. *Brand Strategy*
    2. *Logo & Identity*
    3. *Graphic Design*
    4. *Personal Branding*
  - CTA button: "EXPLORE BRAND & CREATIVE →" with direct drawer/page routing

- [x] **Update `Hero.jsx` & `Marquee.jsx`**
  - Reflect combined capability: "From Identity to Infrastructure"
  - Include creative ticker tokens (`BRAND STRATEGY // LOGO SYSTEMS // VISUAL IDENTITY // EXECUTIVE BRANDING //`)

- [x] **Update Home Capabilities Table (`OurFocus.jsx`)**
  - Integrate visual identity and creative systems into the capabilities matrix

- [x] **Update Home Final CTA & Colophon**
  - Heading: "HAVE AN IDEA, A BRAND, OR A SYSTEM WORTH BUILDING?"
  - Dual action buttons: `START A PROJECT` and `BOOK A BRAND CONSULTATION`

---

## Phase 20 — Services Expansion & Dedicated Landing Pages ✅ COMPLETED

**Goal:** Provide full editorial landing pages for clients seeking dedicated brand identity, logo, graphic design, and personal branding engagements.

### Tasks

- [x] **Update Services Overview (`src/app/why-wqf/components/ServicesOverview.jsx`)**
  - Incorporate Practice 05 (Brand & Design Systems) and Practice 06 (Executive Personal Branding) into the pillars deck
  - Detail concrete deliverables (Vector suites, typography guides, presentation decks, personal websites)

- [x] **Create Dedicated Brand & Creative Landing Page (`src/app/services/brand-creative/page.js`)**
  - Comprehensive service breakdowns for Strategy, Logo, Identity, Graphic Design, Social Systems
  - Production Deliverables & File Formats matrix (SVG, EPS, PDF, Print, Web)
  - Reassurance FAQs (Logo vs Brand, IP Ownership, Source Files, Revisions)
  - Strategic Packages overview (Launch Brand, Brand + Digital, Product Launch)

- [x] **Create Dedicated Personal Branding Landing Page (`src/app/services/personal-branding/page.js`)**
  - Modular framework for founders and executives: Positioning, Visual Identity, Photography Direction, LinkedIn Branding, Personal Website, Content Direction, Launch Rollout
  - Persona matching (Founders, Executives, Consultants, Technology Leaders)
  - Direct booking and consultation CTA

---

## Phase 21 — Portfolio Showcase & Case Study Filtering ✅ COMPLETED

**Goal:** Enable discovery of brand identity, graphic design, and personal branding case studies alongside technical platforms.

### Tasks

- [x] **Update Portfolio Filter Bar (`src/app/portfolio/components/Hero.jsx`)**
  - Add category tabs: `ALL DISCIPLINES`, `BRAND & IDENTITY`, `PERSONAL BRAND`, `ENTERPRISE ERP`, `AI & RAG`, `PUBLIC SECTOR`, `TELEMETRY`
  - Dynamic case study counter (`INDEX // 09 CASE STUDIES CATALOGED`)

- [x] **Update Showcase Cards (`src/app/portfolio/components/PortfolioShowcase.jsx`)**
  - Support multi-tag badge rendering (`p.stack`)
  - Add creative asset specifications (Typefaces, Color swatches, Deliverable packages) for brand projects
  - Contextual resolution headers ("CREATIVE & STRATEGIC RESOLUTION" vs "ENGINEERED RESOLUTION")
  - Contextual inquiry actions ("INQUIRE ABOUT BRAND IDENTITY", "INQUIRE ABOUT PERSONAL BRANDING", "INQUIRE ABOUT THIS ARCHITECTURE")

---

## Phase 22 — Navigation, Footer, SEO & Automated Smoke Test Verification ✅ COMPLETED

**Goal:** Ensure site-wide consistency, update dynamic sitemap & robots, and expand the smoke test suite to guarantee 100% test coverage and zero runtime regressions.

### Tasks

- [x] **Update Global Navigation (`Navbar.jsx`)**
  - Ensure links and mobile menu accommodate services navigation with dedicated creative shortcuts

- [x] **Update Global Footer (`Footer.jsx`)**
  - Add dedicated `BRAND & CREATIVE` links column: Brand Strategy, Logo & Identity, Graphic Design, Social Design, Personal Branding

- [x] **Update Sitemap & Robots (`src/app/sitemap.js` and `docs/progress/sitemap/SITEMAP.md`)**
  - Include `/services/brand-creative` and `/services/personal-branding` with priority weighting

- [x] **Update Smoke Test Suite (`tests/smoke/`)**
  - Verify all new datasets, components, form fields, and routes pass automated testing
  - Run `pnpm run test:smoke`, `pnpm run lint`, and `pnpm build`

---

## Guiding Principles

1. **Build systems, not screenshots.** When grid + type + spacing + motion + interaction are correct, the result will feel like the reference naturally.
2. **One commit per logical change.** Professional, descriptive commit messages.
3. **Finish each section before moving on.** Compare against the reference at a fixed viewport and correct before proceeding.
4. **Reduced motion is not removing design.** It means reducing movement while preserving hierarchy.
5. **Performance is a feature.** Lazy load everything below the fold, pause 3D when offscreen, cap pixel ratio.
6. **Content and components are separate.** Data objects feed components — never hardcode copy in JSX.
7. **Touch, keyboard, and mouse are equal.** Every interaction must work with all three.

---

## Dependencies Between Phases

```
Phase 1 (repo setup)
  └─→ Phase 2 (tokens)
       └─→ Phase 3 (nav + layout)
            ├─→ Phase 4 (loader + transitions)
            └─→ Phase 5 (reveal + scroll)
                 ├─→ Phase 6 (hero + 3D)
                 ├─→ Phase 7 (home sections)
                 ├─→ Phase 8 (portfolio)
                 └─→ Phase 9 (inner pages)
                      └─→ Phase 10 (contact + footer)
                           └─→ Phase 11 (content replacement)
                                └─→ Phase 12 (micro-interactions)
                                     └─→ Phase 13 (responsive)
                                          └─→ Phase 14 (a11y)
                                               └─→ Phase 15 (performance + SEO)
                                                    └─→ Phase 16 (QA + polish)
                                                         └─→ Phase 17 (brand content data)
                                                              ├─→ Phase 18 (contact drawer & forms)
                                                              ├─→ Phase 19 (homepage brand integration)
                                                              ├─→ Phase 20 (services landing pages)
                                                              ├─→ Phase 21 (portfolio showcase & filters)
                                                              └─→ Phase 22 (navigation, footer, smoke tests)
```

---

*This document is a living roadmap. Update phase status as work progresses.*

## Supplementary UI Libraries

These libraries can be referenced for ready-made animated components when building custom implementations falls short of the required quality or would take too long. They complement the existing GSAP + Framer Motion stack.

### Skiper UI — [skiper-ui.com](https://skiper-ui.com)
- **Type:** shadcn/ui registry (copy-paste via CLI)
- **Install:** `npx shadcn add @skiper-ui/<component>`
- **Stack:** Tailwind CSS + Framer Motion + React
- **Use for:** Image reveals, drag-scroll components, hover member cards, animated sign-in forms, scroll effects, interactive carousels
- **Relevant phases:**
  - Phase 5 (reveal animations, scroll effects)
  - Phase 7 (team hover cards, value card interactions)
  - Phase 8 (drag-scroll portfolio, image reveal)
  - Phase 12 (hover effects, micro-interactions)

### Vengeance UI — [vengenceui.com](https://www.vengenceui.com)
- **Type:** Copy-paste React component library (CLI-based)
- **Install:** `npx vengeance-ui add <component>`
- **Stack:** Radix UI + Tailwind CSS + Framer Motion
- **Use for:** Animated buttons, hero sections, perspective grids, glassmorphism effects, hover tooltips, scroll-driven layouts
- **Relevant phases:**
  - Phase 6 (hero section interactions)
  - Phase 7 (animated buttons, perspective grids)
  - Phase 12 (shine buttons, magnetic hover effects)
  - Phase 3 (navigation hover interactions)

### Animmaster Lib — [animmasterlib.dev](https://animmasterlib.dev)
- **Type:** Standalone frontend library (300+ components)
- **Stack:** CSS/JS/GSAP/Three.js/WebGL
- **Use for:** Scroll animations, WebGL shaders, hero sections, sliders, navigation menus, text animations, 3D animations, mouse/cursor effects, SVG animations, physics effects, page transitions
- **Relevant phases:**
  - Phase 4 (page transitions, loaders)
  - Phase 5 (scroll animations, text animations)
  - Phase 6 (hero 3D, WebGL effects)
  - Phase 7 (sliders, animated sections)
  - Phase 12 (cursor effects, mouse interactions)
  - Phase 8 (portfolio sliders, drag effects)

> **Usage principle:** Use these libraries as *references and component sources* — copy the patterns into our codebase and adapt them to the Gerat design system. Do not import entire libraries as dependencies unless a specific component requires it. This keeps the bundle lean and the design consistent.
