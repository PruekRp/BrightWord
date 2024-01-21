import { getAuthSession } from "@/utils/auth";
import prisma from '../../../lib/db/prisma'
import { NextResponse } from "next/server";

//CREATE A GET METHOD
export const GET = async (req:Request, res:NextResponse) => {
  try {
    const blogs = await prisma.blog.findMany({
      include: {
        user: true,
      },
    });

    return new NextResponse(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};

// CREATE A POST METHOD
export const POST = async (req:Request) => {
    const session = await getAuthSession();
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
    try {
      const body = await req.json();
      const blog = await prisma.blog.create({
        data: { ...body, userEmail: session.user?.email },
      });
      
      return new NextResponse(JSON.stringify(blog, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };