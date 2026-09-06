"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

const NAV_ITEMS = [
  { name: "OVERVIEW", href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { name: "INQUIRIES / CRM", href: "/dashboard/inquiries", icon: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4", badgeKey: "newInquiries" },
  { name: "RESEARCH & INSIGHTS", href: "/dashboard/insights", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  { name: "PORTFOLIO & PRODUCTS", href: "/dashboard/portfolio", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { name: "TEAM & ROSTER", href: "/dashboard/team", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
  { name: "PRACTICE PILLARS", href: "/dashboard/services", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  { name: "SYSTEM SETTINGS", href: "/dashboard/settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default function DashboardSidebar({ stats = {}, isOpen = true, onClose = () => {} }) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  return (
    <aside
      className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 flex flex-col justify-between transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } ${
        isLight
          ? "bg-white border-r border-[#E2E5EB] text-[#0D0F12]"
          : "bg-[#0d0d0d] border-r border-white/10 text-white"
      }`}
    >
      {/* Top Brand & Version Block */}
      <div className="flex flex-col">
        <div className={`p-5 border-b flex items-center justify-between ${isLight ? "border-[#E2E5EB]" : "border-white/10"}`}>
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div
              className={`size-8 rounded-[3px] flex items-center justify-center transition-colors ${
                isLight
                  ? "bg-[#F0F2F5] border border-[#E2E5EB] text-[#0D0F12] group-hover:border-accent"
                  : "bg-white/5 border border-white/15 text-white group-hover:border-accent"
              }`}
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
                <path d="M4 4H20V8H8V16H16V12H12V8H20V20H4V4Z" fill="currentColor" />
                <rect x="17" y="13" width="3" height="3" fill="#FF4A00" />
              </svg>
            </div>
            <div>
              <div className={`font-roc text-sm font-bold tracking-tight uppercase ${isLight ? "text-[#0D0F12]" : "text-white"}`}>
                GERAT CONTROL
              </div>
              <div className={`font-azeret text-[9px] tracking-[0.2em] uppercase ${isLight ? "text-[#555D6B]" : "text-white/40"}`}>
                OPS TERMINAL // v1.0
              </div>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className={`lg:hidden p-1 ${isLight ? "text-[#555D6B] hover:text-[#0D0F12]" : "text-white/50 hover:text-white"}`}
          >
            ✕
          </button>
        </div>

        {/* System Status Ticker */}
        <div
          className={`px-5 py-2.5 border-b flex items-center justify-between font-azeret text-[9px] tracking-[0.15em] uppercase ${
            isLight
              ? "bg-[#F0F2F5] border-[#E2E5EB] text-[#555D6B]"
              : "bg-black/40 border-white/5 text-white/40"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SYS: ONLINE</span>
          </span>
          <span>LATENCY: 12MS</span>
        </div>

        {/* Navigation Link Stack */}
        <nav className="p-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);

            const badgeCount = item.badgeKey ? stats[item.badgeKey] : null;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between py-2.5 px-3 rounded-[3px] font-azeret text-[10px] tracking-[0.15em] uppercase transition-all ${
                  isActive
                    ? isLight
                      ? "bg-accent/10 text-[#0D0F12] border-l-2 border-accent font-bold"
                      : "bg-accent/15 text-white border-l-2 border-accent font-semibold"
                    : isLight
                    ? "text-[#555D6B] hover:text-[#0D0F12] hover:bg-[#F0F2F5]"
                    : "text-white/60 hover:text-white hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className={`size-4 ${isActive ? "text-accent" : isLight ? "text-[#848D9C]" : "text-white/40"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d={item.icon}
                    />
                  </svg>
                  <span className="truncate">{item.name}</span>
                </div>

                {badgeCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-[2px] bg-accent text-white font-azeret text-[9px] font-bold">
                    {badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Exit to Public Site */}
      <div className={`p-4 border-t flex flex-col gap-2 ${isLight ? "border-[#E2E5EB]" : "border-white/10"}`}>
        <Link
          href="/"
          target="_blank"
          className={`w-full py-2 px-3 font-azeret text-[9px] tracking-[0.15em] uppercase rounded-[2px] flex items-center justify-between transition-colors ${
            isLight
              ? "bg-[#F0F2F5] hover:bg-[#E4E7ED] border border-[#E2E5EB] text-[#555D6B] hover:text-[#0D0F12]"
              : "bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 text-white/70 hover:text-white"
          }`}
        >
          <span>VIEW PUBLIC SITE</span>
          <span>↗</span>
        </Link>
      </div>
    </aside>
  );
}
