import { getServerSession } from "next-auth/next"

import { authOptions } from "@/utils/auth"; 
import prisma from '../../lib/db/prisma'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      }
    });

    if (!currentUser) {
      return null;
    }


    return {
      ...currentUser,
      createdAt: currentUser.createdAt,
      updatedAt: currentUser.updatedAt,
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}