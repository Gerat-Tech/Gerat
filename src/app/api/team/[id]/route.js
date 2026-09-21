import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";
import { leadershipTeam, engineeringSpecialists } from "@/content/index.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function findStaticMember(id) {
  const normalizedId = (id || "").toLowerCase().trim();
  const searchName = normalizedId.replace(/-/g, " ");

  return [...leadershipTeam, ...engineeringSpecialists].find((m) => {
    const slug = m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const roleSlug = (m.role || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return (
      slug === normalizedId ||
      roleSlug === normalizedId ||
      m.name.toLowerCase() === searchName ||
      m.name.toLowerCase() === normalizedId
    );
  });
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    let member = null;

    try {
      member = await prisma.teamMember.findUnique({
        where: { id },
      });
      if (!member) {
        member = await prisma.teamMember.findFirst({
          where: {
            OR: [
              { name: { contains: id.replace(/-/g, " ") } },
              { name: { contains: id } },
            ],
          },
        });
      }
    } catch (dbErr) {
      console.warn("DB findUnique failed in GET team/[id]:", dbErr.message);
    }

    if (!member) {
      const found = findStaticMember(id);
      if (found) {
        member = {
          id,
          name: found.name,
          roleTitle: found.role,
          division: leadershipTeam.includes(found)
            ? "EXECUTIVE_LEADERSHIP"
            : "ENGINEERING_PRACTITIONER",
          focusTag: found.specialty || found.discipline || "ENGINEERING ARCHITECTURE",
          bio: found.bio || found.focus || "",
          photoUrl: found.image,
          email: found.email || null,
          linkedinUrl: found.linkedinUrl || null,
          twitterUrl: found.twitterUrl || null,
          githubUrl: found.githubUrl || null,
          order: 1,
          active: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
    }

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

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN, ROLES.OPERATIONS_LEAD, ROLES.EDITOR])) {
      return NextResponse.json({ error: "Forbidden: Insufficient privileges." }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();

    let existing = null;
    try {
      existing = await prisma.teamMember.findUnique({ where: { id } });
      if (!existing) {
        existing = await prisma.teamMember.findFirst({
          where: {
            OR: [
              { name: { contains: id.replace(/-/g, " ") } },
              { name: { contains: id } },
            ],
          },
        });
      }
    } catch (e) {
      console.warn("DB lookup error in PATCH team/[id]:", e.message);
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
    if (body.email !== undefined) data.email = body.email?.trim() || null;
    if (body.linkedinUrl !== undefined) data.linkedinUrl = body.linkedinUrl?.trim() || null;
    if (body.githubUrl !== undefined) data.githubUrl = body.githubUrl?.trim() || null;
    if (body.twitterUrl !== undefined) data.twitterUrl = body.twitterUrl?.trim() || null;

    let updated = null;
    const targetId = existing?.id || id;

    try {
      updated = await prisma.teamMember.upsert({
        where: { id: targetId },
        update: data,
        create: {
          id: targetId,
          name: data.name || "UNNAMED ARCHITECT",
          roleTitle: data.roleTitle || "ENGINEERING LEADERSHIP",
          division: data.division || "EXECUTIVE_LEADERSHIP",
          focusTag: data.focusTag || "SYSTEMS ARCHITECTURE",
          bio: data.bio || "",
          photoUrl: data.photoUrl || "/image/team/leadership/Dawit.jpeg",
          order: data.order !== undefined ? data.order : 1,
          active: data.active !== undefined ? data.active : true,
          email: data.email || null,
          linkedinUrl: data.linkedinUrl || null,
          githubUrl: data.githubUrl || null,
          twitterUrl: data.twitterUrl || null,
        },
      });

      // Invalidate Next.js cache so public pages immediately show updated data
      try {
        revalidatePath("/team");
        revalidatePath("/");
        revalidatePath("/dashboard/team");
        revalidatePath(`/dashboard/team/${targetId}`);
      } catch (revErr) {
        console.warn("revalidatePath warning:", revErr.message);
      }

      // Record audit log if writable
      try {
        await prisma.auditLog.create({
          data: {
            actorId: user.id,
            action: "UPDATE_TEAM_MEMBER",
            entityType: "TEAM_MEMBER",
            entityId: updated.id,
            diff: JSON.stringify(data),
          },
        });
      } catch {}
    } catch (dbErr) {
      console.error("DB write failed in PATCH team/[id]:", dbErr);
      return NextResponse.json(
        {
          error: `Database write failed: ${dbErr.message || "Failed to update team member in database."}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      member: updated,
      message: "Team member updated successfully.",
    });
  } catch (error) {
    console.error("Update team member error:", error);
    return NextResponse.json({ error: error.message || "Failed to update team member." }, { status: 500 });
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
      const existing = await prisma.teamMember.findFirst({
        where: {
          OR: [
            { id },
            { name: { contains: id.replace(/-/g, " ") } },
            { name: { contains: id } },
          ],
        },
      });

      if (existing) {
        await prisma.teamMember.delete({ where: { id: existing.id } });

        try {
          revalidatePath("/team");
          revalidatePath("/");
          revalidatePath("/dashboard/team");
        } catch {}

        try {
          await prisma.auditLog.create({
            data: {
              actorId: user.id,
              action: "DELETE_TEAM_MEMBER",
              entityType: "TEAM_MEMBER",
              entityId: existing.id,
              diff: JSON.stringify({ name: existing.name }),
            },
          });
        } catch {}
      }
    } catch (dbErr) {
      console.warn("DB delete error in DELETE team/[id]:", dbErr.message);
    }

    return NextResponse.json({ success: true, message: "Team member deleted successfully." });
  } catch (error) {
    console.error("Delete team member error:", error);
    return NextResponse.json({ error: "Failed to delete team member." }, { status: 500 });
  }
}
