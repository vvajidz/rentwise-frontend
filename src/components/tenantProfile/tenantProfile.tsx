"use client";

import { CheckCircle, Phone, Calendar, User as UserIcon } from "lucide-react";
import Image from "next/image";
import {User} from "@/store/zustand/zustand"
import { useUserStore } from "@/store/zustand/zustand";

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

export default function TenantProfileCard() {

  const user = useUserStore((state) => state.user) as User | null;
  console.log("User from Zustand:", user);



  if (!user) return null;



  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
          <Image
            src={user.profilePicture || fallbackImage}
            alt={user.fullName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold text-gray-900">{user.fullName}</h2>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>

          <p className="text-sm text-gray-600">{user.email}</p>

          <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <UserIcon className="w-3 h-3 mr-1" />
            {capitalize(user.role)}
          </span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 border-t border-gray-100 pt-4 text-sm text-gray-700">
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className={user.phone ? "" : "text-gray-400 italic"}>
            {user.phone || "Phone not provided"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>
            Member since{" "}
            <span className="font-medium text-gray-900">
              {formatDate(user.createdAt)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
