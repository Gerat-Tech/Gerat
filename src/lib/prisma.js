import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

/**
 * Optimizes the PostgreSQL database URL for serverless environments (Vercel / AWS Lambda).
 * Supabase Supavisor limits session mode (port 5432) to pool_size: 15, which causes
 * "FATAL: (EMAXCONNSESSION) max clients reached in session mode".
 * In serverless environments, we automatically route through the Transaction Mode pooler (port 6543)
 * with pgbouncer=true and connection_limit=1, supporting thousands of concurrent operations.
 */
function getOptimizedDatabaseUrl() {
  let url = process.env.DATABASE_URL || "";
  if (!url) return url;

  // 1. Supabase Supavisor Session Mode Auto-Correction:
  if (url.includes(".pooler.supabase.com:5432")) {
    url = url.replace(".pooler.supabase.com:5432", ".pooler.supabase.com:6543");
  }

  if (url.includes("pool_mode=session")) {
    url = url.replace("pool_mode=session", "pool_mode=transaction");
  }

  // 2. Serverless Connection Pooling parameters:
  const isPostgres = url.startsWith("postgres://") || url.startsWith("postgresql://");
  const isPooler =
    url.includes(":6543") ||
    url.includes("pooler.supabase.com") ||
    url.includes("pgbouncer=true") ||
    url.includes("pooler.neon.tech");

  if (isPostgres && isPooler) {
    if (!url.includes("pgbouncer=true")) {
      url += (url.includes("?") ? "&" : "?") + "pgbouncer=true";
    }
    if (!url.includes("connection_limit=")) {
      url += (url.includes("?") ? "&" : "?") + "connection_limit=1";
    }
  } else if (isPostgres && (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME)) {
    if (!url.includes("connection_limit=")) {
      url += (url.includes("?") ? "&" : "?") + "connection_limit=1";
    }
  }

  return url;
}

// In Vercel / AWS Lambda serverless environments, the root filesystem (/var/task) is strictly read-only.
// When using SQLite, we copy the database to /tmp so that read & write transactions succeed.
const dbUrl = process.env.DATABASE_URL || "";
const isFileDb = !dbUrl || dbUrl.startsWith("file:");

if (isFileDb) {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDbPath = "/tmp/dev.db";
    if (!fs.existsSync(/*turbopackIgnore: true*/ tmpDbPath)) {
      const candidates = [
        path.join(process.cwd(), "prisma", "dev.db"),
        path.join(process.cwd(), "dev.db"),
        "/var/task/prisma/dev.db",
        "/var/task/dev.db",
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(/*turbopackIgnore: true*/ candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDbPath);
            break;
          } catch {}
        }
      }
    }
    process.env.DATABASE_URL = `file:${tmpDbPath}`;
  } else if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = "file:./dev.db";
  }
}

const optimizedUrl = isFileDb ? process.env.DATABASE_URL : getOptimizedDatabaseUrl();
if (optimizedUrl && optimizedUrl !== process.env.DATABASE_URL) {
  process.env.DATABASE_URL = optimizedUrl;
}

const globalForPrisma = globalThis;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: optimizedUrl
      ? {
          db: {
            url: optimizedUrl,
          },
        }
      : undefined,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

// Always maintain singleton across warm serverless container invocations
globalForPrisma.prisma = prisma;

export default prisma;
