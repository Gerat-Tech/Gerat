import React from "react";

const STATUS_STYLES = {
  // Inquiries
  NEW_INTAKE: "bg-accent/20 border-accent text-accent animate-pulse",
  TRIAGED: "bg-blue-500/15 border-blue-500/40 text-blue-400",
  DISCOVERY_SCHEDULED: "bg-purple-500/15 border-purple-500/40 text-purple-300",
  PROPOSAL_SENT: "bg-amber-500/15 border-amber-500/40 text-amber-300",
  IN_NEGOTIATION: "bg-cyan-500/15 border-cyan-500/40 text-cyan-300",
  COMMISSIONED: "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 font-bold",
  DISQUALIFIED: "bg-red-500/15 border-red-500/40 text-red-400",
  ARCHIVED: "bg-white/5 border-white/15 text-white/40",

  // Priorities
  LOW: "bg-white/5 border-white/15 text-white/60",
  MEDIUM: "bg-blue-500/10 border-blue-500/30 text-blue-300",
  HIGH: "bg-amber-500/15 border-amber-500/40 text-amber-400",
  CRITICAL_ENTERPRISE: "bg-red-500/20 border-red-500/50 text-red-400 font-bold",

  // Articles & Projects
  PUBLISHED: "bg-emerald-500/15 border-emerald-500/40 text-emerald-300",
  DRAFT: "bg-white/10 border-white/20 text-white/70",
  IN_REVIEW: "bg-amber-500/15 border-amber-500/40 text-amber-300",
  SCHEDULED: "bg-cyan-500/15 border-cyan-500/40 text-cyan-300",
};

const STATUS_LABELS = {
  NEW_INTAKE: "NEW INTAKE",
  TRIAGED: "TRIAGED",
  DISCOVERY_SCHEDULED: "DISCOVERY CALL",
  PROPOSAL_SENT: "PROPOSAL SENT",
  IN_NEGOTIATION: "IN NEGOTIATION",
  COMMISSIONED: "COMMISSIONED",
  DISQUALIFIED: "DISQUALIFIED",
  ARCHIVED: "ARCHIVED",
  CRITICAL_ENTERPRISE: "CRITICAL // ENTERPRISE",
};

export default function StatusBadge({ status, className = "" }) {
  if (!status) return null;

  const style = STATUS_STYLES[status] || "bg-white/10 border-white/20 text-white/80";
  const label = STATUS_LABELS[status] || status.replace(/_/g, " ");

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[2px] border font-azeret text-[9px] tracking-[0.15em] uppercase font-medium whitespace-nowrap ${style} ${className}`}
    >
      {status === "NEW_INTAKE" && (
        <span className="size-1 rounded-full bg-accent animate-ping" />
      )}
      {label}
    </span>
  );
}
