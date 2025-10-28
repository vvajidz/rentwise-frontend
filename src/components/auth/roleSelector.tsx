"use client";

import clsx from "clsx";
import { School, UserPlus } from "lucide-react";

type Props = {
  selectedRole: "owner" | "tenant" | null;
  setSelectedRole: (role: "owner" | "tenant") => void;
};

// 👉 Move roles array inside this file
const roles = [
  {
    key: "owner",
    label: "Property Owner",
    desc: "List and manage luxury properties",
    icon: School,
  },
  {
    key: "tenant",
    label: "Tenant",
    desc: "Find premium luxury rentals",
    icon: UserPlus,
  },
];

export default function RoleSelector({ selectedRole, setSelectedRole }: Props) {
  return (
    <div className="flex space-x-4 mt-4 mb-6">
      {roles.map(({ key, label, desc, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => setSelectedRole(key as "owner" | "tenant")}
          className={clsx(
            "flex-1 py-4 px-3 rounded-lg border-2 transition-all flex flex-col items-center",
            selectedRole === key && key === "owner" && "border-yellow-900 bg-yellow-100",
            selectedRole === key && key === "tenant" && "border-blue-900 bg-blue-100",
            selectedRole !== key && key === "owner" && "border-gray-200 hover:border-yellow-300",
            selectedRole !== key && key === "tenant" && "border-gray-200 hover:border-blue-300"
          )}
        >
          <Icon
            className={clsx(
              "w-10 h-10 mb-2",
              key === "owner" ? "text-yellow-900" : "text-blue-900"
            )}
          />
          <h4 className="font-bold text-gray-800 text-sm">{label}</h4>
          <p className="text-xs text-gray-600 mt-1 text-center">{desc}</p>
        </button>
      ))}
    </div>
  );
}
