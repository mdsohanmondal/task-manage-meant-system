import prisma from '@/app/utils/prismaClient';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();
  try {
    const isExisting = await prisma.user.findUnique({
      where: { email },
    });
    if (isExisting) {
      return NextResponse.json(
        { message: 'User already exist in this email' },
        { status: 400 }
      );
    }
    if (!isExisting) {
      await prisma.user.create({
        data: { username, email, password },
      });
    }
    return NextResponse.json(
      { message: 'Register successful' },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Working' }, { status: 200 });
}
