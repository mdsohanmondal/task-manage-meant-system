'use client';
import { Button } from '@/components/ui/button';
import { Bell, ListTodo } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const isLogin = true;
  const pathName = usePathname();

  return (
    <div
      hidden={(pathName.includes('/auth'), pathName === '/admin/users')}
      className="w-full fixed top-0 left-0 border-b flex items-center justify-center gap-10 px-10 py-3 backdrop-blur-2xl bg-[#eee4] z-[99]"
    >
      {/* logo section  */}
      <div className="logo flex items-center justify-center gap-2 mr-auto cursor-pointer">
        <ListTodo />
        <h1>TaskMan</h1>
      </div>
      {/* search sections or middle section  */}
      <div className="flex items-center justify-start w-full">
        <input
          type="text"
          placeholder="Search here..."
          className="px-4 py-1 border-2 rounded-xl"
        />
      </div>
      {/* right section  */}
      {isLogin ? (
        <div className="flex items-center justify-center gap-5">
          <div className="notifications">
            <Bell size={20} color="#777" />
          </div>
          <div className="avatar w-8 h-8 bg-gray-300 rounded-full"></div>
          <div className="title">
            <h2 className="text-lg">Name</h2>
            <h4 className="text-sm text-gray-600 text-nowrap">
              {'('}Admin{')'}
            </h4>
          </div>
        </div>
      ) : (
        <Button variant="outline" className="shadow">
          <Link href={'/auth/sign-in'}>Login</Link>
        </Button>
      )}
    </div>
  );
};

export default Navbar;
