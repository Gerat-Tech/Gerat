import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ServicePillarEditor from "../components/ServicePillarEditor";
import { servicePillars } from "@/content/index.js";

function findStaticPillar(id) {
  const cleanId = (id || "").replace(/^sp_/, "").toLowerCase();
  return servicePillars.find(
    (p) =>
      p.num.toLowerCase() === cleanId ||
      `sp_${p.num.toLowerCase()}` === (id || "").toLowerCase() ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === (id || "").toLowerCase()
  );
}

export const metadata = {
  title: "Edit Practice Pillar · Gerat Mission Control",
  description: "Update practice scope, deliverables, and technical architecture",
};

export default async function EditServicePillarPage({ params }) {
  const { id } = await params;
  let pillar = null;

  try {
    pillar = await prisma.servicePillar.findFirst({
      where: {
        OR: [{ id }, { num: id }, { num: id.replace(/^sp_/, "") }],
      },
    });
  } catch (err) {
    console.warn("EditServicePillarPage DB lookup error:", err.message);
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
    notFound();
  }

  return <ServicePillarEditor initialData={pillar} isNew={false} />;
}
