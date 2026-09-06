"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardHeader({ user, onOpenCommand, onToggleSidebar }) {
  const router = useRouter();
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
    <header className="sticky top-0 z-30 h-16 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between">
      {/* Left: Mobile Toggle & Command Search Trigger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 text-white/70 hover:text-white border border-white/10 rounded-[2px]"
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
          className="hidden sm:flex items-center gap-3 px-3.5 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-[3px] text-white/50 hover:text-white transition-all text-xs font-sans group"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-3.5 group-hover:text-accent transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search or run command...</span>
          <kbd className="font-azeret text-[9px] tracking-wider text-white/40 border border-white/10 px-1.5 py-0.5 rounded-[2px]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: User Pill & Quick Action Bar */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Quick Add Action */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-accent text-white hover:bg-white hover:text-black font-azeret text-[10px] tracking-[0.15em] uppercase font-bold rounded-[2px] transition-colors"
          >
            <span>+ ACTION</span>
            <span className="text-[8px]">▼</span>
          </button>

          {isMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-[#141414] border border-white/15 rounded-[3px] shadow-2xl py-1 z-50 font-azeret text-[10px] tracking-wider uppercase divide-y divide-white/5"
              onMouseLeave={() => setIsMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => {
                  router.push("/dashboard/inquiries");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/5"
              >
                Triage Inquiries
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/dashboard/insights");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/5"
              >
                + New Whitepaper
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push("/dashboard/portfolio");
                  setIsMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/5"
              >
                + New Case Study
              </button>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <div className="size-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center font-azeret text-[10px] text-accent font-bold">
            {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
          </div>

          <div className="hidden md:flex flex-col text-left">
            <span className="font-roc text-xs text-white font-semibold leading-tight">
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
            className="p-1.5 text-white/40 hover:text-red-400 transition-colors title='Logout Session'"
            title="End Session / Logout"
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
