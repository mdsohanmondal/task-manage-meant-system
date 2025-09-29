'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import React from 'react';

const SignOutPage = () => {
  const handleLogout = async () => {
    await signOut();
  };
  return (
    <div>
      <Button onClick={handleLogout} variant={'secondary'}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutPage;
