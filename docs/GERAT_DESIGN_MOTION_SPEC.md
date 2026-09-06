# GERAT SOFTWARE SOLUTIONS PLC
# WorldQuant Foundry-Inspired Design & Motion Specification
## Antigravity implementation brief — designer + frontend developer

**Version:** 1.0  
**Reference site:** https://www.worldquantfoundry.com/  
**Starting repository:** https://github.com/rafikul-shaikh/world-quant  
**Target:** Reproduce the reference site's *design grammar, interaction quality, page choreography, responsive behavior, and technical feel* using original Gerat branding/content/assets. Do **not** copy proprietary text, logos, photography, or source code.

---

# 0. IMPLEMENTATION DIRECTIVE

This document is the source of truth for visual and interaction decisions.

Antigravity should:

1. **Inspect the existing starter repository before changing architecture.**
2. Preserve working page/component structure where useful.
3. Upgrade missing interaction/3D systems rather than replacing the entire project unnecessarily.
4. Use the WorldQuant Foundry site as the *behavioral reference*.
5. Use original Gerat assets/content.
6. Build all motion as reusable systems, not isolated one-off animations.
7. Treat desktop, tablet, and mobile as intentionally designed variants.
8. Respect `prefers-reduced-motion`, keyboard navigation, touch interaction, and performance.
9. Never leave placeholder comments such as `// replace with Three.js later` in production sections.
10. After each major section, compare the implementation against the reference at a fixed viewport and correct spacing, timing, and interaction before moving on.

---

# 1. WHAT WE ARE STARTING WITH

The selected GitHub repository is a Next.js/React project.

Its `package.json` currently includes:

- Next.js
- React
- Tailwind CSS
- GSAP
- Framer Motion
- Swiper
- Lucide React
- phone-input packages

Reference:
https://github.com/rafikul-shaikh/world-quant/blob/main/package.json

The repository already contains page/component areas for:

- home
- why-wqf
- portfolio
- team
- common UI
- footer
- navigation

GitHub search also shows GSAP/ScrollTrigger implementations in components such as:

- `Partners.jsx`
- `OurFounders.jsx`
- `OurInvestors.jsx`
- `TeamLeadership.jsx`
- `BuildProcessCard.jsx`
- `PortfolioShowcase.jsx`

Reference:
https://github.com/rafikul-shaikh/world-quant

## Critical finding: 3D is missing/incomplete

The repository contains Canvas-based placeholder animations, and one component explicitly describes its animation as a basic placeholder intended to be replaced with Three.js.

Therefore this starter should be treated as:

> **a structural and motion starting point, not a finished reproduction.**

The implementation plan below explicitly fills this gap.

---

# 2. DESIGN OBJECTIVE

The target visual impression is:

**editorial + institutional + deep-tech + minimal + experimental + premium**

Avoid making it look like a generic:

- SaaS landing page
- startup template
- Bootstrap corporate site
- AI dashboard
- card-heavy marketing page

The page should feel closer to:

> a digital annual report + venture studio + experimental technology showcase

The user should feel that Gerat is capable of building serious systems.

---

# 3. CORE VISUAL LANGUAGE

## 3.1 Surface

Primary environment:

- very dark/near-black page
- subtle surface changes
- thin rules
- large negative space
- limited use of rounded containers

Recommended Gerat baseline:

```css
--bg: #0b0b0b;
--surface: #141414;
--surface-2: #1b1b1b;
--text: #f0f0f0;
--muted: #8e8e8e;
--border: #303030;
--accent: <GERAT BRAND ACCENT>;
```

Do not copy the reference orange by default. Use the Gerat brand accent.

## 3.2 Contrast

Hierarchy should be:

```text
LEVEL 1
Near-white / white
Huge headlines

LEVEL 2
Light gray
Descriptions and primary navigation

LEVEL 3
Muted gray
Metadata / captions / secondary labels

LEVEL 4
Hairline borders
Structure rather than decoration

LEVEL 5
Accent color
Only for:
- active states
- primary CTA
- focus
- selected items
- important data points
```

Do not use five bright colors.

---

# 4. TYPOGRAPHY

The reverse-engineered WQF design notes identify Roc Grotesk as the primary typeface and Azeret Mono as the mono/code face.

Reference:
https://github.com/carrotjc/WithPrototype-Enhancing-Android-Malware-Detection-with-Explainability/blob/7fd9c79d3734af74fd1e3b38fd3f57d779a21fea/worldquantfoundry-design/DESIGN.md

For Gerat:

## Headline family

Use one distinctive grotesk/display family consistently.

Priority:

1. existing Roc Grotesk asset if legally usable for this project
2. otherwise a licensed alternative with similar geometry
3. never substitute five unrelated display fonts

## Mono family

Use a mono font for:

- section indices
- technical metadata
- years
- category labels
- numerical counters
- "01 / 06" style indicators
- system/status labels

## Type scale

Desktop starting point:

```text
Display XL:  clamp(4rem, 8vw, 8rem)
Display L:   clamp(3.25rem, 6vw, 6.5rem)
H2:          clamp(2.5rem, 4.2vw, 5rem)
H3:          clamp(2rem, 3vw, 3.5rem)
Body:        clamp(1rem, 1.1vw, 1.2rem)
Small:       0.85rem
Mono:        0.72rem - 0.9rem
```

Important:

- Do not make every heading maximum size.
- Hero can be huge.
- Supporting headings should progressively reduce.
- Use line breaks intentionally.
- Avoid arbitrary manual `<br>` unless the line break is part of the art direction and has responsive variants.

## Heading line-height

Approximate:

```text
Hero:       0.86–0.98
H2:         0.95–1.05
H3:         1.0–1.1
Body:       1.4–1.6
Mono:       1.1–1.3
```

---

# 5. GRID

Use a strong visual grid.

Desktop:

```text
12 columns
outer gutter: 24–40px
column gap: 12–20px
```

Tablet:

```text
8 columns
outer gutter: 20–28px
```

Mobile:

```text
4 columns
outer gutter: 16–20px
column gap: 8–12px
```

The content should repeatedly snap to the same column edges.

Do not center every section independently.

---

# 6. SPACING SYSTEM

Use a controlled scale:

```text
4
8
12
16
20
24
32
40
48
64
80
96
120
160
200
240
```

Micro-spacing:

```text
4–12
```

Component spacing:

```text
16–32
```

Section spacing:

```text
64–160+
```

Hero/deep-story spacing:

```text
120–300+
```

Large empty space is intentional.

---

# 7. SHAPE LANGUAGE

Default:

- square or nearly square corners
- 1px borders
- thin dividers
- small radius only where needed

Avoid:

- pill buttons everywhere
- giant rounded cards
- excessive `rounded-3xl`
- glassmorphism
- excessive blur
- neumorphism

Buttons may be compact rectangular controls.

---

# 8. NAVIGATION

## Desktop

Top navigation should remain visually quiet.

Pattern:

```text
[GERAT]                          SERVICES
                                  PRODUCTS
                                  WORK
                                  INSIGHTS
                                  ABOUT
                         [CONTACT / START A PROJECT]
```

Depending on available width, use:

```text
logo left
nav center/right
contact CTA right
```

## Interaction

Hover:

- color transition
- slight translation or underline/reveal
- no excessive scale

Active route:

- accent color or explicit marker
- do not add thick nav backgrounds

## Sticky behavior

Use:

- fixed/sticky positioning
- background changes only where needed
- compact height
- smooth show/hide on scroll

Recommended behavior:

```text
scroll down quickly → nav compresses or hides
scroll up → nav returns
at top → full nav visible
```

The hide/show transition should be 250–450ms.

## Mobile

Use compact top bar:

```text
[GERAT]                         [MENU]
```

Opening menu should become a full-screen or near-full-screen transition.

Menu animation:

1. overlay begins
2. background rises/fades
3. links stagger
4. active link remains visually distinct
5. contact CTA enters last

Closing reverses the sequence.

Do not use the desktop navigation on mobile.

---

# 9. PAGE LOADER

The reference experience uses expressive loading behavior.

Implement a short, premium loader.

Target:

```text
0.0s
brand mark appears

0.15s
mark gains motion / mask

0.45s
loading phase reaches completion

0.55–0.75s
hero reveal

0.9s+
page is fully interactive
```

Do not create a long 3–5 second fake loader.

Loading should be:

- deterministic
- cancellable where possible
- skipped for repeat navigation where appropriate

Use a route-transition system for internal navigation.

---

# 10. HERO

The hero is the site's strongest art-directed moment.

## Structure

```text
top metadata
↓
very large headline
↓
supporting statement
↓
primary CTA / contact
↓
3D or motion object
↓
scroll indicator
```

Use asymmetry.

The hero should not look like:

```text
centered heading
centered paragraph
two centered buttons
```

Instead:

```text
large statement occupying most viewport
+
visual object crossing the grid
+
small metadata anchored to an edge
```

---

# 11. HERO 3D — GERAT IMPLEMENTATION

The reference contains an abstract visual/animated hero language. The GitHub starter does not contain a production Three.js scene.

Implement a custom Three.js/R3F scene.

## Recommended Gerat visual

A procedural **data-flow field** representing how Gerat turns complexity into systems.

Concept:

```text
many points
      ↓
converging field
      ↓
organized pathways
      ↓
central structure
      ↓
expanding network
```

This works for:

- software
- AI
- RAG
- ERP
- Madeya
- future ventures

## Geometry

Start with:

- 8k–20k particles desktop
- 3k–8k particles mobile
- thin curve paths
- 1 hero central form

Do not render millions of particles.

## Material

Prefer:

- PointsMaterial / custom shader
- emissive low-intensity accent
- grayscale base
- optional accent highlights

## Camera

Use mild perspective.

Start approximately:

```text
FOV: 35–50
near: 0.1
far: 100
```

Camera should move subtly with:

- pointer position
- scroll progress
- time

Do not continuously spin the camera.

## Lighting

For dark abstract scenes:

- soft ambient
- 1–2 directional/key lights
- restrained rim
- no nightclub lighting

## Animation

Idle:

- micro floating
- particle drift
- slow field deformation

Pointer:

- 5–12% scene influence
- spring interpolation
- no direct snap

Scroll:

- rotate/translate scene slightly
- shift depth
- compress or spread particle field

Example choreography:

```text
scroll 0.00 → object centered
scroll 0.25 → object drifts right
scroll 0.50 → object expands / reveals detail
scroll 0.75 → object shifts behind text
scroll 1.00 → object exits
```

---

# 12. 3D PERFORMANCE RULES

Critical:

- use `requestAnimationFrame` through the render loop
- cap pixel ratio to approximately `1.5–2`
- pause when offscreen
- do not render when the section is hidden
- lazy load the 3D bundle
- use WebGL feature detection
- provide a non-WebGL fallback image/CSS animation
- disable heavy effects on low-power/mobile devices

Use an IntersectionObserver or visibility state.

Recommended:

```js
renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 1.75)
)
```

Mobile:

```text
lower particle count
less post-processing
no expensive fluid simulation
```

---

# 13. REDUCED-MOTION MODE

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

In reduced motion:

- no parallax
- no cursor scene interaction
- no route choreography longer than a simple fade
- no continuous particle movement where avoidable
- no scroll-jacking
- instant/short transitions
- retain static visuals

Accessibility does not mean removing design. It means reducing movement while preserving hierarchy.

---

# 14. SCROLL BEHAVIOR

Use normal browser scroll.

Do NOT replace natural scrolling with forced scroll hijacking unless a very specific section requires controlled progression.

Use GSAP ScrollTrigger for:

- pinned storytelling
- reveal
- parallax
- horizontal sequences
- progress-driven transforms

Official:
https://gsap.com/docs/v3/Plugins/ScrollTrigger/

---

# 15. SECTION REVEAL SYSTEM

Create one reusable reveal system.

## Default

When section enters viewport:

```text
heading:
opacity 0 → 1
y 24–50px → 0

supporting content:
opacity 0 → 1
y 16–32px → 0

media:
clip-path / scale reveal
```

Duration:

```text
heading: 500–700ms
body: 450–600ms
media: 700–1000ms
```

Stagger:

```text
60–120ms
```

Use custom easing.

Good pattern:

```text
cubic-bezier(.22, 1, .36, 1)
```

Do not make every section identical; use 3–4 reveal families.

---

# 16. REVEAL FAMILIES

## A. Lift reveal

Text moves up from below.

Use for:

- normal headings
- body
- cards

## B. Mask reveal

Text/media is clipped inside a container and expands.

Use for:

- hero
- major section headings
- portfolio media

## C. Directional reveal

Elements enter from left/right based on their grid position.

Use sparingly.

## D. Counter/stagger reveal

Use for:

- statistics
- index numbers
- case-study metadata

---

# 17. TEXT ANIMATION

Do not animate every character.

Preferred hierarchy:

### Hero

Split into words or controlled lines.

### Section headings

Split into lines.

### Body

Fade/slide as a block.

### Metadata

Short fade.

If using a split-text library, ensure:

- semantic text remains accessible
- screen readers do not read duplicated strings
- no layout shift
- mobile line breaks are recalculated

---

# 18. PORTFOLIO / CASE STUDY SYSTEM

The portfolio is a major interaction pattern.

Use a large sequential presentation.

Example:

```text
01 / 05
MADEYA

Government technology
Fuel distribution platform

[large visual]

Services
Product Design
Software Engineering
Data Systems

[View Case Study]
```

## Desktop interaction

Preferred:

- large image/media
- text anchored to a fixed grid
- sequence counter
- horizontal/drag or scroll progression

The current reference portfolio is explicitly presented as a sequence and asks visitors to "Scroll to explore."

Reference:
https://www.worldquantfoundry.com/portfolio

## Drag interaction

If implementing drag:

- support mouse
- support touch
- support trackpad/scroll fallback
- show a visible affordance
- use momentum
- clamp boundaries
- do not trap the user

---

# 19. HORIZONTAL SCROLL SECTION

Use only for portfolio/case-study storytelling.

Pattern:

```text
vertical page
   ↓
pin section
   ↓
horizontal progression
   ↓
release
   ↓
continue vertical
```

Implementation:

GSAP ScrollTrigger + scrub.

Rules:

- section height proportional to number of slides
- horizontal movement controlled by vertical scroll
- no impossible-to-exit area
- keyboard fallback
- touch fallback

Alternative on mobile:

```text
horizontal snap carousel
```

Do not force a desktop horizontal scroll composition onto narrow screens.

---

# 20. CARD MOTION

Cards should not jump.

Hover:

```text
cursor enters
→ media shifts 2–8px
→ border/accent reacts
→ title shifts 2–4px
→ icon rotates or translates slightly
```

Duration:

```text
200–350ms
```

Exit:

```text
slightly faster
```

Avoid:

- 1.2x giant scaling
- bouncing
- arbitrary rotation
- dozens of simultaneous properties

---

# 21. IMAGE MOTION

For editorial images:

## Hover

```text
image scale: 1 → 1.03
container remains fixed
```

## Scroll reveal

Use clip-path:

```text
inset(8% 8% 8% 8%)
→
inset(0 0 0 0)
```

or a directional mask.

## Parallax

Use small ranges:

```text
-20px → +20px
```

not:

```text
-300px → +300px
```

The viewer should feel motion, not lose spatial coherence.

---

# 22. CURSOR

A custom cursor can be used on desktop only.

Use:

- small dot
- larger ring
- context label when useful

States:

```text
default
hover-link
hover-image
drag
view
close
```

Example:

```text
default: small dot
view: ring + "VIEW"
drag: ring + drag icon
close: X
```

Touch devices:

- remove custom cursor entirely

Respect reduced motion.

---

# 23. BUTTONS

Keep button styling minimal.

Primary:

```text
compact rectangular
dark/light surface or brand accent
thin border
```

Hover:

```text
background transition
text shift 1–3px
arrow travels 3–6px
```

Suggested arrow animation:

```text
arrow x: 0 → 5px
```

Don't use large magnetic movement.

---

# 24. MAGNETIC INTERACTIONS

Optional for:

- hero CTA
- final CTA
- portfolio "view" control

Only desktop.

Maximum displacement:

```text
6–12px
```

Use spring interpolation.

Never make a button chase the cursor across the screen.

---

# 25. MARQUEE / TICKER

Use for:

- technologies
- services
- industries
- company capabilities

Examples:

```text
AI / RAG / ERP / WEB APPS / DATA / AUTOMATION /
```

Motion:

```text
linear
continuous
slow
```

Pause on hover only if it improves readability.

Use CSS animation where possible; don't spend JS frame budget on simple infinite marquees.

---

# 26. ETHOS / VALUE CARDS

The WQF reference uses repeated numbered value blocks.

Use Gerat's own:

```text
01
BUILD FOR IMPACT

02
SYSTEMS, NOT DEMOS

03
INTELLIGENCE INTO OPERATIONS

04
ENGINEER FOR SCALE
```

Interaction:

- active card expands
- inactive cards remain compact
- image/visual changes
- text enters with stagger

Desktop:

```text
vertical or horizontal accordion
```

Mobile:

```text
stacked cards / tap-to-expand
```

Do not use hover-only content on mobile.

---

# 27. INDUSTRY / CAPABILITY GRID

Use a full-width section with a large heading:

```text
TECHNOLOGY
THAT MOVES
REAL SYSTEMS.
```

Then:

```text
01 Artificial Intelligence
02 RAG & Knowledge Systems
03 Enterprise Software
04 ERP & Operations
05 Government Technology
06 Data & Analytics
07 Digital Products
08 Automation
```

Hover effect:

- row background changes
- number shifts
- title moves
- description fades in
- optional subtle visual preview appears

Keyboard:

- focus same effect as hover

---

# 28. TEAM SECTION

Use editorial presentation, not default 3-column cards.

Pattern:

```text
OUR PEOPLE

large active portrait
name
role
short bio

small index:
01 / 04

previous   next
```

Desktop:

- image can occupy half the viewport
- text occupies the other half
- transitions use clip/mask

Mobile:

- stacked portrait + content
- swipe or next/previous controls

Never put a large bio wall on the initial view.

---

# 29. ARTICLE / INSIGHTS CARDS

Article card should have:

```text
CATEGORY
DATE
TITLE
READ TIME
IMAGE
```

Example:

```text
PRODUCT UPDATE
SEP 06, 2026

Madeya begins its next phase of
fuel distribution modernization

4 MIN READ
```

Hover:

- image crop movement
- title slight shift
- category/accent response

The reference site uses an Insights landing page with latest-news cards and dedicated article pages.

Reference:
https://www.worldquantfoundry.com/insights

---

# 30. ARTICLE PAGE

Structure:

```text
Back to Insights

category
date
headline

lead image / visual

summary

body sections

pull quote

media / diagrams

related stories

final CTA
```

Do not use a tiny centered blog column.

Use a wide editorial composition:

```text
metadata column
+
main content column
+
optional side index
```

On mobile:

```text
metadata
headline
image
body
```

---

# 31. CONTACT DRAWER / CONTACT EXPERIENCE

The current starter contains a ContactDrawer asset/component area.

Use this interaction rather than treating contact as a plain footer form.

Desktop:

```text
CONTACT
→ side drawer / overlay
→ form enters from right
→ background remains visible but muted
```

Animation:

```text
drawer x: 100% → 0
opacity overlay: 0 → 1
form fields stagger 40–70ms
```

Form:

```text
What are you looking for?
Website
Web App
ERP
RAG / AI
Enterprise Software
Government Technology
Other

Name
Company
Email
Phone
Project
Timeline
Budget (optional)

Submit
```

---

# 32. PAGE TRANSITIONS

Use a consistent transition between major routes.

Recommended:

```text
old page content:
opacity 1 → 0
y 0 → -10

new page:
overlay/mask
→ reveal
```

Total:

```text
350–700ms
```

Do not make navigation feel like opening a video game.

For direct page loading:

- content becomes interactive quickly
- loader only where useful

---

# 33. ROUTE-LEVEL TRANSITION ARCHITECTURE

Create shared:

```text
PageTransitionProvider
TransitionOverlay
RouteProgress
```

Do not implement route transitions independently in every page.

Suggested states:

```text
idle
entering
leaving
enter-complete
```

---

# 34. FOOTER

Footer should feel like the final statement.

Structure:

```text
large final CTA

START A PROJECT
or
BUILD WITH GERAT

--------------------------------

GERAT
Software Solutions PLC

Navigation
Services
Products
Work
Insights
About
Contact

Social / Email

Legal
Privacy
Terms

© 2026 Gerat Software Solutions PLC
```

Large footer typography is appropriate.

The footer should not feel like a sitemap dump.

---

# 35. RESPONSIVE STRATEGY

## Desktop ≥ 1280px

Full:

- editorial layout
- 3D hero
- rich pointer interactions
- pinned sequences
- horizontal portfolio
- custom cursor

## Tablet 768–1279px

Keep:

- strong typography
- grid
- motion
- simplified 3D

Reduce:

- parallax amplitude
- particle count
- complex overlaps

## Mobile ≤ 767px

Keep:

- same brand
- same hierarchy
- same storytelling

Change:

- navigation to menu
- horizontal scroll to swipe/snap
- 3D to lighter scene
- multi-column grids to single/stacked
- custom cursor removed
- hover-only interactions replaced by tap/focus

---

# 36. MOBILE MOTION RULES

Mobile motion should be:

- shorter
- simpler
- touch-friendly
- less dependent on pointer position

Recommended:

```text
300–600ms reveals
small translate distances
no giant parallax
no hover dependencies
```

On low-power mobile:

- static 3D fallback
- CSS motion
- reduced particle count

---

# 37. TOUCH

All interactions must work with:

- finger
- trackpad
- mouse
- keyboard where relevant

For drag areas:

- set `touch-action`
- don't block page scrolling unnecessarily
- release drag cleanly
- support inertial movement
- show a visual state

---

# 38. ACCESSIBILITY

Required:

- keyboard-visible focus
- semantic headings
- landmark elements
- accessible buttons
- alt text
- form labels
- sufficient contrast
- reduced motion
- no information hidden only behind hover
- no auto-playing sound

Do not hide content behind complex animation if it fails to load.

---

# 39. PERFORMANCE

Target:

```text
fast first contentful paint
minimal layout shift
lazy media
lazy 3D
compressed images
correct intrinsic dimensions
```

Rules:

- `next/image`
- AVIF/WebP where practical
- lazy load below-the-fold media
- preload only critical hero assets
- avoid loading all article images on initial route
- avoid giant uncompressed videos
- dynamic import Three.js/R3F scene
- cleanup GSAP ScrollTriggers on unmount

---

# 40. ANIMATION BUDGET

A section should not animate every element simultaneously.

Use a choreography ratio:

```text
1 hero motion
1 main text motion
1 supporting media motion
small interaction details
```

Avoid:

```text
headline + paragraph + cards + image + nav
all moving independently
```

This produces visual noise.

---

# 41. GSAP VS FRAMER MOTION

The starter contains both.

Use them deliberately.

## GSAP / ScrollTrigger

Use for:

- scroll-linked motion
- pinning
- horizontal scenes
- timeline choreography
- canvas/3D synchronization
- complex sequences

## Framer Motion

Use for:

- small UI state transitions
- accordion
- menus
- overlays
- simple component enter/exit
- layout state changes

Do not create the same animation in both libraries.

---

# 42. THREE.JS VS CSS

Use CSS for:

- simple fades
- transform
- underline
- basic hover
- simple reveal masks

Use Three.js for:

- actual 3D
- particles
- volumetric/procedural scene
- camera interaction
- 3D model
- depth-driven interaction

Use WebGL only when the result could not be reasonably achieved in CSS/SVG.

---

# 43. SVG

SVG is ideal for:

- logo
- icons
- thin line diagrams
- masks
- path-drawing
- network diagrams
- lightweight motion graphics

Use `stroke-dasharray` / `stroke-dashoffset` for path reveals.

---

# 44. VIDEO

Use video only when:

- it communicates a real product
- a case study needs cinematic material
- 3D cannot communicate the concept as efficiently

Rules:

- muted
- poster image
- lazy loaded below fold
- short loop
- compressed
- mobile alternate where necessary

---

# 45. 3D FALLBACK

Every 3D section needs:

```text
WebGL available
→ interactive 3D

WebGL unavailable / reduced motion / performance fallback
→ static generated image or CSS/SVG motion
```

Never let a missing GPU turn the hero into an empty box.

---

# 46. VISUAL ASSETS

Do not reuse WorldQuant Foundry photos.

Create or source Gerat-specific assets for:

- team
- software interfaces
- Madeya
- infrastructure
- data
- government operations
- abstract technology
- future ventures

Use consistent photographic treatment:

- low saturation
- strong contrast
- dark backgrounds
- controlled crops
- editorial composition

---

# 47. MADeya VISUAL SYSTEM

Madeya should have a dedicated visual identity while remaining under Gerat.

Recommended visual language:

```text
fuel orange / warm amber
+
deep charcoal
+
white
+
data-network lines
+
maps
+
distribution nodes
```

The Madeya 3D visualization:

```text
national / regional map
→ supply source
→ depot
→ distributor
→ station
→ controlled allocation
```

The goal is not to show literal barrels everywhere.

Show:

> movement of information + movement of supply

---

# 48. MADeya SCROLL STORY

Suggested pinned sequence:

### Stage 1 — Problem

Text:

```text
Fuel distribution is a system problem.
```

Visual:

unorganized nodes.

### Stage 2 — Visibility

```text
See what is moving.
See where it is going.
```

Visual:

nodes become connected.

### Stage 3 — Control

```text
One system.
One operational view.
```

Visual:

distribution routes stabilize.

### Stage 4 — Accountability

```text
Trace the journey.
```

Visual:

path history.

### Stage 5 — Outcome

```text
Technology for fairer,
more accountable distribution.
```

Visual:

clean network state.

---

# 49. CONTENT/INTERACTION BOUNDARY

Design components should not contain company copy directly.

Prefer:

```text
data object
→ component
```

Example:

```ts
const service = {
  title: "Intelligent Systems",
  summary: "...",
  category: "AI",
  href: "/services/intelligent-systems"
}
```

This makes the site easy to update without rewriting components.

See companion document:

`GERAT_CONTENT_REPLACEMENT.md`

---

# 50. DATA ARCHITECTURE

For current investor version:

```text
content/config
├── home
├── services
├── products
├── portfolio
├── team
├── insights
└── contact
```

Future:

```text
CMS / database
```

Do not hard-code article cards into component JSX.

---

# 51. DESIGN TOKEN FILES

Recommended:

```text
src/
  styles/
    tokens.css
    typography.css
    motion.css
    globals.css
```

And:

```text
src/
  lib/
    motion/
      reveal.ts
      splitText.ts
      pageTransition.ts
      hover.ts
      scroll.ts
    three/
      scene-config.ts
      particle-field.tsx
      fallback.tsx
```

---

# 52. COMPONENT ARCHITECTURE

Suggested:

```text
components/
  layout/
    Navigation
    MobileMenu
    Footer
    PageTransition

  common/
    Button
    Container
    SectionLabel
    SectionHeading
    MediaFrame
    Counter
    Magnetic
    Reveal

  motion/
    FadeUp
    MaskReveal
    Stagger
    HorizontalScroll
    Parallax

  three/
    HeroField
    MadeyaNetwork
    ThreeFallback

  home/
    Hero
    Intro
    Ethos
    Services
    MadeyaFeature
    PortfolioPreview
    TeamPreview
    InsightsPreview
    FutureVentures
    FinalCTA

  portfolio/
    PortfolioShowcase
    CaseStudyCard

  insights/
    ArticleCard
    ArticleHero
    ArticleBody
```

---

# 53. ANTI-PATTERNS

Never do these:

- huge gradients everywhere
- generic SaaS purple
- rounded cards everywhere
- random animations
- scroll-jacking
- 3D with no narrative purpose
- massive video backgrounds
- hover-only navigation
- text impossible to read over imagery
- loading screen longer than necessary
- custom cursor on mobile
- multiple animation libraries doing the same job
- hard-coded content across dozens of components
- layout shifts caused by images
- excessive drop shadows
- excessive blur

---

# 54. QUALITY BAR

The site should pass these subjective checks.

## At a glance

It should feel:

```text
expensive
calm
technical
confident
intentional
```

Not:

```text
busy
template-like
juvenile
over-animated
```

## Interaction

A first-time user should notice:

1. hero motion
2. smooth navigation
3. scroll choreography
4. high-quality case-study transition
5. thoughtful micro-interactions

But no interaction should make the user struggle to navigate.

---

# 55. IMPLEMENTATION ORDER

Do not start by adding random 3D.

Sequence:

```text
1. Existing repo audit
2. Preserve routing/content boundaries
3. Design tokens
4. Global typography
5. Navigation
6. Loader
7. Hero composition
8. Hero 3D
9. Reveal system
10. Scroll system
11. Portfolio interactions
12. Team interactions
13. Insights
14. Contact drawer
15. Footer
16. Mobile adaptation
17. Reduced motion
18. Performance pass
19. Accessibility pass
20. Visual comparison pass
```

---

# 56. VISUAL QA CHECKLIST

Check at:

```text
1440 × 900
1280 × 800
1024 × 768
768 × 1024
430 × 932
390 × 844
```

For each:

- navigation spacing
- hero line breaks
- 3D placement
- section height
- border alignment
- image crop
- CTA position
- animation timing
- scroll continuity
- no overflow
- no horizontal scroll except intended carousel
- text does not clip
- mobile menu works

---

# 57. MOTION QA CHECKLIST

Test:

```text
page load
hover
mouse leave
scroll down
scroll up
fast scroll
slow scroll
resize
mobile orientation
touch
keyboard tab
reduced motion
WebGL unavailable
slow CPU
```

A page is not finished merely because animations work on the developer machine.

---

# 58. ANTIGRAVITY TASK FORMAT

When asking Antigravity to implement a section, use this structure:

```text
TASK
Implement [section].

REFERENCE
WorldQuant Foundry:
[URL]

DESIGN
[exact layout behavior]

MOTION
[trigger]
[property]
[duration]
[easing]
[stagger]

3D
[scene]
[interaction]
[fallback]

RESPONSIVE
desktop:
tablet:
mobile:

ACCESSIBILITY
[requirements]

PERFORMANCE
[requirements]

DONE WHEN
[objective visual checks]
```

This prevents the agent from filling gaps with generic assumptions.

---

# 59. FINAL IMPLEMENTATION PRINCIPLE

Do not pursue:

> "copy the screenshot."

Pursue:

> **"reproduce the system that makes the screenshot inevitable."**

That system is:

```text
GRID
+
TYPE
+
SPACING
+
IMAGE TREATMENT
+
MOTION
+
INTERACTION
+
3D
+
CONTENT HIERARCHY
+
RESPONSIVE RULES
```

When these are correct, the finished website will feel like the reference while still being a real Gerat product.

---

# 60. SOURCES / RESEARCH REFERENCES

WorldQuant Foundry
https://www.worldquantfoundry.com/

WorldQuant Foundry Home
https://www.worldquantfoundry.com/

WorldQuant Foundry Why WQF
https://www.worldquantfoundry.com/why-wqf

WorldQuant Foundry Portfolio
https://www.worldquantfoundry.com/portfolio

WorldQuant Foundry Insights
https://www.worldquantfoundry.com/insights

WorldQuant Foundry About
https://www.worldquantfoundry.com/about

GitHub starter repository
https://github.com/rafikul-shaikh/world-quant

GitHub starter package
https://github.com/rafikul-shaikh/world-quant/blob/main/package.json

Reverse-engineered WQF design notes
https://github.com/carrotjc/WithPrototype-Enhancing-Android-Malware-Detection-with-Explainability/blob/7fd9c79d3734af74fd1e3b38fd3f57d779a21fea/worldquantfoundry-design/DESIGN.md

GSAP ScrollTrigger
https://gsap.com/docs/v3/Plugins/ScrollTrigger/

Three.js documentation
https://threejs.org/docs/

Rive Web runtime
https://rive.app/docs/runtimes/web/web-js

Awwwards
https://www.awwwards.com/

---

# 61. IMPORTANT LEGAL/BRAND BOUNDARY

Use the reference as design inspiration and technical research.

Do not copy:

- WorldQuant Foundry trademarks
- WorldQuant logo
- copyrighted photography
- article text
- biographies
- company claims
- source code that is not licensed for reuse
- hosted assets from the reference site's CDN

Gerat must have its own:

- brand
- colors
- copy
- imagery
- 3D assets
- product descriptions
- team bios
- case-study data

The point is to match the level of execution, not impersonate the original company.

