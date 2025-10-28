"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { logoutUser } from "@/components/auth/logout";
import { useUserStore } from "@/store/zustand/zustand";
import ClientAuthSync from "@/store/meProvider";
import { ChevronDown } from "lucide-react";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUserStore();
  const pathname = usePathname() ?? "";
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;

  const role = user?.role;
  let links: { name: string; href: string }[] = [];

  // Check routes
  const isTenantProfile = pathname === "/rofile";
  const isOwnerProfile = pathname === "/profile";
  const isHome = pathname === "/" || pathname === "/all-properties";

  // Tenant Role Logic
  if (role === "tenant") {
    if (isTenantProfile) {
      links = [
        { name: "Home", href: "/all-properties" },
        { name: "Dashboard", href: "/tenantDashboard" },
      ];
    } else if (isHome) {
      links = [
        { name: "View Profile", href: "/profile" },
        { name: "Dashboard", href: "/tenantDashboard" },
      ];
    } else {
      links = [
        { name: "Home", href: "/all-properties" },
        { name: "Dashboard", href: "/tenantDashboard" },
      ];
    }
  }

  // Owner Role Logic
  else if (role === "owner") {
    if (isOwnerProfile) {
      links = [
        { name: "Dashboard", href: "/ownerDashboard" },
        { name: "Add Property", href: "/addProperty" },
      ];
    } else {
      links = [
        { name: "Profile", href: "/profile" },
        { name: "Dashboard", href: "/ownerDashboard" },
      ];
    }
  }

  return (
    <div className="relative">
      <ClientAuthSync />

      {/* Desktop Dropdown Button */}
      {!isMobile && (
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-2 py-1 rounded-full border-2 border-gray-900 hover:border-gray-700 transition-all group"
          title="Account options"
        >
          <img
            src={user.profilePicture ?? "https://i.pinimg.com/1200x/ee/68/a5/ee68a5f212c91fb2490d8e89b580cfd0.jpg"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <ChevronDown
            className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      {/* Desktop Dropdown Menu */}
      {!isMobile && open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fadeIn">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 hover:bg-gray-100"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              logoutUser();
              setOpen(false);
              router.push("/");
            }}
            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}

      {/* Mobile Floating Button */}
      {isMobile && (
        <>
          <button
            onClick={() => setOpen(!open)}
            className="fixed bottom-6 right-6 bg-gray-900 text-white rounded-full p-3 shadow-lg z-50 flex items-center justify-center"
            title="Open menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {open && (
            <div className="fixed bottom-20 right-6 w-64 bg-white border rounded-lg shadow-xl p-4 z-40 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 rounded hover:bg-gray-100"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  logoutUser();
                  setOpen(false);
                  router.push("/");
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
