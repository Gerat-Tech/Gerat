import React from "react";
import prisma from "@/lib/prisma";
import SettingsClientView from "../components/SettingsClientView";

import { siteConfig } from "@/content/index.js";

export const metadata = {
  title: "Site Configuration · Gerat Mission Control",
  description: "Global brand coordinates, emergency hotlines, and marquee ticker tokens",
};

export default async function SiteConfigPage() {
  let configs = [];
  try {
    configs = await prisma.siteConfig.findMany({
      orderBy: { key: "asc" },
    });
  } catch (error) {
    console.warn("SiteConfigPage: unable to fetch configs:", error.message);
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
      defaultTab="config"
    />
  );
}
