import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, ROLES, hashPassword } from "@/lib/auth";

/**
 * PATCH /api/settings/users/[id]
 * Updates user details, role, active status, or resets password (SUPER_ADMIN only)
 */
export async function PATCH(request, context) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Forbidden: Super Admin authorization required" },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();
    const { name, role, title, active, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {};
    if (typeof name === "string") updateData.name = name.trim();
    if (typeof title === "string") updateData.title = title.trim();
    if (typeof active === "boolean") {
      // Prevent deactivating oneself
      if (id === currentUser.id && active === false) {
        return NextResponse.json(
          { error: "Cannot deactivate your own active Super Admin account" },
          { status: 400 }
        );
      }
      updateData.active = active;
    }
    if (role) {
      const normalizedRole =
        role === "TECHNICAL_EDITOR" || role === "CREATIVE_EDITOR"
          ? ROLES.EDITOR
          : role;

      if ([ROLES.SUPER_ADMIN, ROLES.OPERATIONS_LEAD, ROLES.EDITOR].includes(normalizedRole)) {
        // Prevent demoting oneself
        if (id === currentUser.id && normalizedRole !== ROLES.SUPER_ADMIN) {
          return NextResponse.json(
            { error: "Cannot change your own role away from Super Admin" },
            { status: 400 }
          );
        }
        updateData.role = normalizedRole;
      }
    }
    if (password && typeof password === "string") {
      if (password.trim().length < 6) {
        return NextResponse.json(
          { error: "New passphrase must be at least 6 characters long", field: "password" },
          { status: 400 }
        );
      }
      updateData.passwordHash = await hashPassword(password.trim());
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        title: true,
        avatarUrl: true,
        active: true,
        updatedAt: true,
      },
    });

    // Record immutable audit log
    await prisma.auditLog.create({
      data: {
        action: password ? "USER_PASSWORD_RESET" : "USER_ROLE_MUTATED",
        entityType: "User",
        entityId: updatedUser.id,
        actorId: currentUser.id,
        diff: JSON.stringify({
          targetUser: updatedUser.email,
          previousRole: existingUser.role,
          newRole: updatedUser.role,
          active: updatedUser.active,
          passwordReset: Boolean(password),
        }),
      },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("PATCH /api/settings/users/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error updating user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/settings/users/[id]
 * Deactivates or removes a user (SUPER_ADMIN only)
 */
export async function DELETE(request, context) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || currentUser.role !== ROLES.SUPER_ADMIN) {
      return NextResponse.json(
        { error: "Forbidden: Super Admin authorization required" },
        { status: 403 }
      );
    }

    const { id } = await context.params;

    if (id === currentUser.id) {
      return NextResponse.json(
        { error: "Cannot delete your own active session account" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Soft-deactivate user rather than hard-deleting foreign key relations
    await prisma.user.update({
      where: { id },
      data: { active: false },
    });

    // Record audit log
    await prisma.auditLog.create({
      data: {
        action: "USER_DEACTIVATED",
        entityType: "User",
        entityId: id,
        actorId: currentUser.id,
        diff: JSON.stringify({ targetEmail: user.email, targetRole: user.role }),
      },
    });

    return NextResponse.json({ success: true, message: `User ${user.email} deactivated.` });
  } catch (error) {
    console.error("DELETE /api/settings/users/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error deactivating user" },
      { status: 500 }
    );
  }
}
