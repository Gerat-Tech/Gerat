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
  EDITOR: "EDITOR",
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

export const SYSTEM_PRESET_USERS = [
  {
    id: "usr_super_admin_gerat",
    email: "admin@gerat.com",
    alternateEmail: "admin@gerat.et",
    name: "Dawit (Principal Architect)",
    role: "SUPER_ADMIN",
    title: "Executive Director & Principal Architect",
    plainPassword: process.env.ADMIN_DEFAULT_PASSWORD || "GeratAdmin2026!#",
    active: true,
  },
  {
    id: "usr_ops_lead_gerat",
    email: "operations@gerat.com",
    alternateEmail: "operations@gerat.et",
    name: "Client Operations Lead",
    role: "OPERATIONS_LEAD",
    title: "Head of Client Engagement & Solutions",
    plainPassword: "GeratTeam2026!#",
    active: true,
  },
  {
    id: "usr_editor_gerat",
    email: "editor@gerat.com",
    alternateEmail: "editor@gerat.et",
    name: "Content & Editorial Lead",
    role: "EDITOR",
    title: "Content & Publications Director",
    plainPassword: "GeratTeam2026!#",
    active: true,
  },
];

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

    let user = null;
    try {
      user = await prisma.user.findUnique({
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
    } catch {
      // Database unavailable or table unseeded in serverless environment
    }

    if (user && user.active) {
      return user;
    }

    // Fallback if DB is unseeded or session was authenticated via preset
    const preset = SYSTEM_PRESET_USERS.find(
      (p) =>
        p.id === payload.sub ||
        p.email.toLowerCase() === payload.email?.toLowerCase() ||
        (p.alternateEmail && p.alternateEmail.toLowerCase() === payload.email?.toLowerCase())
    );

    if (preset) {
      return {
        id: preset.id,
        email: preset.email,
        name: preset.name,
        role: preset.role,
        title: preset.title,
        avatarUrl: null,
        active: true,
      };
    }

    if (payload.role && payload.email) {
      return {
        id: payload.sub,
        email: payload.email,
        name: payload.name || "Authorized Operator",
        role: payload.role,
        title: payload.title || "Operator",
        avatarUrl: null,
        active: true,
      };
    }

    return null;
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
  
  // Normalize legacy editor roles
  const normalizedRole =
    userRole === "TECHNICAL_EDITOR" || userRole === "CREATIVE_EDITOR"
      ? ROLES.EDITOR
      : userRole;

  return allowedRoles.includes(normalizedRole) || allowedRoles.includes(userRole);
}
