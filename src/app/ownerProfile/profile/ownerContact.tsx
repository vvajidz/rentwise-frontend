"use client";

import { Mail, Phone, User, ArrowRight } from "lucide-react";
import { useUserStore } from "@/store/zustand/zustand";

export default function ContactCard() {
  const user = useUserStore((state) => state.user);

  if (!user) return null;

  return (
    <div className="col-span-12 lg:col-span-4 bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-900/50 rounded-xl">
          <User className="w-6 h-6 text-blue-400" />
        </div>
        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
      </div>

      <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300 text-sm">{user.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-slate-400" />
          <span className="text-slate-300 text-sm">
            {user.phone || "Phone not provided"}
          </span>
        </div>
      </div>
    </div>
  );
}
