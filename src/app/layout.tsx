import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import AuthProvider from "@/providers/AuthProvider";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BrightWord",
  description: "Aichatbot for BrightWord",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          
          <NavBar />
         
          <div className="p-10 m-auto w-full max-w-[1280px] bg-white">
            {/*if want border max width max-w-7xl use this*/}
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
