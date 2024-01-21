"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext }:any) => {
  const router = useRouter();

  return (
    <div >
      <button
        
        disabled={!hasPrev}
        onClick={() => router.push(`?page=${page - 1}`)}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        
        onClick={() => router.push(`?page=${page + 1}`)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
