import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const CardPost = ({ key, item }: any) => {
  return (
    <div
      className="flex border-2 rounded-md overflow-hidden shadow-lg mb-4 w-100 justify-between" 
      key={key}
    >
      <div className="flex-1 p-4">
        <Link href={`/blogs/${item.id}`}>
          <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
        </Link>
        <div
          className="text-gray-700 mb-2"
          dangerouslySetInnerHTML={{ __html: item?.content.substring(0, 60) }}
        />
        <Link href={`/blogs/${item.id}`}>
          <span className="flex flex-row items-center text-blue-500 hover:underline">
            Read More&nbsp;
            <FaArrowRightLong className="ml-2" />
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
