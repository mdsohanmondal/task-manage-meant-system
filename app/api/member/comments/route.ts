import prisma from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';
interface IComment {
  content: string;
  author_id: string;
  task_id: string;
}
export async function POST(request: NextRequest) {
  try {
    const body: IComment = await request.json();
    const { content, author_id, task_id } = body;
    const comment = await prisma.comment.create({
      data: { content, author_id, task_id },
    });
    return NextResponse.json({ comment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
