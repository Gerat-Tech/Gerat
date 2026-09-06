import React from "react";
import prisma from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import OurEthos from "@/components/home/OurEthos";
import OurFocus from "@/components/home/OurFocus";
import BrandCreativeSection from "@/components/home/BrandCreativeSection";
import OurPortfolio from "@/components/home/OurPortfolio";
import HowWeWork from "@/components/home/HowWeWork";
import OurLeadership from "@/components/home/OurLeadership";
import Partners from "@/components/home/Partners";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export default async function Home() {
  let initialLeaders = null;
  let initialProjects = null;
  let marqueeTokens = null;

  try {
    const [teamMembers, caseStudies, siteConfigs] = await Promise.all([
      prisma.teamMember.findMany({
        where: { active: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      }),
      prisma.caseStudy.findMany({
        where: { featured: true },
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        take: 3,
      }),
      prisma.siteConfig.findMany(),
    ]);

    // 1. Team Leadership: Prefer EXECUTIVE_LEADERSHIP, or top active members
    const execs = teamMembers.filter((m) => m.division === "EXECUTIVE_LEADERSHIP");
    const leadersToUse = execs.length > 0 ? execs : teamMembers.slice(0, 3);
    if (leadersToUse.length > 0) {
      initialLeaders = leadersToUse.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.roleTitle,
        specialty: m.focusTag,
        bio: m.bio,
        image: m.photoUrl || "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
      }));
    }

    // 2. Portfolio Projects
    let projectsToUse = caseStudies;
    if (projectsToUse.length === 0) {
      projectsToUse = await prisma.caseStudy.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        take: 3,
      });
    }

    if (projectsToUse.length > 0) {
      initialProjects = projectsToUse.map((p, idx) => ({
        ...p,
        id: p.displayIndex || `0${idx + 1}`,
        image: p.imageUrl,
        description: p.summary,
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

    // 3. Marquee Tokens from SiteConfig
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
    <div className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      <Hero />
      <Marquee customItems={marqueeTokens} />
      <OurEthos />
      <OurFocus />
      <BrandCreativeSection />
      <OurPortfolio initialProjects={initialProjects} />
      <HowWeWork />
      <OurLeadership initialLeaders={initialLeaders} />
      <Partners />
      <Footer />
    </div>
  );
}
