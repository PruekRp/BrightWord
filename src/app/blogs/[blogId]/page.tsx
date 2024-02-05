"use client";
// Import necessary libraries
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import Image from "next/image";

const SinglePage = ({ params }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [googleImage, setGoogleImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/blog/${params.blogId}`,
        );
        console.log(params.blogId);
        if (!res.ok) {
          throw new Error("Failed");
        }

        const result = await res.json();
        setData(result);

        // Fetch Google Account image
        const googleRes = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${result.accessToken}`, // Replace with your access token
            },
          },
        );

        if (googleRes.ok) {
          const googleData = await googleRes.json();
          setGoogleImage(googleData.picture);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [params.blogId]);

  if (error) {
    return (
      <div className="p-4">
        <p className="text-red-500">Error fetching data for blog ID</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4">
        <p className="text-red-500">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex mt-5 rounded-md mb-3 w-full">
        {/* Left Section */}
        <div className="w-1/2 p-0 flex flex-col justify-between">
          {/* Title */}
          <div className="text-3xl font-bold mb-28">{data.title}</div>

          {/* Author and Created At */}
          <div className="flex text-gray-600 ">
            {data?.user?.image && (
              <div className="relative w-12 h-12 mr-3">
                <Image
                  src={data.user.image}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            )}
            <div className="flex flex-col text-gray-600">
              <p>By: {data.userEmail}</p>
              <p>{data.createAt.substring(0, 10)}</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="relative h-64 w-1/2">
          {/* Image */}
          {data.thumbnail && (
            <Image
              src={data.thumbnail}
              alt={data.title}
              layout="fill"
              objectFit="fill"
              className="rounded-md"
            />
          )}
        </div>
      </div>
      {/* please add html audio with style tailwindcss */}
      
    <div className="mt-0">
      <audio controls className="w-full bg-gray-100  rounded-md">
        <source src="your-audio-file.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>

      <div className="prose prose-lg max-w-full mx-auto mt-10 text-gray-800">
        {parse(data.content)}
      </div>
    </>
  );
};

export default SinglePage;
