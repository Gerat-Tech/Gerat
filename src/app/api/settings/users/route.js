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
    const { email, name, password, role = ROLES.VIEWER, title = "", active = true } = body;

    if (!email || !name || !password) {
      return NextResponse.json(
        { error: "Missing required fields: email, name, password" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existing) {
      return NextResponse.json(
        { error: `User with email '${email}' already exists` },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        name: name.trim(),
        passwordHash,
        role,
        title: title.trim(),
        active: Boolean(active),
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
