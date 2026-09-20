import React from "react";

/**
 * Editorial Section Label (Spec §4 Mono family)
 * Displays technical metadata indices such as "01 / CAPABILITIES"
 */
export default function SectionLabel({
  index, // Kept for backwards compatibility if passed, but not rendered
  label = "SECTION",
  className = "",
  showDot = true,
}) {
  return (
    <div
      className={`inline-flex items-center gap-2.5 font-parkinsans text-[11px] sm:text-[12px] tracking-[0.2em] text-[var(--text-secondary)] uppercase select-none ${className}`}
    >
      {showDot && (
        <span
          className="size-1.5 rounded-[1px] bg-accent animate-corner-pulse shrink-0"
          aria-hidden="true"
        />
      )}
      <span className="text-[var(--text-primary)] font-medium">{label}</span>
    </div>
  );
}
