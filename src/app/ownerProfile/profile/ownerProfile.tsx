"use client";

import { CheckCircle, Calendar, Home, User as UserIcon } from "lucide-react";
import Image from "next/image";
import { useUserStore, User , OwnerData } from "@/store/zustand/zustand";
import { OwnerProfile } from "@/types/owner";

const fallbackImage =
  "https://i.pinimg.com/736x/b6/49/f0/b649f021d937b2bcf703a25d9d698746.jpg";

const formatDate = (date?: string): string => {
  if (!date) return "Joined date unknown";
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export default function ProfileCard() {
  const user = useUserStore((state) => state.user) as User | null;

  if (!user) return null;

  return (
    <div className="bg-blue-950 rounded-2xl shadow-lg border border-gray-900 p-6  top-6 col-span-12 lg:col-span-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-gray-100">
          <Image
            src={user.profilePicture || fallbackImage}
            alt={user.fullName || "Owner"}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-100">
              {user.fullName}
            </h2>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>

          <p className="text-sm text-gray-100">{user.email}</p>

          <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <UserIcon className="w-3 h-3 mr-1" />
            {capitalize(user.role)}
          </span>
        </div>
      </div>

      {/* Profile Info */}
      <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-100">
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-gray-100" />
          <span>
            Member since{" "}
            <span className="font-medium text-gray-100">
              {formatDate(user.createdAt)}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Home className="w-4 h-4 text-gray-100" />
          <span className="text-gray-100 font-medium">
            Owns {user.ownerData?.ownedProperties ?? 0} properties  
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-gray-100 mt-6">{user.ownerData?.bio }</p>
    </div>
  );
}
