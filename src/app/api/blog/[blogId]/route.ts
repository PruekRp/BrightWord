import { NextResponse } from "next/server";
import prisma from '../../../../lib/db/prisma'
import getCurrentUser from "@/app/actions/getCurrentUser";
import { getAuthSession } from "@/utils/auth";

interface IParams{
    blogId?:string
}

export const GET = async (req:Request,  {params}:{params:IParams}) => {
    const { blogId } = params;
  
    try {
      const blog = await prisma.blog.findUnique({
        where: { id:blogId },
        include: {
          user: true,
        },
      });
  
      if (!blog) {
        return new NextResponse(
          JSON.stringify({ message: 'Blog not found' }),
          { status: 404 }
        );
      }
  
      return new NextResponse(JSON.stringify(blog), { status: 200 });
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ message: 'Something went wrongs!' }),
        { status: 500 }
      );
    }
  };

  export async function DELETE(
    request: Request,
    { params }: { params: IParams }
) {
    const { blogId } = params;
  
    if (!blogId || typeof blogId !== 'string') {
        throw new Error('Invalid Id');
    }

    try {
        const blog = await prisma.blog.deleteMany({
            where: {
                id: blogId,  
            },
        });

        if (blog && blog.count > 0) {
            return NextResponse.json({ message: 'Blog deleted successfully' });
        } else {
            return new NextResponse(
                JSON.stringify({ message: 'Blog not found or you do not have permission' }),
                { status: 404 }
            );
        }
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({ message: 'Something went wrong!' }),
            { status: 500 }
        );
    }
}

export const POST = async (req: Request, { params }: { params: IParams }) => {
  const { blogId } = params; //มันคือ userID

  // ตรวจสอบว่า userId ถูกส่งมาหรือไม่
  if (!blogId || typeof blogId !== 'string') {
    throw new Error('Invalid userId');
  }

  try {
    // สร้างบล็อกใหม่ในฐานข้อมูลโดยใช้ userId เท่านั้น
    const newBlog = await prisma.blog.create({
      data: {
        userId: blogId,
        title: '', //* กำหนดค่า title เป็นค่าว่างได้
        content: '', //* กำหนดค่า content เป็นค่าว่างได้
        slug: '' //* กำหนดค่า slug เป็นค่าว่างได้
      },
    });

    return NextResponse.json(newBlog, { status: 201 }); // ส่งข้อมูลบล็อกใหม่ที่สร้างแล้วกลับไปพร้อมสถานะการทำงาน 201 Created
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: 'Something went wrong!' }),
      { status: 500 }
    );
  }
};



export async function PUT(
    request: Request,
    { params }: { params: IParams }
  ) {
    const json = await request.json();
      
    const { blogId } = params;
  
    if (!blogId || typeof blogId !== 'string') {
      throw new Error('Invalid Id');
    }
  
    try {
      // Retrieve the existing blog
      const blog = await prisma.blog.findUnique({
        where: { id: blogId },
      });
  
      if (!blog) {
        return new NextResponse(
          JSON.stringify({ message: 'Blog not found' }),
          { status: 404 }
        );
      }
  
      // Update the blog
      const updatedBlog = await prisma.blog.update({
        where: {
          id: blogId,
        },
        data: json,
      });
  
      return NextResponse.json(updatedBlog);
    } catch (error) {
      console.error(error);
      return new NextResponse(
        JSON.stringify({ message: 'Something went wrong!' }),
        { status: 500 }
      );
    }
  }
  