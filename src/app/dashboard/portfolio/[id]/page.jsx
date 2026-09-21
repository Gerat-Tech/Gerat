import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CaseStudyEditor from "../components/CaseStudyEditor";

export const dynamic = "force-dynamic";

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
    notFound();
  }

  return <CaseStudyEditor initialCaseStudy={caseStudy} />;
}
