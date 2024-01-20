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

export default function NavBar() {
  const { data, status } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to track dropdown open/close

  const handleLogin = () => {
    signIn("google");
  };

  const handleLogout = () => {
    setDropdownOpen(false); // Close the dropdown when logging out
    signOut();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const router = useRouter();
  if (status === "loading") {
    return <div>loading</div>;
  }

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="p-4 shadow">
      <div className="flex flex-wrap gap-3 items-center justify-between m-auto">
        {/* Logo */}
        <Link href="/">
          <span className="font-bold text-2xl flex items-center gap-2">
            BrightWord
          </span>
        </Link>

        {/* Navbar Actions */}
        <div className="flex items-center gap-4">
          {data ? (
            <div className="flex space-x-5">
              <AIChatButton />
              <Link href="/write">write</Link>

              {/* Profile Image */}
              <button onClick={toggleDropdown} className="focus:outline-none">
                <Image
                  src={data.user.image}
                  width={30} // Set the width (adjust as needed)
                  height={35} // Set the height (adjust as needed)
                  alt="Profile Image"
                  className="w-9 h-9 rounded-full cursor-pointer"
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-md">
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
  );
}
