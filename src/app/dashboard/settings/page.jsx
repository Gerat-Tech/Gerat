import React from "react";
import prisma from "@/lib/prisma";
import SettingsClientView from "./components/SettingsClientView";

import { siteConfig } from "@/content/index.js";

export const metadata = {
  title: "System Control & Settings · Gerat Mission Control",
  description: "Manage global brand parameters, real-time alert webhooks, and immutable audit logs",
};

export default async function SettingsDashboardPage() {
  let configs = [];
  let auditLogs = [];

  try {
    const results = await Promise.all([
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
    configs = results[0];
    auditLogs = results[1];
  } catch (error) {
    console.warn("SettingsDashboardPage: unable to fetch settings/logs:", error.message);
  }

  const configMap = configs.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {
    COMPANY_NAME: siteConfig.name || "Gerat Software Solution",
    CONTACT_EMAIL: siteConfig.contact?.inquiries || "contact@gerat.com",
    CONTACT_PHONE: siteConfig.contact?.phone || "+251 900 000 000",
  });

  return (
    <SettingsClientView
      initialConfigs={configMap}
      initialAuditLogs={auditLogs}
      defaultTab="config"
    />
  );
}
