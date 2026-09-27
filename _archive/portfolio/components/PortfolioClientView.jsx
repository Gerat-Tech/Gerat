"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "./Hero";
import PortfolioShowcase from "./PortfolioShowcase";

const KNOWN_CATEGORIES = [
  "ALL DISCIPLINES",
  "FEATURED",
  "BRAND & IDENTITY",
  "PERSONAL BRAND",
  "ENTERPRISE ERP",
  "AI & RAG",
  "PUBLIC SECTOR",
  "TELEMETRY",
];

export default function PortfolioClientView({ initialProjects = null }) {
  const [liveCount, setLiveCount] = useState(initialProjects ? initialProjects.length : 0);
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category");

  const defaultCategory = useMemo(() => {
    if (paramCategory) {
      const decoded = decodeURIComponent(paramCategory).toUpperCase().trim();
      return (
        KNOWN_CATEGORIES.find(
          (kc) =>
            kc === decoded ||
            kc.replace(/&/g, "AND") === decoded.replace(/&/g, "AND") ||
            kc.includes(decoded) ||
            decoded.includes(kc)
        ) || "ALL DISCIPLINES"
      );
    }
    return "ALL DISCIPLINES";
  }, [paramCategory]);

  const [userSelectedCategory, setUserSelectedCategory] = useState(null);
  const activeCategory = userSelectedCategory ?? defaultCategory;

  return (
    <>
      <Hero
        activeCategory={activeCategory}
        onSelectCategory={setUserSelectedCategory}
        totalCount={liveCount}
      />
      <PortfolioShowcase
        activeCategory={activeCategory}
        initialProjects={initialProjects}
        onCountChange={setLiveCount}
      />
    </>
  );
}
