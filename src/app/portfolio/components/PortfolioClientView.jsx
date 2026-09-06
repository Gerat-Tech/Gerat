"use client";

import React, { useState } from "react";
import Hero from "./Hero";
import PortfolioShowcase from "./PortfolioShowcase";

export default function PortfolioClientView({ initialProjects = null }) {
  const [activeCategory, setActiveCategory] = useState("ALL DISCIPLINES");

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
