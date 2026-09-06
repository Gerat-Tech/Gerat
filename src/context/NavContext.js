"use client";
import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export function NavProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <NavContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);