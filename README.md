# GERAT SOFTWARE SOLUTIONS PLC // WEB PLATFORM & MISSION CONTROL

> **Engineering Standard:** Deep-Tech Enterprise Software, Distributed Systems & Monolithic Visual Identity  
> **Tagline:** *"From Identity to Infrastructure"*  
> **Production Domain:** [https://gerat.et](https://gerat.et)  
> **Operations Terminal:** [https://gerat.et/dashboard](https://gerat.et/dashboard)

---

## 1. Executive Summary

**Gerat Software Solutions PLC** builds mission-critical digital systems for enterprises, financial institutions, and public-sector operations — spanning high-concurrency architectures, localized AI/RAG knowledge networks, custom ERP platforms, and monolithic visual identity systems.

This repository contains the complete unified web platform:
1. **Public Brand & Technical Experience:** An editorial, high-density web application built with Next.js 16, Tailwind CSS 4, Framer Motion 12, and GSAP 3.
2. **Gerat Mission Control (`/dashboard`):** A dark, monolithic administrative command center integrating CRM lead intake, 1-click communication channels (WhatsApp, Phone, Email), Research CMS, Flagship Portfolio CMS, Team Roster Governance, and Real-Time Telemetry Alert Webhooks.

---

## 2. Technology Stack

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router + Turbopack) | Server Components, dynamic streaming, and server actions |
| **Styling** | Tailwind CSS 4 | Custom design tokens, architectural grid layout, dark canvas (`#080808`) |
| **Database & ORM** | Prisma ORM 6 + SQLite / PostgreSQL | Relational data integrity, schema migrations, and type-safe client |
| **Authentication & RBAC** | Stateless JWT (`jose`) + `bcryptjs` | Role-Based Access Control: Super Admin, Ops Lead, Tech Editor, Creative Editor |
| **Motion & Visuals** | GSAP 3 (ScrollTrigger) + Framer Motion 12 | Precision easing, scroll parallax, and micro-interaction choreography |
| **Typography** | Roc Grotesk + Azeret Mono | Editorial uppercase grotesque paired with monospaced technical telemetry |
| **Package Manager** | `pnpm` | Fast, deterministic dependency management |

---

## 3. Quick Start & Local Setup

### Prerequisites
- **Node.js:** v18.18+ or v20+
- **pnpm:** `npm install -g pnpm`

### Step 1: Clone and Install Dependencies
```bash
git clone <repository-url>
cd Gerat
pnpm install
```

### Step 2: Configure Environment Variables
Copy the template configuration into your local environment:
```bash
cp .env.example .env
```
Ensure `.env` contains:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secure-random-32-byte-secret-key-for-local-dev"
ADMIN_DEFAULT_EMAIL="admin@gerat.et"
ADMIN_DEFAULT_PASSWORD="YourSecureAdminPassword123!"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 3: Initialize and Seed the Database
Push the Prisma schema to generate the local SQLite database and populate it with seed records (projects, whitepapers, team roster, practice pillars, and initial admin accounts):
```bash
pnpm db:push
pnpm db:seed
```

### Step 4: Run the Development Server
```bash
pnpm dev
```
Open your browser to:
- **Public Platform:** [http://localhost:3000](http://localhost:3000)
- **Mission Control Dashboard:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

---

## 4. Gerat Mission Control (`/dashboard`) — User Guide

**Gerat Mission Control** is the private operational cockpit for the Gerat team.

### Default Seeded Administrative Credentials

The database seed provides 3 pre-configured role profiles for testing:

| Role | Email | Default Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@gerat.et` | `GeratAdmin2026!` | Unrestricted access across all CRM, CMS, and Site Telemetry domains |
| **Operations Lead** | `ops@gerat.et` | `GeratOps2026!` | CRM lead triage, client comms, pipeline governance, and site configuration |
| **Technical Editor** | `editor@gerat.et` | `GeratEditor2026!` | Research whitepapers, case studies, and practice pillar authoring |

---

### Key Operational Modules

#### 1. Client Intake & CRM Pipeline (`/dashboard/inquiries`)
Every submission from the public website's `ContactDrawer` generates an immutable telemetry code (`GRT-ENG-YYYYMM-XXXXXX` or `GRT-BRD-YYYYMM-XXXXXX`) and enters the triage pipeline.
- **Multi-View Cockpit:** Switch between a visual **Kanban Pipeline Board** and a high-density **Data Grid** with real-time text search and discipline filters.
- **1-Click WhatsApp Direct:** Click "WHATSAPP" on any lead card to open WhatsApp Web/Desktop with a pre-filled formal greeting referencing the client name and telemetry code.
- **1-Click Phone Call:** Click the phone trigger to launch direct calling (`tel:<phone>`).
- **Integrated Email Composer:** Choose from 4 pre-engineered response templates (*Discovery Architecture Consultation*, *Brand Scoping*, *NDA Scope Review*, or *Timeline Clarification*) with 1-click clipboard copy.
- **Internal Collaboration:** Add private engineering notes (with pin-to-top option) and log call touchpoints with agreed outcomes.

#### 2. Research & Insights CMS (`/dashboard/insights`)
- Split-screen raw markdown editor supporting KaTeX math expressions, code blocks, and live formatted preview.
- Article lifecycle states: `DRAFT` → `IN_REVIEW` → `SCHEDULED` → `PUBLISHED` → `ARCHIVED`.
- Automatic reading time calculation and dynamic public reader at `/insights/[slug]`.

#### 3. Flagship Portfolio CMS (`/dashboard/portfolio`)
- Curate enterprise case studies and proprietary client engagements.
- Manage metric badges (e.g. `50,000 TPS // SUB-10MS SETTLEMENT`), architectural problem statements, and tech chips.
- Toggle "FEATURE ON HOMEPAGE" with 1 click to spotlight flagship systems on the home page.

#### 4. Team Roster & Practice Pillars CMS (`/dashboard/team` & `/dashboard/services`)
- **Team Roster:** Manage Executive Leadership, Engineering Practitioners, Creative Directors, and Advisors with 4:5 aspect ratio portraits, hover grayscale dynamics, and discipline tags.
- **Practice Pillars:** Configure Pillars `01` through `06` on `/why-wqf`, including multiline deliverables parsing and deep specification routes.

#### 5. System Control, Ticker Tokens & Alert Webhooks (`/dashboard/settings`)
- **Marquee Ticker Tokens:** Add, reorder, or remove tokens streaming live across the homepage marquee.
- **Official Brand Coordinates:** Update switchboard phone, emergency hotline, headquarters address, and GPS coordinates.
- **Real-Time Notification Webhooks:** Connect Slack, Discord, Telegram, or custom webhooks to receive instant telemetry alerts whenever a new client submits an intake form. Includes a live "TEST PING ↗" button.
- **Immutable Audit Trail:** Chronological ledger of every administrative action with expandable JSON diff snapshots and operator attribution.

#### 6. Global Command Palette (`⌘K` / `Ctrl+K`)
Press `⌘K` anywhere in the dashboard to open the quick launcher for instant navigation across all inquiries, CMS editors, and system settings.

---

## 5. Repository Architecture

```
Gerat/
├── prisma/
│   ├── schema.prisma              # Database models (Inquiry, Article, CaseStudy, Team, etc.)
│   └── seed.mjs                   # Seed dataset (users, sample leads, articles, case studies)
├── public/
│   ├── assets/                    # Local webfonts (Roc Grotesk, Azeret Mono)
│   └── image/                     # Brand marks, editorial photography, project assets
├── src/
│   ├── app/
│   │   ├── (public)/              # Public platform routes
│   │   │   ├── page.js            # Home page ("From Identity to Infrastructure")
│   │   │   ├── portfolio/         # Filterable portfolio showcase
│   │   │   ├── team/              # Executive leadership & engineering practitioners
│   │   │   ├── insights/          # Technical whitepapers & dynamic /insights/[slug] reader
│   │   │   ├── why-wqf/           # Services & platform architecture
│   │   │   └── services/          # Dedicated landing pages (brand-creative, personal-branding)
│   │   ├── dashboard/             # GERAT MISSION CONTROL (Operations & CMS Cockpit)
│   │   │   ├── inquiries/         # CRM pipeline, Kanban board & lead dossiers
│   │   │   ├── insights/          # Research CMS & split-screen markdown editor
│   │   │   ├── portfolio/         # Flagship portfolio & case study editor
│   │   │   ├── team/              # Team roster governance & profile composer
│   │   │   ├── services/          # Practice pillars CMS
│   │   │   ├── settings/          # Ticker tokens, alert webhooks & audit logs
│   │   │   └── login/             # Monolithic dark authentication terminal
│   │   └── api/                   # Serverless REST API route handlers
│   │       ├── intake/            # Public inquiry telemetry intake & alert dispatch
│   │       ├── auth/              # JWT login, logout, and me verification
│   │       ├── inquiries/         # CRM notes, status updates, and comms logging
│   │       ├── articles/          # Research CMS CRUD
│   │       ├── portfolio/         # Case studies CRUD
│   │       ├── team/              # Team roster CRUD
│   │       ├── services/          # Practice pillars CRUD
│   │       └── settings/          # Site config, audit logs & test webhook ping
│   ├── components/
│   │   ├── dashboard/             # Dashboard shell, navigation sidebar, command palette
│   │   ├── layout/                # Global Navbar, ContactDrawer, Footer, TransitionOverlay
│   │   ├── motion/                # SplitText, FadeUp, Parallax, Counter primitives
│   │   └── home/                  # Homepage composite editorial sections
│   ├── lib/
│   │   ├── prisma.js              # Cached Prisma client instance
│   │   ├── auth.js                # JWT session signing, verification & RBAC rules
│   │   └── notifications.js       # Real-time alert dispatch engine (Slack, Discord, Telegram)
│   └── styles/                    # Design tokens and globals.css
├── tests/
│   └── smoke/                     # Comprehensive automated smoke test suite (10 test runners)
└── docs/
    ├── Dashboard.md               # Complete dashboard research and specification
    └── progress/
        ├── ROADMAP.md             # Core platform implementation phases (Phases 1–22)
        └── DASHBOARD_ROADMAP.md   # Mission Control phased roadmap (Phases D-01–D-07)
```

---

## 6. Testing & Quality Assurance

Gerat utilizes a zero-dependency automated smoke test runner executing end-to-end checks directly against local routes and database entities.

### Run All Smoke Tests
```bash
pnpm run test:smoke
```
*Executes all 10 test suites in ~1.5s:*
1. **Tokens & CSS Architecture:** Font imports, color variables, spacing scale.
2. **Component Integrity & Exports:** All UI and motion components verified.
3. **Route & Layout Scaffolds:** Static and dynamic route definitions.
4. **Branding & Anti-Legacy Rules:** Brand consistency and asset isolation.
5. **Dashboard Database, Auth & RBAC:** User roles, bcrypt hashing, and JWT signing.
6. **CRM & Client Intake Pipeline:** Telemetry code generation, status updates, note logging.
7. **Research & Insights CMS:** Article lifecycle transitions and slug resolution.
8. **Flagship Portfolio CMS:** Case study creation, featured toggles, and metrics.
9. **Team & Services CMS:** Roster cadre filtering and practice pillar CRUD.
10. **Site Telemetry, Audit Logs & Alerts:** SiteConfig upsert, mutation audit logging, and webhook dispatch.

### Run ESLint
```bash
pnpm run lint
```
*Zero lint errors across all source files.*

### Run Next.js Production Build
```bash
pnpm run build
```
*Verifies 100% successful static page prerendering and server-rendered dynamic routes.*

---

## 7. Production Deployment Guidelines

### PostgreSQL Migration
To deploy against a managed PostgreSQL instance (e.g., Supabase, Neon, AWS RDS):
1. In `prisma/schema.prisma`, update the datasource:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
2. Update `DATABASE_URL` in your production environment:
   ```env
   DATABASE_URL="postgresql://user:password@host:5432/gerat_prod?schema=public"
   ```
3. Run schema migration:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Production Environment Checklist
- [ ] Set `JWT_SECRET` to a cryptographically secure 32+ character string.
- [ ] Set `NEXT_PUBLIC_APP_URL` to `https://gerat.et`.
- [ ] Configure `NOTIFICATION_WEBHOOK_URL` to receive live team alerts on Slack or Discord.
- [ ] Change default administrative passwords upon initial login via `/dashboard`.

---

## 8. License & Intellectual Property

Proprietary Software — © 2026 **Gerat Software Solutions PLC**. All rights reserved.  
Unauthorized distribution, reverse-engineering, or reproduction of this codebase is strictly prohibited.
