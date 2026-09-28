import React from "react";
import prisma from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import OurFocus from "@/components/home/OurFocus";
import HowWeWork from "@/components/home/HowWeWork";
import WhyGerat from "@/components/home/WhyGerat";
import OurLeadership from "@/components/home/OurLeadership";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

/**
 * V2 Homepage — Storytelling Scroll Architecture
 * Narrative order:
 * 01. Hero (The Promise)
 * 02. The Bridge (What Gerat Builds)
 * 03. How We Work (The Process)
 * 04. Point of View (What We Believe)
 * 05. Five Founders (The Team)
 * 06. Final CTA (What Happens Next)
 * 07. Footer
 */
export default async function Home() {
  let initialLeaders = null;
  let initialPillars = null;

  try {
    const [totalMembers, totalPillars, teamMembers, servicePillars] =
      await Promise.all([
        prisma.teamMember.count().catch(() => 0),
        prisma.servicePillar.count().catch(() => 0),
        prisma.teamMember
          .findMany({
            where: { active: true },
            orderBy: [{ order: "asc" }, { createdAt: "asc" }],
          })
          .catch(() => []),
        prisma.servicePillar
          .findMany({
            where: { active: true },
            orderBy: [{ order: "asc" }, { num: "asc" }],
          })
          .catch(() => []),
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
        email: m.email,
        twitterUrl: m.twitterUrl,
        linkedinUrl: m.linkedinUrl,
        githubUrl: m.githubUrl,
      }));
    }

    // 2. Service Pillars for Capabilities section
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
  } catch (error) {
    console.error("Home page SSR Prisma fetch error:", error);
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      {/* 01. The Promise */}
      <Hero />

      {/* 02. The Bridge */}
      <OurFocus initialPillars={initialPillars} />

      {/* 03. The Process */}
      <HowWeWork />

      {/* 04. Why Gerät (Why It Works Differently) */}
      <WhyGerat />

      {/* 05. Five Founders / The Team */}
      <OurLeadership initialLeaders={initialLeaders} />

      {/* 05. What Happens Next */}
      <FinalCTA />

      {/* 06. Footer */}
      <Footer />
    </div>
  );
}
