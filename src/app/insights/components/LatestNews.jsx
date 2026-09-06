"use client";

import React from "react";
import FadeUp from "@/components/motion/FadeUp";

const articles = [
  {
    id: 1,
    title: "Architecting Deterministic RAG Pipelines for Institutional Knowledge Retrieval",
    category: "APPLIED AI",
    date: "AUG 2026",
    readTime: "6 MIN READ",
    excerpt:
      "A deep dive into contextual document chunking, hybrid BM25 + dense vector indexing, and confidence-threshold filtering for compliance-critical environments.",
    image: "/image/LatestNews/01_Picture.webp",
    featured: true,
  },
  {
    id: 2,
    title: "Zero-Downtime Event Sourcing: Migrating Legacy Municipal Databases to Distributed Kafka",
    category: "SYSTEM ARCHITECTURE",
    date: "JUL 2026",
    readTime: "8 MIN READ",
    excerpt:
      "How we decoupled multi-decade monolithic relational stores into an immutable event log without disrupting day-to-day citizen registry transactions.",
    image: "/image/LatestNews/02_Advisor_Dmitry-Green.webp",
  },
  {
    id: 3,
    title: "Cryptographic Integrity in Civic Registries: Tamper-Evident Document Verification",
    category: "SECURITY",
    date: "JUN 2026",
    readTime: "5 MIN READ",
    excerpt:
      "Implementing Merkle-tree validation and zero-knowledge verification proofs for inter-agency document authentication at national scale.",
    image: "/image/LatestNews/03_Chris-Mason-hero.webp",
  },
  {
    id: 4,
    title: "Scaling High-Concurrency Enterprise ERPs Under Heavy Supply Chain Volatility",
    category: "ENTERPRISE ERP",
    date: "MAY 2026",
    readTime: "7 MIN READ",
    excerpt:
      "Architectural strategies for distributed warehouse reconciliation, optimistic concurrency locks, and real-time inventory ledger synchronization.",
    image: "/image/LatestNews/04_Amir_Husain_Hero.webp",
  },
  {
    id: 5,
    title: "Local LLMs vs. Cloud Endpoints: Cost, Latency, and Sovereignty in Sensitive Workflows",
    category: "APPLIED AI",
    date: "APR 2026",
    readTime: "9 MIN READ",
    excerpt:
      "Analyzing on-premise quantized model deployments against frontier cloud APIs across latency metrics, operational cost ceilings, and institutional data privacy.",
    image: "/image/LatestNews/05_Apha_deal_launch.webp",
  },
  {
    id: 6,
    title: "Designing Zero-Trust API Gateways for Inter-Agency Government Platforms",
    category: "SECURITY",
    date: "MAR 2026",
    readTime: "6 MIN READ",
    excerpt:
      "Hardening public sector infrastructure through dynamic mTLS certificate rotation, token-bucket throttling, and deep semantic payload inspection.",
    image: "/image/LatestNews/06_jorik-kleen.webp",
  },
];

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
                    <span>//</span>
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
