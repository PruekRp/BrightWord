"use client";
import AIChatButton from "@/components/AIChatButton";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"; // Import Google ico
import { useRouter } from "next/navigation"; // import useRouter

import { useEffect, useState } from "react"; // Import Fragment and useState

// Import other necessary dependencies

export default function NavBar() {
  const { data, status } = useSession();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // define useRouter
  const [blogData, setBlogData] = useState<any>("");
  console.log(data)
  const handleLogin = () => {
    signIn("google");
  };
  console.log("blogData", blogData);
  const handleLogout = () => {
    setDropdownOpen(false);
    signOut();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleWriteClick = async () => {
    // ตรวจสอบว่ามี session ของผู้ใช้หรือไม่
    if (!data) {
      console.error("User is not authenticated");
      return;
    }

    // ตั้งค่า Loading เป็น true เมื่อเริ่มสร้างบล็อก
    setLoading(true);

    // ส่งคำขอ POST ไปยัง API พร้อมกับ ID ของผู้ใช้
    try {
      const response = await fetch(`/api/blog/${data.user?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: data.user?.id, // ส่งเฉพาะ ID ของผู้ใช้
        }),
      });

      if (response.ok) {
        // ถ้าสำเร็จให้เปลี่ยนเส้นทางไปยังหน้าที่ต้องการ edit/{blogId}
        const data = await response.json();
        console.log("Blog post created:", data);
        setBlogData(data.id); // เก็บไอดีของบล็อกที่ถูกสร้าง
        router.push(`/edit/${data.id}`);
      } else {
        // จัดการเมื่อมีข้อผิดพลาดเกิดขึ้น
        console.error("Failed to create post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }

    // ตั้งค่า Loading เป็น false เมื่อเสร็จสิ้นการสร้างบล็อก ไม่ว่าจะสำเร็จหรือเกิดข้อผิดพลาด
    setLoading(false);
  };

  useEffect(() => {
    if (blogData) {
      handleWriteClick();
    }
  }, []);
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
            <AIChatButton />

            {data ? (
              <div className="flex space-x-5 items-center">
                <Button>
                  <Link
                    href={`/blogUser/${data?.user?.id}`}
                    className="text-white hover:text-yellow-400 font-bold"
                  >
                    My blogs
                  </Link>
                </Button>
                <span
                  className="text-white hover:text-yellow-400 cursor-pointer font-bold"
                  onClick={handleWriteClick}
                >
                  edit
                </span>
                {/* Profile Image */}
                <button onClick={toggleDropdown} className="focus:outline-none">
                  <Image
                    src={data?.user?.image}
                    width={30}
                    height={35}
                    alt="Profile Image"
                    className="w-9 h-9 rounded-full cursor-pointer"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </button>
                <Button>
                  {loading && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-yellow-300"></div>
                    </div>
                  )}
                </Button>

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
