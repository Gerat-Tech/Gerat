"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const NavContext = createContext({
  isMenuOpen: false,
  setIsMenuOpen: () => {},
  isContactOpen: false,
  setIsContactOpen: () => {},
  contactPreset: null,
  setContactPreset: () => {},
  openContact: () => {},
  closeContact: () => {},
});

export function NavProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactPreset, setContactPreset] = useState(null);

  const openContact = useCallback((preset = null) => {
    if (preset) {
      setContactPreset(preset);
    }
    setIsContactOpen(true);
  }, []);

  const closeContact = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  return (
    <NavContext.Provider
      value={{
        isMenuOpen,
        setIsMenuOpen,
        isContactOpen,
        setIsContactOpen,
        contactPreset,
        setContactPreset,
        openContact,
        closeContact,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export const useNav = () => useContext(NavContext);
