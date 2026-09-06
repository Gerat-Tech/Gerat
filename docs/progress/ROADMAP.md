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

---

## Phase 1 — Repository Professionalization

**Goal:** Transform the raw starter into a clean, professional, well-structured repository ready for development.

### Tasks

- [ ] **Create `.gitignore`**
  - Ignore `node_modules/`, `.next/`, `out/`, `.env*`, `.DS_Store`, `*.log`, coverage, IDE files

- [ ] **Clean up `package.json`**
  - Rename `"name"` from `"worldquant"` to `"gerat-website"`
  - Update `"version"` to `"0.1.0"`
  - Add `"description"`, `"author"`, `"license"` fields
  - Remove redundant phone-input packages (keep only `react-international-phone`)
  - Remove duplicate lock file (keep only one package manager)

- [ ] **Write professional README.md**
  - Project name, description, and purpose
  - Tech stack overview
  - Prerequisites and setup instructions
  - Project structure overview
  - Development guidelines and conventions
  - Design reference link
  - License / copyright

- [ ] **Clean dead code from `layout.js`**
  - Remove commented-out code block
  - Add proper `metadata` export for SEO

- [ ] **Remove boilerplate files**
  - Delete unused SVGs from `/public/` (`file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`)
  - Verify `CLAUDE.md` is intentional or remove

- [ ] **Add `.editorconfig`**
  - Consistent formatting across editors

- [ ] **Make initial git commit**
  - Stage all cleaned files

### Commit plan
```
1. chore: add .gitignore
2. chore: clean package.json and remove duplicate lock file
3. docs: replace boilerplate README with professional project documentation
4. chore: remove dead code and unused boilerplate assets
5. chore: add .editorconfig for consistent formatting
```

---

## Phase 2 — Design Foundation

**Goal:** Establish the design system that every component will build on — tokens, typography, grid, and spacing.

### Tasks

- [ ] **Create design token CSS file** (`src/styles/tokens.css`)
  - Color palette: `--bg`, `--surface`, `--surface-2`, `--text`, `--muted`, `--border`, `--accent`
  - Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160, 200, 240
  - Border radius tokens
  - Easing functions: `cubic-bezier(.22, 1, .36, 1)`
  - Animation duration tokens
  - Z-index scale
  - *Spec ref: §3.1, §6, §7*

- [ ] **Create typography system** (`src/styles/typography.css`)
  - Type scale with `clamp()`: Display XL, Display L, H2, H3, Body, Small, Mono
  - Line-height mappings per heading level
  - Font weight definitions for Roc Grotesk + Azeret Mono
  - *Spec ref: §4*

- [ ] **Create motion tokens** (`src/styles/motion.css`)
  - Duration scale: fast (200ms), normal (400ms), slow (700ms), reveal (500–700ms)
  - Easing presets
  - Stagger base: 60–120ms
  - `prefers-reduced-motion` overrides at token level
  - *Spec ref: §15, §40*

- [ ] **Restructure `globals.css`**
  - Import token files
  - Clean up phone-input CSS
  - Add base resets

- [ ] **Set up grid system**
  - 12-column desktop, 8-column tablet, 4-column mobile
  - Outer gutters and column gaps per breakpoint
  - Container component or utility class
  - *Spec ref: §5*

### Commit plan
```
1. feat: add design token system (colors, spacing, z-index, easing)
2. feat: add typography system with clamp-based type scale
3. feat: add motion token system with reduced-motion support
4. refactor: restructure globals.css to use token imports
```

---

## Phase 3 — Navigation & Layout Shell

**Goal:** Build the navigation system matching the reference's behavior — sticky, hide-on-scroll, compact, with mobile menu.

### Tasks

- [ ] **Rebuild desktop navigation**
  - Logo left, nav links center/right, contact CTA right
  - Mono uppercase nav labels with text-reveal hover animation
  - Corner-accent bracket hover indicators (as seen on reference)
  - Active route marker with accent color
  - *Spec ref: §8*

- [ ] **Implement sticky/hide-on-scroll behavior**
  - Fixed positioning with background transition on scroll
  - Hide on scroll down (past 1 viewport), show on scroll up
  - Compact mode when scrolled (logo collapses to mark)
  - 250–450ms transition duration
  - *Spec ref: §8 Sticky behavior*

- [ ] **Build mobile menu**
  - Full-screen overlay with clip-path reveal transition
  - Staggered link entrance animation
  - Grid-based link layout (2 columns, like reference)
  - Contact CTA enters last
  - *Spec ref: §8 Mobile*

- [ ] **Create layout wrapper components**
  - `Container` component with responsive gutters
  - `SectionLabel` component (mono uppercase with index)

### Commit plan
```
1. feat: build desktop navigation with sticky scroll behavior
2. feat: build mobile menu with full-screen overlay transition
3. feat: add Container and layout shell components
```

---

## Phase 4 — Page Loader & Transitions

**Goal:** Add premium page load experience and smooth route transitions.

### Tasks

- [ ] **Create page loader** (*Spec ref: §9*)
  - Brand mark appears → gains motion → loading completes → hero reveals
  - Total duration: 0.5–0.9s (not a long fake loader)
  - Deterministic, skip on repeat navigation
  - Reduced-motion: instant fade only

- [ ] **Build route transition system** (*Spec ref: §32, §33*)
  - `PageTransitionProvider` context with states: idle, entering, leaving, enter-complete
  - `TransitionOverlay` component
  - Old page: opacity 1→0, y 0→−10
  - New page: overlay/mask → reveal
  - 350–700ms total transition

- [ ] **Wire transitions to Next.js App Router**
  - Intercept route changes
  - Coordinate exit → transition → enter sequence

### Commit plan
```
1. feat: add page loader with brand mark reveal
2. feat: implement route transition system with overlay
```

---

## Phase 5 — Reveal & Scroll Animation System

**Goal:** Create the reusable animation primitives that all sections will use.

### Tasks

- [ ] **Build reveal component families** (*Spec ref: §15, §16*)
  - **A. Lift reveal:** `<FadeUp>` — opacity 0→1, y 24–50px→0, 500–700ms
  - **B. Mask reveal:** `<MaskReveal>` — clip-path / scale expand, 700–1000ms
  - **C. Directional reveal:** `<DirectionalReveal>` — enter from left/right based on position
  - **D. Counter/stagger reveal:** `<StaggerReveal>` — for stats, indices, metadata

- [ ] **Build text animation utilities** (*Spec ref: §17*)
  - Line-split for hero and section headings
  - Word-split for hero (with stagger)
  - Block fade for body text
  - Short fade for metadata
  - Accessible: screen reader fallback, no layout shift

- [ ] **Set up GSAP ScrollTrigger integration** (*Spec ref: §14*)
  - `<ScrollPin>` component for pinned sections
  - `<Parallax>` component (small range: −20px to +20px)
  - `<HorizontalScroll>` component (for portfolio in Phase 8)
  - Proper cleanup on unmount

- [ ] **Build counter animation**
  - Animate numbers from 0 to target
  - IntersectionObserver trigger

### Commit plan
```
1. feat: add FadeUp and MaskReveal animation components
2. feat: add text split animation utilities
3. feat: integrate GSAP ScrollTrigger with pinning and parallax
4. feat: add counter animation component
```

---

## Phase 6 — Hero Section & 3D Scene

**Goal:** Build the site's strongest visual moment — the hero with Three.js particle field.

### Tasks

- [ ] **Compose hero layout** (*Spec ref: §10*)
  - Top metadata (eyebrow label)
  - Very large headline (asymmetric, occupying most viewport)
  - Supporting statement
  - Primary CTA + secondary CTA
  - Scroll indicator at bottom
  - Bottom divider with description and logo mark

- [ ] **Install Three.js / React Three Fiber**
  - Add `three`, `@react-three/fiber`, `@react-three/drei` to dependencies
  - Dynamic import for bundle splitting

- [ ] **Build procedural data-flow particle field** (*Spec ref: §11*)
  - 8k–20k particles desktop, 3k–8k mobile
  - Thin curve paths converging to central structure
  - PointsMaterial or custom shader
  - Grayscale base + accent highlights
  - FOV 35–50, mild perspective

- [ ] **Add hero 3D interaction**
  - Pointer influence: 5–12% scene, spring interpolation
  - Scroll choreography: object drift, expand, exit
  - Idle: micro floating, particle drift, slow deformation

- [ ] **Implement performance guards** (*Spec ref: §12*)
  - Cap pixel ratio to 1.5–2
  - IntersectionObserver to pause when offscreen
  - Lazy-load 3D bundle
  - WebGL feature detection

- [ ] **Build 3D fallback** (*Spec ref: §45*)
  - Static generated image or CSS/SVG gradient motion
  - Triggered when WebGL unavailable or reduced-motion

### Commit plan
```
1. feat: compose hero section layout with typography and CTA
2. feat: install Three.js/R3F and create particle field scene
3. feat: add hero 3D pointer and scroll interaction
4. feat: add WebGL fallback and performance guards
```

---

## Phase 7 — Home Page Sections

**Goal:** Build all remaining home page sections with proper motion and interaction.

### Tasks

- [ ] **Ethos / Value Cards** (*Spec ref: §26*)
  - 4 numbered value blocks
  - Active card expands, inactive compact
  - Desktop: vertical/horizontal accordion
  - Mobile: stacked cards / tap-to-expand

- [ ] **Industry / Capability Grid** (*Spec ref: §27*)
  - Full-width section with large heading
  - 8 numbered capability rows
  - Hover: row background changes, number shifts, description fades in
  - Keyboard: focus = hover effect

- [ ] **Marquee / Ticker** (*Spec ref: §25*)
  - Continuous horizontal scroll: AI / RAG / ERP / WEB APPS / DATA / AUTOMATION
  - CSS animation (no JS frame budget)
  - Slow, linear, continuous

- [ ] **Team Preview** (*Spec ref: §28*)
  - Editorial layout, large active portrait
  - Navigation: 01/04 index, previous/next
  - Clip/mask transitions

- [ ] **Insights Preview** (*Spec ref: §29*)
  - Latest article cards with category, date, title, read time, image
  - Hover: image crop movement, title shift

- [ ] **Future Ventures / Partners Section**
  - Partner logos with GSAP scroll-triggered reveal

- [ ] **Final CTA Section** (*Spec ref: §34*)
  - Large "BUILD WITH GERAT" heading + CTA

### Commit plan
```
1. feat: build ethos value cards with accordion interaction
2. feat: add industry/capability grid with hover effects
3. feat: add marquee ticker component
4. feat: build team preview section with editorial layout
5. feat: build insights preview section with article cards
6. feat: add partners section and final CTA
```

---

## Phase 8 — Portfolio & Case Studies

**Goal:** Build the portfolio showcase as a major interaction pattern with horizontal scroll.

### Tasks

- [ ] **Portfolio showcase page** (*Spec ref: §18*)
  - Sequential presentation: 01/05 counter, project name, description, large visual, services list
  - "View Case Study" CTA per item

- [ ] **Horizontal scroll section** (*Spec ref: §19*)
  - Vertical page → pin section → horizontal progression → release → continue vertical
  - GSAP ScrollTrigger + scrub
  - Mobile: horizontal snap carousel instead

- [ ] **Drag interaction** (*Spec ref: §18*)
  - Mouse, touch, trackpad/scroll fallback
  - Visible drag affordance, momentum, clamped boundaries

- [ ] **Case study cards** (*Spec ref: §20*)
  - Large image with clip-path reveal
  - Hover: media shifts 2–8px, title shifts 2–4px
  - 200–350ms duration

### Commit plan
```
1. feat: build portfolio showcase with sequential presentation
2. feat: implement horizontal scroll with GSAP ScrollTrigger
3. feat: add drag interaction with momentum and cursor label
4. feat: build case study cards with hover motion
```

---

## Phase 9 — Team, Insights & Article Pages

**Goal:** Build remaining inner pages with editorial design quality.

### Tasks

- [ ] **Team page** (*Spec ref: §28*)
  - Team hero, leadership section, founders section, advisors

- [ ] **Insights page** (*Spec ref: §29*)
  - Insights hero, latest news cards grid, category filtering

- [ ] **Article detail page** (*Spec ref: §30*)
  - Wide editorial composition: metadata column + main content + side index
  - Mobile: single-column stacked layout

### Commit plan
```
1. feat: build team page with editorial portrait layout
2. feat: build insights page with news card grid
3. feat: build article detail page with editorial composition
```

---

## Phase 10 — Contact & Footer

**Goal:** Build the contact drawer and footer as premium closing experiences.

### Tasks

- [ ] **Contact drawer** (*Spec ref: §31*)
  - Side drawer from right with clip-path reveal
  - Background muted (backdrop-blur)
  - Form fields stagger 40–70ms

- [ ] **Footer** (*Spec ref: §34*)
  - Large final CTA + divider + navigation + social + legal + copyright

### Commit plan
```
1. feat: rebuild contact drawer with side-panel animation
2. feat: build footer with editorial CTA and navigation
```

---

## Phase 11 — Content Replacement

**Goal:** Replace all WorldQuant Foundry placeholder content with Gerat content.

### Tasks

- [ ] **Create data architecture** (*Spec ref: §49, §50*)
  - `src/content/` directory with structured data files per section
  - Components consume data objects, never hardcode copy

- [ ] **Replace all section content** per `GERAT_CONTENT_REPLACEMENT.md`
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

## Phase 12 — Cursor, Magnetic & Micro-interactions

**Goal:** Add the premium interaction details that elevate the experience.

### Tasks

- [ ] **Custom cursor** (*Spec ref: §22*)
  - Small dot default, larger ring on hover, context labels
  - Remove on touch devices, respect reduced-motion

- [ ] **Magnetic interactions** (*Spec ref: §24*)
  - Hero CTA, final CTA — max displacement 6–12px, spring interpolation

- [ ] **Button micro-interactions** (*Spec ref: §23*)
  - Background transition, text shift 1–3px, arrow travel 3–6px

- [ ] **Image motion** (*Spec ref: §21*)
  - Hover scale 1→1.03, scroll clip-path reveal, parallax −20px to +20px

- [ ] **Card hover motion** (*Spec ref: §20*)
  - Media shifts, border reacts, title shifts, 200–350ms

### Commit plan
```
1. feat: add custom cursor system with context labels
2. feat: add magnetic button interactions
3. feat: add button, image, and card micro-interactions
```

---

## Phase 13 — Responsive & Mobile Adaptation

**Goal:** Ensure every section works beautifully across desktop, tablet, and mobile.

### Tasks

- [ ] **Desktop ≥ 1280px** — full layout, 3D, cursor, horizontal scroll
- [ ] **Tablet 768–1279px** — simplified 3D, reduced parallax
- [ ] **Mobile ≤ 767px** — mobile menu, swipe/snap, no cursor, tap replaces hover
- [ ] **Touch interaction audit** (*Spec ref: §37*)
- [ ] **Mobile motion rules** (*Spec ref: §36*) — shorter durations, smaller distances

### Commit plan
```
1. feat: adapt all sections for tablet breakpoint
2. feat: adapt all sections for mobile breakpoint
3. feat: add touch interaction support and mobile motion rules
```

---

## Phase 14 — Accessibility & Reduced Motion

**Goal:** Make the site usable for everyone.

### Tasks

- [ ] **Keyboard navigation** — visible focus indicators, tab order
- [ ] **Semantic HTML** — proper heading hierarchy, landmarks
- [ ] **ARIA** — accessible buttons, dialog roles, labels
- [ ] **Alt text** — all images
- [ ] **Form labels** — all inputs
- [ ] **Contrast** — WCAG AA minimum
- [ ] **Reduced motion** (*Spec ref: §13*) — no parallax, instant transitions, static visuals
- [ ] **Skip-to-content link**

### Commit plan
```
1. feat: add keyboard focus indicators and skip-to-content link
2. feat: add semantic HTML and ARIA attributes
3. feat: implement prefers-reduced-motion support
4. feat: accessibility audit and contrast verification
```

---

## Phase 15 — Performance & SEO

**Goal:** Achieve fast load times and strong search engine presence.

### Tasks

- [ ] **Image optimization** — `next/image`, AVIF/WebP, lazy load
- [ ] **3D bundle splitting** — dynamic import Three.js/R3F
- [ ] **Font optimization** — `font-display: swap`, preload
- [ ] **SEO metadata** — title, description, OG, Twitter cards
- [ ] **Sitemap** — `sitemap.xml`
- [ ] **Favicon** — proper set (SVG, apple-touch-icon, webmanifest)
- [ ] **Lighthouse audit** — FCP < 1.5s, LCP < 2.5s, CLS < 0.1
- [ ] **GSAP ScrollTrigger cleanup on unmount**

### Commit plan
```
1. feat: add SEO metadata, OG tags, and favicon set
2. perf: optimize images with next/image and WebP
3. perf: dynamic import 3D scene and lazy load media
4. perf: performance audit and optimization pass
```

---

## Phase 16 — Visual QA & Polish

**Goal:** Final comparison against reference at all viewports, motion QA, and polish.

### Tasks

- [ ] **Viewport testing** at: 1440×900, 1280×800, 1024×768, 768×1024, 430×932, 390×844
  - Navigation spacing, hero line breaks, 3D placement
  - Border alignment, image crop, CTA position
  - No overflow, no horizontal scroll except carousels
  - Text does not clip, mobile menu works

- [ ] **Motion QA** (*Spec ref: §57*)
  - Page load, hover, mouse leave, scroll down/up, fast/slow scroll
  - Resize, orientation, touch, keyboard tab
  - Reduced motion, WebGL unavailable, slow CPU

- [ ] **Visual comparison pass** — side-by-side with reference site
  - It should feel: expensive, calm, technical, confident, intentional

- [ ] **Cross-browser testing** — Chrome, Firefox, Safari, Edge

- [ ] **Final content proofread**

### Commit plan
```
1. fix: visual QA fixes from viewport testing
2. fix: motion QA fixes
3. fix: cross-browser compatibility fixes
4. chore: final polish and cleanup
```

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
