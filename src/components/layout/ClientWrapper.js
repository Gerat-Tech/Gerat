"use client";

import React, { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import PageLoader from "./PageLoader";
import TransitionOverlay from "./TransitionOverlay";
import { PageTransitionProvider } from "@/context/PageTransitionContext";
import { useNav } from "@/context/NavContext";
import CustomCursor from "../common/CustomCursor";

const emptySubscribe = () => () => {};

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const { isMenuOpen } = useNav();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  if (!mounted) {
    return <div className="bg-[#050505] min-h-screen text-white">{children}</div>;
  }

  // Dashboard routes render their own dedicated shell without public floating navbar
  if (isDashboard) {
    return (
      <div className="min-h-screen w-full">
        {children}
      </div>
    );
  }

  return (
    <PageTransitionProvider>
      <CustomCursor />
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
