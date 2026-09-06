import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

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

    const members = await prisma.teamMember.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({ success: true, members });
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
        ROLES.TECHNICAL_EDITOR,
        ROLES.CREATIVE_EDITOR,
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
      photoUrl = "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
      order = 0,
      active = true,
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

    return NextResponse.json({ success: true, member }, { status: 201 });
  } catch (error) {
    console.error("Create team member error:", error);
    return NextResponse.json({ error: "Failed to create team member." }, { status: 500 });
  }
}
