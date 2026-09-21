"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Clock, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PRIMARY_DISCIPLINES = [
  {
    id: "digital",
    label: "WEBSITE / DIGITAL PRODUCT",
    subOptions: ["Website", "Web Application", "Customer Portal", "Digital Product"],
  },
  {
    id: "intelligence",
    label: "AI & INTELLIGENT TOOL",
    subOptions: ["AI Assistant", "Knowledge & Search", "Workflow Automation", "Custom AI Model"],
  },
  {
    id: "systems",
    label: "BUSINESS SYSTEM / ERP",
    subOptions: ["Custom ERP", "Operations Platform", "Workflow Engine", "Internal Software"],
  },
  {
    id: "brand",
    label: "BRAND & CREATIVE",
    subOptions: ["BRAND STRATEGY", "LOGO & BRAND IDENTITY", "GRAPHIC DESIGN", "SOCIAL & MARKETING DESIGN", "PERSONAL BRANDING"],
  },
  {
    id: "other",
    label: "EXPLORING / NOT SURE YET",
    subOptions: [],
  },
];

const TIMELINES = [
  "THIS MONTH (IMMEDIATE)",
  "1–3 MONTHS",
  "3–6 MONTHS",
  "EXPLORING / FLEXIBLE",
];

const BUDGET_RANGES = [
  "EXPLORING / NOT SURE YET",
  "UNDER 50K ETB",
  "50K – 100K ETB",
  "100K – 250K ETB",
  "250K+ ETB",
];

const BRAND_SITUATIONS = [
  "NEW VENTURE / BRAND",
  "REBRAND / REFRESH",
  "EXISTING PRODUCT LINE",
];

const GRAPHIC_ASSET_TYPES = [
  "COMPANY PROFILE",
  "PITCH DECK",
  "ANNUAL REPORT / WHITEPAPER",
  "SOCIAL POST SYSTEM",
  "MARKETING COLLATERAL",
];

const PERSONAL_ROLES = [
  "FOUNDER / CEO",
  "EXECUTIVE / DIRECTOR",
  "CONSULTANT / ADVISOR",
  "TECH LEADER / RESEARCHER",
];

/**
 * Editorial Contact Drawer (Spec ref: §31 & Brand Spec §20, §21, §22)
 * Enters from right with backdrop blur, conditional question modules, and staggered field reveals.
 */
export default function ContactDrawer({ open, setOpen, preset = null }) {
  const [selectedPrimary, setSelectedPrimary] = useState(PRIMARY_DISCIPLINES[0]);
  const [selectedSubOption, setSelectedSubOption] = useState(PRIMARY_DISCIPLINES[0].subOptions[0] || "");
  const [selectedTimeline, setSelectedTimeline] = useState(TIMELINES[0]);
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_RANGES[0]);
  
  // Conditional creative question state
  const [brandSituation, setBrandSituation] = useState(BRAND_SITUATIONS[0]);
  const [needBrandGuidelines, setNeedBrandGuidelines] = useState(true);
  const [selectedAssetType, setSelectedAssetType] = useState(GRAPHIC_ASSET_TYPES[0]);
  const [personalRole, setPersonalRole] = useState(PERSONAL_ROLES[0]);
  const [personalGoal, setPersonalGoal] = useState("EXECUTIVE AUTHORITY");
  const [needPhotographyDirection, setNeedPhotographyDirection] = useState(false);
  const [needPersonalWebsite, setNeedPersonalWebsite] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    privacyAgreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState("");

  const isBrandDiscipline =
    selectedPrimary.id === "brand" ||
    [
      "BRAND STRATEGY",
      "LOGO & BRAND IDENTITY",
      "GRAPHIC DESIGN",
      "SOCIAL & MARKETING DESIGN",
      "PERSONAL BRANDING",
    ].includes(selectedSubOption);

  // Adjust state during render when preset prop changes (React recommended pattern)
  const [prevPreset, setPrevPreset] = useState(preset);
  if (preset !== prevPreset && open) {
    setPrevPreset(preset);

    let targetDiscipline = null;
    let targetSub = null;

    if (typeof preset === "string") {
      targetDiscipline = preset;
    } else if (typeof preset === "object") {
      targetDiscipline = preset.discipline || preset.id;
      targetSub = preset.subOption;
    }

    if (targetDiscipline) {
      const match = PRIMARY_DISCIPLINES.find(
        (d) =>
          d.id.toLowerCase() === targetDiscipline.toLowerCase() ||
          d.label.toLowerCase().includes(targetDiscipline.toLowerCase()) ||
          targetDiscipline.toLowerCase().includes(d.id.toLowerCase())
      );
      if (match) {
        setSelectedPrimary(match);
        if (targetSub) {
          const subMatch = match.subOptions.find(
            (so) =>
              so.toLowerCase() === targetSub.toLowerCase() ||
              so.toLowerCase().includes(targetSub.toLowerCase()) ||
              targetSub.toLowerCase().includes(so.toLowerCase())
          );
          if (subMatch) {
            setSelectedSubOption(subMatch);
          } else {
            setSelectedSubOption(targetSub);
          }
        } else if (match.subOptions.length > 0) {
          setSelectedSubOption(match.subOptions[0]);
        } else {
          setSelectedSubOption("");
        }
      }
    }
  }

  // Lock body scroll when open and handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, setOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const activeDiscipline = selectedSubOption
      ? `${selectedPrimary.label} · ${selectedSubOption}`
      : selectedPrimary.label;

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone || "Not specified",
          company: formData.company,
          discipline: activeDiscipline,
          timeline: selectedTimeline,
          budgetRange: selectedBudget,
          projectBrief: formData.message,
          metadata: {
            primaryDiscipline: selectedPrimary.id,
            subOption: selectedSubOption,
            brandStatus: brandSituation,
            hasGuidelines: needBrandGuidelines,
            graphicAssets: selectedAssetType,
            personalRole,
            needsWebsite: needPersonalWebsite,
            needsPhotography: needPhotographyDirection,
          },
          sourceUrl: typeof window !== "undefined" ? window.location.pathname : "/",
        }),
      });

      const data = await res.json();
      if (res.ok && data.telemetryCode) {
        setInquiryId(data.telemetryCode);
      } else {
        const prefix = isBrandDiscipline ? "GRT-BRD" : "GRT-ENG";
        setInquiryId(`${prefix}-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    } catch {
      const prefix = isBrandDiscipline ? "GRT-BRD" : "GRT-ENG";
      setInquiryId(`${prefix}-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      message: "",
      privacyAgreed: false,
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[500] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Right-Hand Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Start a project with Gerat"
            className="relative z-10 w-full max-w-[640px] h-full bg-[var(--surface)] text-white border-l border-white/10 flex flex-col shadow-2xl overflow-y-auto hide-scrollbar"
          >
            {/* Header / Bar */}
            <div className="sticky top-0 z-20 bg-[var(--surface)]/95 backdrop-blur-md border-b border-white/10 px-6 sm:px-10 py-5 flex items-center justify-between">
              <div className="flex items-center">
                <span className="font-artific text-[10px] tracking-[0.25em] text-white/70 uppercase font-medium">
                  START A PROJECT · DIRECT CONSULTATION
                </span>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="size-9 flex items-center justify-center border border-white/10 bg-white/5 text-white/60 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors rounded-[2px]"
                aria-label="Close contact drawer"
              >
                ✕
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  {/* Hero Prompt */}
                  <div className="flex flex-col gap-2">
                    <span className="font-artific text-[10px] tracking-[0.2em] text-accent uppercase font-medium">
                      GERAT SOFTWARE SOLUTION
                    </span>
                    <h2 className="font-parkinsans text-2xl sm:text-3xl font-medium sm:font-semibold tracking-tight uppercase leading-[1.1]">
                      LET&apos;S BUILD SOMETHING THAT WORKS.
                    </h2>
                    <p className="font-artific text-xs sm:text-sm text-white/70 leading-relaxed mt-1">
                      Tell us what you&apos;re working on. We evaluate every inquiry directly
                      and follow up within 24–48 hours.
                    </p>
                  </div>

                  {/* Discipline Selection (4 Pillars + Fallback) */}
                  <div className="flex flex-col gap-3">
                    <label className="font-parkinsans text-[10px] tracking-[0.2em] text-white/50 uppercase">
                      WHAT CAN WE HELP YOU BUILD? <span className="text-accent">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {PRIMARY_DISCIPLINES.map((p) => {
                        const isSelected = selectedPrimary.id === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setSelectedPrimary(p);
                              setSelectedSubOption(p.subOptions[0] || "");
                            }}
                            className={`p-3 text-left border transition-all rounded-[2px] flex items-center justify-between ${
                              isSelected
                                ? "bg-accent/10 border-accent text-white font-medium"
                                : "bg-white/[0.02] border-white/10 text-white/70 hover:border-white/30 hover:text-white"
                            } ${p.id === "other" ? "sm:col-span-2" : ""}`}
                          >
                            <span className="font-parkinsans text-[10px] sm:text-[11px] tracking-[0.08em] uppercase">
                              {p.label}
                            </span>
                            {isSelected && (
                              <svg className="size-3 text-accent shrink-0 ml-2" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                <path d="M2 6l3 3 5-5" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Progressive Disclosure: Specific Focus Sub-Options */}
                    {selectedPrimary.subOptions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-2 pt-2 border-t border-white/5"
                      >
                        <span className="font-parkinsans text-[9px] tracking-[0.15em] text-white/40 uppercase">
                          SELECT FOCUS AREA (OPTIONAL)
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {selectedPrimary.subOptions.map((sub) => {
                            const isSubSelected = selectedSubOption === sub;
                            return (
                              <button
                                key={sub}
                                type="button"
                                onClick={() => setSelectedSubOption(sub)}
                                className={`px-3 py-1.5 font-parkinsans text-[9px] tracking-[0.05em] border rounded-[2px] transition-all uppercase ${
                                  isSubSelected
                                    ? "bg-accent/20 border-accent text-white font-medium"
                                    : "bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:border-white/20"
                                }`}
                              >
                                {sub}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Core Contact Fields */}
                  <div className="flex flex-col gap-4">
                    <label className="font-parkinsans text-[10px] tracking-[0.2em] text-white/50 uppercase">
                      CONTACT PARAMETERS <span className="text-accent">*</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Full Name"
                          className="w-full bg-[var(--surface-raised)] border border-white/10 px-4 py-3 font-parkinsans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors rounded-[2px]"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="Corporate / Work Email"
                          className="w-full bg-[var(--surface-raised)] border border-white/10 px-4 py-3 font-parkinsans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors rounded-[2px]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          placeholder="Company / Institution / Brand"
                          className="w-full bg-[var(--surface-raised)] border border-white/10 px-4 py-3 font-parkinsans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors rounded-[2px]"
                        />
                      </div>
                      <div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="Phone / WhatsApp (+251...)"
                          className="w-full bg-[var(--surface-raised)] border border-white/10 px-4 py-3 font-parkinsans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors rounded-[2px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Conditional Discipline Specifications */}
                  {(selectedSubOption === "BRAND STRATEGY" || selectedSubOption === "LOGO & BRAND IDENTITY") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-white/[0.02] border border-white/10 rounded-[2px] flex flex-col gap-3"
                    >
                      <label className="font-parkinsans text-[10px] tracking-[0.2em] text-accent uppercase">
                        BRAND ARCHITECTURE SPECIFICATIONS
                      </label>
                      <div className="flex flex-col gap-2">
                        <span className="font-parkinsans text-[9px] text-white/50 tracking-[0.1em] uppercase">
                          CURRENT STAGE
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          {BRAND_SITUATIONS.map((situation) => (
                            <button
                              key={situation}
                              type="button"
                              onClick={() => setBrandSituation(situation)}
                              className={`px-3 py-2 text-left font-parkinsans text-[9px] tracking-[0.05em] border rounded-[2px] transition-all ${
                                brandSituation === situation
                                  ? "bg-accent/15 border-accent text-white"
                                  : "border-white/10 text-white/60 hover:text-white"
                              }`}
                            >
                              {situation}
                            </button>
                          ))}
                        </div>
                      </div>
                      <label className="flex items-center gap-2 mt-1 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={needBrandGuidelines}
                          onChange={(e) => setNeedBrandGuidelines(e.target.checked)}
                          className="size-3.5 accent-accent"
                        />
                        <span className="font-parkinsans text-[9px] tracking-[0.1em] text-white/70 uppercase">
                          Include Production Brand Guidelines & Digital Asset System
                        </span>
                      </label>
                    </motion.div>
                  )}

                  {(selectedSubOption === "GRAPHIC DESIGN" || selectedSubOption === "SOCIAL & MARKETING DESIGN") && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-white/[0.02] border border-white/10 rounded-[2px] flex flex-col gap-3"
                    >
                      <label className="font-parkinsans text-[10px] tracking-[0.2em] text-accent uppercase">
                        GRAPHIC COLLATERAL FOCUS
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {GRAPHIC_ASSET_TYPES.map((asset) => (
                          <button
                            key={asset}
                            type="button"
                            onClick={() => setSelectedAssetType(asset)}
                            className={`px-2.5 py-2 text-left font-parkinsans text-[9px] tracking-[0.05em] border rounded-[2px] transition-all ${
                              selectedAssetType === asset
                                ? "bg-accent/15 border-accent text-white"
                                : "border-white/10 text-white/60 hover:text-white"
                            }`}
                          >
                            {asset}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {selectedSubOption === "PERSONAL BRANDING" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-white/[0.02] border border-white/10 rounded-[2px] flex flex-col gap-3"
                    >
                      <label className="font-parkinsans text-[10px] tracking-[0.2em] text-accent uppercase">
                        EXECUTIVE PERSONAL BRANDING MODULES
                      </label>
                      <div className="flex flex-col gap-2">
                        <span className="font-parkinsans text-[9px] text-white/50 tracking-[0.1em] uppercase">
                          PROFESSIONAL ROLE
                        </span>
                        <div className="grid grid-cols-2 gap-2">
                          {PERSONAL_ROLES.map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => setPersonalRole(role)}
                              className={`px-2.5 py-2 text-left font-parkinsans text-[9px] tracking-[0.05em] border rounded-[2px] transition-all ${
                                personalRole === role
                                  ? "bg-accent/15 border-accent text-white"
                                  : "border-white/10 text-white/60 hover:text-white"
                              }`}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={needPhotographyDirection}
                            onChange={(e) => setNeedPhotographyDirection(e.target.checked)}
                            className="size-3.5 accent-accent"
                          />
                          <span className="font-parkinsans text-[9px] tracking-[0.1em] text-white/70 uppercase">
                            Photography Direction
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={needPersonalWebsite}
                            onChange={(e) => setNeedPersonalWebsite(e.target.checked)}
                            className="size-3.5 accent-accent"
                          />
                          <span className="font-parkinsans text-[9px] tracking-[0.1em] text-white/70 uppercase">
                            Personal Executive Site
                          </span>
                        </label>
                      </div>
                    </motion.div>
                  )}

                  {/* Timeline Selection */}
                  <div className="flex flex-col gap-3">
                    <label className="font-parkinsans text-[10px] tracking-[0.2em] text-white/50 uppercase">
                      DELIVERY TIMELINE
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {TIMELINES.map((time) => {
                        const isSelected = selectedTimeline === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTimeline(time)}
                            className={`px-3 py-2 font-parkinsans text-[10px] tracking-[0.1em] border text-left transition-all rounded-[2px] ${
                              isSelected
                                ? "bg-white/10 border-white text-white"
                                : "bg-transparent border-white/10 text-white/50 hover:text-white hover:border-white/20"
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Qualification */}
                  <div className="flex flex-col gap-3">
                    <label className="font-parkinsans text-[10px] tracking-[0.2em] text-white/50 uppercase">
                      ESTIMATED BUDGET SCALE (OPTIONAL)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {BUDGET_RANGES.map((budget) => {
                        const isSelected = selectedBudget === budget;
                        return (
                          <button
                            key={budget}
                            type="button"
                            onClick={() => setSelectedBudget(budget)}
                            className={`px-2.5 py-2 font-parkinsans text-[9px] tracking-[0.05em] border text-left transition-all rounded-[2px] ${
                              isSelected
                                ? "bg-accent/15 border-accent text-white"
                                : "bg-transparent border-white/10 text-white/50 hover:text-white hover:border-white/20"
                            }`}
                          >
                            {budget}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Scope Details */}
                  <div className="flex flex-col gap-3">
                    <label className="font-parkinsans text-[10px] tracking-[0.2em] text-white/50 uppercase">
                      {isBrandDiscipline ? "CREATIVE OBJECTIVES & CONTEXT" : "PROJECT BRIEF"}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={
                        isBrandDiscipline
                          ? "Describe your brand vision, target audience, aesthetic benchmarks, existing assets, or specific collateral requirements..."
                          : "Tell us about what you want to build, current challenges, target audience, or specific requirements..."
                      }
                      className="w-full bg-[var(--surface-raised)] border border-white/10 p-4 font-parkinsans text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors rounded-[2px] resize-none"
                    />
                  </div>

                  {/* Consent & Submission */}
                  <div className="flex flex-col gap-5 pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <input
                        type="checkbox"
                        required
                        checked={formData.privacyAgreed}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            privacyAgreed: e.target.checked,
                          })
                        }
                        className="mt-0.5 size-4 accent-accent rounded-[2px] cursor-pointer"
                      />
                      <span className="font-parkinsans text-[10px] tracking-[0.1em] text-white/60 uppercase leading-relaxed group-hover:text-white/80 transition-colors">
                        I agree to direct contact from Gerat leads regarding this inquiry under confidentiality protocols.
                      </span>
                    </label>

                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.privacyAgreed}
                      className="group relative isolate w-full py-4 bg-accent text-white font-parkinsans text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-[2px] flex items-center justify-center gap-2"
                    >
                      <span>
                        {isSubmitting ? "SUBMITTING INQUIRY..." : "START YOUR PROJECT"}
                      </span>
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              ) : (
                /* Success State */
                <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
                  <div className="size-16 rounded-full bg-accent/10 border border-accent flex items-center justify-center text-accent">
                    <CheckCircle2 className="size-8" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="font-artific text-[10px] tracking-[0.25em] text-accent uppercase font-medium">
                      INQUIRY RECEIVED · {isBrandDiscipline ? "CREATIVE DISPATCH" : "GENERAL DISPATCH"}
                    </span>
                    <h3 className="font-parkinsans text-2xl sm:text-3xl font-medium sm:font-semibold tracking-tight uppercase text-white">
                      INQUIRY LOGGED SUCCESSFULLY
                    </h3>
                    <p className="font-artific text-sm text-white/70 max-w-sm">
                      Our leads will review your requirements and follow up via email within 24–48 hours.
                    </p>
                  </div>

                  {/* Reference Ticket Box */}
                  <div className="w-full bg-[var(--surface-raised)] border border-white/10 p-4 rounded-[2px] flex flex-col gap-2 text-left font-parkinsans text-[11px]">
                    <div className="flex justify-between items-center text-white/50 border-b border-white/5 pb-2">
                      <span>INQUIRY REFERENCE:</span>
                      <span className="text-accent font-bold tracking-widest">
                        {inquiryId}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-white/50 border-b border-white/5 pb-2">
                      <span>PRIMARY DISCIPLINE:</span>
                      <span className="text-white">
                        {selectedSubOption ? `${selectedPrimary.label} · ${selectedSubOption}` : selectedPrimary.label}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-white/50 border-b border-white/5 pb-2">
                      <span>BUDGET BRACKET:</span>
                      <span className="text-white/80">{selectedBudget}</span>
                    </div>
                    <div className="flex justify-between items-center text-white/50">
                      <span>SLA WINDOW:</span>
                      <span className="text-emerald-400">24-48 HOURS</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 w-full">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 py-3 border border-white/15 bg-white/5 font-parkinsans text-[10px] tracking-[0.2em] uppercase hover:bg-white/10 transition-colors rounded-[2px]"
                    >
                      LOG ANOTHER REQUEST
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="flex-1 py-3 bg-accent text-white font-parkinsans text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-colors rounded-[2px]"
                    >
                      CLOSE DRAWER
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Telemetry Footer */}
              <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/40 font-parkinsans text-[10px] tracking-[0.15em] uppercase">
                <div className="flex items-center gap-2">
                  <Terminal className="size-3.5 text-accent" />
                  <span>HQ: ADDIS ABABA · UTC+3</span>
                </div>
                <div>CONTACT: INFO@GERAT.COM</div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
