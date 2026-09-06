"use client";

import React, { useState } from "react";
import InsightsHero from "./InsightsHero";
import LatestNews from "./LatestNews";

export default function InsightsClientView({ initialArticles = null }) {
  const [activeCategory, setActiveCategory] = useState("ALL ARTICLES");

  return (
    <>
      <InsightsHero
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <LatestNews
        activeCategory={activeCategory}
        articles={initialArticles}
      />
    </>
  );
}
