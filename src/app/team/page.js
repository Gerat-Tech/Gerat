import React from "react";
import prisma from "@/lib/prisma";
import TeamHero from "./components/TeamHero";
import TeamLeadership from "./components/TeamLeadership";
import AdvisorAndTeam from "./components/AdvisorAndTeam";
import TeamEthos from "./components/TeamEthos";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Engineering Leadership & Team | Gerat Software Solutions PLC",
  description:
    "Meet the software architects, artificial intelligence researchers, and distributed systems engineers directing Gerat's mission-critical platforms.",
};

export default async function TeamPage() {
  let initialLeaders = null;
  let initialSpecialists = null;

  try {
    const allMembers = await prisma.teamMember.findMany({
      where: { active: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    const execs = allMembers.filter((m) => m.division === "EXECUTIVE_LEADERSHIP");
    const nonExecs = allMembers.filter((m) => m.division !== "EXECUTIVE_LEADERSHIP");

    if (execs.length > 0) {
      initialLeaders = execs.map((m) => ({
        name: m.name,
        role: m.roleTitle,
        specialty: m.focusTag,
        bio: m.bio,
        image: m.photoUrl || "/image/team/leadership/WQF__0000_Founder-IgorTulchinsky.webp",
      }));
    }

    if (nonExecs.length > 0) {
      initialSpecialists = nonExecs.map((m) => ({
        name: m.name,
        role: m.roleTitle || m.division.replace("_", " "),
        discipline: m.focusTag || m.division.replace("_", " "),
        focus: m.bio,
        image: m.photoUrl || "/image/team/advisors/WQF__0000_Advisor-MarkCarney.webp",
      }));
    }
  } catch (error) {
    console.error("TeamPage SSR Prisma fetch error:", error);
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      <TeamHero />
      <TeamLeadership initialLeaders={initialLeaders} />
      <AdvisorAndTeam initialSpecialists={initialSpecialists} />
      <TeamEthos />
      <Footer />
    </div>
  );
}
