"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const NavContext = createContext({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  isContactOpen: false,
  setIsContactOpen: () => {},
  openContact: () => {},
  closeContact: () => {},
});

export function NavProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);

  return (
    <NavContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isContactOpen,
        setIsContactOpen,
        openContact,
        closeContact,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
