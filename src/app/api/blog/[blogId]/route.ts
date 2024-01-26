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
        JSON.stringify({ message: 'Something went wrong!' }),
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


export async function PUT(
    request:Request,
    {params}:{params:IParams}
){
    const currentUser = await getCurrentUser()
    const json = await request.json()

    if(!currentUser) {
        return NextResponse.error
    }
    const {blogId} = params

    if(!blogId || typeof blogId !== 'string'){
       throw new Error('invalid Id')
    }

    const updated = await prisma.blog.update({
        where:{
            id:blogId,
        },
        data:json

    })

    return NextResponse.json(updated)
}