import React from "react";
import ServicesOverview from "./components/ServicesOverview";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Platform & Engineering Services | Gerat Software Solutions PLC",
  description:
    "Explore Gerat's four core engineering practices: Enterprise Software Architecture, Domain-Grounded AI & RAG, Custom ERP, and Public-Sector Platforms.",
};

export default function WhyWQF() {
  return (
    <main className="bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">
      <ServicesOverview />
      <Footer />
    </main>
  );
}
