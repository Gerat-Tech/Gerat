"use client";
import React from "react";
import Link from "next/link";

export default function InsightsHero() {
  return (
    <section className="bg-black">
      {/* Added dark background for context */}
      <div className=" px-10 md:px-15 flex items-center gap-[24px] pt-[160px] pb-[40px] md:pt-[220px]">
        {/* Sidebar Navigation - Hidden on mobile */}
        <div className="hidden w-full max-w-[207px] md:block">
          <ul className="font-azeret text-[14px] flex flex-col gap-[8px]">
            <li>
              <Link
                href="/insights/news"
                className="text-white/80 uppercase  hover:text-white transition-colors"
              >
                Latest News
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <div className="max-w-[1020px]">
          <h1 className="font-azeret text-[14px] text-white/60 uppercase flex items-center gap-[10px]">
            <span className="bg-white w-[10px] h-[10px] rounded-[3px]"></span>
            Insights
          </h1>

          <div className="text-[50px] leading-tight text-white mt-[20px] uppercase md:mt-[24px] animate-reveal">
            STORIES, REFLECTIONS AND ADVICE FROM THE FOUNDRY TEAM.
            <br />
          </div>
        </div>
      </div>
    </section>
  );
}
