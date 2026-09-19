# GERAT WEBSITE — CONTENT OVERHAUL & UX SIMPLIFICATION (MASTER PROGRESS)

> **Repository:** `Gerat-Tech/Gerat`  
> **Working Branch:** `feature/content-overhaul`  
> **Master Guide:** [`docs/GERAT_CONTENT_UPDATE_GUIDE.md`](file:///home/dawit/Documents/Projects/Gerät/Gerät/docs/GERAT_CONTENT_UPDATE_GUIDE.md)  
> **Primary Audience:** Investors, founders, and non-technical business leaders  
> **Status:** PLANNING COMPLETE · READY FOR PHASED EXECUTION  

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

| # | User Finding / Image | File Location | Problem | Target Fix |
|---|----------------------|---------------|---------|------------|
| 1 | **Image 1 (`media_1789835770200.png`)** | [`src/components/home/OurFocus.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/OurFocus.jsx) | 8 overwhelming disciplines loaded with technical jargon. | Reduce to **4 clear pillars**: *Digital*, *Intelligence*, *Systems*, *Brand*. Plain English copy. |
| 2 | **Image 2 (`media_1789836135519.png`)** | [`src/components/home/Hero.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Hero.jsx) lines 110–118 | Bottom capability tags: `ARTIFICIAL INTELLIGENCE · RAG SYSTEMS · ENTERPRISE ERP · GOVERNMENT TECH`. | Replace with clean 4-pillar tags: `DIGITAL · INTELLIGENCE · SYSTEMS · BRAND`. |
| 3 | **Image 3 (`media_1789836275677.png`)** | [`src/components/home/Partners.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Partners.jsx) | "Modern Infrastructure / Standardized Foundations" tech stack grid (React, Kafka, Qdrant, Docker...). | **REMOVE ENTIRE SECTION** from homepage (`src/app/page.js`). Move tech details to deep case study pages. |
| 4 | **Image 4 (`media_1789836427185.png`)** | [`src/components/layout/Footer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/Footer.jsx) lines 133–144 | Footer engineering column: `ENTERPRISE CLOUD & ERP`, `DOMAIN-GROUNDED RAG & AI`, `REAL-TIME TELEMETRY BUSES`, `CIVIC GOVERNANCE PLATFORMS`. | Remove unrealistic claims. Replace with honest 4 service categories. |
| 5 | **Image 5 (`media_1789836737762.png`)** | [`src/components/layout/ContactDrawer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/ContactDrawer.jsx) lines 7–18 | 10 overwhelming discipline buttons causing cognitive overload. | Reduce to **4 primary options** (`Website / Digital`, `AI / Intelligent Tool`, `Business System`, `Brand & Creative`) + progressive conditional sub-options. |
| 6 | **Team & Portfolio Double Slashes** | `src/app/team`, `src/app/portfolio`, Prisma seed data | Residual `//` dividers or raw slash tropes visible in rendered cards/badges. | Ensure all separators are subtle middle dots (`·`) or clean dashes. |
| 7 | **Default Theme** | [`src/app/layout.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/layout.js), [`src/context/ThemeContext.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/context/ThemeContext.jsx) | Site defaults to dark mode (`#0d0706`). | Switch default to **light mode**, preserving dark mode toggle. |

---

## 3. MASTER IMPLEMENTATION PHASES

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                 EXECUTION FLOW                                  │
├─────────────────┬──────────────────┬─────────────────┬──────────────────────────┤
│ Phase 1-3       │ Phase 4-6        │ Phase 7-8       │ Phase 9-11               │
│ Homepage & Form │ Theme & Footer   │ Services & Data │ De-AI, Seed & Validation │
└─────────────────┴──────────────────┴─────────────────┴──────────────────────────┘
```

---

### PHASE 1: HOMEPAGE RESTRUCTURE & COPY OVERHAUL
**Files:** [`src/app/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/page.js), [`src/components/home/Hero.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Hero.jsx), [`src/components/home/Marquee.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Marquee.jsx), [`src/components/home/Partners.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Partners.jsx)

- [ ] **1.1. Prune Homepage Sections:** Remove `<Partners />` (tech stack) and `<BrandCreativeSection />` from [`src/app/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/page.js). Reduce homepage from 10 sections to 6 clean, fast-scrolling sections:
  1. `Hero`
  2. `Marquee`
  3. `OurFocus` (What We Build — 4 Pillars)
  4. `OurEthos` (Why Gerat)
  5. `OurPortfolio` (Selected Work)
  6. `HowWeWork` (Process)
  7. `Footer` (Final CTA & Navigation)
- [ ] **1.2. Hero Headline & Subhead:**
  - Headline: Replace "TECHNOLOGY THAT MOVES REAL SYSTEMS" with:
    ```
    WE BUILD THE BRIDGE.
    YOU CROSS IT.
    ```
  - Subhead: Replace buzzword paragraph with:
    > "We connect your business to the people it serves — through digital experiences, intelligent tools, business systems, and strong brands."
  - Primary CTA: `SEE WHAT WE BUILD` (scrolls to 01 What We Build)
  - Secondary CTA: `START A PROJECT` (opens ContactDrawer)
- [ ] **1.3. Hero Capability Tags (Image 2 Fix):**
  - Replace `ARTIFICIAL INTELLIGENCE · RAG SYSTEMS · ENTERPRISE ERP · GOVERNMENT TECH` with:
    ```
    DIGITAL · INTELLIGENCE · SYSTEMS · BRAND
    ```
  - Remove pseudo-robotic bottom prompt text; retain clean, subtle scroll prompt.
- [ ] **1.4. Marquee Simplification:**
  - Update marquee tokens to loop: `DIGITAL · INTELLIGENCE · SYSTEMS · BRAND · DIGITAL · INTELLIGENCE · SYSTEMS · BRAND ·`.

---

### PHASE 2: SERVICES REDUCTION (8 → 4 PILLARS)
**File:** [`src/components/home/OurFocus.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/OurFocus.jsx)

- [ ] **2.1. Replace 8 Capabilities with Exactly 4 Pillars:**
  ```javascript
  const capabilities = [
    {
      index: "01",
      title: "DIGITAL EXPERIENCES",
      tags: "WEBSITES · WEB APPLICATIONS · CUSTOMER PORTALS",
      description: "Websites and digital products that make your business easier to discover, understand, and use.",
      link: "/services#digital"
    },
    {
      index: "02",
      title: "AI & INTELLIGENT TOOLS",
      tags: "AI ASSISTANTS · KNOWLEDGE SYSTEMS · AUTOMATION",
      description: "Practical AI that helps teams find information, automate repetitive work, and make better use of what they know.",
      link: "/services#intelligence"
    },
    {
      index: "03",
      title: "BUSINESS SYSTEMS",
      tags: "OPERATIONS · ERP · WORKFLOW PLATFORMS",
      description: "Connected software that unites operations, inventory, and workflows so your business runs with less friction.",
      link: "/services#systems"
    },
    {
      index: "04",
      title: "BRAND & CREATIVE",
      tags: "BRAND STRATEGY · LOGO DESIGN · EXECUTIVE PRESENCE",
      description: "Clear identities and visual systems that make businesses recognizable, credible, and memorable.",
      link: "/services/brand-creative"
    }
  ];
  ```
- [ ] **2.2. Section Header Polish:**
  - Eyebrow: `01 · WHAT WE BUILD`
  - Headline: `HOW WE BUILD THE BRIDGE.`
  - Subhead: `Every business needs a strong foundation, a clear path, and systems that can carry what comes next.`
- [ ] **2.3. Mobile Optimization:** Ensure each row renders with clean spacing, tap-friendly click targets, and legible typography on small screens.

---

### PHASE 3: CONTACT FORM RADICAL SIMPLIFICATION (10 → 4)
**File:** [`src/components/layout/ContactDrawer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/ContactDrawer.jsx)

- [ ] **3.1. Reduce Top-Level Disciplines (Image 5 Fix):**
  Replace the 10 button grid with **4 primary options + 1 fallback**:
  1. `WEBSITE / DIGITAL PRODUCT`
  2. `AI / INTELLIGENT TOOL`
  3. `BUSINESS SYSTEM / ERP`
  4. `BRAND & CREATIVE`
  5. `NOT SURE YET`
- [ ] **3.2. Implement Progressive Disclosure (Sub-options):**
  - If **Brand & Creative** is selected, reveal sub-options: *Brand Strategy*, *Logo & Identity*, *Graphic Design*, *Personal Branding*.
  - If **Business System** is selected, reveal sub-options: *ERP*, *Operations Platform*, *Internal Tools*, *Custom Software*.
  - If **AI & Intelligent Tools** is selected, reveal sub-options: *AI Assistant*, *Knowledge Search*, *Workflow Automation*.
- [ ] **3.3. Humanize Contact Copy:**
  - Header: `LET'S BUILD SOMETHING.`
  - Subhead: `Tell us what you're working on. We respond within 24–48 hours.`
  - First Prompt: `What can we help you build?`
  - Submit Button: `START YOUR PROJECT →`
- [ ] **3.4. Simplify Timelines & Budgets:**
  - Timelines: `THIS MONTH`, `1–3 MONTHS`, `3–6 MONTHS`, `FLEXIBLE`
  - Ensure mobile inputs adhere to single-column top-to-bottom layout with thumb-zone submit button.

---

### PHASE 4: FOOTER OVERHAUL & UNREALISTIC CLAIM REMOVAL
**File:** [`src/components/layout/Footer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/Footer.jsx)

- [ ] **4.1. Remove Fictional Engineering List (Image 4 Fix):**
  - Delete `CIVIC GOVERNANCE PLATFORMS` and `REAL-TIME TELEMETRY BUSES`.
  - Replace the Engineering column with:
    ```
    SERVICES
    • DIGITAL EXPERIENCES
    • AI & INTELLIGENT TOOLS
    • BUSINESS SYSTEMS
    • BRAND & CREATIVE
    ```
- [ ] **4.2. Overhaul Master Footer CTA:**
  - Headline: `READY TO CONNECT YOUR BUSINESS TO WHAT COMES NEXT?`
  - Subhead: `Let's build the bridge together.`
  - CTA Button: `START YOUR PROJECT →`
- [ ] **4.3. Brand Colophon & De-AI-ification:**
  - Brand description: Replace `MONOLITHIC BRAND IDENTITIES, DOMAIN AI...` with `Brand. Digital. Intelligence. Systems.`
  - Bottom bar: Remove `ALL SYSTEMS OPERATIONAL` pulsing telemetry widget (unnecessary robotic trope). Keep clean copyright notice:
    ```
    © 2026 GERAT SOFTWARE SOLUTION. ALL RIGHTS RESERVED.
    ```

---

### PHASE 5: DEFAULT THEME MIGRATION (LIGHT MODE DEFAULT)
**Files:** [`src/app/layout.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/layout.js), [`src/context/ThemeContext.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/context/ThemeContext.jsx), [`src/styles/tokens.css`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/styles/tokens.css)

- [ ] **5.1. Update Default Theme Resolution:**
  - In `src/app/layout.js`, set SSR cookie fallback:
    ```javascript
    const themeCookie = cookieStore.get("gerat-theme")?.value || "light";
    const initialTheme = themeCookie === "dark" ? "dark" : "light";
    ```
  - In `src/context/ThemeContext.jsx`, update context default and `ThemeProvider` initial state to `"light"`.
- [ ] **5.2. Audit Light Mode Contrast & Styling:**
  - Verify `--bg` (`#FAF6ED` warm cream/canvas), `--surface` (`#F3ECE0`), `--text-primary` (`#1c120f`), and `--accent` (`#ea5b15`).
  - Verify card borders (`border-black/10` vs `border-white/10`), active states, and hover effects in light mode.
  - Verify toggle switch in Navbar and Dashboard remains 100% functional.

---

### PHASE 6: "WHY GERAT" & METHODOLOGY SIMPLIFICATION
**Files:** [`src/components/home/OurEthos.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/OurEthos.jsx), [`src/components/home/HowWeWork.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/HowWeWork.jsx), [`src/content/ethos.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/ethos.js)

- [ ] **6.1. Rebrand OurEthos to "Why Gerat":**
  - Section Eyebrow: `02 · WHY GERAT`
  - Headline: `BUILT TO HOLD WEIGHT.`
  - Subhead: `We care about what happens after the launch.`
  - Simplify 4 cards to focus on client outcomes:
    1. *Foundational Stability* (Systems that keep working)
    2. *The Digital Bridge* (Connecting business to modern tools)
    3. *Built to Scale* (Growth without breaking)
    4. *Dedicated Ownership* (Support beyond day one)
- [ ] **6.2. Simplify HowWeWork (6 Steps → 5 Clear Steps):**
  - Headline: `FROM BLUEPRINT TO BRIDGE.`
  - Subhead: `A clear process, from the first conversation to the finished system.`
  - Steps:
    1. `01 · DISCOVER` — We understand the business, the people, and the problem.
    2. `02 · DESIGN` — We create a clear experience, visual direction, and plan.
    3. `03 · BUILD` — We engineer the digital product, tool, or platform.
    4. `04 · LAUNCH` — We test, refine, and prepare for real users.
    5. `05 · SUPPORT` — We stay involved as your business grows.

---

### PHASE 7: SERVICES PAGE & SUB-PAGES OVERHAUL
**Files:** [`src/app/services/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/page.js), [`src/app/why-wqf/components/ServicesOverview.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/why-wqf/components/ServicesOverview.jsx), [`src/app/services/brand-creative/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/brand-creative/page.js), [`src/app/services/personal-branding/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/personal-branding/page.js)

- [ ] **7.1. Align Services Overview to 4 Pillars:**
  - Restructure overview grid to mirror the 4 pillars: Digital, Intelligence, Systems, Brand.
  - Remove academic/enterprise architecture jargon.
- [ ] **7.2. Move Legacy Services Component:**
  - Relocate `ServicesOverview.jsx` from `src/app/why-wqf/components/` to `src/components/services/ServicesOverview.jsx`.
- [ ] **7.3. Refine Brand & Personal Branding Copy:**
  - Brand Creative Hero: `GIVE YOUR BUSINESS SOMETHING PEOPLE CAN RECOGNIZE.`
  - Personal Branding Hero: `YOUR NAME IS PART OF YOUR BUSINESS. MAKE IT COUNT.`
  - Prune 7-step executive framework into 4 core deliverables (Positioning, Visual Identity, Profile System, Personal Site).

---

### PHASE 8: RESIDUAL DOUBLE-SLASH AUDIT & PURGE
**Files:** `src/app/team`, `src/app/portfolio`, `prisma/seed.mjs`, `src/content/portfolio.js`

- [ ] **8.1. Sweep Rendered Team & Portfolio Pages:**
  - Audit team cards: verify no `//` exists in titles, specialties, or bio captions.
  - Audit portfolio cards: replace any `//` in category badges or metrics with ` · `.
  - Check `prisma/seed.mjs` for raw database seed records that still contain double slashes.

---

### PHASE 9: FULL-SITE DE-AI-IFICATION & TONE CALIBRATION
**Files:** Across all `src/components/`, `src/content/`, `src/app/`

- [ ] **9.1. Vocabulary Purge:**
  Replace throughout the codebase:
  - `monolithic` → `strong` / `cohesive`
  - `domain-grounded` → `practical` / `verified`
  - `sovereign` → `independent` / `custom`
  - `deterministic` → `reliable`
  - `telemetry` → `metrics` / `insights`
  - `high-concurrency` → `high-performance`
  - `zero-trust` → `secure`
- [ ] **9.2. Remove Decorative Sci-Fi UI Tropes:**
  - Remove corner-bracket button overlays (`-top-[1px] -left-[1px] size-1.5 border...`).
  - Tone down pulsing green dots.
  - Clean up any robotic terms like `SYS_INIT`, `OPERATIONAL TELEMETRY`.

---

### PHASE 10: PORTFOLIO & SEED DATA RE-ALIGNMENT
**Files:** [`src/content/portfolio.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/portfolio.js), [`prisma/seed.mjs`](file:///home/dawit/Documents/Projects/Gerät/Gerät/prisma/seed.mjs)

- [ ] **10.1. Re-align Featured Projects:**
  - Present honest, relatable projects (Madeya fuel distribution platform, custom business platform, intelligent search assistant, brand identity).
  - Eliminate unrealistic numbers like "12M+ records on national registry" or "$42M+ trade processed".
- [ ] **10.2. Update Seed Script:**
  - Ensure `pnpm prisma db seed` seeds the updated 4 service pillars and honest case study narratives.

---

### PHASE 11: QUALITY ASSURANCE, MOBILE AUDIT & E2E TESTING
**Files:** `tests/smoke/e2e-smoke.test.mjs`, all pages

- [ ] **11.1. Mobile Responsiveness Verification:**
  - Test at 375px (iPhone SE), 390px (iPhone 14/15), and 768px (iPad).
  - Verify hero headlines fit without overflow or awkward line wraps.
  - Verify contact drawer is completely usable with one hand.
  - Verify all CTAs are visible without excessive scrolling.
- [ ] **11.2. Automated Testing:**
  - Update `tests/smoke/e2e-smoke.test.mjs` to validate new headlines, 4 pillars, and light mode default.
  - Execute `pnpm run lint` → 0 errors.
  - Execute `pnpm run build` → 0 errors (all 37 routes compile).
  - Execute `pnpm run test:e2e` → 100% passing.
- [ ] **11.3. Clean Conventional Commits:**
  - Divide commits reasonably per feature/refactor unit.
  - Never use "phase" in commit messages.

---

## 4. AGENT EXECUTION INSTRUCTIONS

When an agent executes tasks from this guide:
1. **Always read the target file first** using `view_file` to confirm exact line numbers before editing.
2. **Follow the Next.js rule:** Consult `node_modules/next/dist/docs/` if modifying framework conventions.
3. **Keep edits contiguous and minimal:** Avoid wholesale overwrites where a surgical replacement suffices.
4. **Test after every phase:** Run `pnpm run build` and `pnpm test:smoke` to guarantee zero regressions.
