import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, caseStudy });
  } catch (error) {
    console.error("Get case study error:", error);
    return NextResponse.json({ error: "Failed to fetch case study." }, { status: 500 });
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

    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Case study not found." }, { status: 404 });
    }

    const data = {};
    if (body.title !== undefined) data.title = body.title.trim();
    if (body.slug !== undefined) {
      data.slug = body.slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (body.displayIndex !== undefined) data.displayIndex = body.displayIndex;
    if (body.num !== undefined) data.num = body.num;
    if (body.category !== undefined) data.category = body.category;
    if (body.tags !== undefined) data.tags = body.tags;
    if (body.metric !== undefined) data.metric = body.metric;
    if (body.metricDetail !== undefined) data.metricDetail = body.metricDetail;
    if (body.summary !== undefined) data.summary = body.summary;
    if (body.problem !== undefined) data.problem = body.problem;
    if (body.architecture !== undefined) data.architecture = body.architecture;
    if (body.techStack !== undefined) data.techStack = body.techStack;
    if (body.stackBadges !== undefined) {
      data.stackBadges = Array.isArray(body.stackBadges)
        ? JSON.stringify(body.stackBadges)
        : body.stackBadges;
    }
    if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
    if (body.galleryImages !== undefined) {
      data.galleryImages = Array.isArray(body.galleryImages)
        ? JSON.stringify(body.galleryImages)
        : body.galleryImages;
    }
    if (body.impact !== undefined) data.impact = body.impact;
    if (body.year !== undefined) data.year = body.year;
    if (body.status !== undefined) data.status = body.status;
    if (body.featured !== undefined) data.featured = Boolean(body.featured);
    if (body.order !== undefined) data.order = Number(body.order);

    const updated = await prisma.caseStudy.update({
      where: { id },
      data,
    });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "UPDATE_CASE_STUDY",
          entityType: "CASE_STUDY",
          entityId: id,
          diff: JSON.stringify(data),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (error) {
    console.error("Update case study error:", error);
    return NextResponse.json({ error: "Failed to update case study." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN, ROLES.OPERATIONS_LEAD])) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges to delete." }, { status: 403 });
    }

    const { id } = await params;
    const existing = await prisma.caseStudy.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Case study not found." }, { status: 404 });
    }

    await prisma.caseStudy.delete({ where: { id } });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "DELETE_CASE_STUDY",
          entityType: "CASE_STUDY",
          entityId: id,
          diff: JSON.stringify({ title: existing.title, slug: existing.slug }),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, message: "Case study deleted successfully." });
  } catch (error) {
    console.error("Delete case study error:", error);
    return NextResponse.json({ error: "Failed to delete case study." }, { status: 500 });
  }
}
