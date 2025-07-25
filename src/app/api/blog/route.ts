import { getAuthSession } from "@/utils/auth";
import prisma from '../../../lib/db/prisma'
import { NextResponse } from "next/server";

//CREATE A GET METHOD
export const GET = async (req:Request) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") as any;


  const POST_PER_PAGE = 2;

  const query:any = {
    take: 2,
    skip: POST_PER_PAGE * (page - 1),
    orderBy: { createAt: "desc" }, // เรียงลำดับบทความตามวันที่ล่าสุด
    where: {
      status: "published" // เงื่อนไขการกรองเฉพาะบทความที่มีสถานะเป็น "Published"
    },
    include: { user: { select: { email: true } } }
  };


  try {
    const [blog, count] = await prisma.$transaction([
      prisma.blog.findMany(query) ,
      prisma.blog.count({ where: query.where }),
      
    ]);
    return new NextResponse(JSON.stringify({ blog, count }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }), { status: 500 })
  
  }
};

