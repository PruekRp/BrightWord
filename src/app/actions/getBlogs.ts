import prisma from '../../lib/db/prisma';

export default async function getBlogs() {
    try{
        const blogs = await prisma.blog.findMany({
            orderBy:{
                createAt:'desc'
            }
        })

        const safeBlogs = blogs.map((blog)=> ({
            ...blog,
           
            
        }))
        
        return safeBlogs;
    }
    catch(err:any){
        throw new Error(err)
    }
}