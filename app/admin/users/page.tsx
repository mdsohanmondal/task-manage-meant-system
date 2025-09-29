'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/app/components/cards/Card';
import getUsers from '@/app/utils/getUserAdmin';
import { Button } from '@/components/ui/button';
import { User as PUser } from '@prisma/client';
import { ArrowLeft, User } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const UsersPage = () => {
  const [userLists, setUserLists] = useState<Response | null>(null);
  useEffect(() => {
    const fetchUsers = async function () {
      const userData = await fetch(`http://localhost:3000/api/admin/users`);
      const jsData = await userData?.json();
      setUserLists(jsData);
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    console.log(userLists);
  }, [userLists]);

  console.log(userLists);
  return (
    <>
      <div className="nav-section flex items-center justify-between px-6 border-b shadow-sm">
        {/* Left side */}
        <div>
          <div className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mt-2">
            Team Members
          </h1>
          <p className="text-sm text-gray-500">
            Manage your team member and their access
          </p>
        </div>

        {/* Right side */}
        <Button className="flex items-center gap-2 rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">Add member</span>
        </Button>
      </div>

      {/* user cards */}
      <div className="px-32 flex items-baseline justify-start gap-5">
        <Card className=" min-w-52">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{'title'}</CardTitle>
            {/* {icon} */}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${'text-red-500'}`}
            >{`Hello`}</div>
            <p className="text-xs text-muted-foreground">{'Content'}</p>
          </CardContent>
        </Card>
        <Card className=" min-w-52">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{'title'}</CardTitle>
            {/* {icon} */}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${'text-red-500'}`}
            >{`Hello`}</div>
            <p className="text-xs text-muted-foreground">{'Content'}</p>
          </CardContent>
        </Card>
        <Card className=" min-w-52">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{'title'}</CardTitle>
            {/* {icon} */}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${'text-red-500'}`}
            >{`Hello`}</div>
            <p className="text-xs text-muted-foreground">{'Content'}</p>
          </CardContent>
        </Card>
        <Card className=" min-w-52">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{'title'}</CardTitle>
            {/* {icon} */}
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${'text-red-500'}`}
            >{`Hello`}</div>
            <p className="text-xs text-muted-foreground">{'Content'}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UsersPage;
