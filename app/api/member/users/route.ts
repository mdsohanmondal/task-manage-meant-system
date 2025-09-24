import prisma from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const userEmail = url.searchParams.get('email');

    // find by user id
    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      return NextResponse.json({ user }, { status: 200 });
    }
    // find by user email
    if (userEmail) {
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        include: { assigned_tasks: true },
      });
      return NextResponse.json({ user }, { status: 200 });
      // find all users
    } else {
      const allUsers = await prisma.user.findMany({
        include: { assigned_tasks: true },
      });
      return NextResponse.json({ users: allUsers }, { status: 200 });
    }
  } catch (er) {
    console.log(er);
    return NextResponse.json({ error: er }, { status: 500 });
  }
}
