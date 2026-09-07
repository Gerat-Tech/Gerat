import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!member) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, member });
  } catch (error) {
    console.error("Get team member error:", error);
    return NextResponse.json({ error: "Failed to fetch team member." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (
      !isAuthorized(user.role, [
        ROLES.SUPER_ADMIN,
        ROLES.OPERATIONS_LEAD,
      ])
    ) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    const data = {};
    if (body.name !== undefined) data.name = body.name.trim();
    if (body.roleTitle !== undefined) data.roleTitle = body.roleTitle.trim();
    if (body.division !== undefined) data.division = body.division;
    if (body.focusTag !== undefined) data.focusTag = body.focusTag.trim();
    if (body.bio !== undefined) data.bio = body.bio.trim();
    if (body.photoUrl !== undefined) data.photoUrl = body.photoUrl.trim();
    if (body.order !== undefined) data.order = Number(body.order);
    if (body.active !== undefined) data.active = Boolean(body.active);
    if (body.linkedinUrl !== undefined) data.linkedinUrl = body.linkedinUrl?.trim() || null;
    if (body.githubUrl !== undefined) data.githubUrl = body.githubUrl?.trim() || null;
    if (body.twitterUrl !== undefined) data.twitterUrl = body.twitterUrl?.trim() || null;

    const updated = await prisma.teamMember.update({
      where: { id },
      data,
    });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "UPDATE_TEAM_MEMBER",
          entityType: "TEAM_MEMBER",
          entityId: id,
          diff: JSON.stringify(data),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, member: updated });
  } catch (error) {
    console.error("Update team member error:", error);
    return NextResponse.json({ error: "Failed to update team member." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN, ROLES.OPERATIONS_LEAD])) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges." }, { status: 403 });
    }

    const { id } = await params;
    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Team member not found." }, { status: 404 });
    }

    await prisma.teamMember.delete({ where: { id } });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "DELETE_TEAM_MEMBER",
          entityType: "TEAM_MEMBER",
          entityId: id,
          diff: JSON.stringify({ name: existing.name }),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, message: "Team member deleted successfully." });
  } catch (error) {
    console.error("Delete team member error:", error);
    return NextResponse.json({ error: "Failed to delete team member." }, { status: 500 });
  }
}
