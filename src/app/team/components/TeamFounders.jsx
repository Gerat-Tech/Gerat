"use client";

import TeamCard from "@/components/common/TeamCard";

export default function TeamFounders() {
  const founders = [
    {
      name: "Jillian Chen",
      role: "EDDA",
      image: "/image/team/Founders/WQF__0001_Founder_Jill-Chen_Edda.webp",
    },
    {
      name: "Gerard Heath",
      role: "NOVYRA",
      image: "/image/team/Founders/WQF__0002_Founder-Novyra_Gerard-Health.webp",
    },
    {
      name: "Brandon Krull",
      role: "ALPHA DEAL",
      image:
        "/image/team/Founders/WQF__0003_Founder_Brandon-Krull_Alpha-Deal.webp",
    },
    {
      name: "Thiam Lee",
      role: "REMIX LABS",
      image: "/image/team/Founders/WQF__0004_Thiam-Lee_Remix-Labs.webp",
    },
    {
      name: "Milton Lopez",
      role: "US AUTONOMOUS SYSTEMS",
      image:
        "/image/team/Founders/WQF__0005_Founder-COO_US-Autonomous-Systems_.Milton-Lopezjpg.webp",
    },
    {
      name: "Mohammed Saadat",
      role: "STRATAHUB",
      image: "/image/team/Founders/WQF__0006_Founder_Mohammed.webp",
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
        {founders.map((advisor, index) => (
          <TeamCard key={index} {...advisor} />
        ))}
      </div>
    </section>
  );
}
