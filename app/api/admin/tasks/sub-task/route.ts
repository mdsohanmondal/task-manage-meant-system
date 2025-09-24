import prisma from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

// create a sub task
export async function POST(request: NextRequest) {
  try {
    const {
      task_id,
      title,
      description,
      assinged_id,
      priority,
      due_date,
      attchment,
    } = await request.json();

    //   validation check
    if (
      !task_id ||
      !title ||
      !description ||
      !assinged_id ||
      !priority ||
      !due_date
    ) {
      return NextResponse.json(
        { message: '* Field are required' },
        { status: 400 }
      );
    }

    const newtask = await prisma.subTask.create({
      data: {
        description,
        due_date,
        title,
        assinged_id,
        priority,
        task_id,
        attchment,
      },
    });
    return NextResponse.json(
      { message: 'Sub task create successfully', newtask },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ err }, { status: 500 });
  }
}

// get all sub task or indivisual
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const subTaskId = url.searchParams.get('subTaskId');
    if (subTaskId) {
      const subTask = await prisma.subTask.findUnique({
        where: { id: subTaskId },
      });
      return NextResponse.json({ subTask }, { status: 200 });
    } else {
      const allSubTasks = await prisma.subTask.findMany();
      return NextResponse.json({ allSubTasks }, { status: 200 });
    }
  } catch (e) {
    return NextResponse.json({ e }, { status: 500 });
  }
}
