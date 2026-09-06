
"use client";
import { useNav } from "@/context/NavContext";
import Navbar from "./Navbar"; 
import { useEffect, useState } from "react";

export default function ClientWrapper({ children }) {
  const { isMenuOpen } = useNav();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // While loading, just show the children without the blur logic
  if (!mounted) return <>{children}</>;

  return (
    <>
      <Navbar />
      <main 
        className={`transition-all duration-700 ease-in-out 
          ${isMenuOpen ? "blur-xl opacity-50 pointer-events-none scale-[0.98]" : "blur-0 opacity-100"}`}
      >
        {children}
      </main>
    </>
  );
}
