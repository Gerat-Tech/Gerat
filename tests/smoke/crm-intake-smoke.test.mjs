import assert from "assert";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function runCrmIntakeSmokeTests() {
  console.log("▶ Testing CRM & Client Intake Pipeline (Phase D-02 & D-03)...");

  // 1. Verify UI Component files exist and have default exports
  const componentsToVerify = [
    "src/components/dashboard/common/StatusBadge.jsx",
    "src/components/dashboard/CommandPalette.jsx",
    "src/components/dashboard/DashboardSidebar.jsx",
    "src/components/dashboard/DashboardHeader.jsx",
    "src/components/dashboard/DashboardShell.jsx",
    "src/app/dashboard/layout.jsx",
    "src/app/dashboard/page.jsx",
    "src/app/dashboard/inquiries/page.jsx",
    "src/app/dashboard/inquiries/components/InquiriesClientView.jsx",
    "src/app/dashboard/inquiries/[id]/page.jsx",
    "src/app/dashboard/inquiries/[id]/components/InquiryDossierView.jsx",
    "src/app/api/intake/route.js",
    "src/app/api/inquiries/[id]/route.js",
  ];

  for (const relPath of componentsToVerify) {
    const fullPath = path.resolve(process.cwd(), relPath);
    assert(fs.existsSync(fullPath), `Expected ${relPath} to exist`);
    const content = fs.readFileSync(fullPath, "utf-8");
    assert(
      content.includes("export default") || content.includes("export async function"),
      `Expected ${relPath} to have valid export`
    );
    console.log(`  ✓ ${relPath} verified`);
  }

  // 2. Test Client Intake Model & Telemetry Code Generation
  const testTelemetryCode = `GRT-TEST-${Date.now()}`;
  const testInquiry = await prisma.inquiry.create({
    data: {
      telemetryCode: testTelemetryCode,
      fullName: "Almaz Haile",
      email: "almaz.haile@ethiotec.et",
      phone: "+251911998877",
      company: "EthioTec Systems",
      roleTitle: "CTO",
      discipline: "Enterprise Systems Architecture",
      subServices: JSON.stringify(["Distributed Core", "PostgreSQL Sharding"]),
      timeline: "Urgent (< 1 Month)",
      budgetRange: "150K - 300K ETB",
      projectBrief: "Architecting high-throughput resilient transaction pipeline for retail.",
      metadata: JSON.stringify({ currentStack: "Next.js + Node", targetQPS: 5000 }),
      sourceUrl: "/contact",
      countryCode: "ET",
    },
  });

  assert(testInquiry && testInquiry.id, "Test inquiry must be created successfully");
  assert.strictEqual(testInquiry.status, "NEW_INTAKE", "Default status must be NEW_INTAKE");
  console.log(`  ✓ Inquiry created: ${testInquiry.telemetryCode} (${testInquiry.fullName})`);

  // 3. Test Status & Priority Updating (PATCH simulation)
  const adminUser = await prisma.user.findFirst({ where: { role: "SUPER_ADMIN" } });
  assert(adminUser, "Super admin user must exist for assignment");

  const updatedInquiry = await prisma.inquiry.update({
    where: { id: testInquiry.id },
    data: {
      status: "DISCOVERY_SCHEDULED",
      priority: "HIGH",
      assignedToId: adminUser.id,
    },
    include: { assignedTo: true },
  });

  assert.strictEqual(updatedInquiry.status, "DISCOVERY_SCHEDULED", "Status must update to DISCOVERY_SCHEDULED");
  assert.strictEqual(updatedInquiry.priority, "HIGH", "Priority must update to HIGH");
  assert.strictEqual(updatedInquiry.assignedTo.email, adminUser.email, "Assignee must match super admin");
  console.log("  ✓ Status advancement & lead assignment verified");

  // 4. Test Internal Note Logging
  const testNote = await prisma.inquiryNote.create({
    data: {
      inquiryId: testInquiry.id,
      authorId: adminUser.id,
      content: "Preliminary sizing indicates 3 microservices with Kafka message bus.",
      isPinned: true,
    },
  });

  assert(testNote && testNote.id, "Inquiry note must be created");
  assert.strictEqual(testNote.isPinned, true, "Note should be pinned");
  console.log("  ✓ Internal engineering note logged and pinned");

  // 5. Test Communication Touchpoint Logging
  const testComm = await prisma.inquiryCommunication.create({
    data: {
      inquiryId: testInquiry.id,
      actorId: adminUser.id,
      channel: "WHATSAPP",
      subject: "Introductory Discovery Call Invitation",
      summary: "Client confirmed receipt of preliminary questions. Agreed to call on Thursday at 10 AM.",
      outcome: "Discovery call confirmed",
    },
  });

  assert(testComm && testComm.id, "Communication touchpoint must be created");
  assert.strictEqual(testComm.channel, "WHATSAPP", "Communication channel must be WHATSAPP");
  console.log("  ✓ Communication touchpoint logged (WhatsApp vector)");

  // 6. Verify Dossier Fetch with Relations
  const fullDossier = await prisma.inquiry.findUnique({
    where: { id: testInquiry.id },
    include: {
      assignedTo: true,
      notes: true,
      communications: true,
    },
  });

  assert.strictEqual(fullDossier.notes.length, 1, "Dossier must include 1 note");
  assert.strictEqual(fullDossier.communications.length, 1, "Dossier must include 1 communication");
  console.log("  ✓ Full lead dossier relational aggregation verified");

  // 7. Clean up test record (cascade deletes notes & comms)
  await prisma.inquiry.delete({ where: { id: testInquiry.id } });
  console.log("  ✓ Test dossier cleaned up successfully");

  await prisma.$disconnect();
  console.log("\n[PASS] CRM & Client Intake Pipeline Smoke Tests");
}
