import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

import { servicePillars } from "@/content/index.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

    let pillars = [];
    try {
      pillars = await prisma.servicePillar.findMany({
        where,
        orderBy: [{ order: "asc" }, { num: "asc" }],
      });
    } catch (dbErr) {
      console.warn("Prisma servicePillar findMany failed, falling back to static content:", dbErr.message);
    }

    if (!pillars || pillars.length === 0) {
      let order = 1;
      pillars = servicePillars.map((p) => ({
        id: `sp_${p.num}`,
        num: p.num,
        title: p.title,
        tagline: p.tagline,
        desc: p.desc,
        deliverables: JSON.stringify(p.deliverables || []),
        deepLink: p.deepLink || "/services",
        order: order++,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      if (search) {
        const lower = search.toLowerCase();
        pillars = pillars.filter(
          (p) =>
            p.title.toLowerCase().includes(lower) ||
            p.tagline.toLowerCase().includes(lower) ||
            p.desc.toLowerCase().includes(lower)
        );
      }
    }

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

    try {
      revalidatePath("/services");
      revalidatePath("/");
      revalidatePath("/dashboard/services");
    } catch {}

    return NextResponse.json({ success: true, pillar }, { status: 201 });
  } catch (error) {
    console.error("Create service pillar error:", error);
    return NextResponse.json({ error: "Failed to create service pillar." }, { status: 500 });
  }
}
