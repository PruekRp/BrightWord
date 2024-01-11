import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center gap-4">
        <span className="font-extrabold tracking-tight text-4xl lg:text-5xl">
          BrightWord
        </span>
      </div>
      <p className="max-w-prose text-center">BrightWord Bot ChatBox test</p>
      <Button size="lg" asChild>
        <Link href="/chatbox">Open</Link>
      </Button>
    </main>
  );
}
