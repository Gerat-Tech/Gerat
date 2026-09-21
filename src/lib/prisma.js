import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

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

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
