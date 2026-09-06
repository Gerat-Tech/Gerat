"use client";

import React, { useState } from "react";
import SectionLabel from "../common/SectionLabel";
import FadeUp from "../motion/FadeUp";
import SplitText from "../motion/SplitText";

const capabilities = [
  {
    index: "01",
    title: "ENTERPRISE SOFTWARE ARCHITECTURE",
    tags: "DISTRIBUTED SYSTEMS // CLOUD NATIVE // HIGH-AVAILABILITY",
    description:
      "Architecting resilient, horizontally scalable microservices and cloud backends capable of processing complex enterprise workloads with zero downtime.",
  },
  {
    index: "02",
    title: "DOMAIN-GROUNDED AI & RAG NETWORKS",
    tags: "LOCAL LLMS // HYBRID SEARCH // VECTOR EMBEDDINGS",
    description:
      "Production-grade Retrieval-Augmented Generation engines, proprietary embedding pipelines, and localized AI models grounded strictly in institutional verification.",
  },
  {
    index: "03",
    title: "CUSTOM ERP & OPERATIONAL PLATFORMS",
    tags: "WORKFLOW AUTOMATION // LOGISTICS // FINANCIAL OPS",
    description:
      "Purpose-built enterprise resource planning platforms unifying inventory, procurement, payroll, and real-time ledger accounting into one synchronized source of truth.",
  },
  {
    index: "04",
    title: "PUBLIC-SECTOR & INSTITUTIONAL PLATFORMS",
    tags: "CIVIC TECH // SECURE REGISTRIES // NATIONAL SYSTEMS",
    description:
      "High-security digital governance infrastructure, citizen portals, and institutional document verification networks designed for national resilience.",
  },
  {
    index: "05",
    title: "REAL-TIME TELEMETRY & DATA INFRASTRUCTURE",
    tags: "APACHE KAFKA // TIME-SERIES // STREAM ANALYTICS",
    description:
      "Low-latency streaming architectures, operational telemetry dashboards, and high-concurrency event ingestion pipelines for critical environments.",
  },
  {
    index: "06",
    title: "HIGH-PERFORMANCE WEB & MOBILE SUITES",
    tags: "NEXT.JS // REACT NATIVE // PROGRESSIVE WEB APPS",
    description:
      "Award-winning editorial web applications and cross-platform native mobile clients built with micro-interaction choreography and sub-second load times.",
  },
  {
    index: "07",
    title: "API INFRASTRUCTURES & SYSTEM INTEGRATION",
    tags: "GRAPHQL // GRPC // REST // LEGACY BRIDGE",
    description:
      "Bridging mission-critical legacy databases with modern microservices through high-throughput, type-safe API gateways and transactional brokers.",
  },
  {
    index: "08",
    title: "SECURITY, COMPLIANCE & ZERO-TRUST HARDENING",
    tags: "RBAC // ISO AUDIT TRAILS // CRYPTOGRAPHIC VERIFICATION",
    description:
      "Airtight cryptographic identity, fine-grained role-based access control, automated vulnerability pipelines, and institutional audit compliance.",
  },
];

export default function OurFocus() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="capabilities"
      aria-label="Capabilities"
      className="relative w-full bg-[#050505] text-white py-24 sm:py-32 border-b border-white/10"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 mb-16 lg:mb-20 max-w-3xl">
          <SectionLabel index="02" label="CAPABILITIES" />
          <SplitText
            text="SPECIALIZED DISCIPLINES"
            as="h2"
            className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
          />
          <SplitText
            text="BUILT FOR SCALE."
            as="h2"
            wordClassName="text-accent"
            className="font-roc text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight uppercase leading-[0.95]"
          />
          <FadeUp delay={0.2} y={16}>
            <p className="font-roc text-base sm:text-lg text-white/70 leading-relaxed pt-2">
              From high-throughput data processing to domain-grounded artificial
              intelligence, we engineer every layer with surgical precision and
              structural resilience.
            </p>
          </FadeUp>
        </div>

        {/* Interactive Capability Rows Table (Spec §27) */}
        <div className="w-full border-t border-white/10">
          {capabilities.map((item, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={item.index}
                tabIndex={0}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(idx)}
                onBlur={() => setHoveredIndex(null)}
                className={`group relative border-b border-white/10 py-6 sm:py-8 px-4 sm:px-6 transition-all duration-300 cursor-pointer outline-none ${
                  isHovered ? "bg-white/[0.03]" : "bg-transparent"
                }`}
              >
                {/* Active Indicator Accent Line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-accent transition-opacity duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-baseline">
                  {/* Column 1: Index */}
                  <div className="lg:col-span-1 font-azeret text-[12px] tracking-[0.2em] text-white/40 group-hover:text-accent transition-colors">
                    {item.index}
                  </div>

                  {/* Column 2: Title & Tags */}
                  <div className="lg:col-span-6 flex flex-col gap-1.5">
                    <h3 className="font-roc text-xl sm:text-2xl font-semibold tracking-tight uppercase text-white group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <span className="font-azeret text-[9px] sm:text-[10px] tracking-[0.2em] text-white/50 uppercase">
                      {item.tags}
                    </span>
                  </div>

                  {/* Column 3: Description */}
                  <div className="lg:col-span-4 font-roc text-xs sm:text-sm text-white/60 group-hover:text-white/80 leading-relaxed transition-colors">
                    {item.description}
                  </div>

                  {/* Column 4: Trailing Arrow */}
                  <div className="lg:col-span-1 flex justify-end font-azeret text-sm text-white/30 group-hover:text-accent group-hover:translate-x-1 transition-all">
                    →
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
