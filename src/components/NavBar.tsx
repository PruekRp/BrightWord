'use client'
import AIChatButton from "@/components/AIChatButton";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import logoImage from "C:\\Users\\User\\Desktop\\Project\\test-nextjs-chatbox\\public\\logo.jpg";


export default function NavBar() {
    

    return (
        <>
            {/* Navbar */}
            <div className="p-4 shadow">
                <div className="flex flex-wrap gap-3 items-center justify-between m-auto">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-1">
                        <span className="font-bold text-2xl flex items-center gap-2">
                            <Image src={logoImage} alt="Logo" width={40} height={40} />
                            BrightWord
                        </span>
                    </Link>

                    {/* Navbar Actions */}
                    <div className="flex items-center gap-4">
                        <AIChatButton />
                        <Button>Write</Button>
                        <Button>Login</Button>
                    </div>
                </div>
            </div>
        </>
    );
}
