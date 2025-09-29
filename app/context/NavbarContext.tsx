'use client';
import { Children, createContext, useContext, useState } from 'react';
type NavbarContextType = {
  isVisible: boolean;
  toggleNavbar: () => void;
};

const NavbarContext = createContext<NavbarContextType | null>(null);

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(true);
  const toggleNavbar = () => setIsVisible((prev) => !prev);
  return (
    <NavbarContext.Provider value={{ isVisible, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (!context) throw new Error('useNavbar must be used inside NavbarProvider');
  return context;
};
