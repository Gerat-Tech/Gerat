import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;


export async function GET(request, { params }) {
  try {
    const { id } = await params;
    let caseStudy = null;

    try {
      caseStudy = await prisma.caseStudy.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
      });
    } catch (dbErr) {
      console.warn("DB findFirst error in GET portfolio/[id]:", dbErr.message);
    }

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

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN, ROLES.OPERATIONS_LEAD, ROLES.EDITOR])) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    let existing = null;
    try {
      existing = await prisma.caseStudy.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
      });
    } catch (e) {
      console.warn("DB lookup error in PATCH portfolio/[id]:", e.message);
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

    let updated = null;
    const targetId = existing?.id || id;

    try {
      updated = await prisma.caseStudy.upsert({
        where: { id: targetId },
        update: data,
        create: {
          id: targetId,
          slug: data.slug || targetId,
          displayIndex: data.displayIndex || "01",
          num: data.num || "01 · 09",
          title: data.title || "UNTITLED CASE STUDY",
          category: data.category || "ENTERPRISE ERP",
          tags: data.tags || "ENTERPRISE PLATFORMS",
          metric: data.metric || "99.99% UPTIME",
          metricDetail: data.metricDetail || data.metric || "HIGH AVAILABILITY",
          summary: data.summary || "",
          problem: data.problem || "",
          architecture: data.architecture || "",
          techStack: data.techStack || "GO · POSTGRES",
          imageUrl: data.imageUrl || "/image/portfolioPage/US-AUT-3.webp",
          impact: data.impact || "",
          year: data.year || "2026",
          status: data.status || "PRODUCTION · STABLE",
          featured: data.featured ?? false,
          order: data.order ?? 0,
        },
      });

      // Invalidate Next.js cache so public pages immediately show updated data
      try {
        revalidatePath("/portfolio");
        revalidatePath("/");
        revalidatePath("/dashboard/portfolio");
        revalidatePath(`/dashboard/portfolio/${targetId}`);
      } catch (revErr) {
        console.warn("revalidatePath warning:", revErr.message);
      }

      // Record audit log
      try {
        await prisma.auditLog.create({
          data: {
            actorId: user.id,
            action: "UPDATE_CASE_STUDY",
            entityType: "CASE_STUDY",
            entityId: updated.id,
            diff: JSON.stringify(data),
          },
        });
      } catch {}
    } catch (dbErr) {
      console.error("DB write failed in PATCH portfolio/[id]:", dbErr);
      return NextResponse.json(
        { error: `Database write failed: ${dbErr.message || "Failed to update case study."}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, caseStudy: updated });
  } catch (error) {
    console.error("Update case study error:", error);
    return NextResponse.json({ error: error.message || "Failed to update case study." }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN, ROLES.OPERATIONS_LEAD, ROLES.EDITOR])) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges to delete." }, { status: 403 });
    }

    const { id } = await params;
    try {
      const existing = await prisma.caseStudy.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
        },
      });

      if (existing) {
        await prisma.caseStudy.delete({ where: { id: existing.id } });

        try {
          revalidatePath("/portfolio");
          revalidatePath("/");
          revalidatePath("/dashboard/portfolio");
        } catch {}

        try {
          await prisma.auditLog.create({
            data: {
              actorId: user.id,
              action: "DELETE_CASE_STUDY",
              entityType: "CASE_STUDY",
              entityId: existing.id,
              diff: JSON.stringify({ title: existing.title, slug: existing.slug }),
            },
          });
        } catch {}
      }
    } catch (dbErr) {
      console.warn("DB delete error in DELETE portfolio/[id]:", dbErr.message);
    }

    return NextResponse.json({ success: true, message: "Case study deleted successfully." });
  } catch (error) {
    console.error("Delete case study error:", error);
    return NextResponse.json({ error: "Failed to delete case study." }, { status: 500 });
  }
}
