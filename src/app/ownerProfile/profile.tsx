"use client";

import { useState, useEffect } from "react";
import { OwnerProfile } from "@/types/owner";
import ProfileCard from "./profile/ownerProfile";
import ContactCard from "./profile/ownerContact";
import KYCDocumentsCard from "./profile/ownerKYC";
import BankDetailsCard from "./profile/ownerBank";
import NotificationsCard from "./profile/ownerNotify";
import SecuritySettingsCard from "./profile/ownerSecurity";
import Homenavbar from "@/components/common/navbar";
import { useUserStore } from "@/store/zustand/zustand";
import { useRouter } from "next/navigation";
import { House, LayoutDashboard } from "lucide-react";

export default function OwnerProfilePage() {
  const [showBankDetails, setShowBankDetails] = useState(false);
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Fake loading to wait for hydration
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/");
    }
  }, [user, loading]);

  if (!user && loading) {
    return <div className="p-8 text-white">Checking auth...</div>;
  }

  const [profile, setProfile] = useState<OwnerProfile>({
    id: "owner_123",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@email.com",
    phone: "+91 98765 43210",
    bio: "Experienced property owner with 5+ years in rental business. I provide well-maintained properties with excellent amenities.",
    kycStatus: "verified",
    documents: [
      { id: "1", name: "Aadhar Card", type: "identity", status: "verified", uploadDate: "2024-01-15" },
      { id: "2", name: "PAN Card", type: "identity", status: "verified", uploadDate: "2024-01-15" },
      { id: "3", name: "Property Documents", type: "property", status: "pending", uploadDate: "2024-07-20" },
    ],
    bankDetails: {
      accountNumber: "****7890",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank",
      accountHolderName: "Rajesh Kumar",
    },
    notificationSettings: {
      emailNotifications: true,
      smsNotifications: true,
      bookingUpdates: true,
      marketingEmails: false,
    },
    notifications: [],
    security: {
      lastPasswordChange: "2024-07-01",
      twoFactorEnabled: true,
      loginAlerts: true,
    },
    accountStatus: "active",
    joinDate: "2023-06-15",
    totalProperties: 12,
  });

  const toggleNotification = (key: keyof OwnerProfile["notificationSettings"]) => {
    setProfile((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [key]: !prev.notificationSettings[key],
      },
    }));
  };

  return (
    <>
      <Homenavbar />

      <div className="min-h-screen bg-white px-4 py-6 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-950 mb-2">Owner Profile Settings</h1>
            <p className="text-slate-900">
              Manage your profile, settings, and account information
            </p>
          </div>
          <div className="mb-8 sticky">
            <button
              onClick={() => router.push("/ownerDashboard")}
              className="w-full flex items-center justify-center gap-3 bg-blue-800 hover:bg-red-900 text-white font-semibold py-4 px-6 rounded-2xl text-xl shadow-lg transition duration-200"
            >
              <LayoutDashboard className="w-6 h-6" />
              Go to Dashboard
            </button>
          </div>


          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <ProfileCard />
              <ContactCard />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <KYCDocumentsCard profile={profile} />
              <BankDetailsCard
                profile={profile}
                showBankDetails={showBankDetails}
                setShowBankDetails={setShowBankDetails}
              />
            </div>

            <div className="lg:col-span-3 space-y-6">
              <NotificationsCard
                profile={profile}
                toggleNotification={toggleNotification}
              />
              <SecuritySettingsCard profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
