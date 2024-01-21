'use client'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ChatPage from "./chatbox/page";
import getBlogs from "./actions/getBlogs";
import getCurrentUser from "./actions/getCurrentUser";
import CardPost from "@/components/blog/CardPost";
import { useState } from "react";
import CardList from "@/components/blog/CardList";

export default function Home({ searchParams }: any) {
  const page = parseInt(searchParams.page) || 1;
  return (
    <main className="flex flex-col min-h-screen items-center justify-between p-24">
     
        <CardList page={page}/>
     
      {/*<ChatPage/>*/}
    </main>
  );
}
