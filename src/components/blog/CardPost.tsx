import getCurrentUser from "@/app/actions/getCurrentUser";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaTrashAlt, FaEdit } from "react-icons/fa";

const CardPost = ({ key, item }: any) => {
  const { data: session } = useSession();
  const currentUser = getCurrentUser();

  return (
    <div
      className="flex border-2 rounded-md overflow-hidden shadow-md mb-4 w-100 justify-between cursor-pointer transition duration-300 hover:shadow-xl"
      key={key}
    >
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center">
          <Link href={`/blogs/${item.id}`}>
            <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
          </Link>

          {session?.user?.email === item.userEmail && (
            <div className="flex items-center  gap-2">
              <FaEdit className="text-orange-500 cursor-pointer ml-2 hover:text-orange-700 size-6" />
              <FaTrashAlt className="text-red-500 cursor-pointer hover:text-red-700 size-5" />
            </div>
          )}
        </div>

        <div
          className="text-gray-700 mb-2"
          dangerouslySetInnerHTML={{ __html: item?.content.substring(0, 60) }}
        />
        <Link href={`/blogs/${item.id}`}>
          <span className="flex flex-row items-center text-blue-500 hover:underline">
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
