# GERAT SOFTWARE SOLUTIONS PLC // DASHBOARD & OPERATIONS ROADMAP
> **Document Version:** 1.0.0  
> **Target Production URL:** [https://gerat.et/dashboard](https://gerat.et/dashboard)  
> **Master Spec Reference:** [`docs/Dashboard.md`](../Dashboard.md)  
> **Created:** 2026-09-06  
> **System Scope:** Operations Command Center, CRM Lead Intake & Communications, Dynamic CMS (Insights, Portfolio, Team, Services), RBAC Security & Site Telemetry

---

## 1. System Architecture & Context

The Gerat website has established an architectural, dark-mode digital identity. The next evolution transitions the platform from static hardcoded JSON files to an integrated **Operations & CMS Command Center** (`GERAT MISSION CONTROL`).

```
┌────────────────────────────────────────────────────────────────────────┐
│                          SYSTEM ARCHITECTURE                           │
├────────────────────────────────────────────────────────────────────────┤
│  PUBLIC FACING SITES               OPERATIONS CONSOLE (/dashboard)     │
│  ├── / (Home & Capabilities)       ├── /dashboard/inquiries (CRM)      │
│  ├── /why-wqf (Services)           ├── /dashboard/insights (CMS)       │
│  ├── /portfolio (Case Studies)     ├── /dashboard/portfolio (CMS)      │
│  ├── /services/* (Brand/Personal)  ├── /dashboard/team (CMS)           │
│  ├── /team (Leadership Directory)  ├── /dashboard/services (CMS)       │
│  └── /insights (Whitepapers)       └── /dashboard/settings (Config)    │
│            ▲                                     ▲                     │
│            └─────────────────┬───────────────────┘                     │
│                              ▼                                         │
│               NEXT.JS 16 APP ROUTER & SERVER ACTIONS                   │
│                              ▼                                         │
│                 PRISMA ORM / POSTGRESQL DATABASE                       │
│    (Inquiries, Notes, Articles, Projects, Team, Config, Audit Logs)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Phase Execution Matrix

| Phase | Designation | Primary Objective | Key Deliverables | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Phase D-01** | Foundation & Auth | Database, ORM & RBAC | Prisma schema, PostgreSQL setup, Auth session handler, `/dashboard/login` | ⏳ PENDING |
| **Phase D-02** | Shell & UI System | Dashboard Command Center Shell | Sidebar, TopBar with `⌘K`, high-density tables, modal sheets, status chips | ⏳ PENDING |
| **Phase D-03** | Client Intake & CRM | Lead Management & Client Comms | Real persistence for `ContactDrawer`, Kanban & Grid views, WhatsApp/Call/Email actions, internal team notes thread | ⏳ PENDING |
| **Phase D-04** | Insights & News CMS | Whitepaper & Article Authoring | Split-screen Markdown/MDX editor, draft/published workflow, categories, dynamic `/insights` | ⏳ PENDING |
| **Phase D-05** | Portfolio & Showcase CMS | Flagship Case Studies Management | Case study editor, metric highlights, tech badges, media gallery, dynamic `/portfolio` | ⏳ PENDING |
| **Phase D-06** | Team & Services CMS | Leadership & Services Governance | Team roster editor, photo crop, practice pillars 01-06 editor, capabilities table manager | ⏳ PENDING |
| **Phase D-07** | Telemetry, Audit & Alerts | System Hardening & Integrations | Site config (ticker, coordinates), immutable audit log, Telegram/Email alert bot, smoke tests | ⏳ PENDING |

---

## Phase D-01 — Database Foundation, ORM & Authentication (RBAC)

**Goal:** Establish the database layer, relational models, seed data, and role-based access control protecting all administrative routes.

### Tasks
- [ ] **Configure Database & Prisma ORM**
  - Initialize Prisma schema in `prisma/schema.prisma` matching `docs/Dashboard.md`
  - Configure environment variables (`DATABASE_URL`, `NEXTAUTH_SECRET`)
  - Create initial migration for:
    - `User`, `Inquiry`, `InquiryNote`, `InquiryCommunication`
    - `Article`, `CaseStudy`, `TeamMember`, `ServicePillar`, `SiteConfig`, `AuditLog`
  - Create database seed script (`prisma/seed.js`) importing existing static content from `src/content/` (`portfolio.js`, `insights.js`, `team.js`, `services.js`, `site.js`) into relational records
- [ ] **Implement Authentication & RBAC Engine**
  - Implement session management (NextAuth / JWT / Edge cookie session)
  - Configure Role-Based Access Control:
    - `SUPER_ADMIN`
    - `OPERATIONS_LEAD`
    - `TECHNICAL_EDITOR`
    - `CREATIVE_EDITOR`
    - `VIEWER`
  - Implement Next.js App Router middleware protecting all routes under `/dashboard/*`
- [ ] **Build Minimalist Auth Screen (`src/app/(dashboard)/login/page.jsx`)**
  - Dark terminal aesthetic (`#080808` canvas, `#141414` surface)
  - Azeret Mono typography, Gerat monogram emblem, high-contrast inputs
  - Error toast feedback, session redirect handling

---

## Phase D-02 — Dashboard Design System & Layout Shell

**Goal:** Build a keyboard-first, high-density, dark monolithic command center shell for desktop, tablet, and mobile.

### Tasks
- [ ] **Construct Master Dashboard Shell (`src/app/(dashboard)/layout.jsx`)**
  - Collapsible persistent left sidebar with live telemetry indicator (`SYS // ONLINE`)
  - Navigation links with badge counters (Unread Inquiries, Draft Articles)
  - Top header with Command Palette trigger (`⌘K`), quick-action dropdown (`+ New Article`, `+ New Case Study`), and user profile pill
  - Responsive mobile bottom bar / drawer for founders on smartphones
- [ ] **Build Command Palette (`⌘K` Modal)**
  - Fast keyboard search across all leads, articles, case studies, and team members
  - Instant navigation shortcuts (`G I` for Inquiries, `G A` for Articles, `G P` for Portfolio)
- [ ] **Create Dashboard UI Primitives (`src/components/dashboard/common/`)**
  - `DataTable`: Sortable columns, search input, status filters, row click handlers, pagination
  - `StatusBadge`: Color-coded telemetry chips (Orange for New, Emerald for Commissioned, Zinc for Archived)
  - `ModalSheet`: Right-sliding inspector sheet with dark backdrop blur
  - `StatCard`: KPI metric cards with micro trend graphs
  - `ToastNotification`: Corner alert feedback for mutations

---

## Phase D-03 — Client Intake & CRM Pipeline (Inquiry to Engagement)

**Goal:** Connect the website's `ContactDrawer` to real database persistence and provide an elite lead management and client communication cockpit.

### Tasks
- [ ] **Connect Contact Drawer to Persistence API (`/api/intake`)**
  - Replace simulated telemetry in `ContactDrawer.jsx` with a real `POST /api/intake` Server Action / Route Handler
  - Validate schema (Name, Email, Phone, Discipline, Budget, Timeline, Project Brief, Dynamic answers)
  - Generate deterministic telemetry code (`GRT-ENG-YYYYMM-XXXXXX` or `GRT-BRD-YYYYMM-XXXXXX`)
  - Auto-record client IP, country code, and referral source
- [ ] **Build Inquiries Master Pipeline (`src/app/(dashboard)/inquiries/page.jsx`)**
  - **Kanban Board View:** Drag/click cards between stages (`NEW_INTAKE`, `TRIAGED`, `DISCOVERY_SCHEDULED`, `PROPOSAL_SENT`, `IN_NEGOTIATION`, `COMMISSIONED`, `ARCHIVED`)
  - **Data Grid View:** High-density table with multi-criteria filtering (by budget tier, delivery urgency, discipline, and assigned architect)
  - Batch action capabilities (Export to CSV, batch archive, batch reassign)
- [ ] **Build Lead Dossier & Communications Center (`src/app/(dashboard)/inquiries/[id]/page.jsx`)**
  - Full client profile, project brief, budget badge, and conditional questionnaire inspector
  - **1-Click WhatsApp Trigger:** Direct link with pre-formatted formal greeting referencing client name and telemetry code
  - **1-Click Phone Call:** `tel:` trigger for instant mobile dialing
  - **Integrated Email Composer:** Modal with 4 pre-configured architectural response templates:
    - *Template A:* Discovery Architecture Consultation Invite
    - *Template B:* Brand & Identity Scoping Questionnaire
    - *Template C:* Non-Disclosure Agreement (NDA) & Scope Review
    - *Template D:* Capacity & Timeline Clarification
  - **Internal Team Activity Thread:**
    - Add private notes between team members (`@mentions`)
    - Log client call summaries and meeting outcomes
    - Reassign lead to specific architect or director

---

## Phase D-04 — Research & Insights CMS (Technical Whitepapers & News)

**Goal:** Provide an editorial publishing suite for technical publications, whitepapers, and studio announcements.

### Tasks
- [ ] **Build Articles Listing (`src/app/(dashboard)/insights/page.jsx`)**
  - Tabbed filters: `ALL`, `PUBLISHED`, `DRAFT`, `IN_REVIEW`, `SCHEDULED`
  - Article cards with author avatar, category chip, reading time, and quick status toggles
- [ ] **Build Split-Screen Markdown / Rich Editor (`src/app/(dashboard)/insights/[id]/page.jsx`)**
  - Left pane: Markdown / MDX editor with formatting shortcuts (headers, code fences, KaTeX math blocks, alerts)
  - Right pane: Real-time rendered live preview matching `/insights` typography and styling
  - Metadata Inspector drawer:
    - Title, URL slug (auto-slugifier with manual override)
    - Author selector (linked to Team Member records)
    - Category & tags input
    - Reading time auto-calculator
    - Cover image upload / media picker
    - SEO Meta description & OpenGraph preview
- [ ] **Wire Public `/insights` Page to Dynamic Database Content**
  - Fallback to static seed data if database is disconnected
  - Dynamic route `/insights/[slug]` rendering full article markdown with zero build overhead

---

## Phase D-05 — Flagship Portfolio & Product Showcase CMS

**Goal:** Enable full editorial control over case studies displayed on the homepage and `/portfolio`.

### Tasks
- [ ] **Build Portfolio Case Study Manager (`src/app/(dashboard)/portfolio/page.jsx`)**
  - Table and card views of all 9+ case studies
  - Reordering system to adjust display index (`01`, `02`, etc.) and homepage featured flags
- [ ] **Build Case Study Editor (`src/app/(dashboard)/portfolio/[id]/page.jsx`)**
  - Form fields matching `portfolioProjects`:
    - Title, client name, category selector (`ENTERPRISE ERP`, `BRAND & IDENTITY`, etc.)
    - Headline impact metric (e.g. `12M+ RECORDS // SUB-SECOND VERIFICATION`)
    - Operational Problem / Challenge statement
    - Engineered / Strategic Resolution statement
    - Tech Stack / Deliverables tags manager (add/remove badges)
    - Primary media image upload + gallery carousel manager
    - Operational status selector (`PRODUCTION // ACTIVE`, `DEPLOYED // STABLE`, `LIVE // EXPANDING`)
- [ ] **Wire Public `/portfolio` and Home Showcase to Dynamic Records**
  - Ensure filters (`ALL`, `BRAND & IDENTITY`, `PERSONAL BRAND`, etc.) work seamlessly with database records

---

## Phase D-06 — Team & Services Matrix CMS

**Goal:** Manage company leadership, practitioners, practice pillars, and capabilities matrices from the dashboard.

### Tasks
- [ ] **Build Team & Leadership Manager (`src/app/(dashboard)/team/page.jsx`)**
  - Roster grid: Executive Directors vs Engineering Practitioners vs Creative Directors
  - Profile modal/editor: Name, official title, focus tagline, architectural bio, credentials, social links
  - Photo uploader with aspect-ratio crop (4:5) and grayscale optimization
- [ ] **Build Services & Practice Pillars Editor (`src/app/(dashboard)/services/page.jsx`)**
  - Editor for practice pillars `01` through `06` (Title, tagline, description, deliverables list, deep link)
  - Capabilities table row manager (8-row capabilities on home page)
  - Creative service packages editor (Scope, timeline, starting investment)
- [ ] **Wire Public `/team` and `/why-wqf` to Dynamic Records**

---

## Phase D-07 — Site Telemetry, Audit Logs, Real-Time Alerts & Smoke Tests

**Goal:** Centralize site configuration, record all team actions, set up instant lead notifications, and implement automated smoke tests.

### Tasks
- [ ] **Build Global Site Configuration Console (`src/app/(dashboard)/settings/site-config/page.jsx`)**
  - Marquee ticker token manager (add, reorder, toggle live tokens)
  - Technology partner logo manager
  - Official contact coordinates (phone, emergency hotline, office address, GPS coordinates)
  - Global announcement banner toggle
- [ ] **Build Immutable Audit Log Viewer (`src/app/(dashboard)/settings/audit-log/page.jsx`)**
  - Chronological timeline of every system mutation: Actor, Action, Entity Type, Entity ID, and JSON diff payload
- [ ] **Implement Instant Notification Webhook**
  - Instant Telegram Bot / WhatsApp Business / Email notification to founders when a new lead is submitted
  - Formatted alert: Lead Name, Company, Discipline, Budget Tier, and Direct Dashboard Link
- [ ] **Automated Smoke Test Suite Expansion (`tests/smoke/`)**
  - Test `/dashboard` authentication redirects
  - Test `/api/intake` telemetry generation and database persistence
  - Test CRUD operations on Inquiries, Articles, and Case Studies
  - Verify 100% build and lint pass

---

## Guiding Operational Principles

1. **Brand Aesthetic Parity:** The dashboard is an extension of Gerat's engineering identity. Never compromise on typographical density, high contrast, or dark monolithic elegance.
2. **Speed Over Ceremony:** Every common action (calling a lead, copying a telemetry code, saving a draft) must be achievable in 1 click or a keyboard shortcut.
3. **Graceful Fallbacks:** The public website must gracefully fall back to static seed data if database connections experience latency, ensuring 100% uptime for public visitors.
4. **Zero Uncommitted Phases:** Each phase will be comprehensively tested, verified with automated smoke tests, and committed independently.
