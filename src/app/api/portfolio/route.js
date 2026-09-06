import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const where = {};
    if (category && category !== "ALL DISCIPLINES") {
      where.category = category;
    }
    if (featured === "true") {
      where.featured = true;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { summary: { contains: search } },
        { metric: { contains: search } },
        { techStack: { contains: search } },
      ];
    }

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, caseStudies });
  } catch (error) {
    console.error("Fetch case studies error:", error);
    return NextResponse.json({ error: "Failed to fetch case studies." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (
      !isAuthorized(user.role, [
        ROLES.SUPER_ADMIN,
        ROLES.OPERATIONS_LEAD,
        ROLES.TECHNICAL_EDITOR,
        ROLES.CREATIVE_EDITOR,
      ])
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions to publish case studies." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      title,
      slug: customSlug,
      displayIndex = "01",
      num = "01 / 09",
      category = "ENTERPRISE ERP",
      tags = "ENTERPRISE LOGISTICS & OPERATIONS",
      metric = "99.999% UPTIME // HIGH THROUGHPUT",
      metricDetail,
      summary = "",
      problem = "",
      architecture = "",
      techStack = "GO // POSTGRESQL // DOCKER",
      stackBadges,
      imageUrl = "/image/portfolioPage/US-AUT-3.webp",
      galleryImages,
      impact = "",
      year = "2026",
      status = "PRODUCTION // STABLE",
      featured = false,
      order = 0,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: "Case study title is required." }, { status: 400 });
    }

    // Auto-generate slug
    let slug = customSlug?.trim()
      ? customSlug
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      : title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

    const existing = await prisma.caseStudy.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        title: title.trim(),
        slug,
        displayIndex,
        num,
        category,
        tags,
        metric,
        metricDetail: metricDetail || metric,
        summary,
        problem,
        architecture,
        techStack,
        stackBadges: Array.isArray(stackBadges)
          ? JSON.stringify(stackBadges)
          : stackBadges || null,
        imageUrl,
        galleryImages: Array.isArray(galleryImages)
          ? JSON.stringify(galleryImages)
          : galleryImages || null,
        impact,
        year,
        status,
        featured: Boolean(featured),
        order: Number(order) || 0,
      },
    });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "CREATE_CASE_STUDY",
          entityType: "CASE_STUDY",
          entityId: caseStudy.id,
          diff: JSON.stringify({ title: caseStudy.title, slug: caseStudy.slug }),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, caseStudy }, { status: 201 });
  } catch (error) {
    console.error("Create case study error:", error);
    return NextResponse.json({ error: "Failed to create case study." }, { status: 500 });
  }
}
