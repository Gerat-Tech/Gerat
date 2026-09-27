# Gerat Website — V1 Architectural Summary

> **Purpose:** Complete reference of how the current website works, what each major component controls, and which files to change for the V2 redesign.
> **Generated:** 2026-09-27 | **Status:** READ-ONLY REFERENCE — Do not modify the codebase based on this document alone.

---

## 1. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | `^16.2.3` |
| Runtime | React / React-DOM | `^18.3.1` |
| Styling | Tailwind CSS v4 (CSS-first, no config file) | `^4.2.2` |
| Animation | Framer Motion | `^12.38.0` |
| Animation (alt) | GSAP (installed, lightly used) | `^3.15.0` |
| Carousel | Swiper | `^10.3.1` |
| ORM | Prisma | `^6.19.3` |
| Icons | Lucide React | `^1.8.0` |
| Phone Input | react-phone-input-2 | `^2.15.1` |
| PostCSS | @tailwindcss/postcss + autoprefixer | `^4.2.2` / `^10.4.27` |

---

## 2. Brand Identity

### Core Colors
| Token | Hex | Usage |
|---|---|---|
| **Flame Orange** | `#EA5B15` | Primary accent, CTAs, active states, brand mark |
| **Coffee Bean** | `#300F0A` | Dark text (light mode), deep backgrounds |
| **Almond** | `#F1DFD9` | Light mode canvas, warm neutral |
| **Cream / Ivory** | `#FAF6ED` | Light mode surfaces, dark mode text |

### Typography
| Role | Font Family | Weights |
|---|---|---|
| **Display / Headings** | Parkinsans | 300–800, SemiBold (600) primary |
| **Body / UI** | Artific | 100–900, Regular (400) primary |

> **Note:** In `globals.css`, body defaults to Artific and headings default to Parkinsans. The typography utility classes (`.display-xl`, `.heading-h2`, etc.) enforce Parkinsans for headlines and Artific for body copy.

### Logo System
| Variant | File | Usage |
|---|---|---|
| Primary Logo (mark + wordmark) | `docs/brand/Gerat - Logo Files/01 - Primary Logo/` | Hero, formal contexts |
| Badge Logo (mark + text compact) | `02 - Badge Logo/` | Header, footer, cards |
| Logo Mark (standalone wave icon) | `03 - Logo Mark (Standalone)/` | Favicons, avatars, small spaces |
| Badge (rounded square icon) | `04 - Badge/` | App icon, social profiles |
| Wordmark (text only) | `05 - Wordmark/` | When mark is shown separately |

**Color variants:** Dark (Coffee Bean), Light (Cream), Orange (Flame) for each.

### Brand Concept
- **Name meaning:** Inspired by German *Gerät* (tool/device/equipment made for a purpose)
- **Brand metaphor:** "The Bridge" — connecting businesses to useful technology
- **Founded:** 2026, Addis Ababa, Ethiopia
- **Founders:** 5 co-founders
- **Voice:** Direct, active, no jargon, business-first

---

## 3. Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.js                 # Root layout (fonts, theme, providers, metadata)
│   ├── page.js                   # Homepage (SSR, assembles all homepage sections)
│   ├── fonts.js                  # next/font/local declarations (Artific + Parkinsans)
│   ├── globals.css               # Master CSS: Tailwind import, @theme bridge, @font-face, global styles, theme inversions
│   ├── insights/                 # Insights page (TO BE REMOVED in V2)
│   ├── portfolio/                # Portfolio page (TO BE REPLACED with About in V2)
│   ├── services/                 # Services hub + 5 sub-routes
│   ├── team/                     # Team page (TO BE MERGED into About in V2)
│   ├── why-wqf/                  # Legacy redirect → /services
│   ├── dashboard/                # Admin CMS (7 phases complete, keep as-is)
│   └── api/                      # REST API routes (articles, portfolio, services, team, auth, settings)
├── components/
│   ├── common/                   # Button, Container, CustomCursor, GeratLogo, NavItem, SectionLabel, MarkdownRenderer
│   ├── home/                     # Hero, Marquee, OurFocus, OurEthos, OurPortfolio, OurLeadership, HowWeWork, Partners*, BrandCreativeSection*
│   ├── layout/                   # Navbar, Footer, ContactDrawer, ClientWrapper, PageLoader, TransitionOverlay
│   ├── motion/                   # FadeUp, SplitText, MaskReveal, Counter, Parallax, Magnetic
│   ├── services/                 # ServicesOverview (re-export)
│   └── three/                    # HeroDataField (3D canvas), Hero3DFallback (static SVG)
├── content/                      # Static fallback data (services, portfolio, team, insights, ethos, site config)
├── context/                      # NavContext, PageTransitionContext, ThemeContext
├── lib/                          # auth.js, prisma.js, notifications.js
├── middleware.js                  # JWT auth guard for /dashboard/*
└── styles/
    ├── tokens.css                # Design tokens (colors, spacing, radii, z-index)
    ├── typography.css            # Type scale, line heights, tracking, utility classes
    ├── grid.css                  # 12/8/4 column responsive grid, hairline borders
    └── motion.css                # Timing tokens, easings, animation keyframes
```

> `*` = Components exist in `src/components/home/` but are NOT mounted on the homepage.

---

## 4. Routing Map

### Public Routes (Current V1)
| Route | File | Type | Purpose |
|---|---|---|---|
| `/` | `src/app/page.js` | SSR | Homepage — scroll narrative |
| `/services` | `src/app/services/page.js` | SSR | Services hub (4 pillars grid) |
| `/services/digital-experiences` | `src/app/services/digital-experiences/page.js` | Client | Deep dive: websites & apps |
| `/services/ai-tools` | `src/app/services/ai-tools/page.js` | Client | Deep dive: AI & intelligent tools |
| `/services/business-systems` | `src/app/services/business-systems/page.js` | Client | Deep dive: ERP & operations |
| `/services/brand-creative` | `src/app/services/brand-creative/page.js` | Client | Deep dive: brand & identity |
| `/services/personal-branding` | `src/app/services/personal-branding/page.js` | Client | Deep dive: executive branding |
| `/portfolio` | `src/app/portfolio/page.js` | SSR | Case studies showcase |
| `/team` | `src/app/team/page.js` | SSR | Founders & specialists |
| `/insights` | `src/app/insights/page.js` | SSR | Technical whitepapers |
| `/insights/[slug]` | `src/app/insights/[slug]/page.jsx` | SSR | Individual article |
| `/why-wqf` | `src/app/why-wqf/page.js` | Redirect | Redirects to `/services` |

### Dashboard Routes (Keep as-is)
| Route | Purpose |
|---|---|
| `/dashboard` | Admin overview |
| `/dashboard/login` | Auth login |
| `/dashboard/inquiries` | CRM / client intake |
| `/dashboard/insights` | CMS: articles |
| `/dashboard/portfolio` | CMS: case studies |
| `/dashboard/services` | CMS: service pillars |
| `/dashboard/team` | CMS: team members |
| `/dashboard/settings` | Site config, audit log, users |

---

## 5. Homepage Section Order & Section IDs

| # | Component | Section ID | Content |
|---|---|---|---|
| 1 | `Hero` | `#hero` | Full-viewport: headline, CTAs, 3D canvas, capabilities bar |
| 2 | `Marquee` | *(none)* | Infinite horizontal ticker: 8 service tokens |
| 3 | `OurFocus` | `#capabilities` | 4 service pillars as interactive editorial rows |
| 4 | `OurEthos` | `#ethos` | "Why Gerat" — 4 ethos cards with hover accordion |
| 5 | `OurPortfolio` | `#portfolio` | Up to 3 featured case studies (cards) |
| 6 | `OurLeadership` | `#leadership` | 5 founders: kinetic morphing portrait slits |
| 7 | `HowWeWork` | `#process` | 3 methodology cards + sticky manifesto column |
| 8 | `Footer` | *(none)* | Orange CTA band, nav grid, legal colophon |

---

## 6. Layout & Navigation Architecture

### Navbar (`src/components/layout/Navbar.jsx`)
- **Position:** `fixed top-0 z-[120]`
- **Scroll behavior:**
  - At >40px: Compresses into floating pill (backdrop-blur, border, shadow)
  - At >80vh scrolling down: Auto-hides (translates up)
  - Scrolling up: Immediately reveals
- **Menu items:** Services, Portfolio, Team, Insights (links to separate pages)
- **Actions:** Theme toggle (sun/moon), Contact drawer CTA
- **Mobile:** Full-screen clip-path curtain overlay with 2×2 nav grid, discipline pills, theme segmented control

### Footer (`src/components/layout/Footer.jsx`)
- **Three tiers:**
  1. Flame Orange CTA band with magnetic button
  2. Surface-colored 4-column info grid (brand, navigation, services, contact)
  3. Dark legal colophon strip

### Contact Drawer (`src/components/layout/ContactDrawer.jsx`)
- Slide-in from right, `z-[500]`, backdrop blur
- 5 discipline modules with progressive disclosure
- Submits to `/api/intake`, returns tracking code
- Accepts preset config `{ discipline, subOption }` from any CTA

### Client Shell (`src/components/layout/ClientWrapper.js`)
- Hydration-safe mounting via `useSyncExternalStore`
- Dashboard routes: strips public UI (navbar, cursor, loader, transitions)
- Public routes: mounts Navbar, CustomCursor, PageLoader, TransitionOverlay
- Blur effect on mobile menu open

### Page Transitions
- `PageTransitionContext`: Tracks pathname changes, 450ms transition cycle
- `TransitionOverlay`: Dark wash + accent progress bar
- `PageLoader`: First-visit deterministic loader with monogram, corner brackets, percentage counter

### Theme System (`src/context/ThemeContext.jsx`)
- Dual persistence: cookie + localStorage
- SSR theme class injection on `<html>` to prevent flash
- Classes: `light/dark`, `site-light/site-dark`, `dashboard-light/dashboard-dark`
- OS system preference listener

---

## 7. Motion & Animation System

### Motion Primitives (`src/components/motion/`)
| Component | Effect | Library | Trigger |
|---|---|---|---|
| `FadeUp` | Vertical lift + opacity fade | Framer Motion | `whileInView`, once, 15% threshold |
| `SplitText` | Word-by-word upward slide from overflow clip | Framer Motion | `whileInView`, once, 20% threshold |
| `MaskReveal` | Clip-path wipe (bottom/right/inset) | Framer Motion | `whileInView`, once |
| `Counter` | Numeric count-up interpolation | rAF + IntersectionObserver | IntersectionObserver, 25% threshold |
| `Parallax` | Subtle vertical offset linked to scroll | Framer Motion `useScroll` | Continuous scroll-linked |
| `Magnetic` | Cursor attraction physics | Framer Motion `useSpring` | Mouse move (disabled on touch/reduced motion) |

### Shared Easing
- Primary: `cubic-bezier(0.22, 1, 0.36, 1)` — smooth deceleration
- Expo: `cubic-bezier(0.16, 1, 0.3, 1)` — dramatic snap
- Spring: `cubic-bezier(0.34, 1.56, 0.64, 1)` — bounce

### CSS Animations (`src/styles/motion.css`)
- `animate-marquee`: 28s infinite horizontal ticker
- `hover-glitch`: Micro-jitter on hover (2 iterations)
- `animate-corner-pulse`: Fixed opacity (no animation override)
- All animations respect `prefers-reduced-motion: reduce`

### 3D Canvas (`src/components/three/HeroDataField.jsx`)
- Software-rendered 3D parametric wave sculpture (1,768 points)
- Mouse parallax tilt + scroll parallax offset
- IntersectionObserver pauses when offscreen
- Fallback: `Hero3DFallback.jsx` (static SVG network grid)

---

## 8. Styling System

### Design Tokens (`src/styles/tokens.css`)
- **Spacing:** 16-step scale from `--space-1` (4px) to `--space-60` (240px)
- **Radii:** Minimalist architectural: `0px` → `2px` → `4px` → `8px` → `12px` → `pill`
- **Z-index:** 10-tier scale from `-1` to `200`
- **Dark/Light:** Full token set per mode with smooth theme switching

### Grid (`src/styles/grid.css`)
| Breakpoint | Columns | Gutter | Gap |
|---|---|---|---|
| Desktop (>1024px) | 12 | 24px | 16px |
| Tablet (≤1024px) | 8 | 20px | 14px |
| Mobile (≤768px) | 4 | 16px | 10px |

### Typography Scale (`src/styles/typography.css`)
- Fluid `clamp()` from `display-xl` (60–120px) down to `mono-sm` (12px)
- 9 utility classes: `.display-xl`, `.display-l`, `.heading-h2`, `.heading-h3`, `.body-lg`, `.body-base`, `.text-caption`, `.mono-label`, `.mono-meta`

### Tailwind Integration
- `@import "tailwindcss"` in `globals.css`
- `@theme { }` directive bridges CSS custom properties to Tailwind utilities
- No `tailwind.config.js` — v4 CSS-first configuration

---

## 9. Data Flow Architecture

```
┌─────────────────────────────────┐
│ 1. Static Content (src/content/)│ ← Hardcoded fallback data
│    services.js, portfolio.js,   │
│    team.js, insights.js, etc.   │
└────────┬────────────────────────┘
         │ fallback
         ▼
┌─────────────────────────────────┐
│ 2. Prisma Database (SQLite)     │ ← Primary data source
│    ServicePillar, CaseStudy,    │
│    Article, TeamMember, etc.    │
└────────┬────────────────────────┘
         │ SSR queries (try/catch)
         ▼
┌─────────────────────────────────┐
│ 3. Server Components (page.js)  │ ← Fetches data, passes as props
│    Promise.all([...queries])    │
└────────┬────────────────────────┘
         │ props
         ▼
┌─────────────────────────────────┐
│ 4. Client Components            │ ← Re-fetches via /api/* on mount
│    useEffect → fetch('/api/*')  │    for freshness (SWR-like pattern)
│    Triple fallback: API → SSR   │
│    props → static content       │
└─────────────────────────────────┘
```

---

## 10. Content in `src/content/`

| File | Exports | Records |
|---|---|---|
| `services.js` | `servicePillars` (4), `capabilitiesTable` (8), `brandCreativeFamily` (6), `creativeServicePackages` (4) | Static service data |
| `portfolio.js` | `portfolioProjects` (9) | Case studies with metrics, tech stacks, images |
| `team.js` | `leadershipTeam` (5), `engineeringSpecialists` (6) | Founder/specialist profiles |
| `insights.js` | `insightsArticles` (9) | Technical whitepapers |
| `ethos.js` | `brandPillars` (4), `ethosCards` (4), `methodologySteps` (5) | Brand values & process |
| `site.js` | `siteConfig` (1) | Company info, nav links, socials, contact details |

---

## 11. Technical Risks & Issues

### Duplicated Code
1. **Font declarations:** Both `next/font/local` in `fonts.js` AND direct `@font-face` in `globals.css` — redundant.
2. **ServicesOverview:** Re-exported through `src/components/services/ServicesOverview.jsx` → `src/app/why-wqf/components/ServicesOverview.jsx` — unnecessary indirection.
3. **Theme inversion CSS:** 500+ lines of manual dark-to-light class overrides in `globals.css` — brittle and hard to maintain.

### Content Truthfulness Issues (Flagged in V2 Content Docs)
- `engineeringSpecialists` (6 people in `team.js`) — these are NOT real employees; they were fabricated.
- `portfolioProjects` (9 case studies) — these are NOT real client projects; they were fabricated.
- `insightsArticles` (9 whitepapers) — these are NOT real publications; they were fabricated.
- Various enterprise claims, SLA percentages, and technical metrics — fabricated.

### Structural Issues
1. **No anchor-based navigation:** Header links route to separate pages instead of smooth-scrolling to homepage sections.
2. **Empty pages at launch:** Portfolio, Insights, Team pages will have no real content for a new company.
3. **Heavy 3D canvas:** The `HeroDataField` 1,768-point software-rendered 3D scene may cause performance issues on low-end mobile.
4. **Missing meta layouts:** 3 of 5 service sub-pages (`ai-tools`, `business-systems`, `digital-experiences`) lack nested `layout.js` files for SEO metadata.
5. **Aggressive animation density:** Many sections stack multiple animation layers (FadeUp + SplitText + Magnetic + hover effects) which can feel overwhelming.

### Dependencies to Watch
- `framer-motion ^12.38.0` — major dependency, used everywhere
- `gsap ^3.15.0` — installed but appears underutilized; could be removed
- `swiper ^10.3.1` — installed but no clear usage found in current components; candidate for removal
- `prisma ^6.19.3` — critical for dashboard CMS; ensure migrations are stable

---

## 12. Files to Change for V2 Redesign

### Pages to REMOVE
| Route | Files to Delete/Archive |
|---|---|
| `/insights` | `src/app/insights/page.js`, `src/app/insights/[slug]/page.jsx`, `src/app/insights/components/*` |
| `/portfolio` | `src/app/portfolio/page.js`, `src/app/portfolio/components/*` |
| `/team` | `src/app/team/page.js`, `src/app/team/components/*` |
| `/why-wqf` | `src/app/why-wqf/page.js`, `src/app/why-wqf/components/*` |

### Pages to CREATE
| Route | Purpose |
|---|---|
| `/about` | New About page (replaces Portfolio, absorbs Team content) |

### Files to HEAVILY MODIFY
| File | Changes Needed |
|---|---|
| `src/app/page.js` | Rebuild homepage section order, remove OurPortfolio, add V2 sections |
| `src/components/home/Hero.jsx` | Redesign: spacious, calm, scroll-driven narrative hero |
| `src/components/home/Marquee.jsx` | Remove (per first image: the service ticker band is unwanted) |
| `src/components/home/OurFocus.jsx` | Redesign as "The Bridge" service cards with sticky/scroll-stack |
| `src/components/home/OurEthos.jsx` | Redesign as "Point of View" section with large editorial type |
| `src/components/home/OurLeadership.jsx` | Simplify to clean 5-founder composition |
| `src/components/home/HowWeWork.jsx` | Redesign as scroll-driven 4-step process |
| `src/components/layout/Navbar.jsx` | Add anchor navigation (in-page scroll on Home, `/#section` from other pages) |
| `src/components/layout/Footer.jsx` | Redesign: dark CTA + form section above footer, column-based footer |
| `src/content/services.js` | Update to V2 service descriptions from content docs |
| `src/content/team.js` | Remove fabricated specialists, keep only 5 real founders |
| `src/content/portfolio.js` | Remove all fabricated case studies |
| `src/content/insights.js` | Remove all fabricated articles |
| `src/content/ethos.js` | Update to V2 principles and process |
| `src/content/site.js` | Update nav links (Services, About, Contact) |
| `src/styles/tokens.css` | Adjust spacing for more breathing room |
| `src/app/globals.css` | Clean up theme inversion, remove duplicate @font-face |
| `src/app/sitemap.js` | Update route list |

### Files to KEEP (No/Minimal Changes)
| File | Reason |
|---|---|
| `src/components/motion/*` | Motion primitives are well-built, reusable, accessible |
| `src/components/common/*` | Reusable design system components |
| `src/components/layout/ContactDrawer.jsx` | Functional, well-integrated intake form |
| `src/components/layout/ClientWrapper.js` | Solid hydration handling |
| `src/components/layout/PageLoader.jsx` | Clean first-visit experience |
| `src/context/*` | Well-architected context providers |
| `src/lib/*` | Auth, Prisma, notifications — infrastructure |
| `src/middleware.js` | Dashboard auth guard |
| `src/styles/tokens.css` | Mostly keep, tune spacing values |
| `src/styles/typography.css` | Keep type scale |
| `src/styles/grid.css` | Keep grid system |
| `src/styles/motion.css` | Keep timing tokens |
| `src/app/dashboard/**` | Entire dashboard — no changes needed |
| `src/app/api/**` | API routes — keep for CMS |
| `src/app/services/**` | Keep service deep-dive pages (may refine content) |
