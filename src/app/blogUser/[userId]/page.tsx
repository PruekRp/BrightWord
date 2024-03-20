"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CardPost from "@/components/blog/CardPost";
import Loading from "@/app/blogs/[blogId]/loading";

 const LoadingComponent = () => {
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

const getData = async (params: any) => {
  const res = await fetch(`http://localhost:3000/api/blogUser/${params}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const BlogUser = ({ params }: any) => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("all"); // เพิ่ม state เพื่อเก็บสถานะการแสดงบล็อก

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { blog } = await getData(params.userId);
        setBlogData(blog);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [status]); // เมื่อสถานะการแสดงบล็อกเปลี่ยนแปลงให้ทำการโหลดข้อมูลใหม่

  // เพิ่มฟังก์ชันเพื่อเปลี่ยนสถานะการแสดงบล็อก
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between">
        <h1 className="font-bold p-2 my-5 text-6xl">Your blog</h1>
        {/* เพิ่มปุ่มสำหรับเปลี่ยนสถานะการแสดงบล็อก */}
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex flex-wrap-mb-px">
            <li className={`me-2`}>
              <a
                href="#"
                className={`inline-block px-4 py-2 hover:bg-blue-500 hover:text-white ${
                  status === "all" ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => handleStatusChange("all")}
              >
                All
              </a>
            </li>
            <li className={`me-2`}>
              <a
                href="#"
                className={`inline-block px-4 py-2 hover:bg-blue-500 hover:text-white  ${
                  status === "draft" ? "bg-blue-500 text-white" : ""
                } `}
                onClick={() => handleStatusChange("draft")}
              >
                Draft
              </a>
            </li>
            <li className={`me-2`}>
              <a
                href="#"
                className={`inline-block px-4 py-2 hover:bg-blue-500 hover:text-white  ${
                  status === "publish" ? "bg-blue-500 text-white" : ""
                } `}
                onClick={() => handleStatusChange("published")}
              >
                Published
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="my-5 p-2">Check out our blog posts for the latest</p>
      <div className="">
        {!loading ? (
          // กรองบล็อกตามสถานะที่เลือก
          blogData
            .filter((item: any) => status === "all" || item.status === status)
            .map((item: any) => <CardPost item={item} key={item.id} />)
        ) : (
          // Loading Skeleton
          <LoadingComponent />
        )}
      </div>
    </div>
  );
};

export default BlogUser;
