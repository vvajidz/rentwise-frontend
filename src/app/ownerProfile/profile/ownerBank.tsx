// components/owner/BankDetailsCard.tsx
"use client";

import { CreditCard, Eye, EyeOff } from "lucide-react";
import { OwnerProfile } from "@/types/owner";

interface Props {
  profile: OwnerProfile;
  showBankDetails: boolean;
  setShowBankDetails: (val: boolean) => void;
}

export default function BankDetailsCard({ profile, showBankDetails, setShowBankDetails }: Props) {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-colors group">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-purple-900/50 rounded-xl">
          <CreditCard className="w-6 h-6 text-purple-400" />
        </div>
        <button
          onClick={() => setShowBankDetails(!showBankDetails)}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
        >
          {showBankDetails ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
        </button>
      </div>
      <h3 className="text-lg font-semibold text-white mb-4">Bank Details</h3>
      <div className="space-y-2">
        <div>
          <p className="text-slate-400 text-xs">Account Number</p>
          <p className="text-white text-sm font-mono">
            {showBankDetails ? "1234567890" : profile.bankDetails.accountNumber}
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-xs">Bank</p>
          <p className="text-white text-sm">{profile.bankDetails.bankName}</p>
        </div>
      </div>
    </div>
  );
}
