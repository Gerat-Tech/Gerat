import assert from "assert";
import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function runTeamServicesCmsSmokeTests() {
  console.log("▶ Testing Team & Services CMS (Phase D-06)...");

  // 1. Verify UI and Route Component Files
  const requiredFiles = [
    "src/app/dashboard/team/page.jsx",
    "src/app/dashboard/team/components/TeamClientView.jsx",
    "src/app/dashboard/team/components/TeamMemberEditor.jsx",
    "src/app/dashboard/team/new/page.jsx",
    "src/app/dashboard/team/[id]/page.jsx",
    "src/app/api/team/route.js",
    "src/app/api/team/[id]/route.js",
    "src/app/dashboard/services/page.jsx",
    "src/app/dashboard/services/components/ServicesClientView.jsx",
    "src/app/dashboard/services/components/ServicePillarEditor.jsx",
    "src/app/dashboard/services/new/page.jsx",
    "src/app/dashboard/services/[id]/page.jsx",
    "src/app/api/services/route.js",
    "src/app/api/services/[id]/route.js",
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

  // 2. Test TeamMember CRUD via Prisma
  const testMemberName = `Smoke Test Architect ${Date.now()}`;
  const testMember = await prisma.teamMember.create({
    data: {
      name: testMemberName,
      roleTitle: "PRINCIPAL DISTRIBUTED SYSTEMS ARCHITECT",
      division: "ENGINEERING_PRACTITIONER",
      focusTag: "RAFT CONSENSUS // EVENT SOURCING",
      bio: "Focuses on zero-copy serialization and fault-tolerant state-machine replication.",
      photoUrl: "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
      order: 99,
      active: true,
      githubUrl: "https://github.com/gerat-test",
    },
  });

  assert(testMember && testMember.id, "Team member must be created with an ID");
  assert.strictEqual(testMember.name, testMemberName, "Team member name must match");
  console.log(`  ✓ Team member created: ${testMember.name} (${testMember.division})`);

  // Update TeamMember
  const updatedMember = await prisma.teamMember.update({
    where: { id: testMember.id },
    data: {
      active: false,
      roleTitle: "DISTINGUISHED FELLOW // DISTRIBUTED SYSTEMS",
    },
  });
  assert.strictEqual(updatedMember.active, false, "Active status must update to false");
  assert.strictEqual(
    updatedMember.roleTitle,
    "DISTINGUISHED FELLOW // DISTRIBUTED SYSTEMS",
    "Role title must be updated"
  );
  console.log("  ✓ Team member status toggle and role update verified");

  // Query by Division
  const engineeringMembers = await prisma.teamMember.findMany({
    where: { division: "ENGINEERING_PRACTITIONER" },
  });
  assert(engineeringMembers.some((m) => m.id === testMember.id), "Should find member in engineering cadre");
  console.log(`  ✓ Member filtered correctly by division (${engineeringMembers.length} practitioners)`);

  // Clean up TeamMember
  await prisma.teamMember.delete({ where: { id: testMember.id } });
  console.log("  ✓ Test team member cleaned up");

  // 3. Test ServicePillar CRUD via Prisma
  const testPillarNum = "99";
  const testPillar = await prisma.servicePillar.create({
    data: {
      num: testPillarNum,
      title: "AUTONOMOUS AGENT ORCHESTRATION",
      tagline: "MULTI-AGENT PROTOCOLS // LOCAL LLM SWARMS",
      desc: "Architecting reliable hierarchical multi-agent workflows with deterministic state rollbacks.",
      deliverables: JSON.stringify([
        "Agentic Task Graphs & ReAct Loops",
        "Deterministic State Machine Checkpointing",
        "Local Model Quantization & Serving",
      ]),
      deepLink: "/services/autonomous-agents",
      order: 99,
      active: true,
    },
  });

  assert(testPillar && testPillar.id, "Service pillar must be created with an ID");
  assert.strictEqual(testPillar.num, testPillarNum, "Pillar index must match");
  console.log(`  ✓ Service pillar created: Practice // ${testPillar.num} - ${testPillar.title}`);

  // Update ServicePillar
  const updatedPillar = await prisma.servicePillar.update({
    where: { id: testPillar.id },
    data: {
      active: false,
      tagline: "ENTERPRISE AGENT PROTOCOLS // DISTRIBUTED INFERENCE",
    },
  });
  assert.strictEqual(updatedPillar.active, false, "Active status must update to false");
  assert.strictEqual(
    updatedPillar.tagline,
    "ENTERPRISE AGENT PROTOCOLS // DISTRIBUTED INFERENCE",
    "Tagline must update"
  );
  console.log("  ✓ Service pillar active toggle and tagline update verified");

  // Clean up ServicePillar
  await prisma.servicePillar.delete({ where: { id: testPillar.id } });
  console.log("  ✓ Test service pillar cleaned up");

  await prisma.$disconnect();
  console.log("\n[PASS] Team & Services CMS Smoke Tests");
}
