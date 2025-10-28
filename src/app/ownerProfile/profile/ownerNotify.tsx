// components/owner/profile/ownerNotify.tsx
import React from "react";
import { OwnerProfile } from "@/types/owner";

// ✅ Props interface goes here
interface Props {
  profile: OwnerProfile;
  toggleNotification: (key: keyof OwnerProfile["notificationSettings"]) => void;
}

const NotificationsCard: React.FC<Props> = ({ profile, toggleNotification }) => {
  return (
    <div className="col-span-12 md:col-span-6 bg-slate-800 p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold text-white mb-4">Notification Preferences</h3>

      <div className="space-y-4">
        {Object.entries(profile.notificationSettings).map(([key, value]) => (
          <div key={key} className="flex justify-between items-center bg-slate-700 p-4 rounded-xl">
            <span className="capitalize text-white">
              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
            </span>
            <button
              onClick={() => toggleNotification(key as keyof OwnerProfile["notificationSettings"])}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                value ? "bg-green-500 text-white" : "bg-gray-500 text-white"
              }`}
            >
              {value ? "Enabled" : "Disabled"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsCard;
