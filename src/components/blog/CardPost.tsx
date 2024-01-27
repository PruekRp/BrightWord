"use client";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight, FaTrashAlt, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CardPost = ({ key, item }: any) => {
  const [deleting, setDelete] = useState(false);
  const { data: session } = useSession();
  const currentUser = getCurrentUser();
  const router = useRouter();
  const handleDelete = async (postId) => {
    try {
      //Set deleting to true to show loading state
      setDelete(true);

      //Make a DELETE request to API
      const response = await fetch(`/api/blog/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Handle successful deletion here, such as updating UI or redirecting
        console.log(`Post with ID ${postId} deleted successfully`);
      } else {
        // Handle error cases
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting blog: ", error);
    } finally {
      //Set deleting to false and push home router
      router.push("/");
    }
  };
  return (
    <div
      className="flex border-2 rounded-lg overflow-hidden shadow-md mb-4 w-100 justify-between cursor-pointer transition duration-300 hover:shadow-xl"
      key={key}
    >
      <div className="flex-1 p-4">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/blogs/${item.id}`}>
            <h1 className="text-2xl font-bold mb-3">{item.title}</h1>
          </Link>

          {session?.user?.email === item.userEmail && (
            <div className="flex items-center gap-2 p-1">
              <FaEdit className="text-orange-500 cursor-pointer ml-2 hover:text-orange-700 size-6" />
              <FaTrashAlt
                className="text-red-500 cursor-pointer hover:text-red-700 size-5"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          )}
        </div>

        <div
          className="text-gray-700 mb-2 ml-1"
          dangerouslySetInnerHTML={{ __html: item?.content.substring(0, 60) }}
        />
        <Link href={`/blogs/${item.id}`}>
          <span className="flex flex-row items-center p-1 text-blue-500 hover:underline">
            Read More&nbsp;
            <FaArrowRight className="ml-2" />
          </span>
        </Link>
        <div className="mt-7 text-gray-500 flex justify-between">
          <div>By {item.userEmail}</div>
          <div> {item.createAt.substring(0, 10)}</div>
        </div>
      </div>
      <div className="relative h-50 w-1/3">
        {item.thumbnail && (
          <Image
            src={item.thumbnail}
            alt={item.title}
            layout="fill"
            objectFit="fill"
          />
        )}
      </div>
    </div>
  );
};

export default CardPost;
