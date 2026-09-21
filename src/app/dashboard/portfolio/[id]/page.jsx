import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CaseStudyEditor from "../components/CaseStudyEditor";
import { portfolioProjects } from "@/content/index.js";

function findStaticCaseStudy(id) {
  const normalizedId = (id || "").toLowerCase().trim();
  return portfolioProjects.find(
    (p) =>
      p.id.toLowerCase() === normalizedId ||
      p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") === normalizedId
  );
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  let caseStudy = null;

  try {
    caseStudy = await prisma.caseStudy.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      select: { title: true, displayIndex: true },
    });
  } catch {}

  if (!caseStudy) {
    const p = findStaticCaseStudy(id);
    if (p) {
      caseStudy = { title: p.title, displayIndex: p.index };
    }
  }

  if (!caseStudy) {
    return { title: "Case Study Not Found · Gerat Mission Control" };
  }

  return {
    title: `Edit: ${caseStudy.title} [${caseStudy.displayIndex}] · Gerat Mission Control`,
    description: "Edit flagship portfolio case study",
  };
}

export default async function EditCaseStudyPage({ params }) {
  const { id } = await params;

  let caseStudy = null;
  try {
    caseStudy = await prisma.caseStudy.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });
  } catch (err) {
    console.warn("EditCaseStudyPage DB lookup error:", err.message);
  }

  if (!caseStudy) {
    const p = findStaticCaseStudy(id);
    if (p) {
      caseStudy = {
        id: p.id,
        slug: p.id,
        displayIndex: p.index,
        num: p.num || `${p.index} · 09`,
        title: p.title,
        category: p.category,
        tags: p.tags,
        metric: p.metric,
        metricDetail: p.metricDetail || p.metric,
        summary: p.summary,
        problem: p.problem,
        architecture: p.architecture,
        techStack: p.tech,
        stackBadges: JSON.stringify(p.stack || []),
        imageUrl: p.image,
        galleryImages: JSON.stringify([p.image]),
        impact: p.impact,
        year: p.year,
        status: p.status,
        featured: true,
        order: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  }

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyEditor initialCaseStudy={caseStudy} />;
}
