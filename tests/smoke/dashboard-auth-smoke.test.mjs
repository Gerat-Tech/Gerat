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

  // 2. Verify Password Hashing & Verification
  const validPass = await verifyPassword("GeratAdmin2026!#", adminUser.passwordHash);
  assert(validPass === true, "Password verification failed for valid password");

  const invalidPass = await verifyPassword("WrongPassword123!", adminUser.passwordHash);
  assert(invalidPass === false, "Password verification should fail for invalid password");
  console.log("  ✓ Password security & hashing engine verified");

  // 3. Verify JWT Session Signing & Verification
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

  // 4. Verify Role-Based Access Control Logic
  assert(
    isAuthorized(ROLES.SUPER_ADMIN, [ROLES.OPERATIONS_LEAD]) === true,
    "SUPER_ADMIN should have universal access across all roles"
  );
  assert(
    isAuthorized(ROLES.OPERATIONS_LEAD, [ROLES.OPERATIONS_LEAD]) === true,
    "OPERATIONS_LEAD should be authorized for operations domain"
  );
  assert(
    isAuthorized(ROLES.VIEWER, [ROLES.TECHNICAL_EDITOR]) === false,
    "VIEWER should not be authorized for technical editor domain"
  );
  console.log("  ✓ RBAC authorization rules verified");

  // 5. Verify Content Seed Records in DB
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
