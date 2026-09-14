# GERAT BRAND REBRAND — Implementation Plan
**Branch:** `feature/brand-rebrand`  
**Prepared:** September 2026  
**Status:** 🔴 Planning — Awaiting Approval  
**Source:** `docs/brand/Gerat.pdf` (v2.0, September 2026) + full codebase survey

---

## Overview

The brand PDF (`docs/brand/Gerat.pdf`) is the official identity brief from Gerat's UI/UX designer and logo designer. It defines the visual identity, color palette, logo concept, and brand philosophy. This plan updates every layer of the website — tokens, fonts, logos, colors, copy, components — to match the new brand, with zero inconsistencies.

> **⚠️ DO NOT start any code changes until this plan is approved by the user.**
> Work proceeds on branch `feature/brand-rebrand` (already created and checked out).

---

## What the Brand PDF Says

### Logo Concept
The new Gerat logo carries **four symbolic meanings**:
- **Support** — the form resembles a tent, symbolizing shelter and digital support for clients
- **Bridge** — connects businesses to the digital world  
- **Scalability** — a company built to grow; helps audiences scale too
- **Founders** — five elements representing the five founders, united by one vision

### Color System (from PDF)
| Name | Hex | RGB | Role |
|------|-----|-----|------|
| **Almond** | `#F1DFD9` | 241, 223, 217 | Primary warm neutral / background tone |
| **Flame** | *(see note)* | — | Secondary warm accent |
| **Coffee Bean** | *(see note)* | — | Tertiary warm / dark tone |

> **⚠️ NOTE:** The PDF text-layer returned `#F1DFD9` for all three swatches — a PDF extraction limitation. The actual Flame and Coffee Bean colors are visually distinct in the PDF. **User must provide correct hex codes before Phase 2.**  
> Best guess based on color names: Flame ≈ deep warm brown `#3D1C0E`; Coffee Bean ≈ dark espresso `#1A0A04`.

### Brand Keywords
Scalable · Professional · Functional · Tech-forward · Reliable

### Contact (confirmed from PDF)
- CEO: **Hruy Daniel**
- Phone: `+2519 2929 8030`
- Email: `hruydaniel@gerat.com`
- Website: `www.gerat.com`

---

## Codebase Survey Findings

### Current Color System
| Token | Current Value | File |
|-------|---------------|------|
| `--accent` | `#FF4A00` (orange-red) | `tokens.css`, `globals.css` |
| `--bg` | `#050505` (near-black) | `tokens.css` |
| `--surface` | `#141414` | `tokens.css` |
| `--text-primary` | `#F0F0F0` | `tokens.css` |
| Light mode bg | `#F0F2F5` (cold gray) | `globals.css` |
| Light mode card | `#E2E6EC` (cold gray) | `globals.css` |

### Current Fonts
| Font | Files | Usage |
|------|-------|-------|
| **RocGrotesk** | `roc-grotesk-regular.woff2`, `roc-grotesk-medium.woff2` | All headings, body, UI |
| **AzeretMono** | `azeret-mono-regular.otf` | Section labels, metadata, mono UI |

### Current Logo Assets (all placeholder — not the real designed logo)
| File | Description |
|------|-------------|
| `public/brand/gerat-logo-full.svg` | Text SVG with system fonts and a hand-drawn G-path |
| `public/brand/gerat-monogram.svg` | Square G-monogram — placeholder |
| `src/app/icon.svg` | Favicon — placeholder |

### Logo Usage in Code
| Location | Current Implementation |
|----------|----------------------|
| `src/components/layout/Navbar.jsx` | Inline SVG path `M3 5V19H19V13H11V11H21V5H3Z` + "GERAT" text |
| `src/components/layout/Footer.jsx` | Same inline SVG + "GERAT" wordmark |

### Hardcoded Colors Found
- `src/app/page.js` — `bg-[#050505]` on root div
- `src/app/portfolio/page.js` — `bg-[#050505]` on root div  
- `src/app/team/page.js` — `bg-[#050505]` on root div
- All 9 files in `src/components/home/` — multiple hardcoded hex values
- `src/components/layout/Navbar.jsx`, `Footer.jsx` — hardcoded dark hex values

### Pages Surveyed
| Page | Route | Notes |
|------|-------|-------|
| Homepage | `/` | 9 sections, reads team + portfolio from DB ✅ |
| Portfolio | `/portfolio` | DB-driven ✅ |
| Team | `/team` | DB-driven ✅, placeholder fallback images remain |
| Services | `/services` | DB-driven ✅ |
| Brand & Creative | `/services/brand-creative` | Exists |
| Personal Branding | `/services/personal-branding` | Exists |
| Insights | `/insights` | DB-driven ✅ |
| Why WQF | `/why-wqf` | Legacy route — content is services |
| Dashboard | `/dashboard` | Separate RBAC shell, own theming |

---

## Implementation Phases

### Phase 1 — Color Token System Update
**Target files:** `src/styles/tokens.css`, `src/app/globals.css`

Replace the current cold/neutral palette with the Gerat brand palette:

1. **Accent color**: Replace `#FF4A00` with the brand-specified interactive accent (pending Q4 answer)
2. **Dark mode background**: Optionally shift from cold `#050505` to a very dark warm tone aligned with Coffee Bean (pending Q5 answer)
3. **Light mode**: Replace cold `#F0F2F5` background with warm Almond `#F1DFD9` (or a tinted version) — giving the light mode a brand-aligned warm feel
4. **Light mode cards**: Update `#E2E6EC` to a warm equivalent
5. Update all `--color-*` tokens in `@theme` block
6. Update 200+ lines of light mode override rules in `globals.css` (lines 155–634)

---

### Phase 2 — Typography Review
**Target files:** `src/styles/typography.css`, `src/app/globals.css` (`@font-face`), `public/assets/`

1. If brand designer specifies a new typeface: add font files, update `@font-face`, update `--font-roc` alias
2. If no font change (RocGrotesk + AzeretMono are confirmed): Phase 2 = no-op
3. Review weight usage: Currently all headings use `font-weight: 500`. If brand needs bold (700) display, update `.display-xl`, `.display-l`

---

### Phase 3 — Logo & Visual Identity Assets
**Target files:** `public/brand/`, `src/app/icon.svg`

1. Replace `gerat-logo-full.svg` with the officially designed logo (dark variant — white on dark bg)
2. Add `gerat-logo-full-light.svg` (dark logo for light bg)
3. Replace `gerat-monogram.svg` with the official icon/mark
4. Add `gerat-monogram-light.svg`
5. Update `src/app/icon.svg` (favicon) with official mark

> **⚠️ BLOCKER:** Requires designer to export SVG files. Cannot complete without these assets.

---

### Phase 4 — Hardcoded Color Sweep Across Components
**Target files:** All JSX files with hardcoded hex values

Systematic replace after tokens are updated:

**Page root divs (3 files):**
- `src/app/page.js:94` — `bg-[#050505]` → `bg-[var(--bg)]`
- `src/app/portfolio/page.js:44` — same
- `src/app/team/page.js:54` — same

**Home components (9 files — full sweep):**
- Replace all `bg-[#0*]` dark hex values with CSS token equivalents
- Replace hardcoded `#FF4A00` with `var(--accent)` or `bg-accent`/`text-accent`

**Layout components:**
- `src/components/layout/Navbar.jsx`
- `src/components/layout/Footer.jsx`
- `src/components/layout/ContactDrawer.jsx`

---

### Phase 5 — Logo Integration in Layout
**Target files:** `src/components/layout/Navbar.jsx`, `src/components/layout/Footer.jsx`

1. Replace the inline SVG hack in Navbar (lines 76–86) with `<Image>` component pointing to `gerat-logo-full.svg`
2. Use theme-aware logic: light mode → dark-text logo, dark mode → white logo
3. Same for Footer (lines 76–86)
4. Test logo visibility and sizing across breakpoints

---

### Phase 6 — Brand Copy Alignment
**Target files:** `src/app/layout.js`, `src/components/home/Hero.jsx`, `src/components/home/OurEthos.jsx`, `src/components/layout/ContactDrawer.jsx`

1. Confirm legal company name: "Gerat Software Solutions PLC" vs "Gerat Software Solution"
2. Update contact info in ContactDrawer if placeholder data exists
3. Add brand pillar storytelling (Support / Bridge / Scalability / Founders) in About or Ethos section — tells the origin story of the logo
4. Update Hero subtext if needed to reflect confirmed brand positioning
5. Verify all references to `www.gerat.et` vs `www.gerat.com`

---

### Phase 7 — SEO, Open Graph, and Metadata
**Target files:** `src/app/layout.js`, `src/app/sitemap.js`, `src/app/robots.js`

1. Replace OG image (`/image/portfolioPage/US-AUT-3.webp`) with a brand OG card using the real logo
2. Update `metadataBase` from `https://gerat.et` to correct production domain
3. Update `sitemap.js` to use correct domain
4. Update Twitter card image

---

### Phase 8 — Dashboard Theme Consistency
**Target files:** `src/app/globals.css` (dashboard-light section, lines 544–634), dashboard components

1. Update `--dash-*` variable accent references after Phase 1
2. Verify sidebar active states and hover states use new brand accent
3. Grep all dashboard JSX for any remaining `#FF4A00` or hardcoded hex

---

### Phase 9 — Typography Hierarchy (if needed)
**Target files:** `src/styles/typography.css`, individual section components

Only if brand designer specifies changes:
1. Update `font-weight` on display classes
2. Add/remove `text-transform: uppercase` if brand uses mixed-case headlines
3. Letter-spacing adjustments if specified

---

### Phase 10 — Final QA Sweep
**Target files:** All

1. `grep -rn "#FF4A00\|#ff4a00" src/` — must return 0 results (if accent changes)
2. `grep -rn "#050505\|bg-\[#050505\]" src/` — ensure all replaced with tokens
3. Visual pass: every page, dark + light mode
4. `pnpm run build` — 0 errors, all 37 routes
5. `node tests/smoke/run-smoke-tests.mjs` — all 10 suites pass
6. Mobile check: 375px and 768px breakpoints

---

## Open Questions (Must Answer Before Coding Begins)

### Q1 — Exact Hex Codes (CRITICAL)
The PDF shows three brand colors (Almond, Flame, Coffee Bean) but extraction returned the same hex for all three. Please provide:
- Correct hex for **Flame** (appears to be a warm dark brown/rust)
- Correct hex for **Coffee Bean** (appears to be a deep espresso dark)

### Q2 — Logo Files (CRITICAL — BLOCKER)
The officially designed logo files need to be provided. Please get from the designer:
- `gerat-logo-dark.svg` (white/light version for dark backgrounds)
- `gerat-logo-light.svg` (dark version for light backgrounds)  
- `gerat-mark-dark.svg` (icon/monogram for dark backgrounds — for favicon, navbar compact)
- `gerat-mark-light.svg` (icon/monogram for light backgrounds)

### Q3 — Font Change?
Does the brand guide specify a typeface (either shown in the PDF visuals or told to you by the designer)? Or do we keep **RocGrotesk + AzeretMono**?

### Q4 — New Accent Color
The current interactive accent is `#FF4A00` (orange-red). What should the new accent/CTA color be? Options:
- Keep `#FF4A00` as it's energetic and tech-forward
- Use the Flame swatch as the accent
- Designer specifies something different

### Q5 — Dark Mode Background Warmth
Should the dark canvas stay cold near-black (`#050505`) or shift slightly warm to align with Coffee Bean tones (e.g. `#0A0705`)? The warm shift would make dark and light modes feel unified under one brand temperature.

### Q6 — Production Domain
The code currently uses `https://gerat.et` as the base URL, but the PDF shows `www.gerat.com`. Which is the correct production domain to use in metadata?

### Q7 — Company Legal Name
The website says **"Gerat Software Solutions PLC"** (with S and PLC). The PDF says **"Gerat Software Solution"**. Which is the legally registered name?

---

## Files Summary

### Will Definitely Change
| File | Phase |
|------|-------|
| `src/styles/tokens.css` | 1 |
| `src/app/globals.css` | 1, 8 |
| `src/app/page.js` | 4 |
| `src/app/portfolio/page.js` | 4 |
| `src/app/team/page.js` | 4 |
| `src/components/home/Hero.jsx` | 4, 6 |
| `src/components/home/OurEthos.jsx` | 4, 6 |
| `src/components/home/OurFocus.jsx` | 4 |
| `src/components/home/OurPortfolio.jsx` | 4 |
| `src/components/home/OurLeadership.jsx` | 4 |
| `src/components/home/BrandCreativeSection.jsx` | 4 |
| `src/components/home/HowWeWork.jsx` | 4 |
| `src/components/home/Partners.jsx` | 4 |
| `src/components/home/Marquee.jsx` | 4 |
| `src/components/layout/Navbar.jsx` | 4, 5 |
| `src/components/layout/Footer.jsx` | 4, 5 |
| `src/components/layout/ContactDrawer.jsx` | 4, 6 |
| `src/app/layout.js` | 6, 7 |
| `src/app/sitemap.js` | 7 |
| `src/app/robots.js` | 7 |
| `public/brand/gerat-logo-full.svg` | 3 |
| `public/brand/gerat-monogram.svg` | 3 |
| `src/app/icon.svg` | 3 |

### May Change (pending answers)
| File | Condition |
|------|-----------|
| `src/styles/typography.css` | Only if font changes |
| `public/assets/` | Only if new fonts added |
| `src/styles/motion.css` | Unlikely — motion system is solid |

---

## Verification Plan

### Automated Tests
```bash
pnpm run build
node tests/smoke/run-smoke-tests.mjs
```

### Manual Verification
- Every page visually reviewed in dark mode + light mode
- Logo renders cleanly at navbar size, footer size, and as favicon
- All interactive elements (buttons, links, hover states) use new brand colors
- No leftover `WQF`, `WorldQuant`, or `SYS:OK` telemetry branding
- Contact information (CEO name, email, phone, domain) is accurate
- Mobile layout at 375px and 768px is unbroken
