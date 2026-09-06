"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ACTIONS = [
  { id: "inquiries", title: "Go to Inquiries Pipeline", section: "Navigation", shortcut: "G I", href: "/dashboard/inquiries" },
  { id: "insights", title: "Go to Research & Insights", section: "Navigation", shortcut: "G A", href: "/dashboard/insights" },
  { id: "portfolio", title: "Go to Portfolio Works", section: "Navigation", shortcut: "G P", href: "/dashboard/portfolio" },
  { id: "team", title: "Go to Team Roster", section: "Navigation", shortcut: "G T", href: "/dashboard/team" },
  { id: "services", title: "Go to Services & Practice Pillars", section: "Navigation", shortcut: "G S", href: "/dashboard/services" },
  { id: "settings", title: "Go to System Settings & Config", section: "Navigation", shortcut: "G C", href: "/dashboard/settings" },
  { id: "site", title: "View Public Website", section: "External", shortcut: "V W", href: "/" },
];

export default function CommandPalette({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredActions = ACTIONS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.section.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
        setQuery("");
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredActions.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % (filteredActions.length || 1));
      } else if (e.key === "Enter" && filteredActions[selectedIndex]) {
        e.preventDefault();
        router.push(filteredActions[selectedIndex].href);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, filteredActions, selectedIndex, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 sm:pt-32 px-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#121212] border border-white/20 rounded-[4px] shadow-[0_24px_80px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <svg viewBox="0 0 24 24" fill="none" className="size-4 text-white/40" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to module..."
            className="w-full bg-transparent text-white font-sans text-sm placeholder:text-white/30 outline-none"
          />
          <span className="font-azeret text-[10px] tracking-wider text-white/30 border border-white/10 px-1.5 py-0.5 rounded-[2px]">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2 divide-y divide-white/5">
          {filteredActions.length === 0 ? (
            <div className="p-6 text-center font-azeret text-xs text-white/40 uppercase tracking-[0.15em]">
              NO MATCHING COMMANDS FOUND
            </div>
          ) : (
            filteredActions.map((action, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={action.id}
                  onClick={() => {
                    router.push(action.href);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-[3px] cursor-pointer transition-colors ${
                    isSelected ? "bg-accent/15 text-white" : "text-white/70 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-azeret text-[9px] tracking-wider text-accent uppercase font-semibold">
                      {action.section}
                    </span>
                    <span className="font-roc text-sm font-medium">{action.title}</span>
                  </div>
                  <span className="font-azeret text-[10px] tracking-widest text-white/40 border border-white/10 px-2 py-0.5 rounded-[2px]">
                    {action.shortcut}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-white/[0.02] border-t border-white/10 flex items-center justify-between font-azeret text-[9px] tracking-wider text-white/30 uppercase">
          <span>NAVIGATION // USE ↑↓ ARROWS</span>
          <span>SELECT // ENTER ↵</span>
        </div>
      </div>
    </div>
  );
}
