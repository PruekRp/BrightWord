import getCurrentUser from "@/app/actions/getCurrentUser"


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


  const SinglePage = async ({ params }:any) => {
    const { blogId } = params;
    const data = await getData(blogId);
    console.log(data.speech);
    return (
      <div>
        {data?.userEmail}
      </div>
    );
  };
  
  export default SinglePage;
  