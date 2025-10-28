"use client";

import { useUserStore } from "@/store/zustand/zustand";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Component imports
import TenantProfilePage from "../tenantProfile/profile";
import OwnerProfilePage from "../ownerProfile/profile";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  // ✅ Make sure Zustand is loaded before rendering
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return <div className="p-6 text-gray-400">Loading your profile...</div>;
  }

  if (!user) {
    router.push("/");
    return null;
  }

  // 🔁 Render based on role
  switch (user.role) {
    case "tenant":
      return <TenantProfilePage />;
    case "owner":
      return <OwnerProfilePage />;
    case "admin":
      return <div className="p-8 text-lg text-white">👑 Admin Panel Coming Soon</div>;
    default:
      return <div className="p-8 text-red-500">❌ Unknown role: {user.role}</div>;
  }
}
