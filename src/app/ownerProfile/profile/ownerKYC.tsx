// components/owner/KYCDocumentsCard.tsx
"use client";

import { Shield, CheckCircle, ArrowRight } from "lucide-react";
import { OwnerProfile } from "@/types/owner";

interface Props {
  profile: OwnerProfile;
}

export default function KYCDocumentsCard({ profile }: Props) {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-6 text-white relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-xl">
          <Shield className="w-6 h-6" />
        </div>
        <div className="flex items-center gap-1 text-sm bg-white/20 px-2 py-1 rounded-full">
          <CheckCircle className="w-4 h-4" />
          Verified
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">KYC Status</h3>
      <p className="text-green-100 text-sm mb-4">{profile.documents.length} documents uploaded</p>
      <div className="flex items-center justify-between">
        <span className="text-sm opacity-90">All documents verified</span>
        <ArrowRight className="w-5 h-5" />
      </div>

      <div className="absolute -top-8 -right-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
    </div>
  );
}
