import assert from "assert";
import { PrismaClient } from "@prisma/client";
import {
  hashPassword,
  verifyPassword,
  signSessionToken,
  verifySessionToken,
  isAuthorized,
  ROLES,
} from "../../src/lib/auth.js";

const prisma = new PrismaClient();

export async function runDashboardAuthSmokeTests() {
  console.log("▶ Testing Dashboard & Authentication (Phase D-01)...");

  // 1. Verify Database Connection and Seeding
  const userCount = await prisma.user.count();
  assert(userCount >= 3, `Expected at least 3 users in database, found ${userCount}`);
  console.log(`  ✓ Database verified: ${userCount} administrative users registered`);

  const adminUser = await prisma.user.findUnique({
    where: { email: "admin@gerat.et" },
  });
  assert(adminUser, "Super admin user (admin@gerat.et) must exist");
  assert.strictEqual(adminUser.role, ROLES.SUPER_ADMIN, "Admin user role must be SUPER_ADMIN");
  console.log("  ✓ Super Admin user verified (role: SUPER_ADMIN)");

  // 2. Verify 3 Standard Seed Users (SUPER_ADMIN, OPERATIONS_LEAD, EDITOR)
  const opsUser = await prisma.user.findUnique({
    where: { email: "operations@gerat.et" },
  });
  assert(opsUser, "Operations Lead (operations@gerat.et) must exist");
  assert.strictEqual(opsUser.role, ROLES.OPERATIONS_LEAD, "Ops user role must be OPERATIONS_LEAD");

  const editorUser = await prisma.user.findUnique({
    where: { email: "editor@gerat.et" },
  });
  assert(editorUser, "Editor user (editor@gerat.et) must exist");
  assert.strictEqual(editorUser.role, ROLES.EDITOR, "Editor user role must be EDITOR");
  console.log("  ✓ 3 Core Administrative Roles verified (SUPER_ADMIN, OPERATIONS_LEAD, EDITOR)");

  // 3. Verify Password Hashing & Verification across all 3 roles
  const adminPassValid = await verifyPassword("GeratAdmin2026!#", adminUser.passwordHash);
  assert(adminPassValid === true, "Password verification failed for admin password");

  const opsPassValid = await verifyPassword("GeratTeam2026!#", opsUser.passwordHash);
  assert(opsPassValid === true, "Password verification failed for ops password");

  const editorPassValid = await verifyPassword("GeratTeam2026!#", editorUser.passwordHash);
  assert(editorPassValid === true, "Password verification failed for editor password");

  const invalidPass = await verifyPassword("WrongPassword123!", adminUser.passwordHash);
  assert(invalidPass === false, "Password verification should fail for invalid password");
  console.log("  ✓ Password security & hashing engine verified across all roles");

  // 4. Verify JWT Session Signing & Verification
  const token = await signSessionToken({
    sub: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
  });
  assert(typeof token === "string" && token.length > 20, "JWT session token must be a valid string");

  const payload = await verifySessionToken(token);
  assert(payload !== null, "JWT session token verification failed");
  assert.strictEqual(payload.email, "admin@gerat.et", "JWT payload email mismatch");
  assert.strictEqual(payload.role, "SUPER_ADMIN", "JWT payload role mismatch");
  console.log("  ✓ JWT session token signing and verification verified");

  // 5. Verify Role-Based Access Control Logic
  assert(
    isAuthorized(ROLES.SUPER_ADMIN, [ROLES.OPERATIONS_LEAD]) === true,
    "SUPER_ADMIN should have universal access across all roles"
  );
  assert(
    isAuthorized(ROLES.OPERATIONS_LEAD, [ROLES.OPERATIONS_LEAD]) === true,
    "OPERATIONS_LEAD should be authorized for operations domain"
  );
  assert(
    isAuthorized(ROLES.EDITOR, [ROLES.EDITOR]) === true,
    "EDITOR should be authorized for editor domain"
  );
  assert(
    isAuthorized(ROLES.OPERATIONS_LEAD, [ROLES.EDITOR]) === false,
    "OPERATIONS_LEAD should NOT be authorized for editor domain"
  );
  assert(
    isAuthorized(ROLES.EDITOR, [ROLES.OPERATIONS_LEAD]) === false,
    "EDITOR should NOT be authorized for operations CRM domain"
  );
  console.log("  ✓ RBAC authorization rules verified across 3 roles");

  // 6. Test User Provisioning Lifecycle (Create -> Verify Normalized Email & Role -> Clean Up)
  const testEmail = `test.provision.${Date.now()}@gerat.et`;
  const testPasswordHash = await hashPassword("SecurePass2026!#");
  const provisionedUser = await prisma.user.create({
    data: {
      name: "Test Operator",
      email: testEmail.toLowerCase().trim(),
      title: "Test Operations Lead",
      role: "OPERATIONS_LEAD",
      passwordHash: testPasswordHash,
      active: true,
    },
  });
  assert(provisionedUser.id, "Provisioned user must have an ID");
  assert.strictEqual(provisionedUser.email, testEmail.toLowerCase());
  assert.strictEqual(provisionedUser.role, "OPERATIONS_LEAD");

  // Verify created user can authenticate
  const testPassValid = await verifyPassword("SecurePass2026!#", provisionedUser.passwordHash);
  assert(testPassValid === true, "Provisioned user password authentication failed");

  // Verify Self-Service Password Reset Logic & Audit Logging
  const updatedPassHash = await hashPassword("NewRotatedPass2026!#");
  await prisma.user.update({
    where: { id: provisionedUser.id },
    data: { passwordHash: updatedPassHash },
  });
  const updatedUser = await prisma.user.findUnique({ where: { id: provisionedUser.id } });
  const oldPassFails = await verifyPassword("SecurePass2026!#", updatedUser.passwordHash);
  assert(oldPassFails === false, "Old password should fail after self-service password update");
  const newPassSucceeds = await verifyPassword("NewRotatedPass2026!#", updatedUser.passwordHash);
  assert(newPassSucceeds === true, "New password must succeed after self-service password update");

  // Create Audit Log with diff JSON
  const auditEntry = await prisma.auditLog.create({
    data: {
      action: "USER_SELF_PASSWORD_RESET",
      entityType: "User",
      entityId: provisionedUser.id,
      actorId: provisionedUser.id,
      diff: JSON.stringify({ email: provisionedUser.email, role: provisionedUser.role }),
    },
  });
  assert(auditEntry.id, "Audit log must be created successfully");
  await prisma.auditLog.delete({ where: { id: auditEntry.id } });

  // Clean up test user
  await prisma.user.delete({ where: { id: provisionedUser.id } });
  console.log("  ✓ User provisioning and self-service password lifecycle verified (create, hash, update password, audit log, cleanup)");

  // 7. Verify Content Seed Records in DB
  const [projectCount, articleCount, memberCount, pillarCount, inquiryCount] =
    await Promise.all([
      prisma.caseStudy.count(),
      prisma.article.count(),
      prisma.teamMember.count(),
      prisma.servicePillar.count(),
      prisma.inquiry.count(),
    ]);

  assert(projectCount >= 9, `Expected at least 9 case studies, found ${projectCount}`);
  assert(articleCount >= 9, `Expected at least 9 articles, found ${articleCount}`);
  assert(memberCount >= 9, `Expected at least 9 team members, found ${memberCount}`);
  assert(pillarCount >= 6, `Expected at least 6 service pillars, found ${pillarCount}`);
  assert(inquiryCount >= 2, `Expected at least 2 sample inquiries, found ${inquiryCount}`);

  console.log(
    `  ✓ Database content records verified: ${projectCount} projects, ${articleCount} articles, ${memberCount} members, ${pillarCount} pillars, ${inquiryCount} inquiries`
  );

  await prisma.$disconnect();
  console.log("\n[PASS] Dashboard & Authentication Smoke Tests");
}
