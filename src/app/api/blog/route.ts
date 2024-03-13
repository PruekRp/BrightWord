import { getAuthSession } from "@/utils/auth";
import prisma from '../../../lib/db/prisma'
import { NextResponse } from "next/server";

//CREATE A GET METHOD
export const GET = async (req:Request) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");


  const POST_PER_PAGE = 2;

  const query = {
    take: 2,
    skip: POST_PER_PAGE * (page - 1),
    orderBy: { createAt: "desc" }, // เรียงลำดับบทความตามวันที่ล่าสุด
    include: { user: { select: { email: true } } }
  };


  try {
    const [blog, count] = await prisma.$transaction([
      prisma.blog.findMany(query),
      prisma.blog.count({ where: query.where }),
      
    ]);
    return new NextResponse(JSON.stringify({ blog, count }, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
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
        data: { ...body, userId: session.user?.id },
      });
      
      return new NextResponse(JSON.stringify(blog, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };