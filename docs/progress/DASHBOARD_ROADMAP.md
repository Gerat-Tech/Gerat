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
| **Phase D-01** | Foundation & Auth | Database, ORM & RBAC | Prisma schema, SQLite/PostgreSQL, Auth session handler, `/dashboard/login` | ✅ COMPLETED |
| **Phase D-02** | Shell & UI System | Dashboard Command Center Shell | Sidebar, TopBar with `⌘K`, high-density tables, modal sheets, status chips | ✅ COMPLETED |
| **Phase D-03** | Client Intake & CRM | Lead Management & Client Comms | Real persistence for `ContactDrawer`, Kanban & Grid views, WhatsApp/Call/Email actions, internal team notes thread | ✅ COMPLETED |
| **Phase D-04** | Insights & News CMS | Whitepaper & Article Authoring | Split-screen Markdown/MDX editor, draft/published workflow, categories, dynamic `/insights` | ✅ COMPLETED |
| **Phase D-05** | Portfolio & Showcase CMS | Flagship Case Studies Management | Case study editor, metric highlights, tech badges, media gallery, dynamic `/portfolio` | ✅ COMPLETED |
| **Phase D-06** | Team & Services CMS | Leadership & Services Governance | Team roster editor, photo crop, practice pillars 01-06 editor, capabilities table manager | ⏳ PENDING |
| **Phase D-07** | Telemetry, Audit & Alerts | System Hardening & Integrations | Site config (ticker, coordinates), immutable audit log, Telegram/Email alert bot, smoke tests | ⏳ PENDING |

---

## Phase D-01 — Database Foundation, ORM & Authentication (RBAC) ✅ COMPLETED

**Goal:** Establish the database layer, relational models, seed data, and role-based access control protecting all administrative routes.

### Tasks
- [x] **Configure Database & Prisma ORM**
  - Initialize Prisma schema in `prisma/schema.prisma` matching `docs/Dashboard.md`
  - Configure environment variables (`DATABASE_URL`, `JWT_SECRET`)
  - Create database schema with all 10 relational models (`User`, `Inquiry`, `InquiryNote`, `InquiryCommunication`, `Article`, `CaseStudy`, `TeamMember`, `ServicePillar`, `SiteConfig`, `AuditLog`)
  - Create database seed script (`prisma/seed.mjs`) importing existing static content from `src/content/` (`portfolio.js`, `insights.js`, `team.js`, `services.js`, `site.js`) into relational records
- [x] **Implement Authentication & RBAC Engine**
  - Implement session management (`src/lib/auth.js`) using `jose` and `bcryptjs`
  - Configure Role-Based Access Control:
    - `SUPER_ADMIN`
    - `OPERATIONS_LEAD`
    - `TECHNICAL_EDITOR`
    - `CREATIVE_EDITOR`
    - `VIEWER`
  - Implement Next.js App Router middleware (`src/middleware.js`) protecting all routes under `/dashboard/*`
- [x] **Build Minimalist Auth Screen (`src/app/dashboard/login/page.jsx`)**
  - Dark terminal aesthetic (`#080808` canvas, `#141414` surface)
  - Azeret Mono typography, Gerat monogram emblem, high-contrast inputs
  - Suspense-wrapped `LoginForm` with development role presets and error handling
- [x] **Automated Smoke Test Verification (`tests/smoke/dashboard-auth-smoke.test.mjs`)**
  - Verified database connectivity, administrative users, password hashing, JWT signing, RBAC logic, and seeded content records (5/5 suites passing)

---

## Phase D-02 — Dashboard Design System & Layout Shell ✅ COMPLETED

**Goal:** Build a keyboard-first, high-density, dark monolithic command center shell for desktop, tablet, and mobile.

### Tasks
- [x] **Construct Master Dashboard Shell (`src/app/dashboard/layout.jsx`)**
  - Collapsible persistent left sidebar with live telemetry indicator (`SYS // ONLINE`)
  - Navigation links with badge counters (Unread Inquiries, Draft Articles)
  - Top header with Command Palette trigger (`⌘K`), quick-action dropdown (`+ New Article`, `+ New Case Study`), and user profile pill
  - Responsive mobile bottom bar / drawer for founders on smartphones
- [x] **Build Command Palette (`⌘K` Modal)**
  - Fast keyboard search across all leads, articles, case studies, and team members
  - Instant navigation shortcuts (`G I` for Inquiries, `G A` for Articles, `G P` for Portfolio)
- [x] **Create Dashboard UI Primitives (`src/components/dashboard/common/`)**
  - `StatusBadge`: Color-coded telemetry chips (Orange for New, Emerald for Commissioned, Zinc for Archived, Cyan for Active)
  - High-density dark cards and telemetry stat tickers
  - Real-time logout, session indicator, and responsive navigation

---

## Phase D-03 — Client Intake & CRM Pipeline (Inquiry to Engagement) ✅ COMPLETED

**Goal:** Connect the website's `ContactDrawer` to real database persistence and provide an elite lead management and client communication cockpit.

### Tasks
- [x] **Connect Contact Drawer to Persistence API (`/api/intake`)**
  - Connected `ContactDrawer.jsx` to `POST /api/intake` Route Handler
  - Validates schema (Name, Email, Phone, Discipline, Budget, Timeline, Project Brief, Dynamic answers)
  - Generates deterministic telemetry code (`GRT-ENG-YYYYMM-XXXXXX` or `GRT-BRD-YYYYMM-XXXXXX`)
  - Records client IP, country code, and referral source
- [x] **Build Inquiries Master Pipeline (`src/app/dashboard/inquiries/page.jsx`)**
  - **Kanban Board View:** Move cards between stages (`NEW_INTAKE`, `TRIAGED`, `DISCOVERY_SCHEDULED`, `PROPOSAL_SENT`, `IN_NEGOTIATION`, `COMMISSIONED`, `ARCHIVED`) with direct API sync
  - **Data Grid View:** High-density table with multi-criteria filtering (search by name, company, code, email, and discipline)
  - Quick action direct triggers: 1-click WhatsApp, direct phone call, and lead dossier link
- [x] **Build Lead Dossier & Communications Center (`src/app/dashboard/inquiries/[id]/page.jsx`)**
  - Full client profile, project brief, budget badge, and conditional questionnaire inspector
  - **1-Click WhatsApp Trigger:** Direct link with pre-formatted formal greeting referencing client name and telemetry code
  - **1-Click Phone Call:** `tel:` trigger for instant mobile dialing
  - **Integrated Email Composer:** Workspace with 4 pre-configured architectural response templates:
    - *Discovery Architecture Consultation Invite*
    - *Brand & Identity Scoping Questionnaire*
    - *Non-Disclosure Agreement (NDA) & Scope Review*
    - *Capacity & Timeline Clarification*
    - One-click "Launch in Mail Client" and "Copy to Clipboard" with auto-populated parameters
  - **Internal Team Activity Thread & CRM Touchpoints:**
    - Log private notes with pinned-to-top option
    - Log client touchpoints across channels (WhatsApp, Phone Call, Email, Zoom, Meeting)
    - Reassign lead to specific architect or director
    - Real-time stage advancement and priority updating
- [x] **Automated Smoke Test Verification (`tests/smoke/crm-intake-smoke.test.mjs`)**
  - Verified UI component modules, inquiry intake creation, status updating, note creation, communication touchpoint recording, and relational aggregation (6/6 test suites passing)

---

## Phase D-04 — Research & Insights CMS (Technical Whitepapers & News) ✅ COMPLETED

**Goal:** Provide an editorial publishing suite for technical publications, whitepapers, and studio announcements.

### Tasks
- [x] **Build Articles Listing (`src/app/dashboard/insights/page.jsx`)**
  - Tabbed filters: `ALL`, `PUBLISHED`, `DRAFT`, `IN_REVIEW`, `ARCHIVED`
  - Category selector, real-time search by title, abstract, and author
  - High-density Grid and Table view modes with thumbnail previews
  - Quick action toggles: one-click publish/unpublish, delete with confirmation, direct link to live article
- [x] **Build Split-Screen Markdown / Rich Editor (`src/app/dashboard/insights/[id]/page.jsx` & `/new`)**
  - Raw markdown editor with live formatting toolbar (H1, H2, H3, bold, italic, code block, quote, bullet list, horizontal divider)
  - Real-time rendered live preview matching `/insights` typography and dark styling
  - Word count and automated reading time calculator (`MIN READ`)
  - Metadata & taxonomy inspector:
    - Title, Subtitle / Executive Abstract
    - URL slug with lock/auto-sync from title
    - Author selector linked to team members / users
    - Category & tags input
    - Cover image URL and featured toggle
- [x] **Wire Public `/insights` Page & Reader to Dynamic Database Content**
  - Public reader route (`src/app/insights/[slug]/page.jsx`) rendering full markdown blueprints with zero build overhead
  - SEO dynamic metadata generation (`generateMetadata`)
  - Technical specification sticky sidebar and related whitepapers strip
  - Updated `LatestNews.jsx` with dynamic database loading and static content fallback
- [x] **Automated Smoke Test Verification (`tests/smoke/articles-cms-smoke.test.mjs`)**
  - Verified component modules, article lifecycle transitions (`DRAFT` → `PUBLISHED`), slug lookups, relational author queries, and cleanup (7/7 test suites passing)

---

## Phase D-05 — Flagship Portfolio & Product Showcase CMS ✅ COMPLETED

**Goal:** Enable full editorial control over case studies displayed on the homepage and `/portfolio`.

### Tasks
- [x] **Build Portfolio Case Study Manager (`src/app/dashboard/portfolio/page.jsx`)**
  - High-density Grid and Table views of all case studies with live thumbnails and telemetry badges
  - Quick filter tabs: `ALL`, `HOMEPAGE FEATURED`, `ENTERPRISE ERP`, `BRAND & IDENTITY`
  - Search by title, client tags, summary, tech stack, and primary metric
  - Quick action controls: one-click "FEATURE ON HOMEPAGE" toggle, delete with confirmation, and direct link to public showcase anchor
  - Top action: "+ NEW CASE STUDY" composer link
- [x] **Build Case Study Editor (`src/app/dashboard/portfolio/[id]/page.jsx` & `/new`)**
  - Display Index, counter badge (`01 / 09`), and sort order rank
  - Title, URL slug with lock/auto-sync, category selector (`ENTERPRISE ERP`, `BRAND & IDENTITY`, `PUBLIC SECTOR`, `AI & RAG NETWORKS`, etc.), secondary discipline line
  - Primary headline metric chip (e.g. `12M+ RECORDS // SUB-SECOND VERIFICATION`) and detailed banner metric
  - Executive summary, problem topology, engineered architecture, and verifiable impact
  - Inline tech stack string and stack badges list (`Go, Kafka, PostgreSQL, Docker`)
  - Image URL, release year, status selector, and homepage featured toggle
  - **Live Real-Time Card Preview:** Exact rendering of the showcase card with precision corner accents, metric badge, problem vs. architecture tabs, and tech chips
- [x] **Wire Public `/portfolio` and Home Showcase to Dynamic Database Records**
  - Updated `src/app/portfolio/components/PortfolioShowcase.jsx` to dynamically load case studies from `/api/portfolio` with static dataset fallback
  - Updated `src/components/home/OurPortfolio.jsx` to dynamically load featured showcase projects from `/api/portfolio?featured=true`
- [x] **Automated Smoke Test Verification (`tests/smoke/portfolio-cms-smoke.test.mjs`)**
  - Verified component modules, case study creation, featured toggle updates, slug resolution, and database record cleanup (8/8 test suites passing)
  - Ensure filters (`ALL`, `BRAND & IDENTITY`, `PERSONAL BRAND`, etc.) work seamlessly with database records

---

## Phase D-06 — Team & Services Matrix CMS ✅ COMPLETED

**Goal:** Manage company leadership, practitioners, practice pillars, and capabilities matrices from the dashboard.

### Tasks
- [x] **Build Team & Leadership Manager (`src/app/dashboard/team/page.jsx`)**
  - Roster grid & table views: Executive Leadership, Engineering Practitioners, Creative & Brand Directors, Advisors
  - Profile editor (`src/app/dashboard/team/[id]/page.jsx` & `/new`): Name, official title, cadre division, discipline focus tag, architectural bio, social links (LinkedIn, GitHub, X)
  - Active status toggle (`ACTIVE` / `HIDDEN`), display order rank, and delete action
  - **Live Real-Time Card Preview:** Exact rendering of the leadership/specialist card with 4:5 aspect portrait, hover grayscale transitions, and discipline tags
- [x] **Build Services & Practice Pillars Editor (`src/app/dashboard/services/page.jsx`)**
  - Editor for practice pillars `01` through `06` (`src/app/dashboard/services/[id]/page.jsx` & `/new`): Index number, title, tagline, description, multi-line deliverables parser, deep specification link, order, and active toggle
  - Services dashboard client view (`ServicesClientView.jsx`) with live search, status filter tabs (`ALL`, `ACTIVE`, `HIDDEN`), one-click activation toggle, and deletion
  - **Live Real-Time Deck Preview:** Exact architectural deck card with precision corner accents, practice index badge, and formatted deliverables checklist
- [x] **Wire Public `/team` and `/why-wqf` to Dynamic Records**
  - Updated `TeamLeadership.jsx` to load executive cadre dynamically from `/api/team?division=EXECUTIVE_LEADERSHIP&active=true` with fallback to static content
  - Updated `AdvisorAndTeam.jsx` to load engineering practitioners from `/api/team?active=true` with fallback to static content
  - Updated `ServicesOverview.jsx` (at `/why-wqf`) to load practice pillars dynamically from `/api/services?active=true` with fallback to static content
- [x] **Automated Smoke Test Verification (`tests/smoke/team-services-cms-smoke.test.mjs`)**
  - Verified component modules and route files
  - Verified `TeamMember` model CRUD (create, update active status, role title, division queries, cleanup)
  - Verified `ServicePillar` model CRUD (create, update active status, tagline, deliverables, cleanup)
  - All 9 smoke test suites passing seamlessly (0.71s runtime)

---

## Phase D-07 — Site Telemetry, Audit Logs, Real-Time Alerts & Smoke Tests ✅ COMPLETED

**Goal:** Centralize site configuration, record all team actions, set up instant lead notifications, and implement automated smoke tests.

### Tasks
- [x] **Build Global Site Configuration Console (`src/app/dashboard/settings/page.jsx` & `/site-config`)**
  - Marquee ticker token manager (add new tokens, live count, remove tokens, dynamic public `Marquee.jsx` rendering)
  - Official contact coordinates (switchboard phone, emergency hotline, office address, GPS coordinates)
  - Global announcement banner toggle (live broadcast text and URL route)
- [x] **Build Immutable Audit Log Viewer (`src/app/dashboard/settings/audit-log/page.jsx`)**
  - Chronological timeline of every system mutation: Actor, Action, Entity Type, Entity ID, and expandable JSON diff inspector
  - Real-time entity filters (`INQUIRY`, `ARTICLE`, `CASE_STUDY`, `TEAM_MEMBER`, `SERVICE_PILLAR`, `SITE_CONFIG`) and text search
- [x] **Implement Instant Notification Webhook Pipeline (`src/lib/notifications.js`)**
  - Real-time lead alert dispatch for Slack, Discord, Telegram, or custom webhooks
  - Formatted alert: Lead Name, Company, Discipline, Budget Tier, Phone/Email, Brief, and Direct Dashboard Link
  - Integrated directly into public `/api/intake` handler
  - Webhook test ping utility (`/api/settings/test-notification`) with instant UI feedback badge
- [x] **Automated Smoke Test Suite Expansion (`tests/smoke/site-telemetry-smoke.test.mjs`)**
  - Verified `SiteConfig` upsert, lookup, and cleanup
  - Verified `AuditLog` mutation recording and relational actor resolution
  - Verified `dispatchNewLeadAlert` execution and webhook URL validation
  - Verified 100% build and lint pass (10/10 smoke test suites passing in 0.70s)

---

## Guiding Operational Principles

1. **Brand Aesthetic Parity:** The dashboard is an extension of Gerat's engineering identity. Never compromise on typographical density, high contrast, or dark monolithic elegance.
2. **Speed Over Ceremony:** Every common action (calling a lead, copying a telemetry code, saving a draft) must be achievable in 1 click or a keyboard shortcut.
3. **Graceful Fallbacks:** The public website must gracefully fall back to static seed data if database connections experience latency, ensuring 100% uptime for public visitors.
4. **Zero Uncommitted Phases:** Each phase will be comprehensively tested, verified with automated smoke tests, and committed independently.
