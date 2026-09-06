import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import TeamMemberEditor from "../components/TeamMemberEditor";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({
    where: { id },
    select: { name: true, roleTitle: true },
  });

  if (!member) {
    return { title: "Team Member Not Found // Gerat Mission Control" };
  }

  return {
    title: `Edit: ${member.name} // Gerat Mission Control`,
    description: `Update profile for ${member.name} (${member.roleTitle})`,
  };
}

export default async function EditTeamMemberPage({ params }) {
  const { id } = await params;

  const member = await prisma.teamMember.findUnique({
    where: { id },
  });

  if (!member) {
    notFound();
  }

  return <TeamMemberEditor initialMember={member} />;
}
