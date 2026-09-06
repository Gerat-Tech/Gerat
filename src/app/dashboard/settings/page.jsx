import React from "react";
import prisma from "@/lib/prisma";
import SettingsClientView from "./components/SettingsClientView";

export const metadata = {
  title: "System Control & Telemetry // Gerat Mission Control",
  description: "Manage global brand parameters, real-time alert webhooks, and immutable audit logs",
};

export default async function SettingsDashboardPage() {
  const [configs, auditLogs] = await Promise.all([
    prisma.siteConfig.findMany({
      orderBy: { key: "asc" },
    }),
    prisma.auditLog.findMany({
      take: 50,
      orderBy: { createdAt: "desc" },
      include: {
        actor: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    }),
  ]);

  const configMap = configs.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return (
    <SettingsClientView
      initialConfigs={configMap}
      initialAuditLogs={auditLogs}
      defaultTab="config"
    />
  );
}
