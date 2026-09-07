import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, hashPassword, verifyPassword } from "@/lib/auth";

/**
 * POST /api/auth/change-password
 * Allows any authenticated user to update their own passphrase
 */
export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const currentPassword = (body.currentPassword || "").toString().trim();
    const newPassword = (body.newPassword || "").toString().trim();

    if (!currentPassword) {
      return NextResponse.json(
        { error: "Current passphrase is required", field: "currentPassword" },
        { status: 400 }
      );
    }

    if (!newPassword) {
      return NextResponse.json(
        { error: "New passphrase is required", field: "newPassword" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New passphrase must be at least 6 characters long", field: "newPassword" },
        { status: 400 }
      );
    }

    // Fetch user from DB with passwordHash
    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Operator session account not found" },
        { status: 404 }
      );
    }

    // Verify current password
    const isCurrentValid = await verifyPassword(currentPassword, user.passwordHash);
    if (!isCurrentValid) {
      return NextResponse.json(
        { error: "Current passphrase is incorrect", field: "currentPassword" },
        { status: 400 }
      );
    }

    // Hash new password and update
    const newPasswordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { passwordHash: newPasswordHash },
    });

    // Record immutable audit log
    await prisma.auditLog.create({
      data: {
        action: "USER_SELF_PASSWORD_RESET",
        entityType: "User",
        entityId: currentUser.id,
        actorId: currentUser.id,
        diff: JSON.stringify({
          email: currentUser.email,
          role: currentUser.role,
          timestamp: new Date().toISOString(),
        }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Passphrase updated successfully.",
    });
  } catch (error) {
    console.error("POST /api/auth/change-password error:", error);
    return NextResponse.json(
      { error: "Internal server error updating passphrase" },
      { status: 500 }
    );
  }
}
