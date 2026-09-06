"use client";

import React, { useState } from "react";
import Link from "next/link";
import StatusBadge from "@/components/dashboard/common/StatusBadge";

const STAGES = [
  { key: "NEW_INTAKE", label: "NEW INTAKE" },
  { key: "TRIAGED", label: "TRIAGED" },
  { key: "DISCOVERY_SCHEDULED", label: "DISCOVERY CALL" },
  { key: "PROPOSAL_SENT", label: "PROPOSAL SENT" },
  { key: "IN_NEGOTIATION", label: "NEGOTIATION" },
  { key: "COMMISSIONED", label: "COMMISSIONED" },
  { key: "DISQUALIFIED", label: "DISQUALIFIED" },
  { key: "ARCHIVED", label: "ARCHIVED" },
];

const PRIORITIES = [
  { key: "LOW", label: "LOW" },
  { key: "MEDIUM", label: "MEDIUM" },
  { key: "HIGH", label: "HIGH" },
  { key: "CRITICAL_ENTERPRISE", label: "CRITICAL ENTERPRISE" },
];

const EMAIL_TEMPLATES = [
  {
    id: "discovery",
    name: "Discovery Architecture Consultation Invite",
    subject: (inq) => `Gerät Architecture // Technical Discovery Consultation [${inq.telemetryCode}]`,
    body: (inq) =>
      `Dear ${inq.fullName},\n\nThank you for initiating contact with Gerät regarding your ${inq.discipline} inquiry (${inq.telemetryCode}).\n\nOur engineering architecture team has performed a preliminary review of your brief:\n"${inq.projectBrief}"\n\nWe would like to invite you to an exploratory technical discovery session (30-45 minutes) to map system boundaries, data contracts, and architectural feasibility.\n\nPlease let us know your availability over the coming 48-72 hours, or select an operational slot directly.\n\nWarm regards,\n\nGerät Architecture & Client Services\nAddis Ababa // info@gerat.et`,
  },
  {
    id: "brand_scoping",
    name: "Brand & Identity Scoping Questionnaire",
    subject: (inq) => `Gerät Brand Architecture // Scoping Questionnaire [${inq.telemetryCode}]`,
    body: (inq) =>
      `Dear ${inq.fullName},\n\nThank you for reaching out to Gerät regarding Brand Architecture & Identity (${inq.telemetryCode}).\n\nTo construct a high-fidelity visual and strategic system for ${inq.company || inq.fullName}, our design directors need to clarify several foundational vectors:\n1. Core brand pillars and market differentiation.\n2. Target demographics and primary enterprise touchpoints.\n3. Existing design debt vs. greenfield identity creation.\n\nCould you review the attached brief checklist or let us know when you have 20 minutes for a brief scoping call?\n\nSincerely,\n\nGerät Creative Direction\nAddis Ababa // brand@gerat.et`,
  },
  {
    id: "nda_scope",
    name: "Non-Disclosure Agreement (NDA) & Scope Review",
    subject: (inq) => `Gerät Software // Mutual NDA & Architectural Scope [${inq.telemetryCode}]`,
    body: (inq) =>
      `Dear ${inq.fullName},\n\nIn accordance with Gerät standard operating protocol for proprietary enterprise engagements, we have generated a mutual Non-Disclosure Agreement (NDA) for your review prior to deep architectural dissection.\n\nReference: ${inq.telemetryCode}\nOrganization: ${inq.company || "Direct Engagement"}\nDiscipline: ${inq.discipline}\n\nPlease countersign and return the attached document at your earliest convenience so we may review your proprietary requirements in depth.\n\nBest regards,\n\nGerät Legal & Client Operations\nlegal@gerat.et`,
  },
  {
    id: "capacity_timeline",
    name: "Capacity & Timeline Clarification",
    subject: (inq) => `Gerät Engineering // Pipeline Capacity & Delivery Windows [${inq.telemetryCode}]`,
    body: (inq) =>
      `Dear ${inq.fullName},\n\nWe are currently calibrating our engineering sprint allocations for the upcoming quarter.\n\nRegarding your requested timeline (${inq.timeline}) and budget allocation (${inq.budgetRange}):\nOur lead architect would like to align on critical path milestones and staging expectations to ensure dedicated engineering velocity.\n\nAre you available for a brief 15-minute alignment call today or tomorrow?\n\nRespectfully,\n\nGerät Operations Office\nops@gerat.et`,
  },
];

export default function InquiryDossierView({ initialInquiry, teamMembers = [] }) {
  const [inquiry, setInquiry] = useState(initialInquiry);
  const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("overview"); // overview, emails, notes, comms

  // Notes form state
  const [noteContent, setNoteContent] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);

  // Communications form state
  const [commChannel, setCommChannel] = useState("WHATSAPP");
  const [commSubject, setCommSubject] = useState("");
  const [commSummary, setCommSummary] = useState("");
  const [commOutcome, setCommOutcome] = useState("");
  const [isSubmittingComm, setIsSubmittingComm] = useState(false);

  // Email template state
  const [selectedTemplateId, setSelectedTemplateId] = useState("discovery");
  const selectedTemplate = EMAIL_TEMPLATES.find((t) => t.id === selectedTemplateId) || EMAIL_TEMPLATES[0];
  const [emailSubject, setEmailSubject] = useState(selectedTemplate.subject(inquiry));
  const [emailBody, setEmailBody] = useState(selectedTemplate.body(inquiry));
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Clean phone number for WhatsApp
  const rawPhone = inquiry.phone || "";
  const cleanPhone = rawPhone.replace(/[^0-9]/g, "");
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hello ${inquiry.fullName}, this is Gerät Software Solutions following up on your inquiry (${inquiry.telemetryCode}).`
      )}`
    : "#";

  // Handle stage/priority/assignee update
  const handleUpdate = async (patch) => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      });
      const data = await res.json();
      if (data.success) {
        setInquiry((prev) => ({ ...prev, ...data.inquiry }));
      }
    } catch (err) {
      console.error("Failed to update inquiry:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // Add Note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteContent.trim() || isSubmittingNote) return;

    setIsSubmittingNote(true);
    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "NOTE",
          content: noteContent.trim(),
          isPinned,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiry((prev) => ({
          ...prev,
          notes: [data.note, ...(prev.notes || [])],
        }));
        setNoteContent("");
        setIsPinned(false);
      }
    } catch (err) {
      console.error("Failed to add note:", err);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  // Log Communication
  const handleLogComm = async (e) => {
    e.preventDefault();
    if (!commSummary.trim() || isSubmittingComm) return;

    setIsSubmittingComm(true);
    try {
      const res = await fetch(`/api/inquiries/${inquiry.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "COMMUNICATION",
          channel: commChannel,
          subject: commSubject.trim() || null,
          summary: commSummary.trim(),
          outcome: commOutcome.trim() || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiry((prev) => ({
          ...prev,
          communications: [data.communication, ...(prev.communications || [])],
        }));
        setCommSubject("");
        setCommSummary("");
        setCommOutcome("");
      }
    } catch (err) {
      console.error("Failed to log communication:", err);
    } finally {
      setIsSubmittingComm(false);
    }
  };

  // Template switch
  const handleTemplateChange = (templateId) => {
    setSelectedTemplateId(templateId);
    const tmpl = EMAIL_TEMPLATES.find((t) => t.id === templateId);
    if (tmpl) {
      setEmailSubject(tmpl.subject(inquiry));
      setEmailBody(tmpl.body(inquiry));
    }
  };

  const handleCopyEmail = () => {
    const fullText = `Subject: ${emailSubject}\n\n${emailBody}`;
    navigator.clipboard.writeText(fullText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Parse metadata if available
  let parsedMetadata = null;
  if (inquiry.metadata) {
    try {
      parsedMetadata = JSON.parse(inquiry.metadata);
    } catch {}
  }

  // Parse subServices if JSON
  let subServicesList = [];
  if (inquiry.subServices) {
    try {
      subServicesList = JSON.parse(inquiry.subServices);
    } catch {
      subServicesList = inquiry.subServices.split(",").map((s) => s.trim());
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/dashboard/inquiries"
              className="font-azeret text-[10px] tracking-[0.15em] text-white/50 hover:text-white transition-colors"
            >
              ← INTAKE PIPELINE
            </Link>
            <span className="text-white/20">/</span>
            <span className="font-azeret text-[10px] tracking-[0.15em] text-accent uppercase font-bold">
              {inquiry.telemetryCode}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-roc text-2xl sm:text-3xl font-bold uppercase text-white tracking-tight">
              {inquiry.fullName}
            </h1>
            {inquiry.company && (
              <span className="font-azeret text-xs text-white/60 tracking-wider">
                {"// "} {inquiry.company}
              </span>
            )}
            <StatusBadge status={inquiry.status} />
            <StatusBadge priority={inquiry.priority} />
          </div>
        </div>

        {/* Quick Communication Triggers */}
        <div className="flex flex-wrap items-center gap-2">
          {cleanPhone && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 font-azeret text-[10px] tracking-[0.15em] uppercase rounded-[2px] transition-colors flex items-center gap-1.5"
            >
              <svg className="size-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.181-.077.355.101.173.45 0.742 0.965 1.202.663.591 1.221.774 1.394.861.173.087.275.072.376-.043.101-.116.433-.506.549-.679.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.072.043.419-.101.824z" />
              </svg>
              WHATSAPP DIRECT
            </a>
          )}

          {inquiry.phone && (
            <a
              href={`tel:${inquiry.phone}`}
              className="px-3 py-2 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-500/40 text-blue-400 font-azeret text-[10px] tracking-[0.15em] uppercase rounded-[2px] transition-colors flex items-center gap-1.5"
            >
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              CALL DIRECT
            </a>
          )}

          <button
            type="button"
            onClick={() => setActiveTab("emails")}
            className="px-3 py-2 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white/80 font-azeret text-[10px] tracking-[0.15em] uppercase rounded-[2px] transition-colors flex items-center gap-1.5"
          >
            <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            EMAIL COMPOSER
          </button>
        </div>
      </div>

      {/* Control Bar: Stage Progression, Priority, Assigned Team Member */}
      <section className="bg-[#121212] border border-white/10 p-4 rounded-[3px] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Status Select */}
          <div className="flex items-center gap-2">
            <span className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
              STATUS:
            </span>
            <select
              value={inquiry.status}
              disabled={isUpdating}
              onChange={(e) => handleUpdate({ status: e.target.value })}
              className="bg-black/60 border border-white/20 text-white font-azeret text-xs py-1.5 px-3 rounded-[2px] focus:border-accent outline-none"
            >
              {STAGES.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Select */}
          <div className="flex items-center gap-2">
            <span className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
              PRIORITY:
            </span>
            <select
              value={inquiry.priority}
              disabled={isUpdating}
              onChange={(e) => handleUpdate({ priority: e.target.value })}
              className="bg-black/60 border border-white/20 text-white font-azeret text-xs py-1.5 px-3 rounded-[2px] focus:border-accent outline-none"
            >
              {PRIORITIES.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Assigned Lead Select */}
          <div className="flex items-center gap-2">
            <span className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
              ASSIGNED:
            </span>
            <select
              value={inquiry.assignedToId || ""}
              disabled={isUpdating}
              onChange={(e) => handleUpdate({ assignedToId: e.target.value || null })}
              className="bg-black/60 border border-white/20 text-white font-azeret text-xs py-1.5 px-3 rounded-[2px] focus:border-accent outline-none"
            >
              <option value="">UNASSIGNED</option>
              {teamMembers.map((tm) => (
                <option key={tm.id} value={tm.id}>
                  {tm.name} ({tm.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
          INTAKE: {new Date(inquiry.createdAt).toLocaleString()}
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="flex border-b border-white/10 gap-2 font-azeret text-[10px] tracking-[0.15em] uppercase">
        <button
          type="button"
          onClick={() => setActiveTab("overview")}
          className={`py-2 px-4 border-b-2 transition-colors ${
            activeTab === "overview"
              ? "border-accent text-accent font-bold"
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          DOSSIER OVERVIEW
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("emails")}
          className={`py-2 px-4 border-b-2 transition-colors ${
            activeTab === "emails"
              ? "border-accent text-accent font-bold"
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          EMAIL COMPOSER & TEMPLATES
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("notes")}
          className={`py-2 px-4 border-b-2 transition-colors ${
            activeTab === "notes"
              ? "border-accent text-accent font-bold"
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          INTERNAL NOTES ({inquiry.notes?.length || 0})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("comms")}
          className={`py-2 px-4 border-b-2 transition-colors ${
            activeTab === "comms"
              ? "border-accent text-accent font-bold"
              : "border-transparent text-white/50 hover:text-white"
          }`}
        >
          ACTIVITY & TOUCHPOINTS ({inquiry.communications?.length || 0})
        </button>
      </div>

      {/* TAB CONTENT: DOSSIER OVERVIEW */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Client Profile & Brief */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Project Brief Section */}
            <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                  PROJECT BRIEF & ARCHITECTURAL INTENT
                </span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(inquiry.projectBrief)}
                  className="font-azeret text-[9px] tracking-[0.15em] text-white/40 hover:text-white uppercase transition-colors"
                >
                  COPY BRIEF
                </button>
              </div>
              <p className="font-sans text-sm text-white/90 leading-relaxed whitespace-pre-wrap">
                {inquiry.projectBrief}
              </p>
            </div>

            {/* Scope & Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
                <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  DISCIPLINE
                </div>
                <div className="font-roc text-lg font-bold text-white mt-1 uppercase">
                  {inquiry.discipline}
                </div>
              </div>

              <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
                <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  BUDGET ALLOCATION
                </div>
                <div className="font-roc text-lg font-bold text-accent mt-1 uppercase">
                  {inquiry.budgetRange}
                </div>
              </div>

              <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
                <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase">
                  TARGET TIMELINE
                </div>
                <div className="font-roc text-lg font-bold text-white mt-1 uppercase">
                  {inquiry.timeline}
                </div>
              </div>
            </div>

            {/* Sub-services Tags */}
            {subServicesList.length > 0 && (
              <div className="bg-[#121212] border border-white/10 p-4 rounded-[3px]">
                <div className="font-azeret text-[9px] tracking-[0.2em] text-white/40 uppercase mb-2">
                  SELECTED SUB-SERVICES & DELIVERABLES
                </div>
                <div className="flex flex-wrap gap-2">
                  {subServicesList.map((svc, idx) => (
                    <span
                      key={idx}
                      className="font-azeret text-[10px] tracking-[0.1em] px-2.5 py-1 bg-white/[0.04] border border-white/15 text-white/80 rounded-[2px]"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Structured Questionnaire Answers (Metadata) */}
            {parsedMetadata && Object.keys(parsedMetadata).length > 0 && (
              <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px]">
                <div className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4 border-b border-white/10 pb-2">
                  INTAKE QUESTIONNAIRE RESPONSES
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(parsedMetadata).map(([key, val]) => (
                    <div key={key} className="p-3 bg-black/40 border border-white/5 rounded-[2px]">
                      <div className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </div>
                      <div className="font-sans text-xs text-white mt-1">
                        {typeof val === "object" ? JSON.stringify(val) : String(val)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Col: Client Contacts & Telemetry */}
          <div className="flex flex-col gap-6">
            {/* Contact Details Card */}
            <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
              <span className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase border-b border-white/10 pb-2">
                CLIENT CONTACT VECTORS
              </span>

              <div className="space-y-3 font-azeret text-xs">
                <div>
                  <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    FULL NAME
                  </div>
                  <div className="text-white font-semibold mt-0.5">{inquiry.fullName}</div>
                </div>

                <div>
                  <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    EMAIL ADDRESS
                  </div>
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="text-accent hover:underline break-all mt-0.5 block"
                  >
                    {inquiry.email}
                  </a>
                </div>

                <div>
                  <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    PHONE / WHATSAPP
                  </div>
                  <div className="text-white mt-0.5">{inquiry.phone || "—"}</div>
                </div>

                {inquiry.company && (
                  <div>
                    <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                      ORGANIZATION
                    </div>
                    <div className="text-white mt-0.5">{inquiry.company}</div>
                  </div>
                )}

                {inquiry.roleTitle && (
                  <div>
                    <div className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                      ROLE TITLE
                    </div>
                    <div className="text-white mt-0.5">{inquiry.roleTitle}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Telemetry Tracking Card */}
            <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-3 font-azeret text-xs">
              <span className="text-[10px] tracking-[0.2em] text-white/40 uppercase border-b border-white/10 pb-2">
                INTAKE TELEMETRY
              </span>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-white/40 text-[9px] tracking-[0.15em]">SOURCE URL:</span>
                <span className="text-white/80 truncate max-w-[150px]">
                  {inquiry.sourceUrl || "/"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-white/40 text-[9px] tracking-[0.15em]">IP ADDRESS:</span>
                <span className="text-white/80">{inquiry.ipAddress || "127.0.0.1"}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-white/40 text-[9px] tracking-[0.15em]">COUNTRY:</span>
                <span className="text-white/80">{inquiry.countryCode || "ET (ETHIOPIA)"}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-white/40 text-[9px] tracking-[0.15em]">CREATED:</span>
                <span className="text-white/80">
                  {new Date(inquiry.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: EMAIL COMPOSER & TEMPLATES */}
      {activeTab === "emails" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Col: Template Selector */}
          <div className="flex flex-col gap-3">
            <span className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
              SELECT ARCHITECTURAL TEMPLATE
            </span>

            {EMAIL_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => handleTemplateChange(tmpl.id)}
                className={`p-4 text-left border rounded-[3px] transition-colors flex flex-col gap-1 ${
                  selectedTemplateId === tmpl.id
                    ? "bg-white/[0.06] border-accent"
                    : "bg-[#121212] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="font-roc text-sm font-bold text-white uppercase">
                  {tmpl.name}
                </div>
                <div className="font-azeret text-[9px] tracking-[0.1em] text-white/40">
                  Click to populate client variables
                </div>
              </button>
            ))}

            <div className="p-4 bg-[#121212] border border-white/10 rounded-[3px] font-azeret text-[10px] text-white/60 leading-relaxed">
              <span className="text-accent font-bold">INFO:</span> Templates inject client name,
              discipline, and telemetry codes automatically. You can edit the text before sending or
              copying.
            </div>
          </div>

          {/* Right 2 Cols: Email Workspace */}
          <div className="lg:col-span-2 bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold">
                COMMUNICATION DISPATCH WORKSPACE
              </span>
              <span className="font-azeret text-[10px] text-white/40">
                RECIPIENT: {inquiry.email}
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                SUBJECT LINE:
              </label>
              <input
                type="text"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="w-full bg-black/60 border border-white/15 px-3 py-2 text-white font-sans text-sm rounded-[2px] focus:border-accent outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                MESSAGE BODY:
              </label>
              <textarea
                rows={12}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="w-full bg-black/60 border border-white/15 p-3 text-white font-mono text-xs leading-relaxed rounded-[2px] focus:border-accent outline-none"
              />
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-4 py-2 bg-white/[0.05] hover:bg-white/10 border border-white/15 text-white font-azeret text-[10px] tracking-[0.15em] uppercase rounded-[2px] transition-colors"
              >
                {copiedEmail ? "COPIED TO CLIPBOARD ✓" : "COPY TO CLIPBOARD"}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${inquiry.email}?subject=${encodeURIComponent(
                    emailSubject
                  )}&body=${encodeURIComponent(emailBody)}`}
                  className="px-4 py-2 bg-accent hover:bg-[#ff5c1a] text-black font-azeret text-[10px] tracking-[0.15em] font-bold uppercase rounded-[2px] transition-colors"
                >
                  LAUNCH IN MAIL CLIENT ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: INTERNAL NOTES */}
      {activeTab === "notes" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Note Input Form */}
          <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
            <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-2">
              LOG INTERNAL NOTE
            </span>

            <form onSubmit={handleAddNote} className="flex flex-col gap-4">
              <textarea
                rows={5}
                required
                placeholder="Log internal architecture notes, risk analysis, or preliminary engineering sizing..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                className="w-full bg-black/60 border border-white/15 p-3 text-white font-sans text-xs rounded-[2px] focus:border-accent outline-none resize-none"
              />

              <label className="flex items-center gap-2 font-azeret text-[10px] tracking-[0.1em] text-white/70 uppercase cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPinned}
                  onChange={(e) => setIsPinned(e.target.checked)}
                  className="accent-accent"
                />
                PIN TO TOP OF DOSSIER
              </label>

              <button
                type="submit"
                disabled={isSubmittingNote || !noteContent.trim()}
                className="w-full py-2 bg-white/[0.08] hover:bg-white/15 border border-white/20 text-white font-azeret text-[10px] tracking-[0.15em] uppercase font-bold rounded-[2px] transition-colors disabled:opacity-40"
              >
                {isSubmittingNote ? "COMMITTING..." : "+ ADD NOTE"}
              </button>
            </form>
          </div>

          {/* Notes List */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
              THREAD HISTORY ({inquiry.notes?.length || 0})
            </span>

            {inquiry.notes && inquiry.notes.length > 0 ? (
              inquiry.notes.map((note) => (
                <div
                  key={note.id}
                  className={`p-4 rounded-[3px] border transition-colors ${
                    note.isPinned
                      ? "bg-[#181818] border-accent/40"
                      : "bg-[#121212] border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2 font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{note.author?.name || "Architect"}</span>
                      {note.author?.role && <span>{"// "} {note.author.role}</span>}
                      {note.isPinned && (
                        <span className="px-1.5 py-0.5 bg-accent/20 text-accent font-bold rounded-[2px]">
                          PINNED
                        </span>
                      )}
                    </div>
                    <span>{new Date(note.createdAt).toLocaleString()}</span>
                  </div>

                  <p className="font-sans text-xs text-white/90 whitespace-pre-wrap leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-8 bg-[#121212] border border-white/10 rounded-[3px] text-center font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
                NO INTERNAL NOTES LOGGED YET
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: ACTIVITY & TOUCHPOINTS */}
      {activeTab === "comms" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Log Communication Form */}
          <div className="bg-[#121212] border border-white/10 p-6 rounded-[3px] flex flex-col gap-4">
            <span className="font-azeret text-[10px] tracking-[0.2em] text-accent uppercase font-bold border-b border-white/10 pb-2">
              LOG CLIENT TOUCHPOINT
            </span>

            <form onSubmit={handleLogComm} className="flex flex-col gap-4 font-azeret text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  CHANNEL:
                </label>
                <select
                  value={commChannel}
                  onChange={(e) => setCommChannel(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                >
                  <option value="WHATSAPP">WHATSAPP</option>
                  <option value="PHONE_CALL">PHONE CALL</option>
                  <option value="EMAIL">EMAIL DISPATCH</option>
                  <option value="VIRTUAL_ZOOM">VIRTUAL CALL (ZOOM/MEET)</option>
                  <option value="IN_PERSON_MEETING">IN-PERSON MEETING</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  SUBJECT / TOPIC:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Discovery Call Follow-up"
                  value={commSubject}
                  onChange={(e) => setCommSubject(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  SUMMARY OF DISCUSSION:
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Summarize key points discussed with the client..."
                  value={commSummary}
                  onChange={(e) => setCommSummary(e.target.value)}
                  className="bg-black/60 border border-white/15 p-3 text-white text-xs rounded-[2px] focus:border-accent outline-none resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[9px] tracking-[0.15em] text-white/40 uppercase">
                  AGREED OUTCOME / NEXT STEP:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Client to provide technical API specs by Friday"
                  value={commOutcome}
                  onChange={(e) => setCommOutcome(e.target.value)}
                  className="bg-black/60 border border-white/15 px-3 py-2 text-white text-xs rounded-[2px] focus:border-accent outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingComm || !commSummary.trim()}
                className="w-full py-2 bg-accent hover:bg-[#ff5c1a] text-black font-azeret text-[10px] tracking-[0.15em] uppercase font-bold rounded-[2px] transition-colors disabled:opacity-40 mt-2"
              >
                {isSubmittingComm ? "RECORDING..." : "RECORD TOUCHPOINT"}
              </button>
            </form>
          </div>

          {/* Communications Timeline */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
              INTERACTION LOG ({inquiry.communications?.length || 0})
            </span>

            {inquiry.communications && inquiry.communications.length > 0 ? (
              inquiry.communications.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-[#121212] border border-white/10 rounded-[3px] flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-2 font-azeret text-[9px] tracking-[0.15em] text-white/40 uppercase">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-white/10 text-white font-bold rounded-[2px]">
                        {c.channel.replace("_", " ")}
                      </span>
                      <span className="text-white/60">by {c.actor?.name || "Architect"}</span>
                    </div>
                    <span>{new Date(c.loggedAt).toLocaleString()}</span>
                  </div>

                  {c.subject && (
                    <div className="font-roc text-sm font-bold text-white uppercase">
                      {c.subject}
                    </div>
                  )}

                  <p className="font-sans text-xs text-white/80 leading-relaxed">{c.summary}</p>

                  {c.outcome && (
                    <div className="mt-1 pt-2 border-t border-white/5 font-azeret text-[10px] text-accent">
                      <span className="text-white/40 uppercase">OUTCOME: </span>
                      {c.outcome}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 bg-[#121212] border border-white/10 rounded-[3px] text-center font-azeret text-[10px] tracking-[0.2em] text-white/40 uppercase">
                NO TOUCHPOINTS LOGGED FOR THIS DOSSIER
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
