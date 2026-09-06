import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get("active");
    const search = searchParams.get("search");

    const where = {};
    if (active === "true") {
      where.active = true;
    }
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { tagline: { contains: search } },
        { desc: { contains: search } },
      ];
    }

    const pillars = await prisma.servicePillar.findMany({
      where,
      orderBy: [{ order: "asc" }, { num: "asc" }],
    });

    return NextResponse.json({ success: true, pillars });
  } catch (error) {
    console.error("Fetch service pillars error:", error);
    return NextResponse.json({ error: "Failed to fetch service pillars." }, { status: 500 });
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
        { error: "Insufficient permissions to configure service pillars." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      num = "01",
      title,
      tagline,
      desc = "",
      deliverables,
      deepLink,
      order = 0,
      active = true,
    } = body;

    if (!title?.trim() || !tagline?.trim()) {
      return NextResponse.json({ error: "Title and tagline are required." }, { status: 400 });
    }

    const pillar = await prisma.servicePillar.create({
      data: {
        num: num.trim(),
        title: title.trim(),
        tagline: tagline.trim(),
        desc: desc.trim(),
        deliverables: Array.isArray(deliverables)
          ? JSON.stringify(deliverables)
          : deliverables || null,
        deepLink: deepLink?.trim() || null,
        order: Number(order) || 0,
        active: Boolean(active),
      },
    });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "CREATE_SERVICE_PILLAR",
          entityType: "SERVICE_PILLAR",
          entityId: pillar.id,
          diff: JSON.stringify({ num: pillar.num, title: pillar.title }),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, pillar }, { status: 201 });
  } catch (error) {
    console.error("Create service pillar error:", error);
    return NextResponse.json({ error: "Failed to create service pillar." }, { status: 500 });
  }
}
