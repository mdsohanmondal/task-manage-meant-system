import prisma from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const taskId: string | null = url.searchParams.get('taskId');
    const members: string | null = url.searchParams.get('members');
    const userId: string | null = url.searchParams.get('userId');
    const comments: string | null = url.searchParams.get('comments');

    if (taskId) {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: {
          assign_members: Boolean(members) && true,
          comments: comments === 'true' && true,
        },
      });

      const isAssigned = task?.assign_members.findIndex(
        (val) => val.id === userId
      );
      if (isAssigned !== undefined && isAssigned >= 0) {
        return NextResponse.json({ task }, { status: 200 });
      } else {
        return NextResponse.json(
          { message: 'You are not include this task' },
          { status: 400 }
        );
      }
    } else {
      const allTasks = await prisma.task.findMany({
        include: {
          assign_members: true,
          comments: comments === 'true' && true,
        },
      });

      const filterTasks = allTasks
        .filter((val) => {
          const filterAssigned = val.assign_members.findIndex(
            (mem) => mem.id === userId
          );

          return filterAssigned !== undefined && filterAssigned >= 0;
        })
        .map(
          ({
            id,
            user_id,
            title,
            description,
            priority,
            due_date,
            attachment,
            status,
            is_complete,
            created_by,
            created_at,
            updated_at,
            attchment,
            comments,
          }) => {
            return {
              id,
              user_id,
              title,
              description,
              priority,
              due_date,
              attachment,
              status,
              is_complete,
              created_by,
              created_at,
              updated_at,
              attchment,
              comments,
            };
          }
        );
      return NextResponse.json({ filterTasks }, { status: 200 });
    }
  } catch (er) {
    console.error(er);
    return NextResponse.json(er);
  }
}

// ?taskId=a7a7c7ec-7e7e-4443-9b68-2fe07b4244d8&members=&userId=d1c3e0d2-8840-44c3-85b7-252cfbc5e29a
