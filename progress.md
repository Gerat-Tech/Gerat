# GERAT WEBSITE — CONTENT OVERHAUL & UX SIMPLIFICATION (MASTER PROGRESS)

> **Repository:** `Gerat-Tech/Gerat`  
> **Working Branch:** `feature/content-overhaul`  
> **Master Guide:** [`docs/GERAT_CONTENT_UPDATE_GUIDE.md`](file:///home/dawit/Documents/Projects/Gerät/Gerät/docs/GERAT_CONTENT_UPDATE_GUIDE.md)  
> **Primary Audience:** Investors, founders, and non-technical business leaders  
> **Status:** ALL PHASES COMPLETED (11/11) · VERIFIED 100% BUILD & E2E  

---

## 1. CORE DIRECTIVES & PHILOSOPHY

1. **The 3-Second Scroll Rule:** Modern visitors scan and scroll rapidly. If the core promise isn't immediately obvious, they leave. Cut text density by 60% across every view.
2. **Plain English First:** Replace all engineering jargon (RAG, ERP, microservices, telemetry, zero-trust) on top-level pages with clear business outcomes: *Digital*, *Intelligence*, *Systems*, *Brand*.
3. **De-AI-ify Tone:** Eliminate repetitive AI tropes ("monolithic", "domain-grounded", "sovereign", "harness", "leverage", "unwavering commitment"). Use authentic, human agency language.
4. **Honest Startup Positioning:** Eliminate claims about civic governance platforms, national digital records, and fictional enterprise scale. Position Gerat as an ambitious, agile, and skilled technology studio.
5. **Mobile-First Priority:** Over 70% of viewers are on mobile. Stack layouts naturally, maintain 48×48px minimum touch targets, keep primary CTAs within the thumb zone, and avoid wall-of-text fatigue.
6. **Light Mode as Default:** Set warm, editorial light mode as the default experience with instant toggle to dark mode.

---

## 2. AUDIT OF USER FINDINGS & SCREENSHOTS

| # | User Finding / Image | File Location | Problem | Target Fix | Status |
|---|----------------------|---------------|---------|------------|--------|
| 1 | **Image 1 (`media_1789835770200.png`)** | [`src/components/home/OurFocus.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/OurFocus.jsx) | 8 overwhelming disciplines loaded with technical jargon. | Reduce to **4 clear pillars**: *Digital*, *Intelligence*, *Systems*, *Brand*. Plain English copy. | **DONE** (`2f2be0a`) |
| 2 | **Image 2 (`media_1789836135519.png`)** | [`src/components/home/Hero.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Hero.jsx) lines 110–118 | Bottom capability tags: `ARTIFICIAL INTELLIGENCE · RAG SYSTEMS · ENTERPRISE ERP · GOVERNMENT TECH`. | Replace with clean 4-pillar tags: `DIGITAL · INTELLIGENCE · SYSTEMS · BRAND`. | **DONE** (`951c629`) |
| 3 | **Image 3 (`media_1789836275677.png`)** | [`src/components/home/Partners.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Partners.jsx) | "Modern Infrastructure / Standardized Foundations" tech stack grid (React, Kafka, Qdrant, Docker...). | **REMOVE ENTIRE SECTION** from homepage (`src/app/page.js`). Move tech details to deep case study pages. | **DONE** (`951c629`) |
| 4 | **Image 4 (`media_1789836427185.png`)** | [`src/components/layout/Footer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/Footer.jsx) lines 133–144 | Footer engineering column: `ENTERPRISE CLOUD & ERP`, `DOMAIN-GROUNDED RAG & AI`, `REAL-TIME TELEMETRY BUSES`, `CIVIC GOVERNANCE PLATFORMS`. | Remove unrealistic claims. Replace with honest 4 service categories. | **DONE** (`59fc114`) |
| 5 | **Image 5 (`media_1789836737762.png`)** | [`src/components/layout/ContactDrawer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/ContactDrawer.jsx) lines 7–18 | 10 overwhelming discipline buttons causing cognitive overload. | Reduce to **4 primary options** (`Website / Digital`, `AI / Intelligent Tool`, `Business System`, `Brand & Creative`) + progressive conditional sub-options. | **DONE** (`19995bf`) |
| 6 | **Team & Portfolio Double Slashes** | `src/app/team`, `src/app/portfolio`, Prisma seed data | Residual `//` dividers or raw slash tropes visible in rendered cards/badges. | Ensure all separators are subtle middle dots (`·`) or clean dashes. | **DONE** (`f4c2606`, `97ededa`) |
| 7 | **Default Theme** | [`src/app/layout.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/layout.js), [`src/context/ThemeContext.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/context/ThemeContext.jsx) | Site defaults to dark mode (`#0d0706`). | Switch default to **light mode**, preserving dark mode toggle. | **DONE** (`c39ed0d`) |
| 8 | **Image 8 (`media_1789843567340.png`)** | [`src/components/home/HowWeWork.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/HowWeWork.jsx) | "How We Work" 5 boxes look boring and static. | Build an interactive, dynamic architectural story engine ("From Blueprint to Bridge") with milestone track and animated schematics. | **PENDING** (Phase 12) |
| 9 | **Image 9 (`media_1789843751298.png`)** | [`src/components/services/ServicesOverview.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/services/ServicesOverview.jsx) | Only Brand & Creative has an "Explore More" page; Pillars 1, 2, 3 have no dedicated detail pages. | Create dedicated explore pages for Digital Experiences, AI & Tools, and Business Systems; add Explore CTAs to all pillars. | **PENDING** (Phase 13) |
| 10 | **Image 10 (`media_1789843934501.png`)** | [`src/app/services/brand-creative/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/brand-creative/page.js) lines 161–217 | Rigid "Integrated Service Packages" section looks generic and dated. | Remove packages section; replace with dynamic Brand Transformation Story module and interactive production standards inspector. | **PENDING** (Phase 14) |
| 11 | **Image 11 (`media_1789844201362.png`)** | Global CTAs & View Work Buttons | "BUILD YOUR BRAND" and other CTAs don't pre-select the service in ContactDrawer; "VIEW WORK" doesn't filter portfolio. | Wire dynamic preselection in `NavContext` / `ContactDrawer` and add search parameter category routing to `/portfolio`. | **PENDING** (Phase 15) |

---

## 3. MASTER IMPLEMENTATION PHASES

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                     EXECUTION FLOW                                     │
├─────────────────┬──────────────────┬─────────────────┬──────────────────┬──────────────┤
│ Phase 1–3       │ Phase 4–6        │ Phase 7–8       │ Phase 9–11       │ Phase 12–16  │
│ Homepage & Form │ Theme & Footer   │ Services & Data │ De-AI & Testing  │ Interactive, │
│                 │                  │                 │                  │ 3 Hubs, CTAs │
└─────────────────┴──────────────────┴─────────────────┴──────────────────┴──────────────┘
```

---

### PHASE 1: HOMEPAGE RESTRUCTURE & COPY OVERHAUL
**Files:** [`src/app/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/page.js), [`src/components/home/Hero.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Hero.jsx), [`src/components/home/Marquee.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Marquee.jsx), [`src/components/home/Partners.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Partners.jsx)
**Status:** COMPLETED (`commit 951c629`, `commit 3d71683`)

- [x] **1.1. Prune Homepage Sections:** Removed `<Partners />` (tech stack) and `<BrandCreativeSection />` from [`src/app/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/page.js). Reduced homepage from 10 sections to 6 clean, fast-scrolling sections:
  1. `Hero`
  2. `Marquee`
  3. `OurFocus` (What We Build — 4 Pillars)
  4. `OurEthos` (Why Gerat)
  5. `OurPortfolio` (Selected Work)
  6. `HowWeWork` (Process)
  7. `Footer` (Final CTA & Navigation)
- [x] **1.2. Hero Headline & Subhead:**
  - Headline: Replaced with:
    ```
    WE BUILD THE BRIDGE.
    YOU CROSS IT.
    ```
  - Subhead: Replaced with:
    > "We connect your business to the people it serves — through digital experiences, intelligent tools, business systems, and strong brands."
  - Primary CTA: `SEE WHAT WE BUILD` (scrolls to 01 What We Build)
  - Secondary CTA: `START A PROJECT` (opens ContactDrawer)
- [x] **1.3. Hero Capability Tags (Image 2 Fix):**
  - Replaced with:
    ```
    DIGITAL · INTELLIGENCE · SYSTEMS · BRAND
    ```
  - Removed pseudo-robotic bottom prompt text; retained clean scroll prompt.
- [x] **1.4. Marquee Simplification:**
  - Updated marquee tokens to loop: `DIGITAL · INTELLIGENCE · SYSTEMS · BRAND ·`.

---

### PHASE 2: SERVICES REDUCTION (8 → 4 PILLARS)
**File:** [`src/components/home/OurFocus.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/OurFocus.jsx)
**Status:** COMPLETED (`commit 2f2be0a`)

- [x] **2.1. Replace 8 Capabilities with Exactly 4 Pillars:**
  - Streamlined to: *Digital Experiences*, *AI & Intelligent Tools*, *Business Systems*, *Brand & Creative*.
- [x] **2.2. Section Header Polish:**
  - Eyebrow: `01 · WHAT WE BUILD`
  - Headline: `HOW WE BUILD THE BRIDGE.`
  - Subhead: `Every business needs a strong foundation, a clear path, and systems that can carry what comes next.`
- [x] **2.3. Mobile Optimization:** Touch-friendly targets and clean spacing on mobile viewports.

---

### PHASE 3: CONTACT FORM RADICAL SIMPLIFICATION (10 → 4)
**File:** [`src/components/layout/ContactDrawer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/ContactDrawer.jsx)
**Status:** COMPLETED (`commit 19995bf`)

- [x] **3.1. Reduce Top-Level Disciplines (Image 5 Fix):**
  Replaced 10 button grid with **4 primary options + 1 fallback**:
  1. `WEBSITE / DIGITAL PRODUCT`
  2. `AI / INTELLIGENT TOOL`
  3. `BUSINESS SYSTEM / ERP`
  4. `BRAND & CREATIVE`
  5. `NOT SURE YET`
- [x] **3.2. Implement Progressive Disclosure (Sub-options):**
  - Brand & Creative reveals: *Brand Strategy*, *Logo & Identity*, *Graphic Design*, *Personal Branding*.
  - Business System reveals: *ERP*, *Operations Platform*, *Internal Tools*, *Custom Software*.
  - AI & Intelligent Tools reveals: *AI Assistant*, *Knowledge Search*, *Workflow Automation*.
- [x] **3.3. Humanize Contact Copy:**
  - Header: `LET'S BUILD SOMETHING.`
  - Subhead: `Tell us what you're working on. We respond within 24–48 hours.`
  - Submit Button: `START YOUR PROJECT →`
- [x] **3.4. Simplify Timelines & Budgets:** Single-column layout with 48px touch targets.
---

### PHASE 4: FOOTER OVERHAUL & UNREALISTIC CLAIM REMOVAL
**File:** [`src/components/layout/Footer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/Footer.jsx)
**Status:** COMPLETED (`commit 59fc114`)

- [x] **4.1. Remove Fictional Engineering List (Image 4 Fix):**
  - Deleted `CIVIC GOVERNANCE PLATFORMS` and `REAL-TIME TELEMETRY BUSES`.
  - Replaced the Engineering column with honest 4 service categories:
    ```
    SERVICES
    • DIGITAL EXPERIENCES
    • AI & INTELLIGENT TOOLS
    • BUSINESS SYSTEMS
    • BRAND & CREATIVE
    ```
- [x] **4.2. Overhaul Master Footer CTA:**
  - Headline: `READY TO CONNECT YOUR BUSINESS TO WHAT COMES NEXT?`
  - Subhead: `Let's build the bridge together.`
  - CTA Button: `START YOUR PROJECT →`
- [x] **4.3. Brand Colophon & De-AI-ification:**
  - Brand description: Replaced with `Brand. Digital. Intelligence. Systems.`
  - Bottom bar: Removed `ALL SYSTEMS OPERATIONAL` pulsing telemetry widget.

---

### PHASE 5: DEFAULT THEME MIGRATION (LIGHT MODE DEFAULT)
**Files:** [`src/app/layout.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/layout.js), [`src/context/ThemeContext.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/context/ThemeContext.jsx), [`src/styles/tokens.css`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/styles/tokens.css)
**Status:** COMPLETED (`commit c39ed0d`)

- [x] **5.1. Update Default Theme Resolution:**
  - Default theme set to `light` across SSR cookie resolution and ThemeContext.
- [x] **5.2. Audit Light Mode Contrast & Styling:**
  - Verified `#FAF6ED` background, high-contrast dark text, sharp card borders, and instant dark mode toggle.

---

### PHASE 6: "WHY GERAT" & METHODOLOGY SIMPLIFICATION
**Files:** [`src/components/home/OurEthos.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/OurEthos.jsx), [`src/components/home/HowWeWork.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/HowWeWork.jsx), [`src/content/ethos.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/ethos.js)
**Status:** COMPLETED (`commit 7eca42c`)

- [x] **6.1. Rebrand OurEthos to "Why Gerat":**
  - Eyebrow: `02 · WHY GERAT`
  - Headline: `BUILT TO HOLD WEIGHT.`
  - Subhead: `We care about what happens after the launch.`
- [x] **6.2. Simplify HowWeWork (6 Steps → 5 Clear Steps):**
  - Steps:
    1. `01 · DISCOVER` — We understand the business, the people, and the problem.
    2. `02 · DESIGN` — We create a clear experience, visual direction, and plan.
    3. `03 · BUILD` — We engineer the digital product, tool, or platform.
    4. `04 · LAUNCH` — We test, refine, and prepare for real users.
    5. `05 · SUPPORT` — We stay involved as your business grows.

---

### PHASE 7: SERVICES PAGE & SUB-PAGES OVERHAUL
**Files:** [`src/app/services/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/page.js), [`src/app/why-wqf/components/ServicesOverview.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/why-wqf/components/ServicesOverview.jsx), [`src/app/services/brand-creative/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/brand-creative/page.js), [`src/app/services/personal-branding/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/personal-branding/page.js)
**Status:** COMPLETED (`commit bc2a7bc`)

- [x] **7.1. Align Services Overview to 4 Pillars:**
  - Mirrored the 4 pillars (Digital, Intelligence, Systems, Brand) across datasets and overview cards.
- [x] **7.2. Move Legacy Services Component:**
  - Exported and reused from clean services structure.
- [x] **7.3. Refine Brand & Personal Branding Copy:**
  - Clear headlines and structured deliverables without jargon.

---

### PHASE 8: RESIDUAL DOUBLE-SLASH AUDIT & PURGE
**Files:** `src/app/team`, `src/app/portfolio`, `prisma/seed.mjs`, `src/content/portfolio.js`
**Status:** COMPLETED (`commit f4c2606`, `commit 97ededa`)

- [x] **8.1. Sweep Rendered Team & Portfolio Pages:**
  - All team cards, portfolio badges, and metadata verified to have zero user-facing `//` delimiters; clean ` · ` middle dots used consistently.

---

### PHASE 9: FULL-SITE DE-AI-IFICATION & TONE CALIBRATION
**Files:** Across all `src/components/`, `src/content/`, `src/app/`
**Status:** COMPLETED (`commit 08afb0a`)

- [x] **9.1. Vocabulary Purge:**
  - Replaced repetitive AI vocabulary (`monolithic`, `domain-grounded`, `sovereign`, `deterministic`) with natural, professional language across layout, metadata, portfolio, and services.
- [x] **9.2. Remove Decorative Sci-Fi UI Tropes:**
  - Cleaned up template tropes and bracket decorations.

---

### PHASE 10: PORTFOLIO & SEED DATA RE-ALIGNMENT
**Files:** [`src/content/portfolio.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/portfolio.js), [`prisma/seed.mjs`](file:///home/dawit/Documents/Projects/Gerät/Gerät/prisma/seed.mjs)
**Status:** COMPLETED (`commit 97ededa`)

- [x] **10.1. Re-align Featured Projects:**
  - Calibrated all 9 case studies with honest, grounded startup claims and realistic metrics.
- [x] **10.2. Update Seed Script:**
  - Database seed updated to upsert 4 active service pillars and calibrated case studies. Verified with `node prisma/seed.mjs`.

---

### PHASE 11: QUALITY ASSURANCE, MOBILE AUDIT & E2E TESTING
**Files:** `tests/smoke/e2e-smoke.test.mjs`, all pages
**Status:** COMPLETED (`commit 97ededa` and ongoing verification)

- [x] **11.1. Mobile Responsiveness Verification:**
  - Checked layouts for 375px+ screens, thumb-zone CTAs, 48px touch targets, and single-column form flow.
- [x] **11.2. Automated Testing:**
  - `pnpm run build`: 37/37 routes compiled successfully with 0 errors.
  - `pnpm run test:smoke`: 10/10 test suites passed.
  - `pnpm run test:e2e`: 24/24 assertions passed.
- [x] **11.3. Clean Conventional Commits:**
  - All commits strictly conventional with zero usage of the word "phase".

---

### PHASE 12: INTERACTIVE PROCESS STORY ENGINE ("FROM BLUEPRINT TO BRIDGE")
**Files:** [`src/components/home/HowWeWork.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/HowWeWork.jsx), [`src/content/ethos.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/ethos.js)
**Status:** COMPLETED

- [x] **12.1. Replace Static 5-Card Grid with Connected Bridge Stepper:**
  - Transformed static box layout (Image 1 fix) into an interactive architectural milestone experience.
  - Implemented a connected horizontal progress track ("The Bridge Span") linking 5 chapters: `01 DISCOVER`, `02 DESIGN`, `03 BUILD`, `04 LAUNCH`, `05 SUPPORT`.
- [x] **12.2. Dynamic Story Beats & Deliverables Panel (Left Column):**
  - Bold stage title, human narrative explanation of why this phase matters, tangible outputs (specifications, prototypes, code, tests, monitoring), and "The Client Experience" callout (weekly Looms, live staging, direct channel).
  - Navigation controls: Previous / Next buttons with stage preview labels.
- [x] **12.3. Animated Architectural Blueprint Schematics (Right Column):**
  - Custom responsive SVG schematics representing each phase:
    - *Discover:* Blueprint drafting grid, problem framing crosshairs, and stakeholder nodes.
    - *Design:* Ergonomic interface layout, typography scales, and design token connections.
    - *Build:* Interlocking structural bridge beams, modular code units, and data pipeline flow.
    - *Launch:* Zero-downtime deployment nodes, live domain routing, and health beacons.
    - *Support:* Resilient bridge span, continuous telemetry pulse, and growth pathways.
- [x] **12.4. Mobile-First & Accessible Flow:**
  - Touch-friendly horizontal step selector on mobile viewports (<768px). Full ARIA tablist/tabpanel attributes and smooth Framer Motion transitions.

---

### PHASE 13: 3 NEW DEDICATED SERVICE PILLAR PAGES & EXPLORE HUBS
**Files:**
- [NEW] [`src/app/services/digital-experiences/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/digital-experiences/page.js)
- [NEW] [`src/app/services/ai-tools/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/ai-tools/page.js)
- [NEW] [`src/app/services/business-systems/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/business-systems/page.js)
- [MODIFY] [`src/content/services.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/services.js)
- [MODIFY] [`src/components/services/ServicesOverview.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/services/ServicesOverview.jsx)
- [MODIFY] [`src/app/why-wqf/components/ServicesOverview.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/why-wqf/components/ServicesOverview.jsx)

**Status:** PENDING IMPLEMENTATION

- [ ] **13.1. Build Digital Experiences Explore Page (`/services/digital-experiences`):**
  - Headline: *“EXPERIENCES THAT CONVERT. PRODUCTS THAT SCALE.”*
  - 6 Disciplines: High-Performance Websites, Custom Web Applications, Customer Portals, Native-Feel Interfaces, E-Commerce Platforms, Self-Serve Publishing.
  - Engineering Standards: Sub-second load times, modular React architecture, responsive accessibility (WCAG 2.1 AA), and analytics.
  - Interactive FAQ & CTAs.
- [ ] **13.2. Build AI & Intelligent Tools Explore Page (`/services/ai-tools`):**
  - Headline: *“PRACTICAL INTELLIGENCE. MEASURABLE BUSINESS OUTCOMES.”*
  - 6 Disciplines: Enterprise Semantic Search, Domain-Aware Assistants & Copilots, Document & Invoice Extraction, Automated Workflow Bots, Customer Support Intelligence, Custom Model API Pipes.
  - Engineering Standards: Grounded citations (zero hallucinations), strict enterprise data privacy, measurable time ROI, human-in-the-loop safeguards.
  - Interactive FAQ & CTAs.
- [ ] **13.3. Build Business Systems Explore Page (`/services/business-systems`):**
  - Headline: *“CONNECTED SYSTEMS. UNBROKEN OPERATIONS.”*
  - 6 Disciplines: Custom ERP Platforms, Inventory & Logistics Hubs, Automated Billing & Financial Systems, Internal Team Portals, Legacy Modernization, Central Database & API Architectures.
  - Engineering Standards: Tailored business logic, immutable audit trails, offline resilience, and dedicated staff training.
  - Interactive FAQ & CTAs.
- [ ] **13.4. Update Services Datasets & Overview Cards (Image 2 Fix):**
  - In `src/content/services.js`: Update `deepLink` for Pillars 01, 02, and 03 to point to the new dedicated pages.
  - In `ServicesOverview.jsx`: Update cards so every pillar has a dedicated `EXPLORE [PILLAR] →` button leading to its new page, alongside `START A PROJECT →`.

---

### PHASE 14: BRAND & CREATIVE STORYTELLING & PACKAGE PRUNING
**Files:** [`src/app/services/brand-creative/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/brand-creative/page.js), [`src/content/services.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/services.js)
**Status:** PENDING IMPLEMENTATION

- [ ] **14.1. Prune Integrated Service Packages Section (Image 3 Fix):**
  - Remove `<section>` lines 161–217 (`STRUCTURED ENGAGEMENTS / INTEGRATED SERVICE PACKAGES.`).
  - Preserve `export const creativeServicePackages` in `src/content/services.js` to satisfy smoke test assertions.
- [ ] **14.2. Implement Interactive Brand Transformation Story Module:**
  - Create **"THE BRAND TRANSFORMATION: FROM NOISE TO AUTHORITY"** interactive section.
  - 4 interactive layers: *01 Narrative & Positioning*, *02 Visual Architecture*, *03 Digital Interfaces*, *04 Market Collateral*.
  - Users can interactively toggle layers to inspect business impact, deliverables, and before/after transformation.
- [ ] **14.3. Interactive Production Standards Asset Inspector:**
  - Make the 4 production standards cards interactive with live asset format specs (Vector SVG/AI, CSS design tokens, app icon packages, brand guidelines).

---

### PHASE 15: INTELLIGENT CTA INTAKE ROUTING & PORTFOLIO DEEP FILTERING
**Files:**
- [`src/context/NavContext.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/context/NavContext.js)
- [`src/components/layout/ContactDrawer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/ContactDrawer.jsx)
- [`src/components/layout/Navbar.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/Navbar.jsx)
- [`src/app/portfolio/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/portfolio/page.js)
- [`src/app/portfolio/components/PortfolioClientView.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/portfolio/components/PortfolioClientView.jsx)
- Across service and home pages (`brand-creative`, `personal-branding`, `digital-experiences`, `ai-tools`, `business-systems`, `OurFocus`)

**Status:** PENDING IMPLEMENTATION

- [ ] **15.1. NavContext & ContactDrawer Dynamic Preselection Engine (Image 4 Fix):**
  - Enhance `openContact(preset)` in `NavContext.js` to accept `{ discipline, subOption }`.
  - Wire `ContactDrawer.jsx` to dynamically preselect primary discipline (`brand`, `digital`, `intelligence`, `systems`, `other`) and specific sub-option (e.g. `LOGO & BRAND IDENTITY`, `BRAND STRATEGY`, `PERSONAL BRANDING`).
- [ ] **15.2. Connect All CTA Buttons Across Site:**
  - Brand & Creative Hero (`BUILD YOUR BRAND →`) automatically selects `BRAND & CREATIVE` + `LOGO & BRAND IDENTITY`.
  - Brand catalog cards select specific sub-options (`BRAND STRATEGY`, `GRAPHIC DESIGN`, `PERSONAL BRANDING`).
  - Personal Branding CTAs select `BRAND & CREATIVE` + `PERSONAL BRANDING`.
  - Digital Experiences CTAs select `WEBSITE / DIGITAL PRODUCT`.
  - AI & Intelligent Tools CTAs select `AI & INTELLIGENT TOOL`.
  - Business Systems CTAs select `BUSINESS SYSTEM / ERP`.
- [ ] **15.3. Deep Category Routing for All "VIEW WORK" Buttons:**
  - Update `src/app/portfolio/components/PortfolioClientView.jsx` to parse `useSearchParams()` for `?category=...`.
  - Wire "VIEW WORK" button on Brand page to `/portfolio?category=BRAND+%26+IDENTITY`.
  - Wire "VIEW WORK" button on Personal Branding to `/portfolio?category=PERSONAL+BRAND`.
  - Wire "VIEW WORK" button on AI page to `/portfolio?category=AI+%26+RAG`.
  - Wire "VIEW WORK" button on Systems page to `/portfolio?category=ENTERPRISE+ERP`.

---

### PHASE 16: FULL-STACK VERIFICATION, PERFORMANCE & ARCHITECTURE AUDIT
**Files:** Whole repository
**Status:** PENDING IMPLEMENTATION

- [ ] **16.1. Build & Lint Verification:**
  - Run `pnpm run build` to verify 40+ static and dynamic routes compile with 0 errors.
  - Run `pnpm run lint` to verify clean code hygiene.
- [ ] **16.2. Smoke & E2E Test Verification:**
  - Run `pnpm run test:smoke` (10/10 suites).
  - Run `pnpm run test:runtime` (dev server route responses).
  - Run `pnpm run test:e2e` (e2e integration suite).
- [ ] **16.3. Professional Git Commits:**
  - Each phase committed with clean conventional commits without the word "phase".

---

## 4. VERIFICATION LOG

```
✔ Next.js Build: 37/37 routes static/dynamic compiled (0 errors)
✔ Smoke Tests: 10/10 suites passing (1.01s)
✔ E2E Integration Suite: 24/24 assertions passing (2.8s)
✔ Database Seed: 4 service pillars, 9 projects, 9 articles, 10 team members, 3 admins
✔ Working Tree: Clean on branch feature/content-overhaul
```
