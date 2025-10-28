"use client";

import { Lock } from "lucide-react";
import { OwnerProfile } from "@/types/owner";

interface Props {
  profile: OwnerProfile;
}

export default function SecuritySettingsCard({ profile }: Props) {
  const security = profile.security ?? {
    lastPasswordChange: "N/A",
    twoFactorEnabled: false,
    loginAlerts: false,
  };

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-xl">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-slate-400">Security</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Security Settings</h3>
      <ul className="text-sm text-slate-300 space-y-3">
        <li className="flex justify-between items-center">
          <span>Password Updated</span>
          <span className="text-slate-400 text-xs">
            {security.lastPasswordChange}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span>2FA Enabled</span>
          <span
            className={`text-xs font-medium ${
              security.twoFactorEnabled ? "text-green-400" : "text-red-400"
            }`}
          >
            {security.twoFactorEnabled ? "Yes" : "No"}
          </span>
        </li>
        <li className="flex justify-between items-center">
          <span>Login Alerts</span>
          <span
            className={`text-xs font-medium ${
              security.loginAlerts ? "text-green-400" : "text-red-400"
            }`}
          >
            {security.loginAlerts ? "On" : "Off"}
          </span>
        </li>
      </ul>
    </div>
  );
}
