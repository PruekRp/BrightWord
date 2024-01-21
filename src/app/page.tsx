'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ChatPage from "./chatbox/page";
import getBlogs from "./actions/getBlogs";
import getCurrentUser from "./actions/getCurrentUser";
import CardPost from "@/components/blog/CardPost";
import { useState } from "react";

const posts = [
  {
    id: "clrmj382m0001pstcr6myx0tq",
    title: "This is from crate",
    content: "I am header",
    slug: "this-is-from-create",
    thumbnail:
      "",
    createAt: "2024-01-20T20:34:48.094Z",
  },
  {
    id: "adfsdfa4353",
    title: "Python",
    content: "I am header",
    slug: "this-is-from-create",
    thumbnail:
      "",
    createAt: "2024-01-20T20:34:48.094Z",
  },
  {
    id: "afsdfasdf25345",
    title: "Java",
    content: "I am header",
    slug: "this-is-from-createsdfsdfsdfsdddddddddddddddd",
    thumbnail:
      "",
    createAt: "2024-01-20T20:34:48.094Z",
  },
  {
    id: "sddasdfdfsdf3423",
    title: "React",
    content: "I am headerdsgfgggggggggggggggggggggggggdgsfsdfsdfsdfds",
    slug: "this-is-from-create",
    thumbnail:'',
    createAt: "2024-01-20T20:34:48.094Z",
  },
];

export default function Home({ searchParams }: any) {
  const [postsToRender,setPostToRender] = useState(posts)
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-24">
      {postsToRender.map((post) => (
        <CardPost post={post}/>
      ))}
      {/*<ChatPage/>*/}
    </main>
  );
}
