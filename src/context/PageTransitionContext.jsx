"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const PageTransitionContext = createContext({
  isTransitioning: false,
});

export function PageTransitionProvider({ children }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Trigger transition state on pathname change
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <PageTransitionContext.Provider value={{ isTransitioning }}>
      {children}
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
