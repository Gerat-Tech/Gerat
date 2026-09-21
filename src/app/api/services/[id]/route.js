import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";
import { servicePillars } from "@/content/index.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function findStaticPillar(id) {
  const cleanId = (id || "").replace(/^sp_/, "").toLowerCase();
  return servicePillars.find(
    (p) =>
      p.num.toLowerCase() === cleanId ||
      `sp_${p.num.toLowerCase()}` === (id || "").toLowerCase() ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === (id || "").toLowerCase()
  );
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    let pillar = null;

    try {
      pillar = await prisma.servicePillar.findFirst({
        where: {
          OR: [{ id }, { num: id }, { num: id.replace(/^sp_/, "") }],
        },
      });
    } catch (dbErr) {
      console.warn("DB findFirst error in GET services/[id]:", dbErr.message);
    }

    if (!pillar) {
      const p = findStaticPillar(id);
      if (p) {
        pillar = {
          id: `sp_${p.num}`,
          num: p.num,
          title: p.title,
          tagline: p.tagline,
          desc: p.desc,
          deliverables: JSON.stringify(p.deliverables || []),
          deepLink: p.deepLink || "/services",
          order: 1,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
    }

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

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN, ROLES.OPERATIONS_LEAD, ROLES.EDITOR])) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    let existing = null;
    try {
      existing = await prisma.servicePillar.findFirst({
        where: {
          OR: [{ id }, { num: id }, { num: id.replace(/^sp_/, "") }],
        },
      });
    } catch (e) {
      console.warn("DB lookup error in PATCH services/[id]:", e.message);
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

    let updated = null;
    const targetId = existing?.id || id;

    try {
      updated = await prisma.servicePillar.upsert({
        where: { id: targetId },
        update: data,
        create: {
          id: targetId,
          num: data.num || "01",
          title: data.title || "UNTITLED PRACTICE PILLAR",
          tagline: data.tagline || "ARCHITECTURAL CAPABILITY",
          desc: data.desc || "",
          deliverables: data.deliverables || "[]",
          deepLink: data.deepLink || "/services",
          order: data.order ?? 1,
          active: data.active ?? true,
        },
      });

      // Invalidate Next.js cache so public pages immediately show updated data
      try {
        revalidatePath("/services");
        revalidatePath("/");
        revalidatePath("/dashboard/services");
        revalidatePath(`/dashboard/services/${targetId}`);
      } catch (revErr) {
        console.warn("revalidatePath warning:", revErr.message);
      }

      // Record audit log
      try {
        await prisma.auditLog.create({
          data: {
            actorId: user.id,
            action: "UPDATE_SERVICE_PILLAR",
            entityType: "SERVICE_PILLAR",
            entityId: updated.id,
            diff: JSON.stringify(data),
          },
        });
      } catch {}
    } catch (dbErr) {
      console.error("DB write failed in PATCH services/[id]:", dbErr);
      return NextResponse.json(
        { error: `Database write failed: ${dbErr.message || "Failed to update service pillar."}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, pillar: updated });
  } catch (error) {
    console.error("Update service pillar error:", error);
    return NextResponse.json({ error: error.message || "Failed to update service pillar." }, { status: 500 });
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
      const existing = await prisma.servicePillar.findFirst({
        where: {
          OR: [{ id }, { num: id }, { num: id.replace(/^sp_/, "") }],
        },
      });

      if (existing) {
        await prisma.servicePillar.delete({ where: { id: existing.id } });

        try {
          revalidatePath("/services");
          revalidatePath("/");
          revalidatePath("/dashboard/services");
        } catch {}

        try {
          await prisma.auditLog.create({
            data: {
              actorId: user.id,
              action: "DELETE_SERVICE_PILLAR",
              entityType: "SERVICE_PILLAR",
              entityId: existing.id,
              diff: JSON.stringify({ num: existing.num, title: existing.title }),
            },
          });
        } catch {}
      }
    } catch (dbErr) {
      console.warn("DB delete error in DELETE services/[id]:", dbErr.message);
    }

    return NextResponse.json({ success: true, message: "Service pillar deleted successfully." });
  } catch (error) {
    console.error("Delete service pillar error:", error);
    return NextResponse.json({ error: "Failed to delete service pillar." }, { status: 500 });
  }
}
