import api from "@/lib/axios";
import { useUserStore } from "@/store/zustand/zustand";
import { toast } from "react-hot-toast";

export const logoutUser = async () => {
  try {
    await api.post("auth/logout");
    useUserStore.getState().clearUser();
    toast.success("Logged out");
  } catch (err : any) {
    console.error("Logout failed", err);
    toast.error(err.response?.data?.message || "Failed to logout, try again.");
  }
};
