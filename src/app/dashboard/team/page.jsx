import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import TeamClientView from "./components/TeamClientView";

export const metadata = {
  title: "Team Roster CMS // Gerat Mission Control",
  description: "Manage leadership, engineers, creative directors, and advisors",
};

export default async function TeamDashboardPage() {
  let members = [];
  try {
    members = await prisma.teamMember.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
  } catch (error) {
    console.warn("TeamDashboardPage: unable to fetch team members:", error.message);
  }

  const total = members.length;
  const activeCount = members.filter((m) => m.active).length;
  const leadershipCount = members.filter((m) => m.division === "EXECUTIVE_LEADERSHIP").length;
  const engineeringCount = members.filter((m) => m.division === "ENGINEERING_PRACTITIONER").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white">
              TEAM ROSTER CMS
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
              CADRE GOVERNANCE
            </span>
          </div>
          <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase mt-1">
            MANAGE EXECUTIVE LEADERSHIP, ENGINEERING CADRE, CREATIVE DIRECTORS, AND ADVISORS
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/team/new"
            className="py-2 px-4 bg-accent hover:bg-[#ff5c1a] text-black font-azeret text-[10px] tracking-[0.15em] font-bold uppercase rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <span>+ ADD TEAM MEMBER</span>
          </Link>
        </div>
      </div>

      {/* KPI Ribbon */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
            TOTAL ROSTER
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-white mt-1">
            {total.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-emerald-400 uppercase">
            ACTIVE PROFILES
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
            {activeCount.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-accent uppercase">
            EXECUTIVE LEADERSHIP
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-accent mt-1">
            {leadershipCount.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-blue-400 uppercase">
            ENGINEERING CADRE
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-blue-400 mt-1">
            {engineeringCount.toString().padStart(2, "0")}
          </div>
        </div>
      </section>

      {/* Client View Component */}
      <TeamClientView initialMembers={members} />
    </div>
  );
}
