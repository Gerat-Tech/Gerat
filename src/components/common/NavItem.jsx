"use client";

import React from "react";

export default function NavItem({
  label,
  isActive = false,
  isCurrent = false,
  onMouseEnter,
  className = "",
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      className={`group/item relative isolate flex items-center gap-2 font-azeret text-[11px] sm:text-[12px] tracking-[0.15em] uppercase whitespace-nowrap px-4 py-2.5 transition-colors duration-300 select-none ${
        isCurrent ? "text-white" : "text-white/70 hover:text-white"
      } ${className}`}
    >
      <div className="flex items-center gap-2">
        {/* Leading dot: permanently visible if current route, otherwise slides in on hover */}
        <div
          className={`size-[7px] rounded-[1px] transition-all duration-400 ease-(--ease-primary) ${
            isCurrent
              ? "bg-accent opacity-100 translate-x-0 blur-0 shadow-[0_0_8px_rgba(255,74,0,0.8)]"
              : "bg-white -translate-x-3 opacity-0 blur-[8px] group-hover/item:translate-x-0 group-hover/item:opacity-100 group-hover/item:blur-0"
          }`}
          aria-hidden="true"
        />

        {/* Sliding text reveal animation */}
        <div
          className={`relative isolate flex overflow-hidden transition-transform duration-400 ease-(--ease-primary) ${
            isCurrent
              ? "translate-x-0"
              : "-translate-x-2 group-hover/item:translate-x-0"
          }`}
        >
          <span className="transition-transform duration-400 ease-(--ease-primary) group-hover/item:-translate-y-full">
            {label}
          </span>
          <span
            className="absolute inset-0 translate-y-full transition-transform duration-400 ease-(--ease-primary) group-hover/item:translate-y-0 text-white"
            aria-hidden="true"
          >
            {label}
          </span>
        </div>
      </div>

      {/* 4 Precision Corner Bracket Accents */}
      <div
        className={`absolute top-0 left-0 size-2 border-t border-l transition-opacity duration-300 ${
          isCurrent
            ? "border-accent opacity-100"
            : "border-white/80 opacity-0 group-hover/item:opacity-100"
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute top-0 right-0 size-2 border-t border-r transition-opacity duration-300 ${
          isCurrent
            ? "border-accent opacity-100"
            : "border-white/80 opacity-0 group-hover/item:opacity-100"
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-0 left-0 size-2 border-b border-l transition-opacity duration-300 ${
          isCurrent
            ? "border-accent opacity-100"
            : "border-white/80 opacity-0 group-hover/item:opacity-100"
        }`}
        aria-hidden="true"
      />
      <div
        className={`absolute bottom-0 right-0 size-2 border-b border-r transition-opacity duration-300 ${
          isCurrent
            ? "border-accent opacity-100"
            : "border-white/80 opacity-0 group-hover/item:opacity-100"
        }`}
        aria-hidden="true"
      />
    </div>
  );
}
