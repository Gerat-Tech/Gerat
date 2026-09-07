import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import ArticlesClientView from "./components/ArticlesClientView";

export const metadata = {
  title: "Research & Insights CMS // Gerat Mission Control",
  description: "Publish and maintain technical whitepapers, architecture retrospectives, and field dispatches",
};

export default async function InsightsDashboardPage() {
  let articles = [];
  try {
    articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: { id: true, name: true, email: true, role: true },
        },
      },
    });
  } catch (error) {
    console.error("InsightsDashboardPage fetch error:", error);
  }

  const total = articles.length;
  const published = articles.filter((a) => a.status === "PUBLISHED").length;
  const drafts = articles.filter((a) => a.status === "DRAFT").length;
  const inReview = articles.filter((a) => a.status === "IN_REVIEW").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold tracking-tight uppercase text-white">
              RESEARCH & INSIGHTS CMS
            </h1>
            <span className="font-azeret text-[9px] tracking-[0.2em] px-2 py-0.5 rounded-[2px] bg-accent/15 border border-accent/40 text-accent uppercase font-bold">
              EDITORIAL SUITE
            </span>
          </div>
          <p className="font-azeret text-[10px] tracking-[0.15em] text-white/40 uppercase mt-1">
            AUTHOR, REVIEW, AND DEPLOY TECHNICAL WHITEPAPERS AND ENGINEERING RETROSPECTIVES
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/insights/new"
            className="py-2 px-4 bg-accent hover:bg-[#ff5c1a] text-black font-azeret text-[10px] tracking-[0.15em] font-bold uppercase rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <span>+ NEW BLUEPRINT</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
            TOTAL BLUEPRINTS
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-white mt-1">
            {total.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-emerald-400 uppercase">
            PUBLISHED LIVE
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
            {published.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-amber-400 uppercase">
            IN EDITORIAL REVIEW
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-amber-400 mt-1">
            {inReview.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
          <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
            WORK IN PROGRESS / DRAFTS
          </div>
          <div className="font-roc text-2xl sm:text-3xl font-bold text-white/70 mt-1">
            {drafts.toString().padStart(2, "0")}
          </div>
        </div>
      </section>

      {/* Main Articles View Component */}
      <ArticlesClientView initialArticles={articles} />
    </div>
  );
}
