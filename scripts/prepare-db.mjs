import fs from "fs";
import path from "path";

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
  } else {
    if (!schema.includes('provider = "sqlite"')) {
      schema = schema.replace(/provider\s*=\s*"postgresql"/g, 'provider = "sqlite"');
      fs.writeFileSync(schemaPath, schema, "utf8");
      console.log("✓ Set Prisma provider to 'sqlite'.");
    }
  }
}
