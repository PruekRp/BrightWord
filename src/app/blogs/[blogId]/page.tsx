import getCurrentUser from "@/app/actions/getCurrentUser"
import parse from "html-react-parser";

interface IParams {
    blogId:string,
}


const getData = async (blogId:any) => {
    const res = await fetch(`http://localhost:3000/api/blog/${blogId}`);
    if (!res.ok) {
        throw new Error("Failed");
      }
    
    return res.json();
  };


  const SinglePage = async ({ params }: any) => {
    try {
      const { blogId } = params;
      const data = await getData(blogId);
  
      // Check if data is available
      if (!data) {
        // Handle the case where data is not available
        return (
          <div>
            <p>Data not available for blog ID: {blogId}</p>
          </div>
        );
      }
  
      return (
        <div>
          <h1>{data.title}</h1>
          <p>Author: {data.userEmail}</p>
          <p>Created At: {data.createdAt}</p>
          <div>{parse(data.content)}</div>
          
        </div>
      );
    } catch (error) {
      // Handle the case where fetching data fails
      return (
        <div>
          <p>Error fetching data for blog ID</p>
        </div>
      );
    }
  };
  export default SinglePage;
  