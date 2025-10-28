"use client";

import React from "react";
import { Plus } from "lucide-react";
import { useUserStore } from "@/store/zustand/zustand";
import { useRouter } from "next/navigation";

const OwnerHeader: React.FC = () => {
  const router = useRouter();
  const { user } = useUserStore();

  const handleAddProperty = () => {
    router.push("/addProperty");
  };

  return (
    <header className="relative bg-gradient-to-br from-[#0d0f31] to-[#030629] rounded-b-3xl overflow-hidden">
      {/* Background Elements */}
      <BackgroundDecoration />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <WelcomeSection name={user?.fullName} />
          <AddPropertyButton onClick={handleAddProperty} />
        </div>

        <DashboardStatus />
      </div>
    </header>
  );
};

// Sub-components for better organization
const BackgroundDecoration = () => (
  <>
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-[#F4EBD0] to-transparent rounded-full -translate-x-48 -translate-y-48" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-[#F4EBD0] to-transparent rounded-full translate-x-40 translate-y-40" />
    </div>
    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(244,235,208,0.1) 1px, transparent 1px),
          linear-gradient(rgba(244,235,208,0.1) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }}
    />
  </>
);

const WelcomeSection = ({ name }: { name?: string }) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight">
        Welcome back,{" "}
        <span className="font-semibold bg-gradient-to-r from-[#F4EBD0] to-[#E6D7A0] bg-clip-text text-transparent">
          {name || "Owner"}
        </span>
      </h1>
      <div className="flex items-center gap-2">
        <div className="w-12 h-[2px] bg-gradient-to-r from-[#F4EBD0] to-transparent rounded-full" />
        <div className="w-6 h-[2px] bg-gradient-to-r from-[#F4EBD0] to-transparent rounded-full opacity-60" />
      </div>
    </div>
    <p className="text-lg text-gray-300 font-light max-w-lg leading-relaxed">
      Manage all your premium rentals from one elegant dashboard. Track
      performance, update listings, and grow your portfolio.
    </p>
  </div>
);

const AddPropertyButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="group relative bg-gradient-to-r from-[#F4EBD0] to-[#E6D7A0] hover:from-[#E6D7A0] hover:to-[#F4EBD0] text-[#1C1E53] font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-out border border-[#F4EBD0]/20"
  >
    <div className="flex items-center gap-3">
      <div className="relative">
        <Plus className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
        <div className="absolute inset-0 bg-[#1C1E53] rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>
      <span className="text-base tracking-wide">Add New Property</span>
    </div>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12" />
  </button>
);

const DashboardStatus = () => (
  <div className="mt-12 pt-8 border-t border-white/10">
    <div className="flex items-center justify-between text-sm text-gray-400">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#F4EBD0] rounded-full animate-pulse" />
          <span>Dashboard Active</span>
        </div>
        <div className="text-gray-500">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-1 text-[#F4EBD0]/60">
        <span>Premium Account</span>
        <div className="w-1 h-1 bg-[#F4EBD0] rounded-full ml-2" />
      </div>
    </div>
  </div>
);

export default OwnerHeader;