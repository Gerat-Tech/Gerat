import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import prisma from "./prisma.js";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "gerat-mission-control-jwt-secret-key-2026-production-secure"
);

export const COOKIE_NAME = "gerat_session";

export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  OPERATIONS_LEAD: "OPERATIONS_LEAD",
  TECHNICAL_EDITOR: "TECHNICAL_EDITOR",
  CREATIVE_EDITOR: "CREATIVE_EDITOR",
  VIEWER: "VIEWER",
};

/**
 * Hash plain text password
 */
export async function hashPassword(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
}

/**
 * Verify plain password against hash
 */
export async function verifyPassword(plainPassword, passwordHash) {
  return bcrypt.compare(plainPassword, passwordHash);
}

/**
 * Sign JWT token for user session
 */
export async function signSessionToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

/**
 * Verify JWT session token (works in Edge & Node runtimes)
 */
export async function verifySessionToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch {
    return null;
  }
}

/**
 * Get current authenticated user from request cookies
 */
export async function getCurrentUser() {
  try {
    const nextHeaders = await import("next/headers");
    const cookieStore = await nextHeaders.cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifySessionToken(token);
    if (!payload?.sub) return null;

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        title: true,
        avatarUrl: true,
        active: true,
      },
    });

    if (!user || !user.active) return null;
    return user;
  } catch {
    return null;
  }
}

/**
 * Check if a user's role is authorized for required roles
 */
export function isAuthorized(userRole, allowedRoles) {
  if (!userRole) return false;
  if (userRole === ROLES.SUPER_ADMIN) return true; // Super Admin has access to all domains
  return allowedRoles.includes(userRole);
}
