// store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 🔐 Shared user fields
export type BaseUser = {
  _id: string;
  fullName: string;
  email: string;
  role: "tenant" | "owner" | "admin";
  phone?: string | null;
  profilePicture?: string | null;
  createdAt?: string;
};

// 🧍‍♂️ Tenant-specific data
export type TenantData = {
  currentProperty?: string;
  rentalHistory?: {
    propertyId: string;
    startDate: string;
    endDate: string;
  }[];
  leaseDetails?: any;
  paymentStatus?: any;
};

// 🏡 Owner-specific data
export type OwnerData = {
  ownedProperties?: string[];
  verificationStatus?: "pending" | "verified" | "rejected";
  bankDetails?: {
    accountNumber: string;
    ifscCode: string;
    bankName: string;
  };
  bio?: string;
  documents?: any[];
};

// ✅ Combined type
export type User = BaseUser & {
  tenantData?: TenantData;
  ownerData?: OwnerData;
};

type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "rentwise-user", // 📦 saved in localStorage
    }
  )
);
