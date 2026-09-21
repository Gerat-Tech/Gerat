import React from "react";
import prisma from "@/lib/prisma";
import TeamHero from "./components/TeamHero";
import TeamLeadership from "./components/TeamLeadership";
import AdvisorAndTeam from "./components/AdvisorAndTeam";
import TeamEthos from "./components/TeamEthos";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Engineering Leadership & Team | Gerat Software Solution",
  description:
    "Meet the software architects, artificial intelligence researchers, and distributed systems engineers directing Gerat's mission-critical platforms.",
};

export default async function TeamPage() {
  let initialLeaders = null;
  let initialSpecialists = null;

  try {
    const totalCount = await prisma.teamMember.count().catch(() => 0);
    if (totalCount > 0) {
      const allMembers = await prisma.teamMember
        .findMany({
          where: { active: true },
          orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        })
        .catch(() => []);

      const execs = allMembers.filter((m) => m.division === "EXECUTIVE_LEADERSHIP");
      const nonExecs = allMembers.filter((m) => m.division !== "EXECUTIVE_LEADERSHIP");

      initialLeaders = execs.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.roleTitle,
        specialty: m.focusTag,
        bio: m.bio,
        email: m.email,
        linkedinUrl: m.linkedinUrl,
        githubUrl: m.githubUrl,
        twitterUrl: m.twitterUrl,
        image: m.photoUrl || "/image/team/leadership/Dawit.jpeg",
      }));

      initialSpecialists = nonExecs.map((m) => ({
        id: m.id,
        name: m.name,
        role: m.roleTitle || m.division.replace("_", " "),
        discipline: m.focusTag || m.division.replace("_", " "),
        focus: m.bio,
        email: m.email,
        linkedinUrl: m.linkedinUrl,
        githubUrl: m.githubUrl,
        twitterUrl: m.twitterUrl,
        image: m.photoUrl && !m.photoUrl.includes("WQF__") ? m.photoUrl : "/brand/gerat-mark-orange.svg",
      }));
    }
  } catch (error) {
    console.error("TeamPage SSR Prisma fetch error:", error);
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      <TeamHero />
      <TeamLeadership initialLeaders={initialLeaders} />
      <AdvisorAndTeam initialSpecialists={initialSpecialists} />
      <TeamEthos />
      <Footer />
    </div>
  );
}
