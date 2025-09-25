import prisma from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId: string | null = url.searchParams.get('userId');
    const tasks: string | null = url.searchParams.get('tasks');

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { assigned_tasks: tasks === 'true' && true },
      });
      return NextResponse.json({ user }, { status: 200 });
    }
    const allUsers = await prisma.user.findMany({
      include: { assigned_tasks: tasks === 'true' && true },
    });
    return NextResponse.json({ users: allUsers }, { status: 200 });
  } catch (er) {
    console.log(er);
    return NextResponse.json({ error: er }, { status: 500 });
  }
}
