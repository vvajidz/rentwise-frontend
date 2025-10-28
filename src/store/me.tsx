import { useUserStore } from "./zustand/zustand";
import  { useEffect } from "react";

export const useAuthSync = () => {
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        clearUser();
      }
    };

    fetchMe();
  }, [setUser, clearUser]);
};
