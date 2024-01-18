"use client";
import AIChatButton from "@/components/AIChatButton";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import logoImage from "C:\\Users\\User\\Desktop\\Project\\test-nextjs-chatbox\\public\\logo.jpg";
import {useRouter} from "next/navigation"
import { signIn,signOut ,useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"; // Import Google ico

export default function NavBar() {
  const {data, status} = useSession();

  console.log(data,status)

  const handleLogin = () => {
    //! ให้ใช้ signIn จาก NextAuth.js เพื่อเริ่มกระบวนการล็อกอิน
    signIn("google");
  };

  const handleLogout = () => {
    //! ให้ใช้ signOut จาก NextAuth.js เพื่อล็อกเอาท์
    signOut();
  };


  const router = useRouter();
  if( status === "loading") {
    return <div>loading</div>
  }

  if(status === "authenticated"){
    router.push("/")
  }
  return (
    <div className="p-4 shadow">
      <div className="flex flex-wrap gap-3 items-center justify-between m-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="font-bold text-2xl flex items-center gap-2">
            BrightWord
          </span>
        </Link>

        {/* Navbar Actions */}
        <div className="flex items-center gap-4">
          <AIChatButton />
          {/* Check if user is authenticated */}
          {data ? (
            <>
            <Link legacyBehavior href="/write">
            <a className="flex item-center text-highlight-light dark:text-highlight-dark text-xl p-3 hover:scale-[0.98] transition">
              <Button>Write</Button>
            </a>
          </Link>
            <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            // If not authenticated, show login button
            <Button onClick={handleLogin}>
              {/* Use Google icon as the button */}
              <FaGoogle size={18} color="#4285F4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
