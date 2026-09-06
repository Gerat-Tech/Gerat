import assert from "assert";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function runArticlesCmsSmokeTests() {
  console.log("▶ Testing Research & Insights CMS (Phase D-04)...");

  // 1. Verify UI and Route Component Files
  const requiredFiles = [
    "src/components/common/MarkdownRenderer.jsx",
    "src/app/dashboard/insights/page.jsx",
    "src/app/dashboard/insights/components/ArticlesClientView.jsx",
    "src/app/dashboard/insights/new/page.jsx",
    "src/app/dashboard/insights/[id]/page.jsx",
    "src/app/dashboard/insights/components/ArticleEditor.jsx",
    "src/app/insights/[slug]/page.jsx",
    "src/app/api/articles/route.js",
    "src/app/api/articles/[id]/route.js",
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

  // 2. Test Article Model Lifecycle via Prisma
  const author = await prisma.user.findFirst({
    where: { role: "SUPER_ADMIN" },
  });
  assert(author, "Super admin author must exist in database");

  const testSlug = `smoke-test-distributed-consensus-${Date.now()}`;
  const testArticle = await prisma.article.create({
    data: {
      title: "SMOKE TEST // ZERO-OVERHEAD DISTRIBUTED STORAGE FABRIC",
      subtitle: "Formal verification of asynchronous append-only log topologies",
      slug: testSlug,
      category: "SYSTEM ARCHITECTURE",
      content:
        "# Formal Verification\n\nTesting Raft state machines under Byzantine fault models.\n\n```go\nfunc Commit() error { return nil }\n```\n\n> Zero data loss guaranteed.\n",
      excerpt: "Testing Raft state machines under Byzantine fault models.",
      readingTime: "5 MIN READ",
      coverImageUrl: "/image/LatestNews/01_Picture.webp",
      tags: JSON.stringify(["DISTRIBUTED SYSTEMS", "GO", "RAFT"]),
      status: "DRAFT",
      featured: true,
      authorId: author.id,
    },
    include: { author: true },
  });

  assert(testArticle && testArticle.id, "Article must be created with ID");
  assert.strictEqual(testArticle.status, "DRAFT", "Initial status must be DRAFT");
  assert.strictEqual(testArticle.slug, testSlug, "Slug must match created value");
  console.log(`  ✓ Article created in DRAFT state: ${testArticle.title}`);

  // 3. Test Publishing & Timestamp Generation
  const publishedAt = new Date();
  const publishedArticle = await prisma.article.update({
    where: { id: testArticle.id },
    data: {
      status: "PUBLISHED",
      publishedAt,
    },
  });

  assert.strictEqual(publishedArticle.status, "PUBLISHED", "Status must update to PUBLISHED");
  assert(publishedArticle.publishedAt !== null, "publishedAt must be set");
  console.log("  ✓ Article successfully transitioned to PUBLISHED with timestamp");

  // 4. Test Query by Slug with Relations
  const queriedArticle = await prisma.article.findUnique({
    where: { slug: testSlug },
    include: { author: true },
  });

  assert(queriedArticle !== null, "Article must be retrievable by slug");
  assert.strictEqual(queriedArticle.author.id, author.id, "Author relation must resolve");
  console.log(`  ✓ Article resolved by slug (${testSlug}) with author relation`);

  // 5. Clean up test record
  await prisma.article.delete({ where: { id: testArticle.id } });
  console.log("  ✓ Test article cleaned up successfully");

  await prisma.$disconnect();
  console.log("\n[PASS] Research & Insights CMS Smoke Tests");
}
