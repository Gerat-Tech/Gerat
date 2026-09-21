import React from "react";
import prisma from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import OurFocus from "@/components/home/OurFocus";
import OurEthos from "@/components/home/OurEthos";
import OurPortfolio from "@/components/home/OurPortfolio";
import OurLeadership from "@/components/home/OurLeadership";
import HowWeWork from "@/components/home/HowWeWork";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  let initialLeaders = null;
  let initialProjects = null;
  let initialPillars = null;
  let marqueeTokens = null;

  try {
    const [totalMembers, totalStudies, totalPillars, teamMembers, caseStudies, servicePillars, siteConfigs] =
      await Promise.all([
        prisma.teamMember.count().catch(() => 0),
        prisma.caseStudy.count().catch(() => 0),
        prisma.servicePillar.count().catch(() => 0),
        prisma.teamMember
          .findMany({
            where: { active: true },
            orderBy: [{ order: "asc" }, { createdAt: "asc" }],
          })
          .catch(() => []),
        prisma.caseStudy
          .findMany({
            where: { featured: true },
            orderBy: [{ order: "asc" }, { createdAt: "desc" }],
            take: 3,
          })
          .catch(() => []),
        prisma.servicePillar
          .findMany({
            where: { active: true },
            orderBy: [{ order: "asc" }, { num: "asc" }],
          })
          .catch(() => []),
        prisma.siteConfig.findMany().catch(() => []),
      ]);

    // 1. Team Leadership: All active executive leaders
    if (totalMembers > 0) {
      const execs = teamMembers.filter((m) => m.division === "EXECUTIVE_LEADERSHIP");
      const leadersToUse = execs.length > 0 ? execs : teamMembers;
      initialLeaders = leadersToUse.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.roleTitle,
        roleTitle: m.roleTitle,
        specialty: m.focusTag,
        tag: m.focusTag || "EXECUTIVE LEADERSHIP",
        bio: m.bio,
        image: m.photoUrl || "/image/team/leadership/Dawit.jpeg",
        photoUrl: m.photoUrl || "/image/team/leadership/Dawit.jpeg",
      }));
    }

    // 2. Portfolio Projects
    if (totalStudies > 0) {
      let projectsToUse = caseStudies;
      if (projectsToUse.length === 0) {
        projectsToUse = await prisma.caseStudy
          .findMany({
            orderBy: [{ order: "asc" }, { createdAt: "desc" }],
            take: 3,
          })
          .catch(() => []);
      }

      initialProjects = projectsToUse.map((p, idx) => ({
        ...p,
        id: p.displayIndex || `0${idx + 1}`,
        image: p.imageUrl,
        description: p.summary,
        tech: p.techStack || p.tech || "",
        stack:
          typeof p.stackBadges === "string" && p.stackBadges.startsWith("[")
            ? JSON.parse(p.stackBadges)
            : Array.isArray(p.stackBadges)
            ? p.stackBadges
            : p.stackBadges
            ? p.stackBadges.split(",").map((s) => s.trim())
            : [],
      }));
    }

    // 3. Service Pillars for Capabilities section
    if (totalPillars > 0) {
      initialPillars = servicePillars.map((p) => {
        let dels = [];
        if (Array.isArray(p.deliverables)) {
          dels = p.deliverables;
        } else if (typeof p.deliverables === "string" && p.deliverables.startsWith("[")) {
          try {
            dels = JSON.parse(p.deliverables);
          } catch {
            dels = p.deliverables.split("\n").filter(Boolean);
          }
        } else if (p.deliverables) {
          dels = p.deliverables.split("\n").filter(Boolean);
        }

        return {
          ...p,
          index: p.num,
          title: p.title,
          tags: Array.isArray(dels) && dels.length > 0 ? dels.join(" · ") : p.tagline,
          description: p.desc || p.tagline,
          link: p.deepLink || "/services",
          deliverables: dels,
        };
      });
    }

    // 4. Marquee Tokens from SiteConfig
    const configMap = siteConfigs.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    if (configMap.MARQUEE_TOKENS) {
      try {
        const parsed = JSON.parse(configMap.MARQUEE_TOKENS);
        if (Array.isArray(parsed) && parsed.length > 0) {
          marqueeTokens = parsed;
        }
      } catch {}
    }
  } catch (error) {
    console.error("Home page SSR Prisma fetch error:", error);
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      <Hero />
      <Marquee customItems={marqueeTokens} />
      <OurFocus initialPillars={initialPillars} />
      <OurEthos />
      <OurPortfolio initialProjects={initialProjects} />
      <OurLeadership initialLeaders={initialLeaders} />
      <HowWeWork />
      <Footer />
    </div>
  );
}
