import prisma from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

//  create a task
export async function POST(request: NextRequest) {
  try {
    const {
      user_id,
      title,
      description,
      priority,
      due_date,
      assign_members,
      attachment,
      created_by,
    } = await request.json();

    // error handling
    if (
      !user_id ||
      !title ||
      !description ||
      !priority ||
      !due_date ||
      !assign_members ||
      !attachment ||
      !created_by
    ) {
      return NextResponse.json(
        { message: '* Fields are required' },
        { status: 400 }
      );
    }

    // create a task
    const task = await prisma.task.create({
      data: {
        user_id,
        created_by,
        title,
        description,
        priority,
        due_date,
        attachment: attachment ?? '',
        assign_members: {
          connect: assign_members.map((id: string) => ({ id })),
        },
      },
      include: {
        assign_members: { select: { id: true, username: true } },
        creator: { select: { id: true, username: true } },
        user: { select: { id: true, username: true } },
      },
    });
    return NextResponse.json(
      { message: 'Task create successfully', task },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Server error', err }, { status: 500 });
  }
}

// get all the tasks
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');
    const members = url.searchParams.get('members');
    const subTasks = url.searchParams.get('subTask');

    // get the single task
    if (taskId) {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
          assign_members: members === 'true' && true,
          sub_tasks: subTasks === 'true' && true,
        },
      });
      return NextResponse.json({ task }, { status: 200 });

      // get the all tasks
    } else {
      const allTasks = await prisma.task.findMany({
        include: {
          assign_members: members === 'true' && true,
          sub_tasks: subTasks === 'true' && true,
        },
      });
      return NextResponse.json({ tasks: allTasks }, { status: 200 });
    }
  } catch (er) {
    console.error(er);
    return NextResponse.json(er);
  }
}
