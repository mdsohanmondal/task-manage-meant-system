import prisma from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');
    const members = url.searchParams.get('members');

    if (taskId) {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: { assign_members: Boolean(members) && true },
      });
      return NextResponse.json({ task }, { status: 200 });
    } else {
      const allTasks = await prisma.task.findMany({
        include: { assign_members: true },
      });
      return NextResponse.json({ tasks: allTasks }, { status: 200 });
    }
  } catch (er) {
    console.error(er);
    return NextResponse.json(er);
  }
}
