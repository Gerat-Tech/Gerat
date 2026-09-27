import React from "react";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "About | Gerat Software Solution",
  description:
    "Gerat is a software and IT solutions company building useful digital products, intelligent tools, business systems, and brand identities.",
};

export default function AboutPage() {
  return (
    <div className="bg-[var(--bg)] min-h-screen text-[var(--text-primary)] pt-32 pb-20">
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
        <h1 className="font-parkinsans text-4xl sm:text-6xl font-semibold tracking-tight uppercase mb-6">
          About Gerat
        </h1>
        <p className="font-artific text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          A new company. A clear direction. Gerat builds technology that moves businesses forward.
        </p>
      </main>
      <Footer />
    </div>
  );
}
