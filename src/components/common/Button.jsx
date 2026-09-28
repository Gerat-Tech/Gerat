"use client";

import React from "react";
import Link from "next/link";

/**
 * V2 Receivio-Inspired Pill Button Component
 *
 * Replaces sharp industrial rectangles with smooth, organic pill buttons (`rounded-full`).
 * Variants:
 * - `primary`: Flame Orange (#EA5B15) background, white bold text, ambient glow shadow
 * - `secondary`: Transparent/subtle border, high-contrast hover
 * - `dark`: Deep Coffee Bean (#300F0A) background, cream text
 */
export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  icon,
  iconPosition = "right",
  disabled = false,
  ...props
}) {
  const sizeClasses = {
    sm: "px-5 py-2 text-[11px] tracking-[0.18em]",
    md: "px-7 py-3.5 text-[12px] tracking-[0.2em]",
    lg: "px-9 py-4 text-[13px] tracking-[0.22em]",
  };

  const variantClasses = {
    primary:
      "bg-accent text-white font-bold border border-accent shadow-md hover:bg-white hover:text-[#300F0A] hover:border-white hover:shadow-accent/20",
    secondary:
      "bg-transparent text-[var(--text-primary)] font-semibold border border-[var(--border-strong)] hover:border-accent hover:text-accent hover:bg-accent/5",
    dark:
      "bg-[#300F0A] text-[#FAF6ED] font-bold border border-[#300F0A] hover:bg-accent hover:text-white hover:border-accent",
    ghost:
      "bg-transparent text-[var(--text-secondary)] font-medium hover:text-accent",
  };

  const baseClasses = `group relative isolate inline-flex items-center justify-center font-parkinsans uppercase rounded-full select-none cursor-pointer transition-all duration-300 transform-gpu active:scale-[0.98] ${
    sizeClasses[size] || sizeClasses.md
  } ${variantClasses[variant] || variantClasses.primary} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  } ${className}`;

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      {...props}
    >
      {content}
    </button>
  );
}
