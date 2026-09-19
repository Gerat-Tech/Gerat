"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Hero from "./Hero";
import PortfolioShowcase from "./PortfolioShowcase";

const KNOWN_CATEGORIES = [
  "ALL DISCIPLINES",
  "BRAND & IDENTITY",
  "PERSONAL BRAND",
  "ENTERPRISE ERP",
  "AI & RAG",
  "PUBLIC SECTOR",
  "TELEMETRY",
];

export default function PortfolioClientView({ initialProjects = null }) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("ALL DISCIPLINES");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      const decoded = decodeURIComponent(cat).toUpperCase().trim();
      const match = KNOWN_CATEGORIES.find(
        (kc) =>
          kc === decoded ||
          kc.replace(/&/g, "AND") === decoded.replace(/&/g, "AND") ||
          kc.includes(decoded) ||
          decoded.includes(kc)
      );
      if (match) {
        setActiveCategory(match);
      }
    }
  }, [searchParams]);

  return (
    <>
      <Hero
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <PortfolioShowcase
        activeCategory={activeCategory}
        initialProjects={initialProjects}
      />
    </>
  );
}
