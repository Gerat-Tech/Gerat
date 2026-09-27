import React from "react";
import AboutHero from "./components/AboutHero";
import OurStory from "./components/OurStory";
import WhatGeratMeans from "./components/WhatGeratMeans";
import TheBridge from "./components/TheBridge";
import WhatWeBelieve from "./components/WhatWeBelieve";
import TheFounders from "./components/TheFounders";
import WhereWeAreGoing from "./components/WhereWeAreGoing";
import AboutCTA from "./components/AboutCTA";
import Footer from "@/components/layout/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About | Gerat Software Solution",
  description:
    "Gerat is a software and IT solutions company building useful digital products, intelligent tools, business systems, and brand identities for growing businesses.",
  openGraph: {
    title: "About Gerat — A New Company. A Clear Direction.",
    description:
      "Gerat is a software and IT solutions company building useful digital products, intelligent tools, business systems, and brand identities for growing businesses.",
    url: "https://www.gerat.com/about",
    siteName: "Gerat Software Solution",
    locale: "en_US",
    type: "website",
  },
};

/**
 * V2 About Page
 *
 * Narrative Structure:
 * 01. Hero — A NEW COMPANY. A CLEAR DIRECTION.
 * 02. Our Story — WE STARTED WITH A SIMPLE IDEA.
 * 03. What Gerat Means — A NAME BUILT AROUND USEFULNESS.
 * 04. The Gerat Idea (The Bridge) — WE BUILD THE BRIDGE.
 * 05. What We Believe — SIMPLE PRINCIPLES. HIGH STANDARDS.
 * 06. The Founders — FIVE FOUNDERS. ONE VISION.
 * 07. Where We Are Going — STARTING NOW. BUILDING FOR WHAT COMES NEXT.
 * 08. Final CTA — LET'S BUILD WHAT'S NEXT.
 * 09. Footer
 */
export default function AboutPage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)]">
      <main>
        <AboutHero />
        <OurStory />
        <WhatGeratMeans />
        <TheBridge />
        <WhatWeBelieve />
        <TheFounders />
        <WhereWeAreGoing />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}
