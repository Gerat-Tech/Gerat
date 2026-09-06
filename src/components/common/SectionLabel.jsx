import React from "react";

/**
 * Editorial Section Label (Spec §4 Mono family)
 * Displays technical metadata indices such as "01 / CAPABILITIES"
 */
export default function SectionLabel({
  index = "01",
  label = "SECTION",
  className = "",
  showDot = true,
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 font-azeret text-[11px] sm:text-[12px] tracking-[0.2em] text-white/60 uppercase select-none ${className}`}
    >
      {showDot && (
        <span
          className="size-1.5 rounded-[1px] bg-accent animate-corner-pulse shrink-0"
          aria-hidden="true"
        />
      )}
      <span className="text-white/40">{index}</span>
      <span className="text-white/20">/</span>
      <span className="text-white/90">{label}</span>
    </div>
  );
}
