'use client';
import { signOut } from 'next-auth/react';
const SignInBtn = () => {
  const handleLogout = () => {
    signOut();
  };
  return (
    <div>
      <button
        className="border px-3 py-1 border-zinc-400"
        onClick={handleLogout}
      >
        log out
      </button>
    </div>
  );
};

export default SignInBtn;
