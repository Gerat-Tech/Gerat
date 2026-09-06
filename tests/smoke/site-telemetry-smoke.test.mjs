import assert from "assert";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { dispatchNewLeadAlert, sendTestWebhookPing } from "../../src/lib/notifications.js";

const prisma = new PrismaClient();

export async function runSiteTelemetrySmokeTests() {
  console.log("▶ Testing Site Telemetry, Audit Logs & Real-Time Alerts (Phase D-07)...");

  // 1. Verify UI and Route Component Files
  const requiredFiles = [
    "src/lib/notifications.js",
    "src/app/api/settings/config/route.js",
    "src/app/api/settings/audit-log/route.js",
    "src/app/api/settings/test-notification/route.js",
    "src/app/dashboard/settings/page.jsx",
    "src/app/dashboard/settings/components/SettingsClientView.jsx",
    "src/app/dashboard/settings/site-config/page.jsx",
    "src/app/dashboard/settings/audit-log/page.jsx",
  ];

  for (const relPath of requiredFiles) {
    const fullPath = path.resolve(process.cwd(), relPath);
    assert(fs.existsSync(fullPath), `Expected ${relPath} to exist`);
    const content = fs.readFileSync(fullPath, "utf-8");
    assert(
      content.includes("export default") ||
        content.includes("export async function") ||
        content.includes("export function"),
      `Expected ${relPath} to have a valid export`
    );
    console.log(`  ✓ ${relPath} verified`);
  }

  // 2. Test SiteConfig Upsert & Query via Prisma
  const testKey = `SMOKE_TEST_KEY_${Date.now()}`;
  const testVal = "VERIFIED_TELEMETRY_VALUE";

  const config = await prisma.siteConfig.upsert({
    where: { key: testKey },
    update: { value: testVal },
    create: {
      key: testKey,
      value: testVal,
      description: "Automated smoke test configuration parameter",
    },
  });

  assert(config && config.id, "SiteConfig must be persisted with an ID");
  assert.strictEqual(config.value, testVal, "Config value must match persisted value");
  console.log(`  ✓ SiteConfig upsert verified: ${config.key} = ${config.value}`);

  // Query back
  const queried = await prisma.siteConfig.findUnique({ where: { key: testKey } });
  assert.strictEqual(queried.value, testVal, "Retrieved config value must match");
  console.log(`  ✓ SiteConfig lookup verified`);

  // Clean up
  await prisma.siteConfig.delete({ where: { key: testKey } });
  console.log(`  ✓ Test SiteConfig parameter cleaned up`);

  // 3. Test AuditLog Mutation Logging & Actor Association
  const admin = await prisma.user.findFirst({
    where: { role: "SUPER_ADMIN" },
  });
  assert(admin, "Super Admin user must exist to anchor audit log test");

  const testAuditLog = await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "SMOKE_TEST_MUTATION",
      entityType: "SITE_CONFIG",
      entityId: "TELEMETRY_ENGINE",
      diff: JSON.stringify({ before: "OFFLINE", after: "ONLINE" }),
      ipAddress: "127.0.0.1",
    },
    include: {
      actor: true,
    },
  });

  assert(testAuditLog && testAuditLog.id, "AuditLog must be recorded");
  assert.strictEqual(testAuditLog.actor.email, admin.email, "AuditLog actor must resolve to admin");
  console.log(`  ✓ Immutable AuditLog created & relational actor resolved: ${testAuditLog.action} by ${testAuditLog.actor.name}`);

  // Clean up
  await prisma.auditLog.delete({ where: { id: testAuditLog.id } });
  console.log(`  ✓ Test AuditLog entry cleaned up`);

  // 4. Test Telemetry Alert Dispatch Engine
  const mockInquiry = {
    id: "smoke_test_inquiry_id",
    telemetryCode: `GRT-ENG-SMOKE-${Date.now().toString().slice(-6)}`,
    fullName: "Chief Architect Smoke Test",
    company: "Gerat Verification Lab",
    discipline: "HIGH-CONCURRENCY ARCHITECTURE",
    budgetRange: "250K+ ETB / Enterprise",
    timeline: "URGENT (2-4 WEEKS)",
    phone: "+251911998877",
    email: "smoke.test@gerat.et",
    priority: "CRITICAL_ENTERPRISE",
    projectBrief: "Automated verification of the telemetry alert notification pipeline.",
  };

  const alertResult = await dispatchNewLeadAlert(mockInquiry);
  assert(alertResult && typeof alertResult.delivered === "boolean", "Alert dispatch must return delivery state");
  console.log(`  ✓ Telemetry alert dispatch verified (delivered: ${alertResult.delivered}, target: ${alertResult.target || "INTERNAL"})`);

  // 5. Test Webhook Ping Validation
  await assert.rejects(
    async () => {
      await sendTestWebhookPing("invalid-url-protocol");
    },
    /Invalid webhook URL/,
    "Should reject malformed webhook URLs"
  );
  console.log(`  ✓ Webhook validation correctly rejected malformed URL protocol`);

  await prisma.$disconnect();
  console.log("\n[PASS] Site Telemetry, Audit Logs & Real-Time Alerts Smoke Tests");
}
