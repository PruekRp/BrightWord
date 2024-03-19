"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ChatPage from "./chatbox/page";
import getBlogs from "./actions/getBlogs";
import getCurrentUser from "./actions/getCurrentUser";
import CardPost from "@/components/blog/CardPost";
import { Suspense, useState } from "react";
import CardList from "@/components/blog/CardList";

export default function Home({ searchParams }: any) {
  const page = parseInt(searchParams.page) || 1;  
  const noShow = true;
  return (
    <section className="flex w-full">
      <Suspense fallback="Loading..">
        {/*เอา CardList component ออกมาใช้หน้านี้ต่างหาก ให้ useEffect ทำงาน*/}
      <CardList page={page} />
      </Suspense>
      {/*<ChatPage/>*/}
    </section>
  );
}
