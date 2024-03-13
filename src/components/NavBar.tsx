"use client";
import AIChatButton from "@/components/AIChatButton";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import logoImage from "C:\\Users\\User\\Desktop\\Project\\test-nextjs-chatbox\\public\\logo.jpg";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"; // Import Google ico

import { useState } from "react"; // Import Fragment and useState

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

  console.log(data?.user.id);
  return (
    <div className="relative bg-black">
      {/* Main Content */}
      <div className="p-5  shadow-lg">
        <div className="flex flex-wrap gap-3 items-center justify-between m-auto">
          {/* Logo */}
          <Link href="/">
            <span className="font-bold text-2xl text-yellow-300 flex items-center gap-2">
              BrightWord
            </span>
          </Link>

          {/* Navbar Actions */}
          <div className="flex items-center gap-4">
            {data ? (
              <div className="flex space-x-5 items-center">
                <AIChatButton />
                <Link href="/write" className=" text-yellow-300 font-bold">
                  write
                </Link>
                {/* Profile Image */}
                <button onClick={toggleDropdown} className="focus:outline-none">
                  <Image
                    src={data?.user.image}
                    width={30}
                    height={35}
                    alt="Profile Image"
                    className="w-9 h-9 rounded-full cursor-pointer"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute top-10 right-8 mt-5 bg-white border border-gray-200 rounded shadow-md">
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
