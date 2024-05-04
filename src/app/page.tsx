"use client";
import { Suspense } from "react";
import CardList from "@/components/blog/CardList";
import {  ToastContainer } from "react-toastify";
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
