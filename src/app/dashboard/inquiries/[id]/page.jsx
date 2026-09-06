import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import InquiryDossierView from "./components/InquiryDossierView";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    select: { fullName: true, telemetryCode: true },
  });

  if (!inquiry) {
    return { title: "Inquiry Not Found // Gerat Mission Control" };
  }

  return {
    title: `${inquiry.fullName} [${inquiry.telemetryCode}] // Gerat CRM`,
    description: `Lead Dossier and Client Communications Center for ${inquiry.fullName}`,
  };
}

export default async function InquiryDossierPage({ params }) {
  const { id } = await params;

  const [inquiry, teamMembers] = await Promise.all([
    prisma.inquiry.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true, role: true },
        },
        notes: {
          include: {
            author: { select: { id: true, name: true, role: true } },
          },
          orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
        },
        communications: {
          include: {
            actor: { select: { id: true, name: true, role: true } },
          },
          orderBy: { loggedAt: "desc" },
        },
      },
    }),
    prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!inquiry) {
    notFound();
  }

  return <InquiryDossierView initialInquiry={inquiry} teamMembers={teamMembers} />;
}
