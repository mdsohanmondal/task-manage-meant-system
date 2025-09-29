'use client';
import { usePathname } from 'next/navigation';

function getPathName() {
  const pathname = usePathname();
  return pathname;
}
export default getPathName;
