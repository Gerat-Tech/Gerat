# Gerat Software Solutions PLC — Portfolio Website

Premium portfolio website for **Gerat Software Solutions PLC**, built with Next.js and inspired by award-winning editorial and interactive design.

## Overview

Gerat Software Solutions PLC builds digital systems for businesses, institutions, and public-sector operations — spanning intelligent applications, RAG knowledge systems, enterprise software, ERP platforms, and purpose-built digital products.

This website is designed with an editorial, institutional, and deep-tech visual language featuring custom typography, choreography, scroll-driven interactions, and procedural 3D data-flow visuals.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Motion & Choreography | [GSAP 3](https://gsap.com/) (ScrollTrigger) + [Framer Motion 12](https://motion.dev/) |
| 3D & Graphics | Three.js / React Three Fiber |
| Typography | Roc Grotesk (Editorial Sans) + Azeret Mono (Technical Mono) |
| Package Manager | pnpm |

## Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- pnpm (`npm install -g pnpm`)

### Installation & Development

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Architecture

```
src/
├── app/                  # Next.js App Router routes and pages
│   ├── page.js           # Home page
│   ├── layout.js         # Root layout with metadata and providers
│   ├── globals.css       # Core styling, font imports, and resets
│   ├── portfolio/        # Portfolio showcase
│   ├── team/             # Leadership and team profiles
│   ├── insights/         # Articles, research, and product updates
│   └── why-wqf/          # About / Platform overview
├── components/
│   ├── common/           # Atomic UI elements (Button, Card, NavItem, etc.)
│   ├── home/             # Home page composite sections
│   └── layout/           # Global navigation, mobile drawer, footer
├── context/              # Application state providers
├── styles/               # Design tokens, typography scale, motion presets
public/
├── assets/               # Local webfonts (Roc Grotesk, Azeret Mono)
└── image/                # Media assets, editorial imagery, and brand marks
docs/
├── GERAT_DESIGN_MOTION_SPEC.md   # Design & motion system specification (60 sections)
├── GERAT_CONTENT_REPLACEMENT.md  # Official content and copy replacement guide
├── progress/                     # Phased roadmap and implementation tracking
└── reference/                    # Design reference materials
```

## Documentation & Roadmap

- **Design Specification:** [`docs/GERAT_DESIGN_MOTION_SPEC.md`](docs/GERAT_DESIGN_MOTION_SPEC.md)
- **Content Guide:** [`docs/GERAT_CONTENT_REPLACEMENT.md`](docs/GERAT_CONTENT_REPLACEMENT.md)
- **Implementation Roadmap:** [`docs/progress/ROADMAP.md`](docs/progress/ROADMAP.md)

## License

Proprietary — © 2026 Gerat Software Solutions PLC. All rights reserved.
