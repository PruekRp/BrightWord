"use client";
import { PostDetail } from "@/utils/types";
import Image from "next/image";
import { useState, useEffect, FC } from "react";

interface Props {
  post: PostDetail;
}

const trimText = (text: string, trimBy: number) => {
  if (text.length <= trimBy) return text;
  return text.substring(0, trimBy).trim() + "...";
};
const CardPost: FC<Props> = ({ post }): JSX.Element => {
  const { title, content, thumbnail, createdAt } = post;

  return (
    <div className="rounded shadow-sm overflow-hidden bg-white transition flex flex-col h-full">
      <div contextMenu="aspect-video relative">
        {!thumbnail ? (
          <div className="w-full h-full flex items-center justify-center text-zinc-500 opacity-50 font-semibold">
            No image
          </div>
        ) : (
          <Image src={thumbnail} layout="fill" alt="Thumbnail" />
        )}
      </div>
      {/* Post Info*/}
      <div className="p-2 flex-1 flex flex-col">
        <div className="flex items-center justify-between text-sm text-black">
          <span>{createdAt}</span>
        </div>
      </div>
      <h1 className="font-semibold text-black">{trimText(title, 50)}</h1>
      <p className="text-secondary-dark">{trimText(content, 70)}</p>
    </div>
  );
};

export default CardPost;
