'use client'
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Image from "next/image";
import CardPost from "./CardPost";

const getData = async (page) => {
  const res = await fetch(
    `http://localhost:3000/api/blog?page=${page}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = ({ page }) => {
  const [blogData, setBlogData] = useState([]);
  const [count, setCount] = useState(0);

  const POST_PER_PAGE = 2;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { blog, count } = await getData(page);
        setBlogData(blog);
        setCount(count);
        console.log(page)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="w-full">
  <h1 className="font-bold p-2 my-5 text-6xl">" Embarking on a Journey of Wisdom "</h1>
  <p className="my-5 p-2">Check out our blog posts for the latest</p>
  <div className="">
    {blogData?.map((item) => (
      <CardPost item={item} key={item.id} />
    ))}
  </div>
  <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
</div>

  );
};

export default CardList;
