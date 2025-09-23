'use client';

import { useSession } from 'next-auth/react';
import SignInBtn from './components/ui/buttons/Sign-in';

export default function Home() {
  const session = useSession();

  return (
    <div>
      <SignInBtn />
      <h1>email: {session?.data?.user.email}</h1>
    </div>
  );
}
