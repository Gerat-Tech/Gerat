import React from "react";
import prisma from "@/lib/prisma";
import SettingsClientView from "../components/SettingsClientView";

export const metadata = {
  title: "Audit Log Trail // Gerat Mission Control",
  description: "Immutable timeline of all administrative system mutations and operator actions",
};

export default async function AuditLogPage() {
  const [configs, auditLogs] = await Promise.all([
    prisma.siteConfig.findMany({
      orderBy: { key: "asc" },
    }),
    prisma.auditLog.findMany({
      take: 100,
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
      defaultTab="audit"
    />
  );
}
