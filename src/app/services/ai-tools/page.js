"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/common/SectionLabel";
import FadeUp from "@/components/motion/FadeUp";
import SplitText from "@/components/motion/SplitText";
import Footer from "@/components/layout/Footer";
import { useNav } from "@/context/NavContext";
import {
  Search,
  Bot,
  FileCheck2,
  Workflow,
  MessageSquareCheck,
  Server,
  Sparkles,
  ShieldCheck,
  Clock,
  UserCheck,
} from "lucide-react";

const AI_DISCIPLINES = [
  {
    num: "01",
    title: "ENTERPRISE KNOWLEDGE SEARCH & RETRIEVAL",
    longDesc:
      "Semantic search engines that index your company's documents, internal PDFs, operating manuals, and databases to deliver immediate, cited answers to employees and clients.",
    deliverables: [
      "Vector Embeddings & Semantic Indexing",
      "Direct Citation Tracing to Source Files",
      "Multi-Format Document Ingestion (PDF, Word, SQL)",
      "Zero-Hallucination Grounding Safeguards",
    ],
    cta: "BUILD KNOWLEDGE SEARCH",
    icon: Search,
  },
  {
    num: "02",
    title: "CUSTOM AI ASSISTANTS & COPILOTS",
    longDesc:
      "Specialized internal assistants that understand your company's SOPs, terminology, and workflows, assisting team members with research, drafting, and analysis.",
    deliverables: [
      "Role-Specific System Prompt Engineering",
      "Structured Output Schemas & Validation",
      "Persistent Conversational Memory",
      "Slack & Microsoft Teams Bot Integrations",
    ],
    cta: "DEPLOY INTERNAL ASSISTANT",
    icon: Bot,
  },
  {
    num: "03",
    title: "DOCUMENT INTELLIGENCE & DATA EXTRACTION",
    longDesc:
      "Automated extraction pipelines that convert unstructured invoices, receipts, contracts, and applications into clean structured data with human-in-the-loop validation.",
    deliverables: [
      "High-Accuracy OCR & Visual Document Parsing",
      "Automated Field Extraction & Verification",
      "Direct ERP & Relational Database Synchronization",
      "Confidence Scoring & Exception Flagging",
    ],
    cta: "AUTOMATE DOCUMENT WORKFLOW",
    icon: FileCheck2,
  },
  {
    num: "04",
    title: "PROCESS AUTOMATION & AUTONOMOUS AGENTS",
    longDesc:
      "Intelligent bots that connect your operational tools (CRM, email, spreadsheets, inventory) to execute repetitive multi-step operational tasks automatically.",
    deliverables: [
      "Multi-Step Operational Task Orchestration",
      "Event-Driven Webhook & Queue Triggers",
      "Automated Exception Handling & Error Retries",
      "Administrative Approval Gateways",
    ],
    cta: "AUTOMATE BUSINESS PROCESS",
    icon: Workflow,
  },
  {
    num: "05",
    title: "CUSTOMER-FACING AI CONCIERGES",
    longDesc:
      "24/7 intelligent chat agents that handle pre-sales inquiries, qualify prospective leads, and troubleshoot customer issues using your verified support documentation.",
    deliverables: [
      "Brand Tone & Professional Voice Calibration",
      "Automated Lead Scoring & CRM Ingestion",
      "Seamless Escalation to Human Support Staff",
      "Conversation Quality & Conversion Analytics",
    ],
    cta: "LAUNCH CUSTOMER AI AGENT",
    icon: MessageSquareCheck,
  },
  {
    num: "06",
    title: "PRIVATE MODEL HOSTING & SECURE APIS",
    longDesc:
      "Custom open-source or commercial AI models hosted inside your private cloud infrastructure, ensuring your proprietary company data never leaves your perimeter.",
    deliverables: [
      "On-Premise & Private Cloud Model Deployment",
      "Automatic PII Redaction & Data Scrubbing",
      "Rate-Limiting & Infrastructure Cost Monitoring",
      "Secure RESTful API Gateway Connections",
    ],
    cta: "SECURE MODEL DEPLOYMENT",
    icon: Server,
  },
];

const STANDARDS = [
  {
    icon: Sparkles,
    title: "CITATION TRACING (ZERO HALLUCINATIONS)",
    desc: "Every answer is mathematically anchored to your verified internal documentation with explicit clickable links to source chapters and page numbers.",
  },
  {
    icon: ShieldCheck,
    title: "STRICT DATA PRIVACY & ISOLATION",
    desc: "Your data is never used to train external models. We enforce zero-retention enterprise agreements and offer self-hosted open models (Llama/Mistral).",
  },
  {
    icon: Clock,
    title: "MEASURABLE TIME-SAVED ROI",
    desc: "We measure success by tangible operational efficiency: hours saved per team member, turnaround time reduction, and automated task volume.",
  },
  {
    icon: UserCheck,
    title: "HUMAN-IN-THE-LOOP SAFEGUARDS",
    desc: "Autonomous bots operate with strict guardrails. High-impact financial or client actions require explicit human confirmation before dispatch.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How do you prevent the AI from generating incorrect answers (hallucinations)?",
    a: "We use Retrieval-Augmented Generation (RAG) with strict semantic citation tracing. The AI model is strictly instructed and constrained to answer using only your verified reference documents, citing the exact file and paragraph for every answer.",
  },
  {
    q: "Is our proprietary company data kept secure and confidential?",
    a: "Completely. We configure enterprise APIs with zero data retention guarantees or deploy private, open-weights models within your own virtual private cloud (VPC) where no data ever leaves your servers.",
  },
  {
    q: "How long does it take to build and deploy an intelligent tool?",
    a: "A functional working prototype running on your internal knowledge base can be deployed in 2 to 3 weeks. Full production rollout with multi-system integrations typically takes 6 to 10 weeks.",
  },
  {
    q: "What systems and tools can your AI tools integrate with?",
    a: "We integrate with any tool that supports APIs or webhooks: Slack, Microsoft Teams, WhatsApp, PostgreSQL, MySQL, Notion, Google Workspace, ERP platforms, and custom internal systems.",
  },
];

export default function AiToolsPage() {
  const { openContact } = useNav();
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] selection:bg-accent selection:text-black">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1440px] mx-auto pt-36 sm:pt-44 pb-20 px-4 sm:px-6 md:px-8 lg:px-10 border-b border-white/10">
        <div className="flex flex-col gap-6 max-w-4xl">
          <SectionLabel index="02" label="AI & INTELLIGENT TOOLS" />

          <div className="space-y-2">
            <SplitText
              text="PRACTICAL INTELLIGENCE."
              as="h1"
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="MEASURABLE BUSINESS"
              as="div"
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92]"
            />
            <SplitText
              text="OUTCOMES."
              as="div"
              wordClassName="text-accent"
              className="font-parkinsans text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight uppercase leading-[0.92]"
            />
          </div>

          <FadeUp delay={0.3} y={16}>
            <p className="font-artific text-base sm:text-lg text-white/70 max-w-2xl leading-relaxed">
              We build intelligent search systems, domain-aware assistants, and automated data extraction pipelines that save your team hours and turn internal knowledge into an active asset.
            </p>
          </FadeUp>

          <FadeUp delay={0.4} y={16}>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => openContact({ discipline: "intelligence", subOption: "AI Assistant" })}
                className="inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-8 py-4 bg-accent text-white font-bold hover:bg-white hover:text-black transition-all rounded-[2px]"
              >
                <span>BUILD AN INTELLIGENT TOOL</span>
                <span className="ml-2">→</span>
              </button>

              <Link
                href="/portfolio?category=AI+%26+RAG"
                className="inline-flex items-center font-parkinsans text-[11px] uppercase tracking-[0.2em] px-8 py-4 border border-white/20 bg-transparent text-white hover:border-white transition-all rounded-[2px]"
              >
                <span>VIEW WORK</span>
              </Link>
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 pt-4 border-t border-white/10 flex items-center justify-between font-parkinsans text-[10px] tracking-[0.2em] text-white/40 uppercase">
          <span>SERVICES · AI & INTELLIGENT TOOLS</span>
          <span>EXPLORE CAPABILITIES ↓</span>
        </div>
      </section>

      {/* 6 Core Disciplines Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-14 sm:py-18 md:py-20 border-b border-white/10">
        <div className="flex flex-col gap-4 mb-10 sm:mb-12">
          <span className="font-parkinsans text-[10px] tracking-[0.25em] text-accent uppercase">
            INTELLIGENCE CATALOG
          </span>
          <h2 className="font-parkinsans text-3xl sm:text-5xl font-semibold tracking-tight uppercase">
            AI ENGINEERED FOR REAL WORK.
          </h2>
          <p className="font-artific text-sm sm:text-base text-white/60 max-w-2xl">
            Practical, dependable artificial intelligence solutions focused on operational ROI, verified citations, and reliable automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AI_DISCIPLINES.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <FadeUp key={item.title} delay={0.08 * idx} y={24}>
                <div className="group relative bg-[var(--surface)] border border-white/10 hover:border-accent/80 p-8 rounded-[2px] flex flex-col justify-between min-h-[420px] transition-all duration-300 h-full">
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <span className="font-parkinsans text-[10px] tracking-[0.2em] text-accent font-bold">
                        DISCIPLINE
                      </span>
                      <IconComp className="size-4 text-white/40 group-hover:text-accent transition-colors" />
                    </div>

                    <h3 className="font-parkinsans text-2xl font-semibold tracking-tight uppercase text-white mt-5 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>

                    <p className="font-artific text-xs sm:text-sm text-white/70 leading-relaxed mt-2">
                      {item.longDesc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 mt-6">
                    <span className="font-parkinsans text-[9px] tracking-[0.2em] text-white/40 uppercase block mb-3 font-semibold">
                      CORE DELIVERABLES
                    </span>
                    <ul className="space-y-1.5 font-parkinsans text-[10px] tracking-[0.1em] text-white/60">
                      {item.deliverables.map((del) => (
                        <li key={del} className="flex items-center gap-2">
                          <span className="text-accent">•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          openContact({
                            discipline: "intelligence",
                            subOption: item.title.includes("SEARCH")
                              ? "Knowledge & Search"
                              : item.title.includes("WORKFLOW")
                              ? "Workflow Automation"
                              : item.title.includes("API") || item.title.includes("MODEL")
                              ? "Custom AI Model"
                              : "AI Assistant",
                          })
                        }
                        className="font-parkinsans text-[10px] tracking-[0.2em] text-accent hover:text-white uppercase transition-colors"
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
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-24 sm:py-32 border-b border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <SectionLabel index="02" label="INTELLIGENCE PRINCIPLES" />
            <h2 className="font-parkinsans text-3xl sm:text-5xl font-semibold tracking-tight uppercase leading-[1.05]">
              VERIFIABLE DATA ARCHITECTURE & ETHICAL AI FOUNDATION.
            </h2>
            <p className="font-artific text-sm sm:text-base text-white/70 leading-relaxed">
              We engineer AI tools with deterministic guarantees, granular access controls, and transparent audit logs. Your enterprise data never trains public frontier models without explicit consent.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 font-parkinsans text-[10px]">
            {[
              { title: "ZERO DATA CONTAMINATION", desc: "Private VPC deployments ensure enterprise intellectual property remains isolated from public training pipelines." },
              { title: "SOURCE-ATTRIBUTED CITATIONS", desc: "Every generated insight contains cryptographic or line-item vector citations to verified sources." },
              { title: "DETERMINISTIC FALLBACKS", desc: "Structured outputs with schema validation prevent silent hallucinations and runtime schema drift." },
              { title: "AUDITABLE LATENCY & SPEND", desc: "Token tracking, rate limiting, and cache hit metrics monitored via real-time telemetry." },
            ].map((card) => (
              <div key={card.title} className="bg-[var(--surface)] border border-white/10 p-6 rounded-[2px] flex flex-col justify-between">
                <div>
                  <span className="tracking-[0.2em] text-white font-bold uppercase">
                    {card.title}
                  </span>
                  <p className="text-white/60 leading-relaxed font-artific text-xs mt-2">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-16 sm:py-24 border-b border-white/10">
        <div className="max-w-3xl">
          <div className="mb-10 sm:mb-12">
            <span className="font-parkinsans text-[10px] tracking-[0.25em] text-accent uppercase">
              ARCHITECTURAL CLARITY
            </span>
            <h2 className="font-parkinsans text-3xl sm:text-5xl font-semibold tracking-tight uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <div className="divide-y divide-white/10">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={faq.q} className="py-6">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-parkinsans text-lg font-medium uppercase text-white hover:text-accent transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="font-parkinsans text-xs text-accent ml-4">
                      {isOpen ? "[−]" : "[+]"}
                    </span>
                  </button>

                  {isOpen && (
                    <FadeUp duration={0.2} y={8}>
                      <p className="font-artific text-sm text-white/70 leading-relaxed mt-4 pt-4 border-t border-white/10">
                        {faq.a}
                      </p>
                    </FadeUp>
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
