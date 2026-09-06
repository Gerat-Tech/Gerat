import React from "react";
import TeamHero from "./components/TeamHero";
import TeamLeadership from "./components/TeamLeadership";
import AdvisorAndTeam from "./components/AdvisorAndTeam";
import TeamEthos from "./components/TeamEthos";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Engineering Leadership & Team | Gerat Software Solutions PLC",
  description:
    "Meet the software architects, artificial intelligence researchers, and distributed systems engineers directing Gerat's mission-critical platforms.",
};

export default function TeamPage() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      <TeamHero />
      <TeamLeadership />
      <AdvisorAndTeam />
      <TeamEthos />
      <Footer />
    </main>
  );
}
