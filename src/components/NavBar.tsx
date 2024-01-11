"use client";

import AIChatButton from "@/components/AIChatButton";
import Link from "next/link";

export default function NavBar() {
    return (
    <>
    <div className="p-4 shadow">
        <div className="flex flex-wrap gap-3 items-center justify-between m-auto max-w-7xl">
            <Link href="/chatbox" className="flex items-center gap-1">
                <span className="font-bold">BrightWord</span>
            </Link>
            <div className="flex items-center gap-2">
                <AIChatButton />
            </div>
        </div>
    </div>
    </>
    )
}
