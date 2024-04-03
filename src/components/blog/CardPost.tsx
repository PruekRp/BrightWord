// CardPost.tsx
import getCurrentUser from "@/app/actions/getCurrentUser";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowRight, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardPost = ({ key, item }: any) => {
  const [deleting, setDelete] = useState(false);
  const { data: session } = useSession();
  const [postDeleted, setPostDeleted] = useState(false);
  const handleDelete = async (postId: any) => {
    try {
      // ตั้งค่า deleting เป็น true เพื่อแสดงสถานะการโหลด
      setDelete(true);

      // ทำการลบโพสต์ด้วยการส่งคำขอ DELETE ไปยัง API
      const response = await fetch(`/api/blog/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // จัดการเมื่อการลบสำเร็จ
        console.log(`Post with ID ${postId} deleted successfully`);
        // ตั้งค่า state เพื่อสั่งให้ component โหลดใหม่
        setPostDeleted(true);
      } else {
        // จัดการกรณีเกิดข้อผิดพลาด
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting blog: ", error);
    } finally {
      // เมื่อลบเสร็จสิ้น ตั้งค่า deleting เป็น false
      setDelete(false);
    }
  };

  return (
    <>
      {item.status === "published" ? (
        <div
          className="flex border-2 rounded-lg overflow-hidden shadow-md mb-4 w-100 justify-between cursor-pointer transition duration-300 hover:shadow-xl"
          key={key}
        >
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <Link
                href={
                  item.status === "published"
                    ? `/blogs/${item.id}`
                    : `/edit/${item.id}`
                }
              >
                <div className="flex justify-center items-center">
                  <h1 className="text-2xl font-bold mb-3">{item.title}</h1>
                  <h5
                    className={`text-xl ml-5 mb-3 ${
                      item.status === "published"
                        ? "text-yellow-500"
                        : "text-zinc-500"
                    }`}
                  >
                    ({item.status})
                  </h5>
                </div>
              </Link>
              {session?.user?.email === item.user.email && (
                <div className="flex items-center gap-2 p-1">
                  <Link href={`/edit/${item.id}`}>
                    <FaEdit className="text-orange-500 cursor-pointer ml-2 hover:text-orange-700 size-6" />
                  </Link>
                  <Link href="">
                    <FaTrashAlt
                      className="text-red-500 cursor-pointer hover:text-red-700 size-5"
                      onClick={() => handleDelete(item.id)}
                    />
                  </Link>
                </div>
              )}
            </div>

            <div
              className="text-gray-700 mb-2 ml-1"
              dangerouslySetInnerHTML={{
                __html: item?.content.substring(0, 60),
              }}
            />
            {item.status === "published" && (
              <Link href={`/blogs/${item.id}`}>
                <span className="flex flex-row items-center p-1 text-blue-500 hover:underline">
                  Read More&nbsp;
                  <FaArrowRight className="ml-2" />
                </span>
              </Link>
            )}
            <div className="mt-7 text-gray-500 flex justify-between">
              <div>By {item.user.email}</div>
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
      ) : (
        <div
          className="flex border-2 rounded-lg overflow-hidden shadow-md mb-4 w-100 justify-between cursor-pointer transition duration-300 hover:shadow-xl"
          key={key}
        >
          <div className="flex-1 p-4">
            <div className="flex justify-between items-start mb-2">
              <Link
                href={
                  item.status === "published"
                    ? `/blogs/${item.id}`
                    : `/edit/${item.id}`
                }
              >
                <div className="flex justify-center items-center">
                  <h1 className="text-2xl font-bold mb-3">{item.title}</h1>
                  <h5
                    className={`text-xl ml-5 mb-3 ${
                      item.status === "draft" ? "text-zinc-500" : ""
                    }`}
                  >
                    ({item.status})
                  </h5>
                </div>
              </Link>
              <FaTrashAlt
                className="text-red-500 cursor-pointer hover:text-red-700 size-5"
                onClick={() => handleDelete(item.id)}
              />
            </div>
            <div
              className="text-gray-700 mb-2 ml-1"
              dangerouslySetInnerHTML={{
                __html: item?.content.substring(0, 60),
              }}
            />

            <div className="mt-7 text-gray-500 flex justify-between">
              <div>By {item.user.email}</div>
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
      )}
      <ToastContainer />
    </>
  );
};

export default CardPost;
