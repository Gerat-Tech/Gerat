"use client";

import React from "react";
import FadeUp from "@/components/motion/FadeUp";

import { insightsArticles as articles } from "@/content";

export default function LatestNews({ activeCategory = "ALL ARTICLES" }) {
  const filteredArticles =
    activeCategory === "ALL ARTICLES"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-24 sm:pb-36 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((article, idx) => (
          <FadeUp key={article.id} delay={0.08 * idx} y={24}>
            <article className="group relative bg-[#0e0e0e] border border-white/10 hover:border-accent/60 rounded-[4px] overflow-hidden transition-all duration-300 flex flex-col justify-between h-full">
              {/* Precision Corner Accents */}
              <span className="absolute top-0 left-0 size-2 border-t border-l border-white/30 group-hover:border-accent transition-colors z-20" />
              <span className="absolute top-0 right-0 size-2 border-t border-r border-white/30 group-hover:border-accent transition-colors z-20" />
              <span className="absolute bottom-0 left-0 size-2 border-b border-l border-white/30 group-hover:border-accent transition-colors z-20" />
              <span className="absolute bottom-0 right-0 size-2 border-b border-r border-white/30 group-hover:border-accent transition-colors z-20" />

              {/* Image Banner */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-black/60">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent" />
                <div className="absolute top-3 left-3 font-azeret text-[9px] tracking-[0.2em] text-accent bg-black/80 px-2.5 py-1 border border-accent/40 rounded-[1px] uppercase">
                  {article.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    <span>{article.date}</span>
                    <span>{"//"}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-roc text-xl sm:text-2xl font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors leading-tight">
                    {article.title}
                  </h2>

                  <p className="font-roc text-xs sm:text-sm text-white/65 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-azeret text-[10px] tracking-[0.2em] uppercase text-white/50 group-hover:text-white">
                  <span>READ BLUEPRINT</span>
                  <span className="text-accent group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
