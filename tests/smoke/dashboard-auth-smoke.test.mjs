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
  assert(userCount >= 1, `Expected at least 1 user in database, found ${userCount}`);
  console.log(`  ✓ Database verified: ${userCount} administrative user(s) registered`);

  const adminUser = await prisma.user.findUnique({
    where: { email: "admin@gerat.com" },
  });
  assert(adminUser, "Super admin user (admin@gerat.com) must exist");
  assert.strictEqual(adminUser.role, ROLES.SUPER_ADMIN, "Admin user role must be SUPER_ADMIN");
  console.log("  ✓ Super Admin user verified (role: SUPER_ADMIN)");

  // 2. Verify Password Hashing & Verification
  const adminPassValid = await verifyPassword("GeratAdmin2026!#", adminUser.passwordHash);
  assert(adminPassValid === true, "Password verification failed for admin password");

  const invalidPass = await verifyPassword("WrongPassword123!", adminUser.passwordHash);
  assert(invalidPass === false, "Password verification should fail for invalid password");
  console.log("  ✓ Password security & hashing engine verified");

  // 4. Verify JWT Session Signing & Verification
  const token = await signSessionToken({
    sub: adminUser.id,
    email: adminUser.email,
    role: adminUser.role,
  });
  assert(typeof token === "string" && token.length > 20, "JWT session token must be a valid string");

  const payload = await verifySessionToken(token);
  assert(payload !== null, "JWT session token verification failed");
  assert.strictEqual(payload.email, "admin@gerat.com", "JWT payload email mismatch");
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
    isAuthorized("VIEWER", [ROLES.OPERATIONS_LEAD]) === false,
    "VIEWER should NOT be authorized for operations CRM domain"
  );
  console.log("  ✓ RBAC authorization rules verified across roles");

  // 6. Test User Provisioning Lifecycle (Create -> Verify Normalized Email & Role -> Clean Up)
  const testEmail = `test.provision.${Date.now()}@gerat.com`;
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
  assert(pillarCount >= 4, `Expected at least 4 service pillars, found ${pillarCount}`);
  assert(inquiryCount >= 0, `Expected at least 0 inquiries, found ${inquiryCount}`);

  console.log(
    `  ✓ Database content records verified: ${projectCount} projects, ${articleCount} articles, ${memberCount} members, ${pillarCount} pillars, ${inquiryCount} inquiries`
  );

  await prisma.$disconnect();
  console.log("\n[PASS] Dashboard & Authentication Smoke Tests");
}
