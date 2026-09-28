import React from "react";
import AboutHero from "./components/AboutHero";
import OurStory from "./components/OurStory";
import WhatWeBelieve from "./components/WhatWeBelieve";
import TheFounders from "./components/TheFounders";
import AboutCTA from "./components/AboutCTA";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About | Gerat",
  description:
    "From custom websites to full brand systems, Gerat engineers the digital infrastructure that carries your business straight to the audience it deserves.",
  openGraph: {
    title: "About Gerat — We build the bridge. You cross it.",
    description:
      "From custom websites to full brand systems, Gerat engineers the digital infrastructure that carries your business straight to the audience it deserves.",
    url: "https://www.gerat.com/about",
    siteName: "Gerat",
    locale: "en_US",
    type: "website",
  },
};

/**
 * V2 About Page
 *
 * Narrative Structure:
 * 01. Hero — WELCOME TO GERÄT
 * 02. Our Story — BUILT TO HOLD WEIGHT.
 * 03. What We Believe — SIMPLE PRINCIPLES. HIGH STANDARDS.
 * 04. The Founders — FIVE FOUNDERS. ONE VISION.
 * 05. Final CTA — LET'S BUILD WHAT'S NEXT.
 * 06. Footer
 */
export default function AboutPage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)]">
      <main>
        <AboutHero />
        <OurStory />
        <WhatWeBelieve />
        <TheFounders />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}
