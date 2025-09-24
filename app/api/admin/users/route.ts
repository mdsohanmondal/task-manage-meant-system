import prisma from '@/app/utils/prismaClient';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allUsers = await prisma.user.findMany({
      include: { assigned_tasks: true },
    });
    return NextResponse.json({ users: allUsers }, { status: 200 });
  } catch (er) {
    console.log(er);
    return NextResponse.json({ error: er }, { status: 500 });
  }
}
