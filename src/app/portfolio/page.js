"use client";

import React, { useState } from "react";
import Hero from "./components/Hero";
import PortfolioShowcase from "./components/PortfolioShowcase";
import Footer from "@/components/layout/Footer";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("ALL DISCIPLINES");

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      <Hero
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <PortfolioShowcase activeCategory={activeCategory} />
      <Footer />
    </main>
  );
}
