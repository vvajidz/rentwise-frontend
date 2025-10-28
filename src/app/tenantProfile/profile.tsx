"use client";

import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import useAOS from "@/hooks/aox";
import TenantProfileCard from "../../components/tenantProfile/tenantProfile";
import CurrentPropertyCard from "../../components/tenantProfile/tenantCurrentProperty";
import DocumentsCard from "../../components/tenantProfile/tenantDocument";
import Homenavbar from "@/components/common/navbar";
import { useUserStore } from "@/store/zustand/zustand";
import { useRouter } from "next/navigation";
import { User } from "@/store/zustand/zustand"; // make sure this is your User type
import EditUserModal from "../../components/tenantProfile/tenantEdit";

export default function TenantProfilPage() {
  useAOS();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Delay redirect until Zustand store is hydrated
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
    return <div className="p-8 text-gray-500">Checking auth...</div>;
  }

  const handleSaveProfile = (updatedUser: User | null) => {
    if (!updatedUser || !user) return;

    setUser({
      ...user,
      fullName: updatedUser.fullName ?? user.fullName,
      email: updatedUser.email ?? user.email,
      role: updatedUser.role ?? user.role,
      phone: updatedUser.phone ?? user.phone,
      profilePicture: updatedUser.profilePicture ?? user.profilePicture,
      createdAt: updatedUser.createdAt ?? user.createdAt,
    });

    setIsModalOpen(false);
  };

  return (
    <>
      <Homenavbar />

      <div className="min-h-screen bg-gray-50 px-4 py-6 pt-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Tenant Profile Settings</h1>
            <p className="text-gray-600 text-sm">
              View and manage tenant details, rental documents and current lease info.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3" data-aos="fade-right">
              <TenantProfileCard />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div data-aos="fade-up">
                <DocumentsCard />
              </div>
            </div>

            <div className="lg:col-span-3" data-aos="fade-left">
              <CurrentPropertyCard />
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
        >
          <Pencil className="w-5 h-5" />
        </button>
      </div>

      {user && (
        <EditUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProfile}
          initialData={user}
        />
      )}

    </>
  );
}
