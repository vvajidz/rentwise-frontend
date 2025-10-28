"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/zustand/zustand";
import { useAuthSync } from "@/store/me";
import { logoutUser } from "@/components/auth/logout";
import UserDropdown from "@/components/auth/loginDrop";
import AuthButtons from "@/components/auth/authButton";

const navLinks = [
  { name: "How it Works", href: "#how-it-works" },
  { name: "Reviews", href: "#reviews" },
  { name: "Support", href: "#support" },
  { name: "About", href: "#about" },
];

export default function Homenavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDesktopNav, setShowDesktopNav] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUserStore();
  useAuthSync(); // Just hydrates Zustand

  const isLoggedIn = !!user;
  const isOwner = user?.role === "owner";
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const section = document.getElementById("how-it-works");
      if (!section) return setShowDesktopNav(true);
      const shouldShow = window.scrollY + 80 < section.offsetTop;
      setShowDesktopNav(shouldShow);
    };

    handleResize();
    handleScroll();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [menuOpen]);

  const mobileLinks =
  user?.role === "owner"
    ? [
        { name: pathname === "/profile" ? "Home" : "View Profile", href: pathname === "/profile" ? "/" : "/profile" },
        { name: "Dashboard", href: "/ownerDashboard" },
      ]
    : [
        { name: pathname === "/profile" ? "Home" : "View Profile", href: pathname === "/profile" ? "/" : "/profile" },
        { name: "Dashboard", href: "/tenantDashboard" },
      ];


  return (
    <>
      {/* 🖥️ Desktop Navbar */}
      {showDesktopNav && (
        <nav className="hidden md:block fixed top-0 bg-white z-50 w-full shadow-sm transition duration-500">
          <div className="container mx-auto flex items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="text-3xl font-bold text-gray-900 tracking-wide hover:scale-105 transition-transform"
            >
              RentWise
            </Link>

            {!isOwner && isHomePage && (
              <div className="flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="relative inline-block text-gray-900 hover:text-gray-700 transition-colors after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {isLoggedIn ? <UserDropdown /> : <AuthButtons />}
          </div>
        </nav>
      )}

      {/* 📱 Mobile Top Logo */}
      <div className="block md:hidden py-4 text-center w-full">
        <Link
          href="/"
          className="text-3xl font-bold text-gray-900 tracking-wide hover:scale-105 transition-transform"
        >
          RentWise
        </Link>
      </div>

      {/* 📱 FAB Toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-20 right-6 md:hidden bg-gray-900 text-white rounded-full p-3 shadow-lg z-50"
      >
        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* 📱 Mobile Menu */}
      <div
        className={clsx(
          "fixed bottom-20 right-6 bg-white border border-gray-200 shadow-xl rounded-lg w-64 z-40 flex flex-col px-4 py-4 space-y-2 transition-all duration-300",
          menuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {!isOwner && isHomePage &&
          navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block text-gray-900 hover:text-gray-700 transition-colors text-base"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

        {isLoggedIn ? (
          <>
            {mobileLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-md text-base text-gray-900 hover:bg-gray-100"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                logoutUser();
                setMenuOpen(false);
                router.push("/"); // redirect to homepage
              }}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </>
        ) : (
          <AuthButtons />
        )}
      </div>
    </>
  );
}
