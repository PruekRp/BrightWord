// Pagination.jsx
import React from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }: any) => {
  const router = useRouter();

  return (
    <div className="flex justify-center mt-8 justify-between">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        disabled={!hasNext}
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
