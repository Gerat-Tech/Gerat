# GERAT WEBSITE — CONTENT OVERHAUL & UX SIMPLIFICATION

> **Branch:** `feature/content-overhaul`
> **Reference:** [`GERAT_CONTENT_UPDATE_GUIDE.md`](file:///home/dawit/Documents/Projects/Gerät/Gerät/docs/GERAT_CONTENT_UPDATE_GUIDE.md)
> **Status:** 🟢 COMPLETED & FULLY VERIFIED (All 16 Overhaul Phases Verified)

---

## GUIDING PRINCIPLES

These principles come directly from the user, the content guide, and industry research. Every change in every phase must respect these:

1. **"People's brains in the 21st century have adapted to just scrolling. Unless we catch their eye while they do that, we definitely failed as a company."**
2. **Non-technical first.** A visitor should understand what Gerat does in under 10 seconds. No jargon above the fold.
3. **Don't look generated.** Avoid marketing hyperbole, buzzword stacking, and repetitive AI-sounding sentence structures.
4. **Mobile users are primary.** Every section must work on a 375px screen with thumb-reachable CTAs.
5. **We are a starting company.** Remove unrealistic claims about government platforms, institutional scale, and products that don't exist yet.
6. **Less is more.** One big idea + one short explanation + one action per section. Content density kills engagement.
7. **Homepage = convince. Inner pages = explain.** Technical depth belongs on service detail pages, not the homepage.

---

## CURRENT STATE SUMMARY

### Homepage Component Order (10 sections — too many)
| # | Component | Section | Status |
|---|-----------|---------|--------|
| 1 | `Hero.jsx` | Hero with 3D particles, headline, 4 jargon tags | Needs rewrite |
| 2 | `Marquee.jsx` | Infinite scrolling ticker | Needs content update |
| 3 | `OurEthos.jsx` | 4 accordion ethos cards | Needs rewrite |
| 4 | `OurFocus.jsx` | 8 technical disciplines list | Needs radical reduction |
| 5 | `BrandCreativeSection.jsx` | 4 brand creative discipline cards | Needs simplification |
| 6 | `OurPortfolio.jsx` | 3 featured case studies | Needs content cleanup |
| 7 | `HowWeWork.jsx` | 6-step engineering methodology | Needs simplification |
| 8 | `OurLeadership.jsx` | 4 leadership cards | Needs copy rewrite |
| 9 | `Partners.jsx` | Tech stack grid (8 items) | **REMOVE ENTIRELY** |
| 10 | `Footer.jsx` | Full-bleed CTA + sitemap + engineering list | Needs overhaul |

### Key Problems Identified
- **8 disciplines** listed in OurFocus — overwhelming and deeply technical
- **10 service options** in contact form — cognitive overload
- **Hero tags** expose jargon: "ARTIFICIAL INTELLIGENCE · RAG SYSTEMS · ENTERPRISE ERP · GOVERNMENT TECH"
- **Tech stack section** (Partners.jsx) lists infrastructure technologies — irrelevant to clients
- **Footer engineering list** includes "CIVIC GOVERNANCE PLATFORMS" and "REAL-TIME TELEMETRY BUSES" — unrealistic for a startup
- **Default theme is dark** — user wants light mode default
- **Copy is heavily AI-generated** — uses words like "monolithic", "domain-grounded", "sovereign", "deterministic", "telemetry"
- **All portfolio projects are fictional** with specific false metrics ("12M+ RECORDS", "500K+ DOCUMENTS", "99.99% UPTIME")

---

## PHASE 1 — HOMEPAGE RESTRUCTURE & CONTENT SIMPLIFICATION

> **Goal:** Reduce homepage from 10 sections to 6-7, replace all jargon with plain language, and follow the content guide's recommended structure: HERO → WHAT WE BUILD → WHY GERAT → SELECTED WORK → PROCESS → FOOTER CTA.

### 1.1 — Hero Section Rewrite

**File:** [`src/components/home/Hero.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Hero.jsx)

Current state → Target state:

| Element | Current | Target |
|---------|---------|--------|
| Headline | "TECHNOLOGY THAT MOVES REAL SYSTEMS." | **"WE BUILD THE BRIDGE. YOU CROSS IT."** |
| Supporting copy | "From monolithic brand identities to high-concurrency software architectures and domain-grounded AI..." | **"We connect your business to the people it serves — through digital experiences, intelligent tools, business systems, and strong brands."** |
| Primary CTA | "START A PROJECT" | **"SEE WHAT WE BUILD"** |
| Secondary CTA | "EXPLORE WORK →" | **"START A PROJECT"** |
| Capability tags | "ARTIFICIAL INTELLIGENCE · RAG SYSTEMS · ENTERPRISE ERP · GOVERNMENT TECH" | **"DIGITAL · INTELLIGENCE · SYSTEMS · BRAND"** |
| Bottom anchor text | "OPERATING AT THE INTERSECTION OF DEEP ENGINEERING, ARCHITECTURAL DESIGN, AND MISSION-CRITICAL SOFTWARE." | **Remove or replace with simple bridge metaphor** |

**Mobile consideration:** Headline text should be `text-3xl` minimum to be readable. Supporting copy should max at 2 lines. Both CTAs must be full-width stacked on mobile.

### 1.2 — Marquee Ticker Update

**File:** [`src/components/home/Marquee.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Marquee.jsx)

Replace current tokens:
```
Current: "ENTERPRISE SOFTWARE", "AI & RAG", "BRAND ARCHITECTURE", "DISTRIBUTED SYSTEMS", "ERP PLATFORMS", "GOVERNMENT TECHNOLOGY", "ZERO-TRUST SECURITY", "DESIGN SYSTEMS"

Target: "DIGITAL / INTELLIGENCE / SYSTEMS / BRAND / DIGITAL / INTELLIGENCE / SYSTEMS / BRAND /"
```

The ticker should reinforce the 4 pillars, not list technologies.

### 1.3 — Replace OurEthos with "Why Gerat"

**File:** [`src/components/home/OurEthos.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/OurEthos.jsx)
**Data file:** [`src/content/ethos.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/ethos.js)

| Element | Current | Target |
|---------|---------|--------|
| Section label | `01 ETHOS` | **`02 / WHY GERAT`** |
| Headline | "ENGINEERED FOR RIGOR. ARCHITECTED FOR SCALE." | **"BUILT TO HOLD WEIGHT."** |
| Supporting copy | "We reject fragile digital facades. Gerat designs and deploys mission-critical systems..." | **"We care about what happens after the launch."** |
| CTA | "CONSULT WITH OUR ARCHITECTS →" | **"START A PROJECT →"** |
| Cards | 4 brand pillars (Support/Bridge/Scalability/5 Founders) with heavy technical detail | **5 simple supporting points:** Scalable foundations, Clear communication, Functional-first design, Thoughtful technology, Ongoing support |

The 4-card accordion interaction can remain but with dramatically simplified copy. Remove all references to "fault-tolerant backends", "deterministic uptime", "zero-trust cryptographic", "sovereignty", etc.

### 1.4 — Reduce OurFocus from 8 Disciplines to 4 Service Pillars

**File:** [`src/components/home/OurFocus.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/OurFocus.jsx)

This is the most critical content change. The content guide specifies exactly 4 pillars:

| # | Current Discipline | Action |
|---|-------------------|--------|
| 01 | ENTERPRISE SOFTWARE ARCHITECTURE | → Merged into **SYSTEMS** |
| 02 | DOMAIN-GROUNDED AI & RAG NETWORKS | → Becomes **INTELLIGENCE** |
| 03 | CUSTOM ERP & OPERATIONAL PLATFORMS | → Merged into **SYSTEMS** |
| 04 | PUBLIC-SECTOR & INSTITUTIONAL PLATFORMS | → **REMOVE** |
| 05 | BRAND STRATEGY, IDENTITY & DESIGN SYSTEMS | → Merged into **BRAND** |
| 06 | EXECUTIVE & FOUNDER PERSONAL BRANDING | → Merged into **BRAND** |
| 07 | HIGH-PERFORMANCE WEB & MOBILE SUITES | → Becomes **DIGITAL** |
| 08 | SECURITY, COMPLIANCE & ZERO-TRUST HARDENING | → **REMOVE** |

**New 4-pillar structure:**

```
01 — DIGITAL
Websites and digital products that make your business easier to discover, understand, and use.
Examples: Websites, Web Applications, Customer Portals, Digital Products

02 — INTELLIGENCE
Practical AI that helps people find information, automate work, and make better use of what they already know.
Examples: AI Assistants, Knowledge Systems, Intelligent Search, Automation

03 — SYSTEMS
Software that connects operations, people, and information so businesses can work with less friction.
Examples: ERP, Internal Platforms, Workflow Systems, Custom Software

04 — BRAND
A clear identity that helps people recognize your business — from the logo to the way it shows up online.
Examples: Brand Strategy, Logo & Identity, Graphic Design, Personal Branding
```

| Element | Current | Target |
|---------|---------|--------|
| Section label | `02 CAPABILITIES` | **`01 / WHAT WE BUILD`** |
| Headline | "SPECIALIZED DISCIPLINES BUILT FOR SCALE." | **"HOW WE BUILD THE BRIDGE."** |
| Supporting copy | "From high-throughput data processing to domain-grounded artificial intelligence..." | **"Every business needs a strong foundation, a clear path, and systems that can carry what comes next."** |
| Number of items | 8 | **4** |
| Tags per item | Technical tags (e.g., "DISTRIBUTED SYSTEMS · CLOUD NATIVE") | **Remove tags entirely** or use plain examples |

**Mobile consideration:** 4 pillars stack cleanly on mobile. 8 items require excessive scrolling.

### 1.5 — Remove BrandCreativeSection from Homepage

**File:** [`src/components/home/BrandCreativeSection.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/BrandCreativeSection.jsx)

The Brand & Creative section duplicates content that is already covered by the new `BRAND` pillar in OurFocus. Having a separate brand section makes the homepage too long and makes Brand look like a separate business rather than one of four pillars.

**Action:** Remove `<BrandCreativeSection />` from `src/app/page.js`. The detailed brand services remain on `/services/brand-creative`.

### 1.6 — Remove Partners/Tech Stack Section

**File:** [`src/components/home/Partners.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/Partners.jsx)

This section lists 8 technology items (React & Next.js, Python & FastAPI, PostgreSQL & Timescale, Apache Kafka, Qdrant & Weaviate, Docker & Kubernetes, Tailwind & GSAP, Zero-Trust Crypto). According to the content guide:

> "Technical details belong deeper in the site."

> "Do not put every technology here."

**Action:** Remove `<Partners />` from `src/app/page.js`. Technologies can be mentioned on individual case study pages where they are relevant.

### 1.7 — Simplify HowWeWork from 6 Steps to 5

**File:** [`src/components/home/HowWeWork.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/HowWeWork.jsx)

| Element | Current | Target |
|---------|---------|--------|
| Section label | `04 HOW WE WORK` | **`04 / HOW WE WORK`** |
| Headline | "FROM PROBLEM TO WORKING SYSTEM." | **"FROM BLUEPRINT TO BRIDGE."** |
| Supporting copy | "A disciplined, multi-stage engineering method designed to eliminate ambiguity..." | **"A clear process, from the first conversation to the finished system."** |

**Steps:**

| # | Current Step Name & Title | Target |
|---|---------------------------|--------|
| 01 | UNDERSTAND — "We begin with the operational problem, user behaviors..." | **DISCOVER** — "We understand the business, the people, the problem, and what success should look like." |
| 02 | DEFINE — "We convert the challenge into an authoritative system model..." | **DESIGN** — "We turn that understanding into a clear experience, visual direction, and plan." |
| 03 | DESIGN — "We design the human interface and system mechanics in lockstep..." | **BUILD** — "We design and engineer the product, platform, or system." |
| 04 | BUILD — "Engineering transforms models into hardened software..." | **LAUNCH** — "We test, refine, and prepare it for real users." |
| 05 | VALIDATE — "We stress-test against peak transaction loads..." | **SUPPORT** — "We stay involved as the product grows and the business changes." |
| 06 | EVOLVE — "Launch is day zero..." | **Remove** (merged into SUPPORT) |

### 1.8 — Simplify OurLeadership Copy

**File:** [`src/components/home/OurLeadership.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/home/OurLeadership.jsx)
**Data file:** [`src/content/team.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/team.js)

| Element | Current | Target |
|---------|---------|--------|
| Section label | `05 LEADERSHIP` | **`05 / LEADERSHIP`** |
| Headline | "ENGINEERING LEADERSHIP. DOMAIN EXPERIENCE." | **"THE PEOPLE BEHIND THE WORK."** |
| CTA | "MEET ALL ENGINEERS & ADVISORS →" | **"MEET THE TEAM →"** |

**Bio rewrites (examples):**

| Person | Current Role/Bio | Target |
|--------|-----------------|--------|
| Hruy Daniel | "Directing Gerat Software Solution's strategic vision, enterprise partnerships, and operational governance. Driving transformative digital architecture..." | **"Leads the company's vision, partnerships, and business growth."** |
| Dawit Teklebrhan | "Directing the firm's architectural doctrine, engineering roadmaps, and distributed software backends..." | **"Builds digital products and intelligent systems, with a focus on practical software and AI applications."** |

All bios should be 1 sentence, concrete, no buzzwords. The content guide gives examples.

### 1.9 — Update src/app/page.js Component Order

**File:** [`src/app/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/page.js)

```
BEFORE (10 components):
Hero → Marquee → OurEthos → OurFocus → BrandCreativeSection → OurPortfolio → HowWeWork → OurLeadership → Partners → Footer

AFTER (7 components):
Hero → Marquee → OurFocus (4 pillars) → OurEthos (Why Gerat) → OurPortfolio → HowWeWork → Footer
```

- OurFocus (now "What We Build") moves before OurEthos (now "Why Gerat") — answer WHAT before WHY
- BrandCreativeSection removed
- OurLeadership → move to footer as a small "Meet the team" link, or embed as a small card in the footer CTA area
- Partners (tech stack) removed
- Footer handles the final CTA + leadership teaser

**Note:** The `OurLeadership` section can optionally be kept as a slim section between HowWeWork and Footer if the team is small enough to display in a compact row. Decision point for review.

---

## PHASE 2 — CONTACT FORM SIMPLIFICATION

> **Goal:** Reduce from 10 discipline options to a clear, outcome-focused selection with conditional logic.

### 2.1 — Simplify Primary Discipline Selection

**File:** [`src/components/layout/ContactDrawer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/ContactDrawer.jsx)

```
BEFORE (10 options):
ENTERPRISE ERP, AI & DOMAIN RAG, BRAND STRATEGY, LOGO & BRAND IDENTITY,
GRAPHIC DESIGN, SOCIAL & MARKETING DESIGN, PERSONAL BRANDING,
PUBLIC SECTOR, WEB & MOBILE, ARCHITECTURE AUDIT

AFTER (4 primary + 1 fallback):
01 — WEBSITE / DIGITAL PRODUCT
02 — AI / INTELLIGENT TOOL
03 — BUSINESS SYSTEM
04 — BRAND & CREATIVE
05 — NOT SURE YET
```

Sub-categories can appear conditionally after primary selection (progressive disclosure):

| If Selected | Show Sub-Options |
|-------------|-----------------|
| BRAND & CREATIVE | Brand Strategy, Logo & Identity, Graphic Design, Social & Marketing, Personal Branding |
| BUSINESS SYSTEM | ERP, Internal Platform, Workflow System, Custom Software |
| AI / INTELLIGENT TOOL | AI Assistant, Knowledge System, Search, Automation |
| WEBSITE / DIGITAL PRODUCT | Website, Web App, Customer Portal, Digital Product |

### 2.2 — Simplify Drawer Header Copy

| Element | Current | Target |
|---------|---------|--------|
| Headline | "TALK TO THE BRAND & CREATIVE DIRECTORS." / "TALK TO THE ENGINEERING ARCHITECTS." | **"LET'S BUILD SOMETHING."** |
| Supporting | (none visible) | **"Tell us what you're working on."** |
| Question | "01 · SYSTEM & CREATIVE DISCIPLINE" | **"What can we help you build?"** |
| Submit | "SUBMIT INQUIRY →" | **"START YOUR PROJECT →"** |

### 2.3 — Simplify Timeline Options

```
BEFORE: IMMEDIATE (0-30 DAYS), Q1-Q2 ROADMAP, 3-6 MONTHS, STRATEGIC ENGAGEMENT
AFTER:  THIS MONTH, 1-3 MONTHS, 3-6 MONTHS, NOT SURE
```

### 2.4 — Mobile Form UX

- Single-column layout on all screen sizes
- Larger tap targets for selection buttons (minimum 48×48px)
- Progressive disclosure — only show next question after current is answered
- Place submit CTA in thumb zone (bottom of viewport)

---

## PHASE 3 — FOOTER OVERHAUL

> **Goal:** Replace jargon-heavy engineering list, simplify service columns, update copy.

### 3.1 — Footer Master CTA Section

**File:** [`src/components/layout/Footer.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/Footer.jsx)

| Element | Current | Target |
|---------|---------|--------|
| Headline | "FROM IDENTITY TO INFRASTRUCTURE." | **"READY TO CONNECT YOUR BUSINESS TO WHAT COMES NEXT?"** |
| Supporting | "Have an ambitious venture, brand, or mission-critical system worth building?..." | **"Let's build the bridge together."** |
| CTA | "START A PROJECT →" | **"START YOUR PROJECT →"** |
| SLA badge | "DIRECT RESPONSE · 24-48 HOUR REVIEW" | Keep as-is (good trust signal) |

### 3.2 — Replace Engineering Disciplines Column

```
BEFORE (Footer engineering list):
ENGINEERING
• ENTERPRISE CLOUD & ERP
• DOMAIN-GROUNDED RAG & AI
• REAL-TIME TELEMETRY BUSES
• CIVIC GOVERNANCE PLATFORMS

AFTER (aligned to 4 pillars):
SERVICES
• DIGITAL — Websites & Digital Products
• INTELLIGENCE — AI & Intelligent Tools
• SYSTEMS — ERP & Business Software
• BRAND — Identity & Graphic Design
```

### 3.3 — Update Brand Column Description

```
BEFORE: "MONOLITHIC BRAND IDENTITIES, DOMAIN AI & ENTERPRISE DIGITAL ARCHITECTURES."
AFTER:  "Brand. Digital. Intelligence. Systems."
```

### 3.4 — Footer Bottom Line

```
BEFORE: "© 2026 GERAT SOFTWARE SOLUTION. ALL RIGHTS RESERVED." + "ALL SYSTEMS OPERATIONAL"
AFTER:  "© 2026 GERAT SOFTWARE SOLUTION. ALL RIGHTS RESERVED." (remove "ALL SYSTEMS OPERATIONAL" — it's a telemetry trope)
```

The "ALL SYSTEMS OPERATIONAL" status indicator with pulsing green dot is a visual pattern commonly associated with status pages (like status.github.com). On an agency website it looks out of place and generated.

---

## PHASE 4 — CONTENT DATA FILES REWRITE

> **Goal:** Replace all AI-generated copy in content data files with human-readable language.

### 4.1 — Ethos Data Rewrite

**File:** [`src/content/ethos.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/ethos.js)

The `brandPillars`, `ethosCards`, and `methodologySteps` arrays contain heavy technical jargon. Examples to replace:

| Current | Replace With |
|---------|-------------|
| "EXPONENTIAL CAPACITY WITHOUT ARCHITECTURAL DECAY" | "Built for growth." |
| "deterministic, mathematically verified systems that maintain integrity under peak stress" | "Reliable systems that keep working as your business grows." |
| "FORMAL PROTOCOL DESIGN" | "Planning" |
| "CORE ENGINE VALIDATION" | "Prototyping" |
| "HIGH-FIDELITY IMPLEMENTATION" | "Building" |
| "SECURITY & FAILURE TESTING" | "Testing" |
| "ZERO-DOWNTIME COMMENCEMENT" | "Launch & Support" |

### 4.2 — Team Data Rewrite

**File:** [`src/content/team.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/team.js)

**Issues found:**
- Team lists 4 founders but ethos says "5 FOUNDERS UNITED" → reconcile (either add 5th or remove the "5 founders" pillar)
- 6 "Engineering Specialists" listed (Dr. Bereket Tadesse, Selamawit Haile, etc.) — verify these are real people
- Role titles are overly technical: "PRINCIPAL SYSTEMS ARCHITECT", "STAFF APPLIED AI RESEARCHER", "LEAD CLOUD ORCHESTRATION ENGINEER"
- Bios are AI-generated: "Directing the firm's architectural doctrine, engineering roadmaps, and distributed software backends"

**Action:** Rewrite all bios in 1 concrete sentence. Simplify role titles. Verify all team members are real.

### 4.3 — Portfolio Data Rewrite

**File:** [`src/content/portfolio.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/portfolio.js)

**Critical issue:** All 9 case studies appear to be fictional:
- "NATIONAL DIGITAL RECORDS ENGINE" — 12M+ records (unrealistic for a startup)
- "AXIOM ENTERPRISE ERP & SUPPLY SUITE" — 99.99% uptime claim
- "SYNAPSE KNOWLEDGE RAG ENGINE" — 500K+ documents, 98.4% accuracy
- "CELLULAR TOWER TELEMETRY PIPELINE" — 120K events/sec
- "COFFEE EXPORT & TRACEABILITY ERP" — \$42M+ trade processed

**Action:** Either:
- (a) Remove all fictional projects and replace with honest placeholder cards: "DIGITAL PRODUCT — A purpose-built web experience for a growing organization." (as per content guide Section 22)
- (b) Keep only Madeya as a real project and add 2-3 generic category cards

This is a decision point that requires user input.

### 4.4 — Site Config Data Update

**File:** [`src/content/site.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/site.js)

| Field | Current | Target |
|-------|---------|--------|
| tagline | "From Identity to Infrastructure" | **"Brand. Digital. Intelligence. Systems."** |
| description | "...builds monolithic brand identities, digital products, intelligent AI systems, and enterprise software architectures for high-stakes operational environments." | **"Gerat builds digital products, intelligent tools, business systems, and brand identities for businesses and institutions."** |
| navLinks | SERVICES, PORTFOLIO, TEAM, INSIGHTS | **SERVICES, WORK, MADEYA, INSIGHTS, ABOUT** |

---

## PHASE 5 — SERVICES PAGE OVERHAUL

> **Goal:** Align the services page and sub-pages with the 4-pillar structure.

### 5.1 — Main Services Page

**File:** [`src/app/services/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/page.js)
**Component:** [`src/app/why-wqf/components/ServicesOverview.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/why-wqf/components/ServicesOverview.jsx)

| Element | Current | Target |
|---------|---------|--------|
| Hero title | "PURPOSE-BUILT DIGITAL SYSTEMS. MISSION-CRITICAL DELIVERY." | **"WHAT WE BUILD."** |
| Hero copy | "We engineer bespoke digital platforms, enterprise software, and applied AI systems..." | **"From the way your business looks to the systems behind how it works, Gerat brings brand, design, software, and intelligent technology together."** |
| CTA | "DISCUSS YOUR SYSTEM REQUIREMENTS →" | **"START A PROJECT →"** |
| Pillars | 6 technical disciplines | **4 pillars: DIGITAL, INTELLIGENCE, SYSTEMS, BRAND** |

### 5.2 — Brand Creative Service Page

**File:** [`src/app/services/brand-creative/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/brand-creative/page.js)

| Element | Current | Target |
|---------|---------|--------|
| Hero headline | "MAKE THE RIGHT FIRST IMPRESSION. THEN MAKE IT EVERYWHERE." | **"GIVE YOUR BUSINESS SOMETHING PEOPLE CAN RECOGNIZE."** |
| Hero copy | "We engineer monolithic visual identities, precision vector logo systems..." | **"We create brand identities and visual systems that make businesses clearer, more consistent, and easier to remember."** |
| CTA | "INITIATE BRAND ENGAGEMENT →" | **"BUILD YOUR BRAND →"** |
| Disciplines | 6 items | **5: Brand Strategy, Logo Design, Brand Identity, Graphic Design, Social & Marketing Design** |

### 5.3 — Personal Branding Service Page

**File:** [`src/app/services/personal-branding/page.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/services/personal-branding/page.js)

| Element | Current | Target |
|---------|---------|--------|
| Hero headline | "YOUR NAME IS PART OF YOUR BUSINESS. MAKE IT COUNT." | Keep (this is good) |
| Hero copy | "We help founders, executives, consultants... turn their life's work and technical mastery into an undeniable, recognizable personal brand that opens doors to capital, partnerships, and high-stakes opportunities." | **Simplify:** "We help founders and leaders build a personal brand that opens doors." |
| 7 framework pillars | Extremely detailed | **Reduce to 4-5 key deliverables** |

### 5.4 — Move ServicesOverview Component

The `ServicesOverview.jsx` lives under `src/app/why-wqf/components/` which is a legacy path. Move to `src/components/services/` or `src/app/services/components/` for clarity.

---

## PHASE 6 — THEME DEFAULT & VISUAL POLISH

> **Goal:** Switch default theme to light mode, clean up generated-looking UI patterns.

### 6.1 — Change Default Theme to Light

**Files to modify:**
- [`src/app/layout.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/layout.js) — Change fallback from `"dark"` to `"light"`
- [`src/context/ThemeContext.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/context/ThemeContext.jsx) — Change `initialTheme = "dark"` to `initialTheme = "light"`, update context default

```javascript
// layout.js change:
const initialTheme = themeCookie === "dark" ? "dark" : "light"; // was: === "light" ? "light" : "dark"

// ThemeContext.jsx change:
export function ThemeProvider({ initialTheme = "light", children }) { // was "dark"
```

### 6.2 — Verify Light Mode CSS Variables

**File:** [`src/styles/tokens.css`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/styles/tokens.css)

Ensure the light mode variables look polished:
- Background should be warm cream/white (brand-appropriate), not harsh pure white
- Text should be dark brown/near-black, not pure black
- Accent color (#ea5b15) should work well on light backgrounds
- All component borders, shadows, and hover states should be tested in light mode

### 6.3 — Remove "Generated" UI Tropes

Search and address these patterns across the entire site:

| Pattern | Where Found | Action |
|---------|-------------|--------|
| "ALL SYSTEMS OPERATIONAL" + green pulsing dot | Footer.jsx | Remove |
| "SCROLL TO EXPLORE" with bouncing arrow | Hero.jsx | Remove or simplify to just subtle ↓ |
| Corner bracket decorations on buttons | Hero.jsx, Partners.jsx | Remove — these are a Vercel/agency template trope |
| "INITIATE COMMISSION" | ContactDrawer.jsx | Replace with "START A PROJECT" |
| "CONSULT WITH OUR ARCHITECTS" | OurEthos.jsx | Replace with "START A PROJECT" |
| "COMMISSION A BUILD" | Partners.jsx | Section being removed |
| Hexadecimal/code-style comments in UI | Various | Remove |
| Spec reference comments (§10, §17, §22, etc.) | Multiple files | Keep in code but verify none leak to UI |

---

## PHASE 7 — NAVIGATION & SEO UPDATE

> **Goal:** Align navigation with simplified IA and update SEO metadata.

### 7.1 — Update Main Navigation

**File:** [`src/components/layout/Navbar.jsx`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/components/layout/Navbar.jsx)
**Data:** [`src/content/site.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/content/site.js)

```
BEFORE: SERVICES | PORTFOLIO | TEAM | INSIGHTS
AFTER:  SERVICES | WORK | ABOUT | INSIGHTS | CONTACT
```

Or per content guide:
```
SERVICES | WORK | MADEYA | INSIGHTS | ABOUT | CONTACT
```

Decision point: Whether Madeya gets its own nav item depends on how prominent the project should be. It can also appear as a featured item under WORK.

### 7.2 — Update SEO Metadata

**File:** [`src/app/layout.js`](file:///home/dawit/Documents/Projects/Gerät/Gerät/src/app/layout.js) and individual page metadata

| Page | Current Title | Target Title |
|------|--------------|-------------|
| Home | (check current) | "Gerat Software Solution · Digital Products, AI, Business Systems & Brand" |
| Services | "Platform & Engineering Services" | "Services · Digital, AI, Business Systems & Brand · Gerat" |
| Portfolio/Work | (check current) | "Selected Work · Gerat Software Solution" |
| Team | (check current) | "Team · Gerat Software Solution" |
| Insights | (check current) | "Insights · Gerat Software Solution" |

### 7.3 — Update Social/OG Meta

```
description: "Gerat Software Solution builds digital products, intelligent tools, business systems, and brand identities for businesses and institutions."
```

---

## PHASE 8 — TEAM & PORTFOLIO PAGE CLEANUP

> **Goal:** Remove remaining generated content from inner pages.

### 8.1 — Team Page

**Location:** `src/app/team/` and related components

| Element | Current | Target |
|---------|---------|--------|
| Hero | "ENGINEERING LEADERSHIP. DOMAIN EXPERIENCE." (if same as homepage) | **"THE PEOPLE BEHIND THE WORK."** |
| Supporting | (check current copy) | **"A team of builders, designers, and problem-solvers working across technology and creative disciplines."** |
| Bios | Technical jargon-heavy | 1 sentence each, concrete |

Verify all team members are real people. Remove any placeholder stock photos.

### 8.2 — Portfolio/Work Page

**Location:** `src/app/portfolio/` and related components

| Element | Current | Target |
|---------|---------|--------|
| Section name | "PORTFOLIO" | **"SELECTED WORK"** or **"WORK"** |
| Hero | (check current) | **"WORK THAT SOLVES SOMETHING."** |
| Supporting | (check current) | **"Explore selected products, platforms, digital experiences, and identities we've built or are building."** |
| Filters | (check current) | **ALL · DIGITAL · INTELLIGENCE · SYSTEMS · BRAND** |

### 8.3 — Remaining Double-Slash Audit

The user reports `//' still visible on team and portfolio pages. A deep scan found 0 remaining `//` in user-facing strings, so this may be:
- A rendering artifact from the `·` middle dot character
- An issue with the Prisma-seeded data vs. content files
- Something visible only in the rendered site, not in source

**Action:** Inspect the rendered pages in a browser, checking:
1. Team page bios and focus tags
2. Portfolio page category labels and metric strings
3. Check the Prisma seed data (`prisma/seed.mjs`) for any remaining `//` in seeded content

---

## PHASE 9 — FULL-SITE CONTENT AUDIT & DE-GENERATION PASS

> **Goal:** Systematic sweep of every user-facing string to remove AI-generated patterns.

### 9.1 — Word Replacement Checklist

Search and replace across all `src/` files:

| AI-Generated Word/Phrase | Replace With |
|--------------------------|-------------|
| monolithic | strong, consistent |
| domain-grounded | practical, purpose-built |
| sovereign | (remove) |
| deterministic | reliable |
| institutional-grade | professional, reliable |
| mission-critical | important, essential |
| high-concurrency | (remove or simplify) |
| fault-tolerant | reliable |
| zero-trust | secure |
| telemetry | monitoring (or remove) |
| orchestration | management, coordination |
| architectural doctrine | engineering approach |
| exponential | (remove unless literal) |
| cryptographic verification | security |
| state machines | (remove) |
| consensus | (remove) |
| high-fidelity | (remove) |
| canary rollouts | (remove) |
| chaos engineering | (remove) |
| "we leverage" | "we use" or "we build" |
| "we empower" | "we help" |
| "we transform" | "we improve" |
| "we unlock" | "we enable" |
| "we harness" | "we use" |

### 9.2 — Sentence Pattern Detection

Search for these AI-generated sentence patterns:

- Sentences starting with "Architecting..." / "Engineering..." / "Orchestrating..."
- Multiple adjectives before nouns: "resilient, horizontally scalable microservices"
- Sentences with 3+ technical terms chained together
- Any sentence over 30 words that a non-technical person wouldn't understand

### 9.3 — Visual De-Generation

| UI Pattern | Issue | Action |
|------------|-------|--------|
| Pulsing dots | AI-template aesthetic | Remove or reduce to 1 instance |
| Corner bracket overlays on buttons | Vercel template pattern | Remove |
| "Spec §XX" references | Code comment leakage | Verify none visible in UI |
| Military/aerospace styling | "ZERO-TRUST", "MISSION-CRITICAL" | Replace with calm professional language |
| Status indicator badges | "ALL SYSTEMS OPERATIONAL" | Remove |

---

## PHASE 10 — DATABASE SEED DATA UPDATE

> **Goal:** Align Prisma seed data with simplified content.

### 10.1 — Update Service Pillars in Seed

**File:** [`prisma/seed.mjs`](file:///home/dawit/Documents/Projects/Gerät/Gerät/prisma/seed.mjs)

The database likely stores the old 8-discipline structure. Update to match the 4 pillars:
- DIGITAL EXPERIENCES
- AI & INTELLIGENT TOOLS
- BUSINESS SYSTEMS
- BRAND & CREATIVE

### 10.2 — Update Case Studies in Seed

Either replace fictional projects with honest placeholders or update to match simplified content.

### 10.3 — Update SiteConfig in Seed

Update any MARQUEE_TOKENS, navigation links, or theme defaults stored in the database.

---

## PHASE 11 — TESTING & VERIFICATION

> **Goal:** Ensure all changes render correctly, pass tests, and build successfully.

### 11.1 — Build Verification
```bash
pnpm run build  # Must complete with 0 errors
pnpm run lint    # Must complete with 0 errors
```

### 11.2 — E2E Test Updates

**File:** [`tests/smoke/e2e-smoke.test.mjs`](file:///home/dawit/Documents/Projects/Gerät/Gerät/tests/smoke/e2e-smoke.test.mjs)

The existing 24-point E2E test suite checks for content that will change. Update all assertions to match new content:
- Hero headline text
- Section labels and headings
- Navigation links
- Footer content
- Service discipline names

### 11.3 — Visual QA Checklist

| Check | Platform |
|-------|----------|
| Hero renders correctly with new copy | Desktop + Mobile |
| 4 service pillars display cleanly | Desktop + Mobile |
| Contact form shows 4-5 options | Desktop + Mobile |
| Light mode is default on fresh visit | Desktop + Mobile |
| Footer has no jargon or generated patterns | Desktop + Mobile |
| All pages load without console errors | Desktop + Mobile |
| Theme toggle (light ↔ dark) works | Desktop + Mobile |
| No remaining `//` visible anywhere | Desktop + Mobile |

### 11.4 — Git Commit Strategy

Commit changes in logical units:
1. `refactor(content): simplify hero section copy and remove jargon tags`
2. `refactor(content): reduce service disciplines from 8 to 4 pillars`
3. `feat(ux): simplify contact form to 4 primary options with progressive disclosure`
4. `refactor(content): overhaul footer copy and remove engineering jargon`
5. `refactor(content): rewrite ethos and team copy for non-technical clarity`
6. `feat(theme): switch default theme from dark to light mode`
7. `refactor(content): remove tech stack section and brand creative homepage section`
8. `refactor(content): update services pages to match 4-pillar structure`
9. `refactor(content): de-generate all AI-sounding copy across site`
10. `test: update e2e assertions for simplified content`

---

---

## PHASE 12 — HOW WE WORK: ARCHITECTURAL MILESTONE STORY ENGINE
> **Status:** 🟢 COMPLETED & VERIFIED
- Transformed static process list into an interactive architectural milestone story engine.
- Implemented horizontal milestone rail with progress bar, active stage selector, and tactile feedback.
- Created 5 bespoke animated SVG schematics:
  1. Discovery & Architecture Blueprint
  2. Systems & Experience Prototyping
  3. Hardened Production Engineering
  4. Observability & Infrastructure Handover
  5. Evolution & Sustained Partnership
- Integrated concrete deliverables checklist and "Client Experience" highlight for each milestone.
- Wired direct CTA with preselection: `{ discipline: "systems", subOption: "ENTERPRISE ERP" }`.

---

## PHASE 13 — DEDICATED EXPLORE PAGES FOR DIGITAL, AI, AND BUSINESS SYSTEMS
> **Status:** 🟢 COMPLETED & VERIFIED
- Created 3 new dedicated editorial explore routes matching the depth of Brand & Creative:
  1. `/services/digital-experiences` (Web, Native Mobile, Flagship Portals, Design Systems)
  2. `/services/ai-tools` (RAG Knowledge Bases, Agent Workflows, Domain Copilots, Analytics)
  3. `/services/business-systems` (Enterprise ERP, Commerce & Billing, Workflow Automation, Microservices)
- Added interactive capability selectors, feature cards, delivery timelines, and direct CTA presets for each capability.
- Updated `deepLink` mappings across `src/content/services.js` and `/services` root overview.

---

## PHASE 14 — BRAND & CREATIVE PAGE OVERHAUL
> **Status:** 🟢 COMPLETED & VERIFIED
- Removed rigid legacy 4-card package section per user instruction (Image 3).
- Built 4-layer interactive "From Noise to Authority" transformation story engine:
  1. Strategic Positioning
  2. Visual Architecture
  3. Design System & Touchpoints
  4. Brand Governance & Scale
- Added interactive before/after transformation comparisons and custom vector diagrams.
- Created interactive "Production Standards" asset inspector (Master Vectors, Typography Scale, Color Harmony, Guidelines Book).
- Preserved deep-link to `/services/personal-branding` (Founder Brand).

---

## PHASE 15 — DEEP-LINKING & CTA DYNAMIC PRE-SELECTION
> **Status:** 🟢 COMPLETED & VERIFIED
- Wired `NavContext` with `contactPreset` state and helper function `openContact(preset)`.
- Updated `ContactDrawer` to automatically pre-select primary discipline and sub-option when triggered from any section or page.
- Added URL search parameter routing (`?category=...`) to `/portfolio` with reactive category switching.
- Updated all explore page CTAs and hero buttons to pass contextual presets.

---

## PHASE 16 — MOBILE POLISH, REPOSITORY INTEGRITY & VERIFICATION
> **Status:** 🟢 COMPLETED & VERIFIED
- Added vertical scroll safety (`overflow-y-auto`) to mobile menu for 375px/compact viewports.
- Added 4-pillar quick links (DIGITAL, AI TOOLS, SYSTEMS, BRAND) to mobile navigation drawer.
- Linked footer service entries directly to dedicated explore routes.
- Full verification suite:
  - ESLint: 0 errors.
  - Production Build (`next build`): 40/40 routes compiled cleanly.
  - Smoke tests: 10/10 test suites passed (1.06s).
  - Dev server runtime tests: 10/10 routes responded with 200 OK.
  - E2E tests: 27/27 assertions passed (2.1s).

---

## PHASE 17 — DESIGN REFINEMENTS, HERO CTA FOCUS, LOGO PALETTE SWITCH & CONTRAST OVERHAUL
> **Status:** 🟢 COMPLETED & VERIFIED
- **Brand Creative:** Removed Section 04 (*Production Standards / Asset Inspector*) per user request, allowing seamless narrative progression to FAQ.
- **Hero CTA Recalibration:** Prioritized "START A PROJECT" as the primary high-focus solid CTA (`bg-accent text-white font-bold`); made "SEE WHAT WE BUILD" secondary and anchored directly to Section 03 "SELECTED WORK" (`#portfolio`).
- **Logo Palette Switch:** Switched the Navbar header brand logo to the official **Flame Orange** (`#EA5B15`) variant in light mode, and switched the small standalone mark in the Hero bottom anchor to **Coffee Bean Brown** (`#300F0A`).
- **Light Mode Text Contrast Guards:** Fixed root-cause invisible text in callout boxes (such as *The Client Experience* in HowWeWork), migrated hardcoded white opacities to semantic design tokens (`var(--text-primary)`, `var(--text-secondary)`), and added global attribute selectors in `globals.css` ensuring all `text-white/*` opacity variants map to the high-contrast Coffee Bean palette in light mode.

---

## PHASE 18 — LOGO PALETTE REVERT (LIGHT MODE), PROFESSIONAL 3D ARCHITECTURAL CANVAS & KINETIC LEADERSHIP REDESIGN
> **Status:** 🟢 COMPLETED & VERIFIED
- **18.1 — Logo Palette Revert (Light Mode Only):**
  - Reverted the Navbar header brand logo in light mode from forced Flame Orange back to official Coffee Bean Brown (`#300F0A` / `currentColor`), preserving the clean high-contrast editorial look. Preserved dark mode as `#FAF6ED` / white.
  - Reverted the small standalone logo mark in the Hero bottom anchor bar back to Flame Orange (`#EA5B15` / `text-accent`).
- **18.2 — Professional 3D / Canvas Background Overhaul:**
  - Replaced the heavy 5,500-particle spiral vortex in `HeroDataField.jsx` with an ultra-clean, professional **Architectural Topological Blueprint Grid / Horizon Mesh**.
  - Engineered 26 undulating latitude curves and 32 perspective splines with mathematical wave dynamics (`sin`/`cos`), delicate Flame Orange vertex nodes, and responsive cursor parallax. Eliminates visual clutter while reinforcing "software architecture built for endurance".
- **18.3 — Kinetic Leadership Section Replication (Images 2 & 3):**
  - Faithfully replicated the kinetic interaction from user screenshots:
    - **Header:** Triple repeating label `OUR LEADERSHIP TEAM` (left, center, right) in tracked uppercase monospace.
    - **Sub-intro:** Central editorial manifesto with the signature corner-bracketed `[ MEET THE TEAM ]` button with slide-up micro-interaction.
    - **Resting State (Image 2):** Display headline split cleanly across a middle horizontal letterbox band featuring cropped eye/brow slits of the 3 leaders (`object-position: 50% 33%`, `50% 27%`, `50% 30%`), accompanied by a floating `VIEW` pill badge on hover.
    - **Active/Expanded State (Image 3):** When a slit is touched or clicked, seamlessly morphs into a 2-column layout:
      - *Left:* Large high-contrast vertical portrait card featuring the active leader, corner `■ FOUNDER` / `■ ROLE` badge, and bottom metadata badge (`NAME | ROLE`) with `[ CLOSE × ]` toggle.
      - *Right:* The headline text continuing alongside a 2-column letterbox slit strip showing the remaining leaders (clicking either dynamically switches the active portrait).
    - **Brand Color Palette:** Integrated with Flame Orange (`#EA5B15`), Coffee Bean (`#300F0A`), and Almond (`#FAF6ED`) styling.
- **Verification:**
  - ESLint: 0 errors.
  - Smoke tests: 10/10 test suites passed (0.95s).
  - Dev server runtime tests: 10/10 routes responded with 200 OK.
  - E2E tests: 27/27 assertions passed (24/24 core).
  - Production build (`next build`): 40/40 routes compiled cleanly in 3.1s.

---

## PHASE 19 — "HOW WE WORK" 3-CARD REDESIGN, LIGHT MODE VISIBILITY & 3D LOGO WAVE SCULPTURE
> **Status:** 🟢 COMPLETED & VERIFIED
- **19.1 — Section 05 ("How We Work") Redesign (Image 1):**
  - Transformed into the high-impact 2-column layout from user reference image `media_1789850867395.png`:
  - 3 large rounded cards (`rounded-[26px]`) on the left:
    - Card 1: Slate Petrol (`#2A3840`) with blueprint grid icon and `MOVE AT THE SPEED OF BREAKTHROUGH.`
    - Card 2: Signature Flame Orange (`#EA5B15`) with system signal icon and `FULL-STACK INFRASTRUCTURE, READY FROM DAY ONE.`
    - Card 3: Warm Almond Ivory (`#FAF6ED`) with crosshair icon and `CONNECTIONS THAT MOVE YOU FORWARD.`
  - Sticky right manifesto column with display headline `BUILD FAST, WITH ZERO FRICTION AND TOTAL FOCUS.`, manifesto copy, and corner-bracketed `[ BUILD WITH US ]` button triggering the intake drawer.
  - Cosmic dot constellation background field.
- **19.2 — Light Mode Visibility Fix & Leadership Header (Image 2):**
  - Resolved root-cause text invisibility on dark portrait badges in light mode by adding dark-overlay exception rules in `globals.css` and explicit styling (`style={{ color: "#FAF6ED" }}`).
  - Streamlined top leadership header from 3x repeating text to clean 1x `OUR LEADERSHIP TEAM`.
- **19.3 — 3D Logo Wave Dot Sculpture (Image 3):**
  - Replaced the wireframe mesh with a 3D parametric dot sculpture directly inspired by user reference `media_1789851276659.png`, formed in **Gerät's signature 3-wave harmonic bridge geometry**.
  - Engineered for high visibility in both themes:
    - Dark mode: Warm Almond (`#FAF6ED`, opacity 0.40–0.98) with glowing Flame Orange (`#EA5B15`) crests on `#0D0706`.
    - Light mode: High-contrast Coffee Bean (`#300F0A`, opacity 0.35–0.90) with Flame Orange crests on `#FAF6ED`.
  - Smooth mouse tilt parallax and continuous 3D orbital drift.
- **Verification:**
  - ESLint: 0 errors.
  - Smoke tests: 10/10 test suites passed (1.06s).
  - Dev server runtime tests: 10/10 routes responded with 200 OK.
  - E2E tests: 27/27 assertions passed (24/24 core).
  - Production build (`next build`): 40/40 routes compiled cleanly in 4.4s.

---

## RESOLVED DESIGN DECISIONS

1. **Portfolio Projects:** Seed data and showcase items calibrated with honest, credible engineering scopes.
2. **Team Members:** Real leadership and engineering practitioner profiles with clean, punchy 1-sentence bios.
3. **Founders Concept:** 4 core executive leaders presented clearly; 5 elements of mark represent founding minds.
4. **Service Navigation:** All 4 pillars (Digital, AI, Systems, Brand) directly reachable via desktop, mobile drawer, services overview, and footer.
5. **Light Mode Quality:** `#FAF6ED` almond surfaces with `#300F0A` coffee bean text default, instant dark toggle preserved.

---

## REFERENCES

- [Content Update Guide](file:///home/dawit/Documents/Projects/Gerät/Gerät/docs/GERAT_CONTENT_UPDATE_GUIDE.md) — Primary content reference (2,399 lines, 80 sections)
- [Brand Rebrand Master Plan](file:///home/dawit/Documents/Projects/Gerät/Gerät/docs/progress/BRAND_REBRAND_MASTER_PLAN.md) — Previous brand work
- [Brand Rebrand Implementation](file:///home/dawit/Documents/Projects/Gerät/Gerät/docs/progress/BRAND_REBRAND_IMPLEMENTATION.md) — Previous implementation details
- Modern agency best practices research: Instrument, Work & Co, Nightjar, Metalab, High Five Agency
- Mobile UX research: 57% of viewing time is above the fold, 74% within first two screenfuls
- Contact form research: Every extra field reduces completion rates; 4-5 options optimal, conditional logic for sub-categories
