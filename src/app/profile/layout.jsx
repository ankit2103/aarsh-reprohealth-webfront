"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/page"; // Adjust the path as needed
import { useRouter, usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

export default function ProfileLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   useEffect(() => {
//     if (pathname === "/profile") {
//       router.replace("profile/my-appointments");
//     }
//   }, [pathname, router]);

  const formatPathname = (path) => {
    return path
      .replace("/profile", "")
      .replaceAll("/", " ")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="mt-24 relative mb-4">
      <div className="flex lg:hidden items-center px-4 bg-white ">
        <button
          className="lg:hidden text-2xl text-[var(--lightBlue)]"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="ml-4 text-xl font-600">{formatPathname(pathname)}</h1>
      </div>

      {/* Main Layout */}
      <div className="flex">
        <div className="hidden lg:flex lg:w-[20%] bg-white h-full">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 w-full lg:w-[80%]">{children}</main>
      </div>

      {isSidebarOpen && (
        <>
          <div
            className="fixed top-16 left-0 h-full w-[280px] bg-white z-50 shadow-lg transition-transform transform 
            translate-x-0 lg:hidden"
          >
            <Sidebar toggleSidebar={toggleSidebar} />
          </div>

          {/* Overlay to close sidebar */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        </>
      )}
    </div>
  );
}
