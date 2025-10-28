// components/owner/RevenueInsightsCard.tsx
"use client";

import { DollarSign, TrendingUp } from "lucide-react";
import { OwnerProfile } from "@/types/owner";

interface Props {
  profile: OwnerProfile;
}

export default function RevenueInsightsCard({ profile }: Props) {
  const revenue = profile.revenue ?? { total: 0, last30Days: 0 };

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gradient-to-br from-emerald-700 to-green-800 rounded-2xl p-6 border border-green-600">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-black/20 rounded-xl">
          <DollarSign className="w-6 h-6 text-white" />
        </div>
        <TrendingUp className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Total Revenue</h3>
      <div className="text-white text-3xl font-bold mb-1">
        ₹{revenue.total.toLocaleString()}
      </div>
      <p className="text-sm text-white/70">
        Last 30 days: ₹{revenue.last30Days.toLocaleString()}
      </p>
    </div>
  );
}
