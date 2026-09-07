# Vercel Deployment Guide // Gerat Software Solutions PLC

A simple, step-by-step guide to deploy the Gerat website and administrative dashboard to Vercel.

---

## Prerequisites
- A [Vercel account](https://vercel.com) (free hobby or pro).
- Your repository pushed to GitHub, GitLab, or Bitbucket.

---

## Option 1: Fast Demo Deployment (2 Minutes, Zero Extra Setup)

To deploy the website and dashboard immediately:

### Step 1: Push Code to GitHub
Ensure all your latest changes are pushed:
```bash
git push origin main
```

### Step 2: Import into Vercel
1. Go to [vercel.com/new](https://vercel.com/new).
2. Select your repository: **`Gerat`** (or your repo name).
3. Framework Preset: **Next.js** (detected automatically).

### Step 3: Configure Build Command & Environment Variables
In the Vercel Project Settings before clicking Deploy:

1. **Build & Development Settings:**
   - **Build Command:** Toggle **OVERRIDE** and enter:
     ```bash
     prisma db push && node prisma/seed.mjs && prisma generate && next build
     ```
     *(This automatically provisions the SQLite database and seeds the 3 default admin accounts + portfolio + whitepapers on initial deployment).*

2. **Environment Variables:**
   Expand **Environment Variables** and add:
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `DATABASE_URL` | `"file:./dev.db"` | SQLite database file location |
   | `JWT_SECRET` | `generate-any-secure-random-string-min-32-chars` | Used to sign admin session tokens |
   | `NEXT_PUBLIC_APP_URL` | `https://your-project.vercel.app` | Base URL of your deployment |

3. Click **Deploy**.
4. In ~60 seconds, your site and dashboard will be live at `https://your-project.vercel.app`.

---

## Option 2: Production Deployment (Recommended for Persistent Data)

Because Vercel serverless functions run on ephemeral containers, any new client inquiries or articles created while using SQLite in Option 1 will reset whenever Vercel redeploys or spins down a container.

For real production where client leads, team members, and articles must persist permanently:

### Step 1: Create a Free Serverless PostgreSQL Database
Use any of these free, 1-click serverless Postgres providers:
- **Vercel Postgres / Neon** (Integrated directly in the Vercel dashboard under the **Storage** tab)
- **Supabase** ([supabase.com](https://supabase.com))
- **Railway** ([railway.app](https://railway.app))

Copy your PostgreSQL connection string (starts with `postgresql://...` or `postgres://...`).

### Step 2: Update `prisma/schema.prisma` for Postgres
In `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### Step 3: Configure Vercel Environment Variables
In your Vercel Project Settings under **Environment Variables**:
| Key | Value |
| :--- | :--- |
| `DATABASE_URL` | `postgres://user:password@ep-host.pooler.neon.tech/neondb?sslmode=require` |
| `JWT_SECRET` | `your-cryptographically-secure-random-32-character-secret` |
| `NEXT_PUBLIC_APP_URL` | `https://gerat.et` (or your domain) |

### Step 4: Deploy & Seed Production DB
Run the build command:
```bash
prisma db push && node prisma/seed.mjs && prisma generate && next build
```
Once deployed, all CRM inquiries, audit logs, articles, and team roster edits will persist permanently across all serverless regions.

---

## Accessing the Live Dashboard

1. Navigate to: `https://your-domain.vercel.app/dashboard/login`
2. Default seed accounts:
   - **Super Admin:** `admin@gerat.et` / `Admin@Gerat2026!`
   - **Operations Lead:** `operations@gerat.et` / `Operations@Gerat2026!`
   - **Lead Systems Architect:** `architect@gerat.et` / `Architect@Gerat2026!`
3. After logging in, immediately change your password in `/dashboard/settings`.
