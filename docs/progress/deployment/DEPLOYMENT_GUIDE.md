# Production Deployment Guide // Gerat Software Solutions PLC

A simple, complete guide to deploying the Gerat platform and Mission Control Dashboard to **Vercel** and **Render**, with zero headaches and automated database configuration.

---

## ⚡ Key Feature: Zero-Config Auto Database Detection
This repository includes an automatic database adapter (`scripts/prepare-db.mjs`).
- When `DATABASE_URL` is a PostgreSQL connection string (`postgresql://...` or `postgres://...` from Neon, Supabase, or Render), the build system automatically configures Prisma for **PostgreSQL**.
- When `DATABASE_URL` is a SQLite path or empty, it uses **SQLite**.
- **You do NOT need to manually edit `prisma/schema.prisma`!**

---

## Part 1: Deploying to Vercel (Frontend & Serverless API)

Vercel is optimal for high-speed edge delivery and serverless Next.js hosting.

> **Important note on databases in Vercel:**  
> Vercel runs on ephemeral serverless lambdas. To ensure inquiries, articles, team rosters, and audit logs persist permanently across redeployments, connect a serverless PostgreSQL database (such as **Neon**, **Supabase**, or **Vercel Postgres**).

### Step 1: Provision a Free Postgres Database
1. Go to [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com) (both offer 1-click free cloud Postgres).
2. Create a project (e.g., `gerat-prod`).
3. Copy the connection string. It looks like:
   `postgresql://username:password@ep-host.pooler.neon.tech/neondb?sslmode=require`

### Step 2: Push Your Code to GitHub
```bash
git push origin main
```

### Step 3: Import Project in Vercel
1. Go to [vercel.com/new](https://vercel.com/new) and select the `Gerat` repository.
2. Framework Preset: **Next.js** (detected automatically).
3. Under **Build and Output Settings**, keep defaults:
   - Build Command: `pnpm run build` (or leave default, as package.json handles preparation and prisma generation).

### Step 4: Add Environment Variables in Vercel
Expand **Environment Variables** and add:
| Key | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://...` | Your Neon, Supabase, or Vercel Postgres connection string |
| `JWT_SECRET` | `generate-a-secure-random-string-at-least-32-chars` | Signs admin authentication tokens |
| `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` | Base URL of your deployment |

### Step 5: Initial Database Push & Seed
Before or right after your first deployment, push the schema and seed initial accounts:
From your local terminal:
```bash
DATABASE_URL="your_remote_postgres_url" pnpm run db:setup
```
*Or* in Vercel, set the one-time **Build Command** override to:
```bash
node scripts/prepare-db.mjs && prisma db push && node prisma/seed.mjs && prisma generate && next build
```
*(After the first build succeeds, toggle override off so subsequent builds run standard `pnpm run build`).*

---

## Part 2: Deploying to Render (Full-Stack Web Service + Managed PostgreSQL)

Render provides persistent containers and managed PostgreSQL in one dashboard.

### Step 1: Create a PostgreSQL Database on Render
1. Log in to [dashboard.render.com](https://dashboard.render.com).
2. Click **New +** → **PostgreSQL**.
3. Set:
   - **Name:** `gerat-db`
   - **Database:** `gerat`
   - **User:** `gerat_admin`
   - **Region:** Choose closest region (e.g., Frankfurt or Oregon).
   - **Plan:** Free or Starter.
4. Click **Create Database**.
5. Once created, copy the **Internal Database URL** (e.g. `postgres://gerat_admin:...@dpg-...-a/gerat`).  
   *(The internal URL provides faster, private, zero-latency communication).*

### Step 2: Create a Web Service on Render
1. Click **New +** → **Web Service**.
2. Select your repository: **`Gerat`**.
3. Configure the service:
   - **Name:** `gerat-web`
   - **Language:** `Node`
   - **Branch:** `main`
   - **Region:** Same region as your database.
   - **Build Command:**
     ```bash
     pnpm install && pnpm run build
     ```
   - **Start Command:**
     ```bash
     pnpm run start
     ```
   - **Instance Type:** Free or Starter.

### Step 3: Add Environment Variables in Render
Scroll to **Environment Variables** and add:
| Key | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | *Paste Render Internal Database URL* | Direct private link to Postgres |
| `JWT_SECRET` | `generate-a-secure-random-string-at-least-32-chars` | Secret key for auth |
| `NODE_ENV` | `production` | Optimizes Next.js runtime |
| `PORT` | `3000` | Port Next.js listens on |

Click **Create Web Service**.

### Step 4: Seed Database on Render
Once the deployment finishes building:
1. Go to your Web Service in Render → click the **Shell** tab on the left.
2. Run:
   ```bash
   pnpm run db:setup
   ```
3. This creates all tables and seeds the default admin users, case studies, pillars, and articles.

---

## Default Dashboard Login Credentials

Once deployed on either Vercel or Render:

Navigate to: `https://your-deployment-url/dashboard/login`

| Role | Email | Password | Allowed Access |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@gerat.et` | `Admin@Gerat2026!` | All modules, Team management, User roles, System Settings |
| **Operations Lead** | `operations@gerat.et` | `Operations@Gerat2026!` | Inquiries CRM, Lead status, Client communications |
| **Technical Lead** | `architect@gerat.et` | `Architect@Gerat2026!` | Insights / Research CMS, Technical whitepapers |

> **Security Note:** Log in immediately upon first deployment and change passwords under `/dashboard/settings`.
