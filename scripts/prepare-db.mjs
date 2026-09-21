import fs from "fs";
import path from "path";
import { execSync } from "child_process";

/**
 * Automatically detects whether DATABASE_URL is PostgreSQL or SQLite,
 * and sets the datasource provider in prisma/schema.prisma accordingly.
 * This guarantees seamless builds on Vercel, Render, and local development.
 */
const schemaPath = path.join(process.cwd(), "prisma", "schema.prisma");

if (fs.existsSync(schemaPath)) {
  let schema = fs.readFileSync(schemaPath, "utf8");
  const dbUrl = process.env.DATABASE_URL || "";

  const isPostgres =
    dbUrl.startsWith("postgres://") ||
    dbUrl.startsWith("postgresql://") ||
    dbUrl.includes("supabase.co") ||
    dbUrl.includes("neon.tech") ||
    dbUrl.includes("render.com");

  if (isPostgres) {
    if (!schema.includes('provider = "postgresql"')) {
      schema = schema.replace(/provider\s*=\s*"sqlite"/g, 'provider = "postgresql"');
      fs.writeFileSync(schemaPath, schema, "utf8");
      console.log("✓ Detected PostgreSQL DATABASE_URL. Set Prisma provider to 'postgresql'.");
    }

    // Auto-migrate & seed when deploying on Vercel or CI with PostgreSQL
    if (process.env.VERCEL || process.env.CI || process.env.AUTO_MIGRATE === "true") {
      try {
        console.log("⚡ Auto-migrating PostgreSQL schema and seeding initial datasets...");
        execSync("npx prisma db push --skip-generate --accept-data-loss", {
          stdio: "inherit",
          timeout: 45000,
        });
        execSync("node prisma/seed.mjs", {
          stdio: "inherit",
          timeout: 45000,
        });
        console.log("✓ PostgreSQL auto-migration and seeding completed successfully.");
      } catch (err) {
        console.warn("⚠️ Database auto-migration skipped or encountered an issue:", err.message);
      }
    }
  } else {
    if (!schema.includes('provider = "sqlite"')) {
      schema = schema.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
      fs.writeFileSync(schemaPath, schema, "utf8");
      console.log("✓ Set Prisma provider to 'sqlite'.");
    }

    // Auto-migrate & seed SQLite database for serverless bundle on Vercel / CI
    if (process.env.VERCEL || process.env.CI) {
      try {
        console.log("⚡ Auto-migrating SQLite schema and seeding initial datasets for deployment bundle...");
        execSync("npx prisma db push --skip-generate --accept-data-loss", {
          stdio: "inherit",
          timeout: 45000,
        });
        execSync("node prisma/seed.mjs", {
          stdio: "inherit",
          timeout: 45000,
        });
        console.log("✓ SQLite auto-migration and seeding completed successfully.");
      } catch (err) {
        console.warn("⚠️ SQLite auto-migration skipped or encountered an issue:", err.message);
      }
    }
  }
}
