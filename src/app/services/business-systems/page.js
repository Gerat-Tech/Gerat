"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import Footer from "@/components/layout/Footer";
import { useNav } from "@/context/NavContext";
import {
  Boxes,
  Truck,
  Receipt,
  Users2,
  RefreshCw,
  Database,
  Building2,
  History,
  WifiOff,
  GraduationCap,
} from "lucide-react";

const SYSTEMS_DISCIPLINES = [
  {
    num: "01",
    title: "CUSTOM ERP & OPERATIONAL PLATFORMS",
    longDesc:
      "Unified enterprise software built around how your organization actually functions, eliminating the bloat and per-user SaaS license fees of rigid commercial software.",
    deliverables: [
      "Bespoke Business Logic Engines & Workflows",
      "Multi-Department Operational Unification",
      "Role-Based Access Control (RBAC) & Permissions",
      "Executive KPI Cockpits & Real-Time Reporting",
    ],
    cta: "BUILD CUSTOM ERP",
    icon: Boxes,
  },
  {
    num: "02",
    title: "INVENTORY & SUPPLY CHAIN HUBS",
    longDesc:
      "Live multi-warehouse inventory tracking, automated replenishment triggers, and distribution telemetry engineered to eliminate stockouts and accounting discrepancies.",
    deliverables: [
      "Multi-Location Warehouse & Stock Tracking",
      "Barcode, Batch & Serial Traceability",
      "Automated Purchase Order Reorder Triggers",
      "Fuel & Bulk Goods Dispensing Telemetry",
    ],
    cta: "OPTIMIZE SUPPLY CHAIN",
    icon: Truck,
  },
  {
    num: "03",
    title: "BILLING, INVOICING & FINANCIAL WORKFLOWS",
    longDesc:
      "Automated invoicing pipelines, recurring billing schedules, and ledger reconciliation built to accelerate cash flow and eliminate manual accounting errors.",
    deliverables: [
      "Automated Pro-Forma & Tax Invoice Generation",
      "Payment Gateway Webhook Sync & Reconciliation",
      "Aging Accounts Receivable (AR) Dashboards",
      "Audit-Ready Financial Mutation Logs",
    ],
    cta: "AUTOMATE FINANCIAL PIPELINE",
    icon: Receipt,
  },
  {
    num: "04",
    title: "INTERNAL TEAM PORTALS & DISPATCH",
    longDesc:
      "High-density staff consoles that allow operators, managers, and field staff to coordinate assignments, dispatch jobs, and track operational SLAs in real time.",
    deliverables: [
      "Live Job Dispatch Queues & Assignment Logic",
      "Mobile-Friendly Field Inspection Forms",
      "Status Advancement & Approval Workflows",
      "Team SLA & Output Performance Dashboards",
    ],
    cta: "BUILD TEAM PORTAL",
    icon: Users2,
  },
  {
    num: "05",
    title: "LEGACY MODERNIZATION & DATA MIGRATION",
    longDesc:
      "Safely transition disconnected Excel sheets, Microsoft Access files, or aging on-premise tools into a modern, cloud-accessible architecture with zero data loss.",
    deliverables: [
      "Data Normalization, Cleansing & Deduplication",
      "Zero-Downtime Database Migration Strategies",
      "Parallel Run Validation & Integrity Audits",
      "Employee Transition Training & Change Management",
    ],
    cta: "MODERNIZE LEGACY SYSTEM",
    icon: RefreshCw,
  },
  {
    num: "06",
    title: "CENTRAL DATABASE & API ARCHITECTURE",
    longDesc:
      "Robust PostgreSQL and relational database foundations engineered for strict data integrity, automated point-in-time backups, and scalable API bridges.",
    deliverables: [
      "ACID-Compliant Relational Database Design",
      "Automated Snapshot Backups & Disaster Recovery",
      "Secure REST & GraphQL Integration APIs",
      "Third-Party Service Webhook Connectors",
    ],
    cta: "ARCHITECT DATABASE",
    icon: Database,
  },
];

const STANDARDS = [
  {
    icon: Building2,
    title: "NO PER-SEAT SAAS LICENSES",
    desc: "You own the platform outright. Scale from 10 to 1,000 employees without paying escalating monthly per-user fees to third-party vendors.",
  },
  {
    icon: History,
    title: "IMMUTABLE AUDIT LOGS",
    desc: "Every record mutation, financial transaction, and status transition is permanently logged with user ID, timestamp, and IP verification.",
  },
  {
    icon: WifiOff,
    title: "OFFLINE & DISTRIBUTED RESILIENCE",
    desc: "Engineered for real-world operational reliability, featuring client-side caching and resilient synchronization when network connectivity fluctuates.",
  },
  {
    icon: GraduationCap,
    title: "STAFF ONBOARDING & TRAINING",
    desc: "We don't just hand over code. We conduct hands-on training sessions and produce step-by-step video manuals so your team hits the ground running.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Why build a custom business system rather than buying off-the-shelf software?",
    a: "Commercial ERPs (SAP, Odoo, NetSuite) force your company into rigid workflows that rarely fit how you actually work, while charging steep recurring per-seat monthly fees. A custom system is built 100% around your operating model, becomes your company's permanent asset, and scales without licensing penalties.",
  },
  {
    q: "How do you guarantee that daily business operations aren't disrupted during rollout?",
    a: "We use staged rollout strategies and parallel validation phases. The new system runs alongside your existing workflow until your team and managers are completely confident in data accuracy before full cutover.",
  },
  {
    q: "Can warehouse staff and field workers use the platform on mobile devices?",
    a: "Yes. All interfaces are responsive, lightweight, and engineered with touch-friendly 48px targets, allowing field workers, drivers, and warehouse staff to access key flows directly on mobile phones or tablets.",
  },
  {
    q: "What ongoing maintenance and support do you provide?",
    a: "We offer ongoing technical support agreements including automated database backups, security patches, performance monitoring, and SLA-backed engineering availability as your business grows.",
  },
];

export default function BusinessSystemsPage() {
  const { openContact } = useNav();
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] mx-auto pt-36 sm:pt-44 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 border-b border-white/10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <SectionLabel label="BUSINESS SYSTEMS" />

          <div className="space-y-2">
            <SplitText
              text="CONNECTED SYSTEMS."
              as="h1"
              className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-tight uppercase leading-[1.04]"
            />
            <SplitText
              text="UNBROKEN"
              as="div"
              className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-tight uppercase leading-[1.04]"
            />
            <SplitText
              text="OPERATIONS."
              as="div"
              wordClassName="text-accent"
              className="font-parkinsans text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-semibold tracking-tight uppercase leading-[1.04]"
            />
          </div>

          <FadeUp delay={0.3} y={16}>
            <p className="font-artific text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
              Connected software that unites operations, inventory, and workflows so your business runs with less friction, fewer errors, and complete accountability.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} y={16}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => openContact({ discipline: "systems", subOption: "Custom ERP" })}
                className="inline-flex items-center font-parkinsans text-xs uppercase tracking-[0.18em] px-6 sm:px-7 py-3 bg-accent text-white font-semibold hover:bg-accent/90 transition-all rounded-full"
              >
                <span>MODERNIZE YOUR OPERATIONS</span>
                <span className="ml-2">→</span>
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 6 Core Disciplines Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-14 sm:py-18 md:py-20 border-b border-white/10">
        <div className="flex flex-col gap-3 mb-10 sm:mb-12">
          <span className="font-parkinsans text-xs tracking-[0.25em] text-accent uppercase font-semibold">
            OPERATIONS CATALOG
          </span>
          <h2 className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08]">
            SOFTWARE THAT SCALES WITH YOU.
          </h2>
          <p className="font-artific text-xs sm:text-sm text-white/60 max-w-xl">
            Custom ERP, inventory, and workflow platforms that streamline company operations and provide complete visibility across your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SYSTEMS_DISCIPLINES.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <FadeUp key={item.title} delay={0.08 * idx} y={24}>
                <div className="group relative bg-[var(--surface)] border border-white/10 hover:border-accent/80 p-6 sm:p-7 rounded-2xl flex flex-col justify-between min-h-[320px] transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                      <span className="font-parkinsans text-xs tracking-[0.2em] text-accent font-semibold">
                        DISCIPLINE
                      </span>
                      <IconComp className="size-4 text-white/40 group-hover:text-accent transition-colors" />
                    </div>

                    <h3 className="font-parkinsans text-lg sm:text-xl font-semibold tracking-tight uppercase text-white mt-4 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-artific text-xs sm:text-sm text-white/70 leading-relaxed mt-2">
                      {item.longDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 mt-5">
                    <span className="font-parkinsans text-[10px] tracking-[0.2em] text-white/40 uppercase block mb-2.5 font-semibold">
                      CORE DELIVERABLES
                    </span>
                    <ul className="space-y-1.5 font-artific text-xs text-white/60">
                      {item.deliverables.map((del) => (
                        <li key={del} className="hover:text-white transition-colors flex items-center gap-2">
                          <span className="size-1 rounded-full bg-accent/80 shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 mt-5 border-t border-white/5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          openContact({
                            discipline: "systems",
                            subOption: item.title.includes("ERP")
                              ? "Custom ERP"
                              : item.title.includes("INVENTORY") || item.title.includes("LOGISTICS")
                              ? "Operations Platform"
                              : item.title.includes("BILLING") || item.title.includes("FINANCIAL")
                              ? "Workflow Engine"
                              : "Internal Software",
                          })
                        }
                        className="font-parkinsans text-[11px] tracking-[0.18em] text-accent hover:text-white uppercase transition-colors"
                      >
                        {item.cta} →
                      </button>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </section>

      {/* Production Standards Matrix */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-20 sm:py-28 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <SectionLabel label="ARCHITECTURAL INTEGRITY" />
            <h2 className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08]">
              STRUCTURAL STABILITY. <br />
              <span className="text-accent">BUILT TO LAST.</span>
            </h2>
            <p className="font-artific text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl">
              We design business software that stands the test of time. Clean relational databases, immutable audit logs, and zero per-seat licensing penalties.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {STANDARDS.map((std) => {
              const IconComp = std.icon;
              return (
                <div
                  key={std.title}
                  className="p-5 sm:p-6 bg-[var(--surface)] border border-white/10 rounded-2xl flex flex-col gap-2.5"
                >
                  <IconComp className="size-5 text-accent" />
                  <span className="font-parkinsans text-xs sm:text-sm tracking-wider text-white font-semibold uppercase">
                    {std.title}
                  </span>
                  <p className="text-white/60 leading-relaxed font-artific text-xs mt-1">
                    {std.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-20 sm:py-28">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <div className="text-center flex flex-col items-center gap-3">
            <span className="font-parkinsans text-xs tracking-[0.25em] text-accent uppercase font-semibold">
              OPERATIONAL CLARITY
            </span>
            <h2 className="font-parkinsans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight uppercase leading-[1.08]">
              FREQUENTLY ASKED QUESTIONS.
            </h2>
          </div>

          <div className="space-y-3.5 pt-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="border border-white/10 bg-[var(--surface)] p-5 sm:p-6 rounded-2xl transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-parkinsans text-sm sm:text-base font-semibold uppercase text-white hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="font-parkinsans text-xs text-accent ml-4">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="font-artific text-xs sm:text-sm text-white/70 leading-relaxed mt-3 pt-3 border-t border-white/10">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Master Footer */}
      <Footer />
    </div>
  );
}
