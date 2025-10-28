// lib/withRoleGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/zustand/zustand";

export default function withRoleGuard(Component: any, allowedRole: string) {
  return function GuardedComponent(props: any) {
    const user = useUserStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
      if (user && user.role !== allowedRole) {
        router.push("/profile"); // ✅ always reroute to proper profile
      }
    }, [user]);

    if (!user) return <div className="p-6 text-gray-400">Checking role...</div>;
    if (user.role !== allowedRole) return null;

    return <Component {...props} />;
  };
}
