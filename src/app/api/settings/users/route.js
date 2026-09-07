import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, ROLES, hashPassword } from "@/lib/auth";

/**
 * GET /api/settings/users
 * Returns list of all dashboard users (SUPER_ADMIN only)
 */
export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Forbidden: Super Admin authorization required" },
        { status: 403 }
      );
    }

    const users = await prisma.user.findMany({
      orderBy: { createdAt: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        title: true,
        avatarUrl: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ success: true, users });
  } catch (error) {
    console.error("GET /api/settings/users error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching users" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/settings/users
 * Creates a new user with assigned role and credentials (SUPER_ADMIN only)
 */
export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Forbidden: Super Admin authorization required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const rawEmail = (body.email || "").toString().trim().toLowerCase();
    const rawName = (body.name || "").toString().trim();
    const rawPassword = (body.password || "").toString().trim();
    const rawTitle = (body.title || "").toString().trim();
    const rawRole = (body.role || "").toString().trim();
    const active = body.active !== undefined ? Boolean(body.active) : true;

    // Field-level validations
    if (!rawName) {
      return NextResponse.json(
        { error: "Full Name is required", field: "name" },
        { status: 400 }
      );
    }

    if (!rawEmail) {
      return NextResponse.json(
        { error: "Email address is required", field: "email" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(rawEmail)) {
      return NextResponse.json(
        { error: "Invalid email format (e.g. operator@gerat.et)", field: "email" },
        { status: 400 }
      );
    }

    if (!rawPassword) {
      return NextResponse.json(
        { error: "Passphrase is required", field: "password" },
        { status: 400 }
      );
    }

    if (rawPassword.length < 6) {
      return NextResponse.json(
        { error: "Passphrase must be at least 6 characters long", field: "password" },
        { status: 400 }
      );
    }

    // Validate role against 3 allowed roles
    const validRoles = [ROLES.SUPER_ADMIN, ROLES.OPERATIONS_LEAD, ROLES.EDITOR];
    const role = validRoles.includes(rawRole) ? rawRole : ROLES.EDITOR;

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: rawEmail },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: `An operator with email '${rawEmail}' already exists in the system`,
          field: "email",
        },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(rawPassword);

    const newUser = await prisma.user.create({
      data: {
        email: rawEmail,
        name: rawName,
        passwordHash,
        role,
        title: rawTitle,
        active,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        title: true,
        avatarUrl: true,
        active: true,
        createdAt: true,
      },
    });

    // Record immutable audit log
    await prisma.auditLog.create({
      data: {
        action: "USER_PROVISIONED",
        entityType: "User",
        entityId: newUser.id,
        actorId: currentUser.id,
        details: JSON.stringify({
          createdUser: newUser.email,
          role: newUser.role,
          name: newUser.name,
        }),
      },
    });

    return NextResponse.json({ success: true, user: newUser }, { status: 201 });
  } catch (error) {
    console.error("POST /api/settings/users error:", error);
    return NextResponse.json(
      { error: "Internal server error creating user" },
      { status: 500 }
    );
  }
}
