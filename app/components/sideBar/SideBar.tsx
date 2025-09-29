'use client';
import {
  FileCheck2,
  LayoutDashboard,
  Logs,
  MessageSquareMore,
  Settings,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SideBar = () => {
  const pathname = usePathname();
  const navItems = [
    {
      id: 'nav-1',
      link: '/admin/dashboard',
      icon: <LayoutDashboard size={18} />,
      text: 'Dashboard',
    },
    {
      id: 'nav-2',
      link: '/admin/tasks',
      icon: <FileCheck2 size={18} />,
      text: 'Task',
    },
    {
      id: 'nav-3',
      link: '/admin/',
      icon: <Logs size={18} />,
      text: 'Sub Tasks',
    },
    {
      id: 'nav-4',
      link: '/admin/users',
      icon: <Users size={18} />,
      text: 'Members',
    },
    {
      id: 'nav-5',
      link: '/admin/comments',
      icon: <MessageSquareMore size={18} />,
      text: 'Comments',
    },
    {
      id: 'nav-6',
      link: '/admin/settings',
      icon: <Settings size={18} />,
      text: 'Setting',
    },
  ];
  return (
    <div
      hidden={(pathname.includes('/auth'), pathname === '/admin/users')}
      className="h-screen min-w-52 border-r mt-20"
    >
      <div className="w-full h-full flex flex-col justify-start items-start gap-1 cursor-pointer">
        {navItems.map(({ id, icon, text, link }) => (
          <Link key={id} href={link} className="w-full">
            <div
              className={`flex items-center justify-start gap-2 hover:bg-gray-200 ${
                pathname === link && 'bg-gray-100'
              } w-full px-5 py-2`}
            >
              {icon}
              <h1>{text}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
