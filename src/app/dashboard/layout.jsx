import React from "react";
import { cookies } from "next/headers";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Mission Control // Gerat Software Solutions PLC",
  description: "Operations Cockpit, CRM Telemetry, and Dynamic Content Management",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }) {
  let user = null;
  let stats = { newInquiries: 0 };
  let initialTheme = "dark";

  try {
    const cookieStore = await cookies();
    initialTheme = cookieStore.get("gerat-dashboard-theme")?.value || "dark";

    user = await getCurrentUser();
    if (user) {
      const newInquiries = await prisma.inquiry.count({
        where: { status: "NEW_INTAKE" },
      });
      stats.newInquiries = newInquiries;
    }
  } catch {}

  return (
    <DashboardShell user={user} stats={stats} initialTheme={initialTheme}>
      {children}
    </DashboardShell>
  );
}
