import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

import CardPost from "./CardPost";

function LoadingComponent() {
  return (
    <>
    <div className="flex border-2 rounded-lg overflow-hidden shadow-md mb-4 w-full justify-between cursor-pointer transition duration-300 hover:shadow-xl">
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="w-4/5">
            <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2 p-1">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="h-12 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>

        <div className="flex justify-between">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-6 w-1/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
        </div>
      </div>
      <div className="relative h-50 w-1/3">
        <div className="h-full w-full bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="flex border-2 rounded-lg overflow-hidden shadow-md mb-4 w-full justify-between cursor-pointer transition duration-300 hover:shadow-xl">
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="w-4/5">
            <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2 p-1">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="h-12 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-10 bg-gray-200 rounded mb-2 animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse"></div>

        <div className="flex justify-between">
          <div className="h-6 w-1/3 bg-gray-200 rounded mb-2 animate-pulse"></div>
          <div className="h-6 w-1/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
        </div>
      </div>
      <div className="relative h-50 w-1/3">
        <div className="h-full w-full bg-gray-200 rounded"></div>
      </div>
    </div>
    </>
  );
}


// const getData = async (page:any, isStatus:any) => {
//   const statusParam = isStatus ? `&status=${isStatus}` : '';
//   const res = await fetch(
//     `http://localhost:3000/api/blog?page=${page}${statusParam}`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };


const getData = async (page:any, isStatus:any) => {
  const statusParam = isStatus ? `&status=${isStatus}` : '';
  const apiEndpoint = process.env.REACT_APP_API_KEY
  console.log('apiEndpoint งับ',apiEndpoint)
  const res = await fetch(
    `${apiEndpoint}/api/blog?page=${page}${statusParam}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = ({ isStatus,page }:any) => {
  const [blogData, setBlogData] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const POST_PER_PAGE = 2;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { blog, count } = await getData(page,isStatus);
        setBlogData(blog);
        setCount(count);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page,blogData]);
  
  return (
    <div className="w-full">
      <h1 className="font-bold p-2 my-5 text-6xl"> Embarking on a Journey of Wisdom </h1>
      <p className="my-5 p-2">Check out our blog posts for the latest</p>
      <div className="">
        {!loading ? (
          blogData?.map((item:any) => (
            <CardPost item={item} key={item.id} />
          ))
        ) : (
          // Loading Skeleton
            <LoadingComponent/>
        )}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
