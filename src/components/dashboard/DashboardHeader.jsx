"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function DashboardHeader({ user, onOpenCommand, onToggleSidebar }) {
  const router = useRouter();
  const { resolvedTheme, toggleTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/dashboard/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 h-16 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between transition-colors duration-200 ${
        isLight
          ? "bg-white/95 border-b border-[#E2E5EB] text-[#0D0F12]"
          : "bg-[#080808]/90 border-b border-white/10 text-white"
      }`}
    >
      {/* Left: Mobile Toggle & Command Search Trigger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className={`lg:hidden p-2 rounded-[2px] transition-colors ${
            isLight
              ? "text-[#0D0F12]/70 hover:text-[#0D0F12] border border-[#E2E5EB]"
              : "text-white/70 hover:text-white border border-white/10"
          }`}
          aria-label="Toggle Navigation Menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Command Palette Trigger Button */}
        <button
          type="button"
          onClick={onOpenCommand}
          className={`hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-[3px] transition-all text-xs font-sans group ${
            isLight
              ? "bg-[#F0F2F5] hover:bg-[#E4E7ED] border border-[#E2E5EB] text-[#555D6B] hover:text-[#0D0F12]"
              : "bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-white/50 hover:text-white"
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-3.5 group-hover:text-accent transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search or run command...</span>
          <kbd
            className={`font-azeret text-[9px] tracking-wider px-1.5 py-0.5 rounded-[2px] ${
              isLight
                ? "bg-white border border-[#D4D8E0] text-[#555D6B]"
                : "border border-white/10 text-white/40"
            }`}
          >
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: User Pill, Theme Switcher & Quick Action Bar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* 1-Click Theme Switcher Pill */}
        <button
          type="button"
          onClick={toggleTheme}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-[2px] font-azeret text-[9px] tracking-[0.15em] uppercase font-bold transition-colors ${
            isLight
              ? "bg-[#F0F2F5] hover:bg-[#E4E7ED] text-[#0D0F12] border border-[#E2E5EB]"
              : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
          }`}
          title={isLight ? "Switch to Dark Monolithic Mode" : "Switch to Architectural Light Mode"}
          aria-label="Toggle Theme"
        >
          {isLight ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-3 text-amber-600" strokeWidth="2.5">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <span className="hidden md:inline">LIGHT</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-3 text-amber-400" strokeWidth="2.5">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
              <span className="hidden md:inline">DARK</span>
            </>
          )}
        </button>

        {/* Quick Add Action */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-accent text-white hover:bg-black hover:text-white font-azeret text-[10px] tracking-[0.15em] uppercase font-bold rounded-[2px] transition-colors"
          >
            <span>+ ACTION</span>
            <span className="text-[8px]">▼</span>
          </button>

          {isMenuOpen && (
            <div
              className={`absolute right-0 mt-2 w-48 rounded-[3px] shadow-2xl py-1 z-50 font-azeret text-[10px] tracking-wider uppercase divide-y ${
                isLight
                  ? "bg-white border border-[#E2E5EB] divide-black/5"
                  : "bg-[#141414] border border-white/15 divide-white/5"
              }`}
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  router.push("/dashboard/inquiries");
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 transition-colors ${
                  isLight ? "text-[#0D0F12] hover:bg-black/5" : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                Triage Inquiries
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/dashboard/insights");
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 transition-colors ${
                  isLight ? "text-[#0D0F12] hover:bg-black/5" : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                + New Whitepaper
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/dashboard/portfolio");
                  setIsMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 transition-colors ${
                  isLight ? "text-[#0D0F12] hover:bg-black/5" : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                + New Case Study
              </button>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className={`flex items-center gap-3 pl-3 border-l ${isLight ? "border-[#E2E5EB]" : "border-white/10"}`}>
          <div className="size-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-azeret text-[10px] text-accent font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
          </div>

          <div className="hidden md:flex flex-col text-left">
            <span className={`font-roc text-xs font-semibold leading-tight ${isLight ? "text-[#0D0F12]" : "text-white"}`}>
              {user?.name || "Operator"}
            </span>
            <span className="font-azeret text-[8px] tracking-[0.2em] text-accent uppercase font-bold">
              {user?.role || "AUTHENTICATED"}
            </span>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`p-1.5 transition-colors ${
              isLight ? "text-[#555D6B] hover:text-red-500" : "text-white/40 hover:text-red-400"
            }`}
            title="End Session / Logout"
            aria-label="Logout"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
