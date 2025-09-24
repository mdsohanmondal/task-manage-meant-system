import prisma from '@/app/utils/prismaClient';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  try {
    const { username, email, password, role, status, avatar, updated_at, id } =
      await request.json();

    if (!id) {
      return NextResponse.json(
        { message: 'User id required' },
        { status: 400 }
      );
    }
    const updatedData: Record<string, any> = {};
    if (username) {
      updatedData.username = username;
    }
    if (email) {
      updatedData.email = email;
    }
    if (password) {
      updatedData.password = password;
    }
    if (role) {
      updatedData.role = role;
    }
    if (status) {
      updatedData.status = status;
    }
    if (avatar) {
      updatedData.avatar = avatar;
    }
    if (updated_at) {
      updatedData.updated_at = updated_at;
    }

    updatedData.updated_at = new Date();
    const updatedUser = await prisma.user.update({
      where: { id },
      data: updatedData,
    });
    return NextResponse.json(
      { message: 'User update successfully', data: updatedUser },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: 'Server Error', err }, { status: 500 });
  }
}
