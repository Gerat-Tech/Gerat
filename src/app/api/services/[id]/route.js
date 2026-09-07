import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const pillar = await prisma.servicePillar.findUnique({
      where: { id },
    });

    if (!pillar) {
      return NextResponse.json({ error: "Service pillar not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, pillar });
  } catch (error) {
    console.error("Get service pillar error:", error);
    return NextResponse.json({ error: "Failed to fetch service pillar." }, { status: 500 });
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
        ROLES.EDITOR,
        ROLES.OPERATIONS_LEAD,
      ])
    ) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.servicePillar.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service pillar not found." }, { status: 404 });
    }

    const data = {};
    if (body.num !== undefined) data.num = body.num.trim();
    if (body.title !== undefined) data.title = body.title.trim();
    if (body.tagline !== undefined) data.tagline = body.tagline.trim();
    if (body.desc !== undefined) data.desc = body.desc.trim();
    if (body.deliverables !== undefined) {
      data.deliverables = Array.isArray(body.deliverables)
        ? JSON.stringify(body.deliverables)
        : body.deliverables;
    }
    if (body.deepLink !== undefined) data.deepLink = body.deepLink?.trim() || null;
    if (body.order !== undefined) data.order = Number(body.order);
    if (body.active !== undefined) data.active = Boolean(body.active);

    const updated = await prisma.servicePillar.update({
      where: { id },
      data,
    });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "UPDATE_SERVICE_PILLAR",
          entityType: "SERVICE_PILLAR",
          entityId: id,
          diff: JSON.stringify(data),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, pillar: updated });
  } catch (error) {
    console.error("Update service pillar error:", error);
    return NextResponse.json({ error: "Failed to update service pillar." }, { status: 500 });
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
    const existing = await prisma.servicePillar.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Service pillar not found." }, { status: 404 });
    }

    await prisma.servicePillar.delete({ where: { id } });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "DELETE_SERVICE_PILLAR",
          entityType: "SERVICE_PILLAR",
          entityId: id,
          diff: JSON.stringify({ num: existing.num, title: existing.title }),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, message: "Service pillar deleted successfully." });
  } catch (error) {
    console.error("Delete service pillar error:", error);
    return NextResponse.json({ error: "Failed to delete service pillar." }, { status: 500 });
  }
}
