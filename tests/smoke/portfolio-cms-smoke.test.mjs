import assert from "assert";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function runPortfolioCmsSmokeTests() {
  console.log("▶ Testing Flagship Portfolio & Showcase CMS (Phase D-05)...");

  // 1. Verify UI and Route Component Files
  const requiredFiles = [
    "src/app/dashboard/portfolio/page.jsx",
    "src/app/dashboard/portfolio/components/PortfolioClientView.jsx",
    "src/app/dashboard/portfolio/new/page.jsx",
    "src/app/dashboard/portfolio/[id]/page.jsx",
    "src/app/dashboard/portfolio/components/CaseStudyEditor.jsx",
    "src/app/api/portfolio/route.js",
    "src/app/api/portfolio/[id]/route.js",
  ];

  for (const relPath of requiredFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    assert(fs.existsSync(fullPath), `Expected ${relPath} to exist`);
    const content = fs.readFileSync(fullPath, "utf-8");
    assert(
      content.includes("export default") || content.includes("export async function"),
      `Expected ${relPath} to have a valid export`
    );
    console.log(`  ✓ ${relPath} verified`);
  }

  // 2. Test Case Study Creation via Prisma
  const testSlug = `smoke-test-case-study-${Date.now()}`;
  const testCaseStudy = await prisma.caseStudy.create({
    data: {
      title: "SMOKE TEST // HIGH-THROUGHPUT SWITCHING ENGINE",
      slug: testSlug,
      displayIndex: "99",
      num: "99 / 99",
      category: "FINTECH SWITCH",
      tags: "FINANCIAL SWITCHING & CORE BANKING",
      metric: "50,000 TPS // SUB-10MS SETTLEMENT",
      metricDetail: "50,000 TRANSACTIONS/SEC SUSTAINED UNDER PEAK CLEARING",
      summary: "Distributed revenue switching engine processing interbank settlements.",
      problem: "Monolithic mainframe switches choked under concurrent peak load spikes.",
      architecture: "Re-engineered core ledger with Go microservices, Kafka pipelines, and TimescaleDB.",
      techStack: "GO // KAFKA // TIMESCALEDB // REDIS",
      stackBadges: JSON.stringify(["Go", "Apache Kafka", "PostgreSQL", "Docker"]),
      imageUrl: "/image/portfolioPage/US-AUT-3.webp",
      impact: "Reduced peak settlement delays from 18 minutes to 400 milliseconds.",
      year: "2026",
      status: "PRODUCTION // STABLE",
      featured: false,
      order: 99,
    },
  });

  assert(testCaseStudy && testCaseStudy.id, "Case study must be created with ID");
  assert.strictEqual(testCaseStudy.slug, testSlug, "Slug must match created value");
  assert.strictEqual(testCaseStudy.featured, false, "Initial featured flag must be false");
  console.log(`  ✓ Case study created: ${testCaseStudy.title} [${testCaseStudy.displayIndex}]`);

  // 3. Test Updating Featured Flag & Metric
  const updatedCaseStudy = await prisma.caseStudy.update({
    where: { id: testCaseStudy.id },
    data: {
      featured: true,
      metric: "75,000 TPS // SUB-5MS SETTLEMENT",
    },
  });

  assert.strictEqual(updatedCaseStudy.featured, true, "Featured flag must update to true");
  assert.strictEqual(
    updatedCaseStudy.metric,
    "75,000 TPS // SUB-5MS SETTLEMENT",
    "Metric string must update"
  );
  console.log("  ✓ Case study featured toggle and metric update verified");

  // 4. Test Fetching by Slug
  const fetched = await prisma.caseStudy.findUnique({
    where: { slug: testSlug },
  });
  assert(fetched !== null, "Case study must be retrievable by slug");
  assert.strictEqual(fetched.id, testCaseStudy.id, "IDs must match");
  console.log(`  ✓ Case study resolved by slug (${testSlug})`);

  // 5. Clean up test record
  await prisma.caseStudy.delete({ where: { id: testCaseStudy.id } });
  console.log("  ✓ Test case study cleaned up successfully");

  await prisma.$disconnect();
  console.log("\n[PASS] Flagship Portfolio & Showcase CMS Smoke Tests");
}
