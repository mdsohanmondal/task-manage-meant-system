'use client';
import { signIn, signOut } from 'next-auth/react';
const SignInBtn = () => {
  const handleClick = () => {
    signIn('credentials', {
      redirect: false,
      email: 'sm@sohan.com',
      password: '1234',
    });
  };

  const handleLogout = () => {
    signOut();
  };
  return (
    <div>
      <button
        className="border px-3 py-1 border-zinc-400"
        onClick={handleClick}
      >
        Google
      </button>
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
