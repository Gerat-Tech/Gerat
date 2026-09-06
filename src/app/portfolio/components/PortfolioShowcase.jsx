"use client";

import React, { useEffect, useRef, useState } from "react";
import FadeUp from "@/components/motion/FadeUp";
import { useNav } from "@/context/NavContext";

const allProjects = [
  {
    id: "national-records",
    index: "01",
    num: "01 / 06",
    title: "NATIONAL DIGITAL RECORDS ENGINE",
    category: "PUBLIC SECTOR",
    tags: "PUBLIC SECTOR & INSTITUTIONAL",
    metric: "12M+ RECORDS SECURED // SUB-SECOND VERIFICATION // 99.999% UPTIME",
    problem:
      "Fragmented physical archives across regional bureaus created multi-week certificate processing times and vulnerable record integrity.",
    architecture:
      "Engineered a distributed, immutable ledger with cryptographic signature verification, zero-knowledge agency auditing, and automated identity reconciliation.",
    tech: "DISTRIBUTED POSTGRES // NEXT.JS // CRYPTOGRAPHIC AUDITING // GO",
    image: "/image/portfolioPage/US-AUT-3.webp",
  },
  {
    id: "axiom-erp",
    index: "02",
    num: "02 / 06",
    title: "AXIOM ENTERPRISE ERP & SUPPLY SUITE",
    category: "ENTERPRISE ERP",
    tags: "ENTERPRISE LOGISTICS & OPERATIONS",
    metric: "45% CYCLE REDUCTION // 14 FACILITIES SYNCHRONIZED",
    problem:
      "Complex cross-border inventory and warehouse logistics suffered from reconciliation lag and disconnected legacy billing databases.",
    architecture:
      "Unified inventory, real-time telemetry, automated replenishment orders, and automated ledger balancing into a single event-driven hub.",
    tech: "REACT // NODE.JS // TIMESCALEDB // APACHE KAFKA",
    image: "/image/portfolioPage/stratahub-featured.webp",
  },
  {
    id: "synapse-rag",
    index: "03",
    num: "03 / 06",
    title: "SYNAPSE KNOWLEDGE RAG ENGINE",
    category: "AI & RAG NETWORKS",
    tags: "INTELLIGENT SYSTEMS & APPLIED AI",
    metric: "500K+ REGULATORY DOCUMENTS // 98.4% CITATION ACCURACY",
    problem:
      "Legal and policy research teams spent hundreds of hours manually cross-referencing conflicting institutional regulations.",
    architecture:
      "Deployed a multi-tenant RAG architecture with proprietary semantic chunking, dense vector indexes, and strict source citation grounding.",
    tech: "PYTHON // FASTAPI // QDRANT // LANGCHAIN // NEXT.JS",
    image: "/image/portfolioPage/Alph-1_2026-02-17-164533_rxel.webp",
  },
  {
    id: "civic-identity",
    index: "04",
    num: "04 / 06",
    title: "CIVIC IDENTITY & ENROLLMENT PORTAL",
    category: "PUBLIC SECTOR",
    tags: "CIVIC TECH & DIGITAL SERVICES",
    metric: "3.5M CITIZENS ENROLLED // 100% REGULATORY AUDIT PASS",
    problem:
      "Manual citizen registration workflows created hours-long physical queues and delayed credential issuance.",
    architecture:
      "Hardened progressive web app with biometric validation hooks, offline caching, and high-concurrency cloud sync.",
    tech: "NEXT.JS // TAILWIND // REDIS // KUBERNETES",
    image: "/image/portfolioPage/edda-featured.webp",
  },
  {
    id: "pulse-telemetry",
    index: "05",
    num: "05 / 06",
    title: "PULSE REAL-TIME TELEMETRY PLATFORM",
    category: "TELEMETRY",
    tags: "INDUSTRIAL IOT & DATA INFRASTRUCTURE",
    metric: "85K EVENTS/SEC // SUB-50MS LATENCY",
    problem:
      "Critical infrastructure equipment operated without centralized telemetry, making anomaly detection reactive rather than predictive.",
    architecture:
      "Time-series stream processing pipeline ingesting sensor data with automated threshold alerts and real-time visualization.",
    tech: "GO // APACHE KAFKA // INFLUXDB // WEBSOCKETS",
    image: "/image/portfolioPage/remix-labs-featured.webp",
  },
  {
    id: "sentinel-gateway",
    index: "06",
    num: "06 / 06",
    title: "SENTINEL API GATEWAY & SECURITY BROKER",
    category: "ENTERPRISE ERP",
    tags: "CYBERSECURITY & SYSTEM INTEROPERABILITY",
    metric: "ZERO EXPLOITS // 250+ MICROSERVICES INTERCONNECTED",
    problem:
      "Disparate municipal IT backends required unified API access without exposing internal network topologies.",
    architecture:
      "High-throughput reverse-proxy gateway enforcing mTLS, dynamic token rotation, rate-limiting, and deep packet inspection.",
    tech: "RUST // ENVOY // GRPC // REDIS",
    image: "/image/portfolioPage/novyra-featured.webp",
  },
];

export default function PortfolioShowcase({ activeCategory = "ALL DISCIPLINES" }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const itemsRef = useRef([]);
  const { openContact } = useNav();

  const filteredProjects =
    activeCategory === "ALL DISCIPLINES"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  // Observer to update active item in sticky sidebar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = itemsRef.current.indexOf(entry.target);
            if (idx !== -1) setActiveIdx(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pb-24 sm:pb-36 flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Sticky Navigation Sidebar (Spec §18) */}
      <aside className="hidden lg:block w-72 shrink-0">
        <nav className="sticky top-28 flex flex-col gap-8 bg-[#0a0a0a] border border-white/10 p-6 rounded-[3px]">
          <div className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
            DIRECTORY // {filteredProjects.length} SYSTEMS
          </div>

          <ul className="flex flex-col gap-1.5">
            {filteredProjects.map((p, i) => {
              const isActive = activeIdx === i;
              return (
                <li key={p.id}>
                  <a
                    href={`#${p.id}`}
                    className={`group flex items-center justify-between py-2 px-3 rounded-[2px] font-azeret text-[11px] tracking-[0.15em] uppercase transition-all duration-300 ${
                      isActive
                        ? "bg-accent/15 text-white border-l-2 border-accent"
                        : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                    }`}
                  >
                    <span className="truncate max-w-[160px]">{p.title}</span>
                    <span className="text-[9px] text-white/40 group-hover:text-accent">
                      {p.index}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={openContact}
              className="w-full py-3 px-4 bg-accent text-white font-azeret text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-colors rounded-[2px]"
            >
              COMMISSION A SYSTEM →
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Case Study Cards Feed */}
      <div className="flex-1 flex flex-col gap-12 sm:gap-16">
        {filteredProjects.map((p, i) => (
          <article
            key={p.id}
            id={p.id}
            ref={(el) => (itemsRef.current[i] = el)}
            className="group relative bg-[#0e0e0e] border border-white/10 hover:border-accent/60 rounded-[4px] overflow-hidden transition-all duration-400"
          >
            {/* Precision Corner Accents */}
            <span className="absolute top-0 left-0 size-2.5 border-t border-l border-white/30 group-hover:border-accent transition-colors z-20" />
            <span className="absolute top-0 right-0 size-2.5 border-t border-r border-white/30 group-hover:border-accent transition-colors z-20" />
            <span className="absolute bottom-0 left-0 size-2.5 border-b border-l border-white/30 group-hover:border-accent transition-colors z-20" />
            <span className="absolute bottom-0 right-0 size-2.5 border-b border-r border-white/30 group-hover:border-accent transition-colors z-20" />

            {/* Media Banner */}
            <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden bg-black">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-full object-cover object-center opacity-75 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3">
                <span className="font-azeret text-[10px] tracking-[0.2em] text-white/80 bg-black/80 backdrop-blur-md px-3 py-1 border border-white/15 rounded-[1px]">
                  {p.num}
                </span>
                <span className="font-azeret text-[9px] tracking-[0.2em] text-accent bg-black/80 backdrop-blur-md px-3 py-1 border border-accent/40 rounded-[1px] uppercase">
                  {p.category}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-10 flex flex-col gap-6">
              {/* Title & Impact Metric */}
              <div className="flex flex-col gap-2">
                <span className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  {p.tags}
                </span>
                <h2 className="font-roc text-2xl sm:text-4xl font-bold tracking-tight uppercase text-white group-hover:text-accent transition-colors">
                  {p.title}
                </h2>
                <div className="font-azeret text-[10px] sm:text-[11px] tracking-[0.15em] text-accent font-semibold pt-1">
                  IMPACT // {p.metric}
                </div>
              </div>

              {/* Architecture & Problem Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="flex flex-col gap-2">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-white/50 uppercase">
                    OPERATIONAL CHALLENGE
                  </span>
                  <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed">
                    {p.problem}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-azeret text-[9px] tracking-[0.2em] text-white/50 uppercase">
                    ENGINEERED RESOLUTION
                  </span>
                  <p className="font-roc text-xs sm:text-sm text-white/70 leading-relaxed">
                    {p.architecture}
                  </p>
                </div>
              </div>

              {/* Technology & Action Row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="font-azeret text-[9px] sm:text-[10px] tracking-[0.2em] text-white/40 uppercase">
                  STACK: {p.tech}
                </div>

                <button
                  type="button"
                  onClick={openContact}
                  className="inline-flex items-center font-azeret text-[10px] sm:text-[11px] uppercase tracking-[0.2em] px-5 py-2.5 border border-white/20 hover:border-accent hover:bg-accent/15 text-white transition-all rounded-[2px]"
                >
                  <span>INQUIRE ABOUT THIS ARCHITECTURE</span>
                  <span className="ml-2 text-accent">→</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
