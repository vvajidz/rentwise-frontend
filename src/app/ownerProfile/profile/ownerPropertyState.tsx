// components/owner/PropertyStatsCard.tsx
"use client";

import { Home, Bed, Building2 } from "lucide-react";
import { OwnerProfile } from "@/types/owner";

interface Props {
  profile: OwnerProfile;
}

export default function PropertyStatsCard({ profile }: Props) {
  const stats = profile.propertyStats ?? {
    total: 0,
    active: 0,
    inactive: 0,
  };

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-800 rounded-xl">
          <Building2 className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-slate-400">Stats</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Listed Properties</h3>
      <div className="text-white text-3xl font-bold mb-4">{stats.total}</div>
      <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4 text-green-400" />
          {stats.active} Active
        </div>
        <div className="flex items-center gap-2">
          <Bed className="w-4 h-4 text-red-400" />
          {stats.inactive} Inactive
        </div>
      </div>
    </div>
  );
}
