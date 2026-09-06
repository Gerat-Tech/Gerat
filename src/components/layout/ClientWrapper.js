"use client";

import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import PageLoader from "./PageLoader";
import TransitionOverlay from "./TransitionOverlay";
import { PageTransitionProvider } from "@/context/PageTransitionContext";
import { useNav } from "@/context/NavContext";

export default function ClientWrapper({ children }) {
  const { isMenuOpen } = useNav();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-[#050505] min-h-screen text-white">{children}</div>;
  }

  return (
    <PageTransitionProvider>
      <PageLoader />
      <TransitionOverlay />
      <Navbar />
      <div
        className={`transition-all duration-500 ease-(--ease-primary) ${
          isMenuOpen ? "blur-md opacity-40 pointer-events-none" : "blur-0 opacity-100"
        }`}
      >
        {children}
      </div>
    </PageTransitionProvider>
  );
}
