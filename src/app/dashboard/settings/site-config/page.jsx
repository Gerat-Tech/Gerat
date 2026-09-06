import React from "react";
import prisma from "@/lib/prisma";
import SettingsClientView from "../components/SettingsClientView";

export const metadata = {
  title: "Site Configuration // Gerat Mission Control",
  description: "Global brand coordinates, emergency hotlines, and marquee ticker tokens",
};

export default async function SiteConfigPage() {
  const configs = await prisma.siteConfig.findMany({
    orderBy: { key: "asc" },
  });

  const configMap = configs.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return (
    <SettingsClientView
      initialConfigs={configMap}
      defaultTab="config"
    />
  );
}
