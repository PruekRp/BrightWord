import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ChatPage from "./chatbox/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ChatPage/>
    </main>
  );
}
