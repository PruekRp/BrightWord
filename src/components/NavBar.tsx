"use client";
import AIChatButton from "@/components/AIChatButton";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import logoImage from "C:\\Users\\User\\Desktop\\Project\\test-nextjs-chatbox\\public\\logo.jpg";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"; // Import Google ico

import { Fragment, useState } from "react"; // Import Fragment and useState

// Import other necessary dependencies

  export default function NavBar() {
    const { data, status } = useSession();
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const handleLogin = () => {
      signIn("google");
    };

    const handleLogout = () => {
      setDropdownOpen(false);
      signOut();
    };

    const toggleDropdown = () => {
      setDropdownOpen(!isDropdownOpen);
    };

    

    if (status === "loading") {
      return (
        <div className="animate-pulse fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-white text-5xl">
      Loading... 
        </div>
      );
    }
    
    console.log(data)
    return (
       <div className="relative bg-gradient-to-r from-orange-500 to-yellow-400">
        {/* Main Content */}
        <div className="p-4 shadow-lg">
          <div className="flex flex-wrap gap-3 items-center justify-between m-auto">
            {/* Logo */}
            <Link href="/">
              <span className="font-bold text-2xl text-white flex items-center gap-2">
                BrightWord
              </span>
            </Link>

            {/* Navbar Actions */}
            <div className="flex items-center gap-4">
              {data ? (
                <div className="flex space-x-5 items-center">
                  <AIChatButton />
              
                  <Link href="/write">write</Link>

                  {/* Profile Image */}
                  <button
                    onClick={toggleDropdown}
                    className="focus:outline-none"
                  >
                    <Image
                      src={data.user.image}
                      width={30}
                      height={35}
                      alt="Profile Image"
                      className="w-9 h-9 rounded-full cursor-pointer"
                    />
                  </button>

                  {/* Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-10 mt-40 bg-white border border-gray-200 rounded shadow-md">
                      <div className="p-2">
                        <p className="text-gray-700">{data.user?.name}</p>
                        <p className="text-gray-500">{data.user?.email}</p>
                      </div>
                      <div className="p-2">
                        <Button onClick={handleLogout}>Logout</Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button onClick={handleLogin}>
                  <FaGoogle size={18} color="#4285F4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

