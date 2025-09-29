'use client';

import { usePathname } from 'next/navigation';
import SideBar from './components/sideBar/SideBar';

export default function SideBarWrapper() {
  const pathname = usePathname();
  if (pathname === '/admin/users') {
    return null;
  }

  return <SideBar />;
}
