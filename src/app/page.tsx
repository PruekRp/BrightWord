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
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home({ searchParams }: any) {
  const page = parseInt(searchParams.page) || 1;
  const noShow = true;
  return (
    <section className="flex w-full">
      <Suspense fallback="Loading..">
        <CardList page={page} />
      </Suspense>

      <ToastContainer />
    </section>
  );
}
