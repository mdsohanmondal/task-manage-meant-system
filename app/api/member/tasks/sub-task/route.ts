import prisma from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const memberId = url.searchParams.get('memberId');
    const assinged = url.searchParams.get('assinged');
    const subTasks = await prisma.subTask.findMany({
      include: { assinged: assinged === 'true' && true, task: true },
    });
    const memberSubtask = subTasks.filter(
      (item) => item.assinged_id === memberId
    );
    return NextResponse.json({ memberSubtask }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e }, { status: 200 });
  }
}
