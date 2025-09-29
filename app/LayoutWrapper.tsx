'use client';

import { useNavbar } from './context/NavbarContext';
import Navbar from './components/nav/Navbar';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isVisible } = useNavbar();

  return (
    <>
      {isVisible && <Navbar />}
      <main
        className={`${
          isVisible ? 'pt-20' : 'pt-0'
        } mx-5 w-screen overflow-x-hidden`}
      >
        {children}
      </main>
    </>
  );
}
