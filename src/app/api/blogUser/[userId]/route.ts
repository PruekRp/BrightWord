import { NextResponse } from "next/server";
import prisma from '../../../../lib/db/prisma'
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getAuthSession } from "@/utils/auth";

interface IParams{
    userId?:string
}

export const GET = async (req:Request,  {params}:{params:IParams}) => {
    const { userId } = params;
  
    try {
      const blog = await prisma.blog.findMany({
        where: { userId },
        include: { user: { select: { email: true } } }
      });
  
      if (!blog) {
        return new NextResponse(
          JSON.stringify({ message: 'Blog not found' }),
          { status: 404 }
        );
      }
  
      return new NextResponse(JSON.stringify({blog}), { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ message: 'Something went wrongs!' }),
        { status: 500 }
      );
    }
  };
