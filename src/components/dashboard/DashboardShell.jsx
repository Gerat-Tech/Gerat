"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import CommandPalette from "./CommandPalette";

export default function DashboardShell({ user, stats = {}, children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  // If on login page, render clean full-screen terminal without chrome
  if (pathname === "/dashboard/login") {
    return children;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex font-sans selection:bg-accent selection:text-black">
      {/* Collapsible Left Sidebar */}
      <DashboardSidebar
        stats={stats}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          user={user}
          onOpenCommand={() => setIsCommandOpen(true)}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />
    </div>
  );
}
