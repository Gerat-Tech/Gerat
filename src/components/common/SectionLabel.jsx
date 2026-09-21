import React from "react";

/**
 * Editorial Section Label (Spec §4 Mono family)
 * Displays technical metadata indices such as "01 / CAPABILITIES"
 */
export default function SectionLabel({
  index, // Kept for backwards compatibility if passed, but not rendered
  label = "SECTION",
  className = "",
}) {
  return (
    <div
      className={`inline-flex items-center font-artific text-[11px] sm:text-[12px] tracking-[0.2em] text-[var(--text-secondary)] uppercase select-none ${className}`}
    >
      <span className="text-[var(--text-primary)] font-medium">{label}</span>
    </div>
  );
}
