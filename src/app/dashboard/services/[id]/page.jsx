import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ServicePillarEditor from "../components/ServicePillarEditor";

export const metadata = {
  title: "Edit Practice Pillar // Gerat Mission Control",
  description: "Update practice scope, deliverables, and technical architecture",
};

export default async function EditServicePillarPage({ params }) {
  const { id } = await params;
  const pillar = await prisma.servicePillar.findUnique({
    where: { id },
  });

  if (!pillar) {
    notFound();
  }

  return <ServicePillarEditor initialData={pillar} isNew={false} />;
}
