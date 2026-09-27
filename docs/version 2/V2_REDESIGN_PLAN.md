# Gerat Website V2 — Detailed Redesign Plan

> **Document Purpose:** Exhaustive, phase-by-phase redesign plan with every decision documented. Designed to be followed by any agent or model without losing context.
> **Created:** 2026-09-27 | **Brand Source:** `docs/brand/` | **Content Source:** `docs/version 2/content/`
> **Reference Site (Interaction Only):** https://receivio.framer.media/

---

## Table of Contents

1. [Strategic Context & Goals](#1-strategic-context--goals)
2. [Brand Rules (Non-Negotiable)](#2-brand-rules-non-negotiable)
3. [Receivio Interaction Principles to Adapt](#3-receivio-interaction-principles-to-adapt)
4. [V2 Site Structure](#4-v2-site-structure)
5. [V2 Homepage Redesign — Full Spec](#5-v2-homepage-redesign--full-spec)
6. [V2 About Page — Full Spec](#6-v2-about-page--full-spec)
7. [V2 Services Page — Full Spec](#7-v2-services-page--full-spec)
8. [V2 Footer & Contact CTA — Full Spec](#8-v2-footer--contact-cta--full-spec)
9. [V2 Navigation & Header — Full Spec](#9-v2-navigation--header--full-spec)
10. [V2 Spacing & Visual Rhythm System](#10-v2-spacing--visual-rhythm-system)
11. [V2 Color & Background System](#11-v2-color--background-system)
12. [V2 Scroll & Animation System](#12-v2-scroll--animation-system)
13. [Items to Remove](#13-items-to-remove)
14. [Implementation Phases](#14-implementation-phases)
15. [File Change Manifest](#15-file-change-manifest)

---

## 1. Strategic Context & Goals

### Who is Gerat?
- **Name:** Gerat Software Solution (inspired by German *Gerät* — tool/device made for a purpose)
- **Founded:** 2026, Addis Ababa, Ethiopia
- **Team:** 5 co-founders (no employees yet)
- **Stage:** Brand new — zero completed client projects, zero published content
- **Services:** Digital Experiences, AI & Intelligent Tools, Business Systems, Brand & Creative

### What the V2 Website Must Communicate
1. **Gerat is real and trustworthy** — despite being new
2. **Gerat solves specific business problems** — not a generic tech agency
3. **The five founders are credible** — competence signal without fabricating history
4. **Starting a conversation is easy** — low-friction contact
5. **The experience itself demonstrates quality** — the website IS the portfolio

### Design Philosophy for V2
- **Spacious, calm, breathable** — generous whitespace between sections
- **Scroll-driven storytelling** — each section flows into the next like a narrative
- **Premium but honest** — no fake clients, metrics, or enterprise claims
- **Minimal but intentional** — every element earns its place
- **Light mode default** — warm Almond canvas (#F1DFD9) as the base

---

## 2. Brand Rules (Non-Negotiable)

These come directly from `docs/brand/` and `docs/version 2/content/00_CONTENT_SYSTEM.md`:

### Colors (Must Use)
| Name | Hex | Role |
|---|---|---|
| Flame Orange | `#EA5B15` | Primary accent, CTAs, brand mark |
| Coffee Bean | `#300F0A` | Dark text, deep sections |
| Almond | `#F1DFD9` | Light mode canvas |
| Cream / Ivory | `#FAF6ED` | Light surfaces, card backgrounds |

### Typography (Must Use)
- **Parkinsans:** Headlines, navigation, section labels (SemiBold 600 primary)
- **Artific:** Body copy, descriptions, meta text (Regular 400 primary)

### Logo Variants Available
- Primary Logo: Wave mark + "Gerat" wordmark
- Badge Logo: Compact mark + text
- Standalone Mark: Wave icon only
- Badge: Rounded square icon
- Wordmark: Text only
- Each in Dark, Light, Orange variants

### Content Voice Rules
- **DO:** Direct language, active verbs, short sentences, clear business outcomes
- **DON'T:** "Cutting-edge", "world-class", "game-changing", "revolutionary", "seamless", "future-proof", "harness", "leverage"
- **NEVER fabricate:** Clients, testimonials, awards, revenue figures, user counts, uptime stats, completed projects, case study metrics, partnerships, certifications
- **Headline limits:** 4–10 words
- **Body limits:** Avoid paragraphs exceeding 3 lines on desktop
- **CTA limits:** 2–6 words

---

## 3. Receivio Interaction Principles to Adapt

> Study the reference for INTERACTION patterns only. Do NOT copy its content, branding, or visual style.

### What to Adopt from Receivio
1. **Generous vertical whitespace** — sections breathe with 120–200px+ gaps
2. **Section-to-section scroll flow** — clear visual ending before next section begins
3. **Progressive content reveals** — elements appear as you scroll into them, not all at once
4. **Sticky/pinned content sections** — key content stays visible while supporting content scrolls
5. **Typography-led hierarchy** — large headlines establish context before body copy appears
6. **Subtle entrance motion** — gentle fade-ups and opacity changes, not dramatic swoops
7. **Dark footer with CTA** — dark section above footer with contact form/CTA, then dark footer with navigation columns
8. **Clean section separation** — subtle dividers or background color shifts between sections
9. **Controlled pacing** — no section feels rushed; each has its own "moment"
10. **Background color transitions** — sections alternate between light and slightly different backgrounds

### What NOT to Copy
- Receivio's blue/purple color palette
- Receivio's content, copy, or messaging
- Receivio's product screenshots or UI mockups
- Receivio's specific layout dimensions (adapt to Gerat's content)
- Their "Made in Framer" build system

---

## 4. V2 Site Structure

### Primary Navigation
```
Home  |  Services  |  About  |  Contact (CTA button)
```

### Route Changes
| V1 Route | V2 Action | Reason |
|---|---|---|
| `/` | **REDESIGN** | Scroll-driven narrative homepage |
| `/services` | **KEEP & REFINE** | Services hub with 4 pillars |
| `/services/digital-experiences` | **KEEP** | Service deep-dive |
| `/services/ai-tools` | **KEEP** | Service deep-dive |
| `/services/business-systems` | **KEEP** | Service deep-dive |
| `/services/brand-creative` | **KEEP** | Service deep-dive |
| `/services/personal-branding` | **KEEP** | Service deep-dive |
| `/portfolio` | **REMOVE** → replaced by `/about` | No real projects yet |
| `/team` | **REMOVE** → merged into `/about` | 5 founders shown on About |
| `/insights` | **REMOVE** | No real articles yet |
| `/insights/[slug]` | **REMOVE** | No real articles yet |
| `/why-wqf` | **REMOVE** | Legacy redirect, no longer needed |
| `/about` | **CREATE NEW** | Company story, name, founders, vision |
| `/dashboard/**` | **NO CHANGES** | Admin CMS stays as-is |

### Anchor Navigation (New)
When on the Home page, nav items scroll to sections:
| Menu Item | Behavior on Home | Behavior on Other Pages |
|---|---|---|
| Services | Scroll to `#services` | Navigate to `/#services` |
| About | Scroll to `#about` | Navigate to `/#about` |
| Contact | Open Contact Drawer | Open Contact Drawer |

Each homepage section includes a "Learn More" CTA that links to the full page.

---

## 5. V2 Homepage Redesign — Full Spec

### Section Order (7 sections + footer)

```
01. HERO — The Promise
02. THE PROBLEM — Why Gerat Exists ("The Gap")
03. THE BRIDGE — What Gerat Builds (4 Service Cards)
04. HOW WE WORK — The Process (4 Steps)
05. POINT OF VIEW — What We Believe (4 Principles)
06. FIVE FOUNDERS — The People Behind Gerat
07. FINAL CTA — What Happens Next
08. FOOTER
```

---

### Section 01: HERO — The Promise
**Section ID:** `#hero`
**Background:** Light mode — Cream (#FAF6ED) or Almond (#F1DFD9)

**Content:**
- **Eyebrow:** `GERAT SOFTWARE SOLUTION`
- **Headline:** `BUILD WHAT MOVES YOUR BUSINESS FORWARD.`
- **Supporting text:** `We build websites, AI solutions, business systems, and brand identities that help businesses work better and grow with confidence.`
- **Primary CTA:** `START A PROJECT` → opens Contact Drawer
- **Secondary CTA:** `EXPLORE WHAT WE BUILD` → smooth scroll to #services
- **Scroll cue:** Subtle animated down-arrow with `SCROLL TO EXPLORE`

**Design:**
- Full viewport height (`100dvh`)
- Headline: Parkinsans, display-xl size, SemiBold, uppercase, tight tracking
- Body: Artific, body-lg, warm secondary text color
- Replace the 3D canvas with a simpler, calmer visual — either a subtle gradient mesh, the brand wave mark at large scale with low opacity, or a minimal geometric composition
- The hero should feel spacious and confident, not busy
- CTAs should be clean pill buttons with brand colors

**Interaction:**
- Headline animates in with SplitText (word-by-word reveal)
- Body and CTAs fade up with stagger
- Scroll cue gently bounces
- No 3D particle field (too heavy, too busy for "calm" aesthetic)

**Files to modify:** `src/components/home/Hero.jsx`, `src/components/three/HeroDataField.jsx` (remove or replace)

---

### Section 02: THE PROBLEM — Why Gerat Exists
**Section ID:** `#gap`
**Background:** Almond (#F1DFD9) — same as surrounding, or a subtle shift

**Content:**
- **Section label:** `THE GAP`
- **Headline:** `GOOD BUSINESSES NEED GOOD SYSTEMS.`
- **Body:** `A business can lose time in disconnected tools, unclear processes, weak digital experiences, or technology that cannot grow with it. Gerat exists to close that gap.`
- **Closing line:** `We turn business needs into technology people can actually use.`

**Design:**
- Centered or left-aligned editorial typography
- Generous padding: 160–200px vertical
- Headline in Parkinsans, heading-h2 scale
- Body in Artific, body-lg, max-width 640px for readability
- Closing line may be styled distinctively (accent color or heavier weight)

**Interaction:**
- Progressive text reveal: headline appears first via SplitText
- Body fades up with 0.3s delay
- Closing line fades up with 0.5s delay
- This section should feel like a pause — the reader absorbs the problem before the solution

**Files to create/modify:** New component `src/components/home/TheProblem.jsx`

---

### Section 03: THE BRIDGE — What Gerat Builds
**Section ID:** `#services`
**Background:** Shift to Cream (#FAF6ED) surface for contrast

**Content:**
- **Section label:** `THE BRIDGE`
- **Headline:** `FROM BUSINESS NEED TO WORKING SYSTEM.`
- **Intro:** `We bring design, engineering, AI, and business thinking together around the problem that needs solving.`
- **4 Service Cards:**
  1. **Digital Experiences:** Websites, web applications, portals, digital products
  2. **AI & Intelligent Tools:** AI assistants, RAG systems, workflow automation, document intelligence
  3. **Business Systems:** ERP, internal tools, workflow systems, API integrations
  4. **Brand & Creative:** Brand strategy, logo & identity, marketing design, founder branding
- **CTA:** `VIEW ALL SERVICES` → link to `/services`

**Design:**
- Each service card: clean card with subtle border, icon/illustration area, title, description, deliverables list, "Learn More →" link
- Cards should have generous internal spacing
- Use scroll-stack or sticky card pattern (Receivio-inspired): as you scroll, each card "stacks" into view, with the current card pinned while the next slides up

**Interaction (Receivio-inspired scroll-stack cards):**
- Container is sticky/pinned
- As user scrolls, cards transition one by one (opacity, y-position, or scale)
- Only one card is "active" (full opacity, centered) at a time
- Previous cards shrink or fade behind
- This creates a focused, story-like experience

**Files to create/modify:** Major redesign of `src/components/home/OurFocus.jsx` → possibly rename to `ServicesBridge.jsx` or similar

---

### Section 04: HOW WE WORK — The Process
**Section ID:** `#process`
**Background:** Back to Almond (#F1DFD9)

**Content:**
- **Section label:** `THE PROCESS`
- **Headline:** `START WITH THE PROBLEM. BUILD THE RIGHT THING.`
- **Intro:** `We keep the process clear: understand the business, shape the solution, build it well, then stay close after launch.`
- **4 Steps:**
  1. `UNDERSTAND` — We learn how the business works, where the friction is, and what the technology needs to achieve.
  2. `DEFINE` — We turn the problem into a clear scope, user experience, technical direction, and delivery plan.
  3. `BUILD` — We design and engineer the product, system, or brand with the right level of technology for the job.
  4. `SUPPORT` — We help with launch, handover, improvements, and the next stage of the system.

**Design:**
- Scroll-driven sequence: as user scrolls, the current step is visually dominant
- Step number large and prominent
- Step title in bold, description in lighter weight
- Consider a horizontal progress indicator showing 1/4, 2/4, etc.
- Generous vertical space per step

**Interaction:**
- Sticky container with scroll-linked step transitions
- Current step: full opacity, larger scale
- Other steps: reduced opacity, smaller
- Smooth crossfade between steps

**Files to modify:** Complete redesign of `src/components/home/HowWeWork.jsx`

---

### Section 05: POINT OF VIEW — What We Believe
**Section ID:** `#about`
**Background:** Coffee Bean (#300F0A) with Cream (#FAF6ED) text — dark section for visual rhythm

**Content:**
- **Section label:** `WHAT WE BELIEVE`
- **Headline:** `USEFUL OVER COMPLICATED.`
- **4 Principles:**
  1. `USEFUL` — Technology should solve a real problem before it tries to impress.
  2. `CLEAR` — Good systems are easier to understand, use, and improve.
  3. `STRONG` — Good foundations matter because businesses have to live with what we build.
  4. `GROWING` — We build with the next stage in mind, not only today's requirement.

**Design:**
- Dark background creates a visual "pause" in the scroll narrative
- Large editorial typography for the headline
- Principles displayed as a clean list with large numbers and short explanations
- Generous spacing between each principle
- `LEARN MORE ABOUT US →` link to `/about`

**Interaction:**
- Each principle fades up on scroll with stagger
- Headline uses SplitText animation
- Subtle parallax on background or a faint brand wave pattern

**Files to modify:** Redesign `src/components/home/OurEthos.jsx`

---

### Section 06: FIVE FOUNDERS — The People Behind Gerat
**Section ID:** `#founders`
**Background:** Back to light — Cream (#FAF6ED)

**Content:**
- **Section label:** `THE FOUNDERS`
- **Headline:** `FIVE FOUNDERS. ONE DIRECTION.`
- **Body:** `Gerat was started by five founders who bring different strengths to one shared idea: build useful technology, build it well, and build a company that can grow.`
- **5 Founder Cards:** Name, Role, one-line specialty (no long bios on homepage)
- **CTA:** `MEET THE FOUNDERS` → link to `/about#founders`

**Design:**
- Clean 5-person horizontal composition
- Placeholder photos or brand-mark avatars until real photos available
- Each card: name (Parkinsans, bold), role (Artific, muted), specialty (Artific, small)
- No hover morph/slit behavior from V1 — too complex for this context
- Simple, dignified, breathable

**Interaction:**
- Cards fade up with stagger as they enter viewport
- Subtle hover: card lifts slightly with shadow

**Files to modify:** Simplify `src/components/home/OurLeadership.jsx`

---

### Section 07: FINAL CTA — What Happens Next
**Section ID:** `#contact`
**Background:** Coffee Bean (#300F0A) — dark section

**Content:**
- **Headline:** `HAVE SOMETHING WORTH BUILDING?`
- **Body:** `Tell us what you are trying to improve, build, or simplify. We will start with the problem and work from there.`
- **CTA button:** `START A PROJECT` → opens Contact Drawer
- **Supporting line:** `DIGITAL · AI · SYSTEMS · BRAND`

**Design (Inspired by Receivio's pre-footer CTA + form):**
- Two-column layout on desktop:
  - Left: Headline, body copy, CTA button
  - Right: Inline contact form (Name, Email, Phone, Message, Submit) — OR just the CTA button that opens the existing Contact Drawer
- Dark background with subtle gradient (Coffee Bean to slightly lighter)
- Brand wave mark at very low opacity as background texture
- The "DIGITAL · AI · SYSTEMS · BRAND" line as a subtle footer inside this section

**Decision:** Keep the existing Contact Drawer system rather than embedding a full form. The drawer is already well-built with progressive disclosure. The CTA section just needs a strong visual presence.

**Interaction:**
- Headline fades up
- CTA button has magnetic hover effect
- Section transitions smoothly into the footer below

**Files to create:** New component `src/components/home/FinalCTA.jsx`

---

## 6. V2 About Page — Full Spec

**Route:** `/about`
**Content source:** `docs/version 2/content/02_ABOUT_PAGE_CONTENT.md`

### Section Order
1. **Hero:** `A NEW COMPANY. A CLEAR DIRECTION.`
2. **Our Story:** `WE STARTED WITH A SIMPLE IDEA.`
3. **What Gerat Means:** `A NAME BUILT AROUND USEFULNESS.` + Brand motto `TECHNOLOGY IS A TOOL. MAKE IT USEFUL.`
4. **The Gerat Idea (The Bridge):** `WE BUILD THE BRIDGE.` + 4 core tenets
5. **What We Believe:** `SIMPLE PRINCIPLES. HIGH STANDARDS.` + 4 principles
6. **The Founders:** `FIVE FOUNDERS. ONE VISION.` + 5 detailed profiles
7. **Where We Are Going:** `STARTING NOW. BUILDING FOR WHAT COMES NEXT.`
8. **Final CTA:** `LET'S BUILD WHAT'S NEXT.`
9. **Footer**

### Design Principles
- Same spacious, editorial rhythm as the homepage
- Light mode default
- Use dark sections (Coffee Bean) for "What We Believe" to create visual rhythm
- Founders section: larger cards with room for 1–2 sentence bios
- No fabricated timeline or roadmap

### Files to create
- `src/app/about/page.js` — Server component with metadata
- `src/app/about/components/AboutHero.jsx`
- `src/app/about/components/OurStory.jsx`
- `src/app/about/components/WhatGeratMeans.jsx`
- `src/app/about/components/TheBridge.jsx`
- `src/app/about/components/WhatWeBelieve.jsx`
- `src/app/about/components/TheFounders.jsx`
- `src/app/about/components/WhereWeAreGoing.jsx`

---

## 7. V2 Services Page — Full Spec

**Route:** `/services` (keep existing, refine content)
**Content source:** `docs/version 2/content/03_SERVICES_PAGE_CONTENT.md`

### Changes
1. Update hero headline to `TECHNOLOGY BUILT AROUND YOUR BUSINESS.`
2. Update service descriptions to V2 content doc versions
3. Add "How We Select the Right Approach" section
4. Add concise FAQ section
5. Keep existing service deep-dive sub-pages (`/services/digital-experiences`, etc.)
6. Apply same spacious vertical rhythm as homepage

### Files to modify
- `src/app/services/page.js` — update metadata
- `src/app/why-wqf/components/ServicesOverview.jsx` — update content, add spacing
- `src/content/services.js` — update descriptions from V2 content docs

---

## 8. V2 Footer & Contact CTA — Full Spec

### Pre-Footer CTA Section (Receivio-Inspired)
**Background:** Coffee Bean (#300F0A) with subtle gradient
**Layout:** Two columns
- **Left column:** Headline, body copy, supporting info
- **Right column:** Contact form OR prominent CTA button

### Footer (Receivio-Inspired)
**Background:** Very dark (Coffee Bean #300F0A or even darker #0d0706)

**Layout:** Three-column navigation grid
- **Column 01 "Navigation":** Home, Services, About
- **Column 02 "Services":** Digital Experiences, AI & Intelligent Tools, Business Systems, Brand & Creative
- **Column 03 "Connect":** LinkedIn, GitHub, Telegram, Email

**Bottom bar:** Large Gerat primary logo (Light variant) centered, with copyright text below

**Key differences from V1:**
- Remove the Flame Orange CTA band (the dark CTA section above replaces it)
- Cleaner, more minimal footer grid
- Large centered logo at bottom (like Receivio's "R" logo at page end)
- Use Gerat brand logo files from `docs/brand/Gerat - Logo Files/01 - Primary Logo/SVG/Gerat-Primary-Logo-Light.svg`

### Files to modify
- `src/components/layout/Footer.jsx` — complete redesign

---

## 9. V2 Navigation & Header — Full Spec

### Menu Items
```
Services  |  About  |  [START A PROJECT] (CTA button)
```

### Anchor Navigation System (New)

**Implementation Logic:**
```javascript
// In Navbar.jsx
const pathname = usePathname();
const isHomePage = pathname === '/';

const navLinks = [
  { label: 'Services', href: isHomePage ? '#services' : '/#services' },
  { label: 'About', href: isHomePage ? '#about' : '/#about' },
];

// Click handler
const handleNavClick = (e, href) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
  // For /#section links, Next.js router handles navigation,
  // then useEffect on mount scrolls to the hash
};
```

**On Home page:** Clicking "Services" smooth-scrolls to `#services` section
**On other pages:** Clicking "Services" navigates to `/#services` and scrolls on arrival

### Header Behavior (Keep & Refine)
- Keep the sticky, auto-hiding navbar behavior
- Keep the floating pill compression on scroll
- Simplify: remove theme toggle from header (move to footer or settings)
- Keep "START A PROJECT" CTA in header

### Mobile Menu (Simplify)
- Reduce from 2×2 grid + disciplines + theme control to a simple vertical list
- Keep: Services, About, Contact CTA
- Remove: discipline deep-links from mobile menu (available on Services page)
- Remove: theme segmented control from mobile menu

### Files to modify
- `src/components/layout/Navbar.jsx` — update links, add anchor logic
- `src/components/common/NavItem.jsx` — minor adjustments
- `src/content/site.js` — update `navLinks` array

---

## 10. V2 Spacing & Visual Rhythm System

### Vertical Section Spacing
| Context | Spacing | CSS Token |
|---|---|---|
| Between major homepage sections | `160–200px` | `--space-40` to `--space-50` |
| Section internal padding (top/bottom) | `120–160px` | `--space-30` to `--space-40` |
| Between section headline and body | `32–48px` | `--space-8` to `--space-12` |
| Between body paragraphs | `24–32px` | `--space-6` to `--space-8` |
| Between card items | `24–32px` | `--space-6` to `--space-8` |

### Horizontal Content Width
| Context | Max Width |
|---|---|
| Full container | `1440px` (keep `--max-width`) |
| Text content (readability) | `640–720px` for body copy |
| Card grid | `1200px` |
| Hero headline | `960px` |

### Responsive Section Padding
| Breakpoint | Top/Bottom | Left/Right |
|---|---|---|
| Desktop (>1024px) | `160px` | `40px` |
| Tablet (≤1024px) | `120px` | `24px` |
| Mobile (≤768px) | `80px` | `16px` |

### Files to modify
- `src/styles/tokens.css` — may add new large spacing tokens
- Individual section components — update padding/margin values

---

## 11. V2 Color & Background System

### Section Background Alternation Pattern
```
Section 01 (Hero):        Cream (#FAF6ED) — clean, bright start
Section 02 (Problem):     Almond (#F1DFD9) — subtle warmth shift
Section 03 (Services):    Cream (#FAF6ED) — back to bright
Section 04 (Process):     Almond (#F1DFD9) — warmth
Section 05 (POV):         Coffee Bean (#300F0A) — DARK dramatic pause
Section 06 (Founders):    Cream (#FAF6ED) — back to light
Section 07 (CTA):         Coffee Bean (#300F0A) — DARK closing
Section 08 (Footer):      Very dark (#0d0706) — deepest
```

### Color Usage Rules
- **Flame Orange (#EA5B15):** CTAs, active states, accent highlights, links. Used sparingly.
- **Coffee Bean (#300F0A):** Dark section backgrounds, primary text in light mode
- **Almond (#F1DFD9):** Background alternation, input backgrounds
- **Cream (#FAF6ED):** Primary light background, card surfaces
- **Text hierarchy in light mode:**
  - Primary: `#300F0A` (Coffee Bean)
  - Secondary: `#4E241C`
  - Muted: `#7E564E`
  - Dim: `#9B7871`
- **Text hierarchy in dark sections:**
  - Primary: `#FAF6ED` (Cream)
  - Secondary: `#D5C3BC`
  - Muted: `#9E8A83`
  - Accent: `#EA5B15` (Flame)

### Gradient Touches (Subtle)
- Dark CTA section: `linear-gradient(180deg, #300F0A 0%, #1c120f 100%)`
- Footer: solid `#0d0706`
- No heavy gradients — keep it clean and architectural

---

## 12. V2 Scroll & Animation System

### Scroll-Linked Behaviors (Receivio-Inspired)

#### 1. Sticky Service Cards (Section 03)
```
Implementation: CSS position: sticky + Framer Motion useScroll/useTransform
Behavior: Container height = (number of cards × card viewport fraction)
           Each card sticks at top, next card slides up from below
           Previous cards scale down slightly and reduce opacity
```

#### 2. Process Steps (Section 04)
```
Implementation: Framer Motion useScroll on section container
Behavior: Step indicator/progress bar advances with scroll
           Current step text is full opacity, others are dimmed
           Smooth crossfade between steps
```

#### 3. Progressive Text Reveals
```
Implementation: Keep existing SplitText component
Behavior: Headlines reveal word-by-word on viewport entry
           Body text fades up with slight delay
           No aggressive animations — everything feels natural
```

### Animation Principles for V2
1. **Reduce density:** Maximum 1 animation type per element (no stacking FadeUp + SplitText + Magnetic)
2. **Increase duration slightly:** Current 0.65s → 0.7–0.8s for a more relaxed feel
3. **Wider stagger gaps:** Current 0.05s → 0.08–0.1s between elements
4. **Gentler displacement:** Reduce FadeUp from 32px → 20–24px
5. **Keep Magnetic for CTAs only** — not for every interactive element
6. **Remove the 3D canvas** — too busy for the calm aesthetic
7. **Remove the marquee ticker** — the scrolling service bar (shown in user's first image) should be removed as it's visually cluttered
8. **Respect reduced motion:** All animations already do this — maintain

### Files to modify
- `src/components/motion/FadeUp.jsx` — adjust default `y` and `duration`
- `src/components/home/*.jsx` — reduce animation stacking
- Remove: `src/components/three/HeroDataField.jsx` usage from Hero
- Remove: `src/components/home/Marquee.jsx` from homepage

---

## 13. Items to Remove

### From Homepage (Current V1 → V2)
| Element | Reason | File |
|---|---|---|
| 3D particle canvas (HeroDataField) | Too busy, not calm | `Hero.jsx` |
| Marquee service ticker band | Cluttered, as shown in user's image 1 | `Marquee.jsx` |
| `"DIGITAL · INTELLIGENCE · SYSTEMS · BRAND"` bar in hero | Redundant with marquee removal | `Hero.jsx` |
| `"SCROLL TO EXPLORE"` with bouncing arrow | Keep but simplify — just a subtle down arrow | `Hero.jsx` |
| OurPortfolio section | No real projects to show | `OurPortfolio.jsx` |
| Kinetic morphing leadership slits | Too complex, replace with simple grid | `OurLeadership.jsx` |
| HowWeWork 3-card methodology | Replace with 4-step scroll-driven process | `HowWeWork.jsx` |
| Flame Orange footer CTA band | Replace with dark pre-footer CTA section | `Footer.jsx` |
| "WE BUILD THE BRIDGE. YOU CROSS IT." headline | Replace with V2 content: "BUILD WHAT MOVES YOUR BUSINESS FORWARD." | `Hero.jsx` |
| Technical telemetry labels in hero | Remove (coordinates, UTC, etc.) | `Hero.jsx` |
| Corner bracket decorative elements | Use sparingly — only on CTA buttons, not everywhere | Various |

### Pages to Remove
| Page | Files to Archive |
|---|---|
| `/insights` | `src/app/insights/` (entire directory) |
| `/portfolio` | `src/app/portfolio/` (entire directory) |
| `/team` | `src/app/team/` (entire directory) |
| `/why-wqf` | `src/app/why-wqf/` (entire directory) |

### Content to Remove
| File | What to Remove |
|---|---|
| `src/content/portfolio.js` | All 9 fabricated case studies |
| `src/content/insights.js` | All 9 fabricated articles |
| `src/content/team.js` | 6 fabricated `engineeringSpecialists` (keep 5 real `leadershipTeam` founders) |
| `src/content/site.js` | Update `navLinks` to remove Portfolio, Team, Insights |

### Navigation Items to Remove
| Item | Current Link | Reason |
|---|---|---|
| PORTFOLIO | `/portfolio` | Page removed |
| TEAM | `/team` | Merged into About |
| INSIGHTS | `/insights` | Page removed |

### Sitemap Updates
- `src/app/sitemap.js` — remove `/portfolio`, `/team`, `/insights`, add `/about`
- `src/app/robots.js` — no changes needed

---

## 14. Implementation Phases

### Phase 1: Foundation & Cleanup (Do First)
**Goal:** Clean slate for redesign without breaking the dashboard

1. **Update `src/content/site.js`:**
   - Change `navLinks` to: `[{ label: "Services", href: "/services" }, { label: "About", href: "/about" }]`

2. **Archive removed pages** (don't delete yet — move to `_archive/`):
   - `src/app/insights/` → `_archive/insights/`
   - `src/app/portfolio/` → `_archive/portfolio/`
   - `src/app/team/` → `_archive/team/`
   - `src/app/why-wqf/` → `_archive/why-wqf/`

3. **Clean content files:**
   - `src/content/portfolio.js` — empty the array: `export const portfolioProjects = [];`
   - `src/content/insights.js` — empty the array: `export const insightsArticles = [];`
   - `src/content/team.js` — remove `engineeringSpecialists`, keep `leadershipTeam` with 5 real founders

4. **Update `src/app/sitemap.js`:**
   - Remove old routes, add `/about`

5. **Remove unused dependencies** (optional):
   - Evaluate if `gsap` and `swiper` can be removed from `package.json`

---

### Phase 2: Navigation & Header Redesign
**Goal:** Anchor-based contextual navigation

1. **Redesign `src/components/layout/Navbar.jsx`:**
   - Update menu items to: Services, About, START A PROJECT
   - Implement anchor navigation logic (scroll on home, navigate+hash on other pages)
   - Simplify mobile menu
   - Remove theme toggle from header (optional: move to footer)

2. **Update `src/components/common/NavItem.jsx`** if needed

3. **Add scroll-to-hash on page mount:**
   - In `src/app/page.js` or `ClientWrapper.js`, add `useEffect` that checks `window.location.hash` on mount and scrolls to it

---

### Phase 3: Homepage Redesign — Structure
**Goal:** New section order and spacious layout

1. **Redesign `src/app/page.js`:**
   - New section order: Hero → Problem → Bridge → Process → POV → Founders → CTA → Footer
   - Remove: Marquee, OurPortfolio
   - Keep components: use redesigned versions

2. **Create `src/components/home/TheProblem.jsx`** — new section

3. **Redesign `src/components/home/Hero.jsx`:**
   - Remove 3D canvas
   - New content from V2 content doc
   - Spacious, calm layout
   - Simple background (gradient mesh or brand mark watermark)

4. **Apply generous spacing** to all sections (120–200px vertical gaps)

---

### Phase 4: Homepage Redesign — Scroll Experience
**Goal:** Receivio-inspired scroll interactions

1. **Redesign `src/components/home/OurFocus.jsx` → Service cards:**
   - Implement sticky scroll-stack card pattern
   - 4 service cards with progressive reveal
   - "VIEW ALL SERVICES" CTA at bottom

2. **Redesign `src/components/home/HowWeWork.jsx` → Process:**
   - 4-step scroll-driven sequence
   - Sticky container with step progression

3. **Redesign `src/components/home/OurEthos.jsx` → Point of View:**
   - Dark section (Coffee Bean)
   - 4 principles with scroll-triggered reveal
   - Large editorial typography

4. **Simplify `src/components/home/OurLeadership.jsx` → Founders:**
   - Clean 5-person grid
   - Simple cards, no morph behavior

5. **Create `src/components/home/FinalCTA.jsx`:**
   - Dark CTA section before footer

---

### Phase 5: Footer Redesign
**Goal:** Dark, clean, Receivio-inspired footer

1. **Redesign `src/components/layout/Footer.jsx`:**
   - Remove Flame Orange CTA band
   - Dark background
   - Three-column navigation grid
   - Large centered Gerat logo at bottom
   - Clean colophon

---

### Phase 6: About Page
**Goal:** New `/about` page replacing Portfolio and Team

1. **Create `src/app/about/page.js`** — server component with metadata
2. **Create section components** — Hero, Story, Meaning, Bridge, Beliefs, Founders, Direction, CTA
3. **Content:** Pull from `docs/version 2/content/02_ABOUT_PAGE_CONTENT.md`
4. **Founders section:** 5 detailed profiles (larger than homepage version)

---

### Phase 7: Services Page Refinement
**Goal:** Update content and apply spacious styling

1. **Update `src/app/services/page.js`** and `ServicesOverview.jsx`
2. **Update `src/content/services.js`** with V2 descriptions
3. **Add FAQ section** from content doc
4. **Apply V2 spacing system**

---

### Phase 8: Polish & Integration
**Goal:** Final consistency pass

1. **Color consistency:** Ensure all sections follow the background alternation pattern
2. **Animation audit:** Remove over-stacked animations, ensure consistent timing
3. **Responsive testing:** Verify all sections work on mobile, tablet, desktop
4. **Accessibility audit:** Ensure all animations respect reduced motion, focus states work
5. **SEO verification:** Metadata, sitemap, robots.txt all correct
6. **Performance check:** Remove unused code, optimize images, check bundle size
7. **Clean `globals.css`:** Remove duplicate `@font-face` declarations, simplify theme inversions
8. **Remove archived files** from `_archive/` once V2 is stable

---

## 15. File Change Manifest

### Files to CREATE (New)
| File | Purpose |
|---|---|
| `src/app/about/page.js` | About page (SSR, metadata) |
| `src/app/about/components/AboutHero.jsx` | About hero section |
| `src/app/about/components/OurStory.jsx` | Story section |
| `src/app/about/components/WhatGeratMeans.jsx` | Name meaning section |
| `src/app/about/components/TheBridge.jsx` | Bridge concept section |
| `src/app/about/components/WhatWeBelieve.jsx` | Principles section |
| `src/app/about/components/TheFounders.jsx` | 5 founders detailed |
| `src/app/about/components/WhereWeAreGoing.jsx` | Future direction |
| `src/components/home/TheProblem.jsx` | "The Gap" homepage section |
| `src/components/home/FinalCTA.jsx` | Pre-footer CTA section |

### Files to HEAVILY MODIFY
| File | Changes |
|---|---|
| `src/app/page.js` | New section order, remove Marquee/Portfolio |
| `src/components/home/Hero.jsx` | Remove 3D canvas, new content, spacious layout |
| `src/components/home/OurFocus.jsx` | Scroll-stack service cards |
| `src/components/home/OurEthos.jsx` | Dark section, editorial principles |
| `src/components/home/OurLeadership.jsx` | Simple 5-person grid |
| `src/components/home/HowWeWork.jsx` | 4-step scroll-driven process |
| `src/components/layout/Navbar.jsx` | Anchor nav, updated menu items |
| `src/components/layout/Footer.jsx` | Dark footer, remove orange band |
| `src/content/site.js` | Update navLinks |
| `src/content/services.js` | V2 descriptions |
| `src/content/team.js` | Remove fabricated specialists |
| `src/content/portfolio.js` | Empty arrays |
| `src/content/insights.js` | Empty arrays |
| `src/content/ethos.js` | V2 principles and process |
| `src/app/sitemap.js` | Update routes |

### Files to ARCHIVE (Move to `_archive/`)
| Directory | Reason |
|---|---|
| `src/app/insights/` | Page removed |
| `src/app/portfolio/` | Page removed |
| `src/app/team/` | Page removed |
| `src/app/why-wqf/` | Page removed |

### Files to REMOVE from Homepage (Stop Importing)
| Component | Reason |
|---|---|
| `Marquee` in `page.js` | Ticker band removed |
| `OurPortfolio` in `page.js` | No real projects |
| `HeroDataField` in `Hero.jsx` | 3D canvas removed |

### Files with NO CHANGES
| Directory/File | Reason |
|---|---|
| `src/app/dashboard/**` | Admin CMS — untouched |
| `src/app/api/**` | API routes — untouched |
| `src/app/services/**` | Service pages — minor content updates only |
| `src/components/motion/**` | Motion primitives — keep, adjust defaults |
| `src/components/common/**` | Design system — keep |
| `src/components/layout/ContactDrawer.jsx` | Well-built intake system |
| `src/components/layout/ClientWrapper.js` | Hydration handling |
| `src/components/layout/PageLoader.jsx` | First-visit loader |
| `src/context/**` | Context providers |
| `src/lib/**` | Infrastructure |
| `src/middleware.js` | Auth guard |
| `src/styles/tokens.css` | Design tokens (minor spacing additions) |
| `src/styles/typography.css` | Type scale |
| `src/styles/grid.css` | Grid system |
| `src/styles/motion.css` | Timing tokens |

---

> **End of V2 Redesign Plan**
> This document contains all research, decisions, and implementation details needed to execute the redesign across any number of sessions or agents.
