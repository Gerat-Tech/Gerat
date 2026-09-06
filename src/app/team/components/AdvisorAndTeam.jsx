"use client";

import TeamCard from "@/components/common/TeamCard";

export default function AdvisorsAndTeam() {
  const advisors = [
    {
      name: "John Doe",
      role: "AI Advisor",
      image:
        "/image/team/AdvisorAndTeam/WQF__01_Advisor_Savi-Glow-1_Health-Tech-and-Space.webp",
    },
    {
      name: "Jane Smith",
      role: "Blockchain Expert",
      image: "/image/team/AdvisorAndTeam/WQF__02_Advisor_Dmitry-Green.webp",
    },
    {
      name: "Michael Lee",
      role: "FinTech Specialist",
      image:
        "/image/team/AdvisorAndTeam/WQF__03_Advisor_Zaib-Husain_Venture-and-Robotics.webp",
    },
    {
      name: "Sarah Khan",
      role: "Startup Mentor",
      image:
        "/image/team/AdvisorAndTeam/WQF__04_Advisor_John-King-3_Chief-Marketing-Officer.webp",
    },
    {
      name: "David Kim",
      role: "Tech Strategist",
      image: "/image/team/AdvisorAndTeam/WQF__05_Peter Lee.webp",
    },
    {
      name: "Emma Wilson",
      role: "Growth Advisor",
      image:
        "/image/team/AdvisorAndTeam/WQF__06_Advisor_Chris-Mason-2_Health-Tech-and-Space.webp",
    },
    {
      name: "Emma Wilson",
      role: "Growth Advisor",
      image: "/image/team/AdvisorAndTeam/WQF__07_Advisor_Murina.webp",
    },
    {
      name: "Emma Wilson",
      role: "Growth Advisor",
      image: "/image/team/AdvisorAndTeam/WQF__08_team-chris.webp",
    },
    {
      name: "Emma Wilson",
      role: "Growth Advisor",
      image:
        "/image/team/AdvisorAndTeam/WQF__09_Advisor_Nicholas-Tatonetti_Health-Tech.webp",
    },
    {
      name: "Emma Wilson",
      role: "Growth Advisor",
      image: "/image/team/AdvisorAndTeam/WQF__10_Advisor_Kyle.webp",
    },
  ];

  return (
    <section className="mt-[120px] grid grid-cols-12 gap-y-[24px] lg:gap-x-[40px]">
      {/* LEFT SIDE */}
      <div className="col-span-12 lg:col-span-3 flex flex-col gap-[12px] md:py-[40px]">
        <div className="flex items-center gap-[1ch] text-sm font-mono">
          <h2>advisors</h2>
          <p className="text-white/60">[06]</p>
        </div>

        <p className="text-white/60 text-sm max-w-[250px]">
          Experts guiding innovation across AI, blockchain, fintech, and
          emerging technologies.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-span-12 lg:col-span-9 grid md:grid-cols-5 gap-[16px] md:gap-[24px]">
        {advisors.map((advisor, index) => (
          <TeamCard key={index} {...advisor} />
        ))}
      </div>
    </section>
  );
}
