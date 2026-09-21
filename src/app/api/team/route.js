import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

import { leadershipTeam, engineeringSpecialists } from "@/content/index.js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const division = searchParams.get("division");
    const active = searchParams.get("active");
    const search = searchParams.get("search");

    const where = {};
    if (division && division !== "ALL") {
      where.division = division;
    }
    if (active === "true") {
      where.active = true;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { roleTitle: { contains: search } },
        { focusTag: { contains: search } },
        { bio: { contains: search } },
      ];
    }

    let members = null;
    let dbAvailable = false;
    try {
      const totalCount = await prisma.teamMember.count();
      if (totalCount > 0) {
        dbAvailable = true;
        members = await prisma.teamMember.findMany({
          where,
          orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        });
      }
    } catch (dbErr) {
      console.warn("Prisma teamMember findMany failed, falling back to static content:", dbErr.message);
    }

    if (!dbAvailable) {
      let order = 1;
      const staticLeadership = leadershipTeam.map((m) => ({
        id: m.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: m.name,
        roleTitle: m.role,
        division: "EXECUTIVE_LEADERSHIP",
        focusTag: m.specialty,
        bio: m.bio,
        photoUrl: m.image,
        email: m.email || null,
        linkedinUrl: m.linkedinUrl || null,
        twitterUrl: m.twitterUrl || null,
        githubUrl: m.githubUrl || null,
        order: order++,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      const staticEngineering = engineeringSpecialists.map((m) => ({
        id: (m.name || m.role).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: m.name,
        roleTitle: m.role,
        division: "ENGINEERING_PRACTITIONER",
        focusTag: m.discipline,
        bio: m.focus,
        photoUrl: m.image,
        email: m.email || null,
        linkedinUrl: m.linkedinUrl || null,
        twitterUrl: m.twitterUrl || null,
        githubUrl: m.githubUrl || null,
        order: order++,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));

      members = [...staticLeadership, ...staticEngineering];

      if (division && division !== "ALL") {
        members = members.filter((m) => m.division === division);
      }
      if (active === "true") {
        members = members.filter((m) => m.active);
      }
      if (search) {
        const lower = search.toLowerCase();
        members = members.filter(
          (m) =>
            m.name.toLowerCase().includes(lower) ||
            m.roleTitle.toLowerCase().includes(lower) ||
            m.focusTag.toLowerCase().includes(lower) ||
            m.bio.toLowerCase().includes(lower)
        );
      }
    }

    return NextResponse.json({ success: true, members: members || [] });
  } catch (error) {
    console.error("Fetch team members error:", error);
    return NextResponse.json({ error: "Failed to fetch team members." }, { status: 500 });
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
        ROLES.EDITOR,
      ])
    ) {
      return NextResponse.json(
        { error: "Insufficient permissions to add team members." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      name,
      roleTitle,
      division = "ENGINEERING_PRACTITIONER",
      focusTag = "SYSTEMS ARCHITECTURE",
      bio = "",
      photoUrl = "/brand/gerat-mark-orange.svg",
      order = 0,
      active = true,
      email,
      linkedinUrl,
      githubUrl,
      twitterUrl,
    } = body;

    if (!name?.trim() || !roleTitle?.trim()) {
      return NextResponse.json({ error: "Name and role title are required." }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        name: name.trim(),
        roleTitle: roleTitle.trim(),
        division,
        focusTag: focusTag.trim(),
        bio: bio.trim(),
        photoUrl: photoUrl.trim(),
        order: Number(order) || 0,
        active: Boolean(active),
        email: email?.trim() || null,
        linkedinUrl: linkedinUrl?.trim() || null,
        githubUrl: githubUrl?.trim() || null,
        twitterUrl: twitterUrl?.trim() || null,
      },
    });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "CREATE_TEAM_MEMBER",
          entityType: "TEAM_MEMBER",
          entityId: member.id,
          diff: JSON.stringify({ name: member.name, role: member.roleTitle }),
        },
      });
    } catch {}

    try {
      revalidatePath("/team");
      revalidatePath("/");
      revalidatePath("/dashboard/team");
    } catch {}

    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (error) {
    console.error("Create team member error:", error);
    return NextResponse.json({ error: "Failed to create team member." }, { status: 500 });
  }
}
