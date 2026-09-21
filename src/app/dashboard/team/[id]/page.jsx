import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import TeamMemberEditor from "../components/TeamMemberEditor";
import { leadershipTeam, engineeringSpecialists } from "@/content/index.js";

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

export async function generateMetadata({ params }) {
  const { id } = await params;
  let member = null;

  try {
    member = await prisma.teamMember.findUnique({
      where: { id },
      select: { name: true, roleTitle: true },
    });
    if (!member) {
      member = await prisma.teamMember.findFirst({
        where: {
          OR: [
            { name: { contains: id.replace(/-/g, " ") } },
            { name: { contains: id } },
          ],
        },
        select: { name: true, roleTitle: true },
      });
    }
  } catch {}

  if (!member) {
    const found = findStaticMember(id);
    if (found) {
      member = { name: found.name, roleTitle: found.role };
    }
  }

  if (!member) {
    return { title: "Team Member Not Found · Gerat Mission Control" };
  }

  return {
    title: `Edit: ${member.name} · Gerat Mission Control`,
    description: `Update profile for ${member.name} (${member.roleTitle})`,
  };
}

export default async function EditTeamMemberPage({ params }) {
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
  } catch (err) {
    console.warn("EditTeamMemberPage DB lookup error:", err.message);
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
      };
    }
  }

  if (!member) {
    notFound();
  }

  return <TeamMemberEditor initialMember={member} />;
}
