import React from "react";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CaseStudyEditor from "../components/CaseStudyEditor";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
    select: { title: true, displayIndex: true },
  });

  if (!caseStudy) {
    return { title: "Case Study Not Found // Gerat Mission Control" };
  }

  return {
    title: `Edit: ${caseStudy.title} [${caseStudy.displayIndex}] // Gerat Mission Control`,
    description: "Edit flagship portfolio case study",
  };
}

export default async function EditCaseStudyPage({ params }) {
  const { id } = await params;

  const caseStudy = await prisma.caseStudy.findUnique({
    where: { id },
  });

  if (!caseStudy) {
    notFound();
  }

  return <CaseStudyEditor initialCaseStudy={caseStudy} />;
}
