"use client";

import React, { useState } from "react";
import InsightsHero from "./components/InsightsHero";
import LatestNews from "./components/LatestNews";
import Footer from "@/components/layout/Footer";

export default function InsightsPage() {
  const [activeCategory, setActiveCategory] = useState("ALL ARTICLES");

  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      <InsightsHero
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <LatestNews activeCategory={activeCategory} />
      <Footer />
    </main>
  );
}
