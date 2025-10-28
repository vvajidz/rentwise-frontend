"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Header from "@/components/adminDashboard/header";
import Navigation from "@/components/adminDashboard/navigation";
import Overview from "@/components/adminDashboard/overview";
import Properties from "@/components/adminDashboard/properties";
import Users from "@/components/adminDashboard/users";
import Notifications from "@/components/adminDashboard/notification";
import Settings from "@/components/adminDashboard/settings";
import Modal from "@/components/adminDashboard/modal";

import { User } from "@/types/admin";
import { Property } from "@/types/property";
import { useAdminStore } from "../golNimda/adminStore";

type ModalItem = Property | User;

interface FieldProps {
  label: string;
  value: string | number;
}

const Field = ({ label, value }: FieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded shadow-sm">{value}</p>
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const { admin, isAuthenticated } = useAdminStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && (!isAuthenticated || !admin)) {
      router.replace("/");
    }
  }, [isClient, isAuthenticated, admin, router]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return <Overview />;
      case "properties":
        return (
          <Properties
            onViewItem={(item: Property) => {
              setSelectedItem(item);
              setShowModal(true);
            }}
          />
        );
      case "users":
        return (
          <Users
            onViewItem={(user: User) => {
              setSelectedItem(user);
              setShowModal(true);
            }}
          />
        );
      case "notifications":
        return <Notifications />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  const isUser = (item: ModalItem): item is User => {
    return '_id' in item && 'email' in item;
  };

  if (!isClient || !isAuthenticated || !admin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex flex-col">
      <Header />
      <div className="shadow-sm sticky top-0 z-20 bg-white">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <main className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderActiveTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showModal && selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Modal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              title={isUser(selectedItem) ? selectedItem.fullName || "User Details" : selectedItem.propertyName}
            >
              <div className="space-y-4">
                {isUser(selectedItem) ? (
                  <>
                    <Field label="Name" value={selectedItem.fullName || 'N/A'} />
                    <Field label="Email" value={selectedItem.email || 'N/A'} />
                  </>
                ) : (
                  <>
                    <Field label="Property Name" value={selectedItem.propertyName} />
                    {selectedItem.address && <Field label="Location" value={selectedItem.address} />}
                    {selectedItem.propertyType && <Field label="Property Type" value={selectedItem.propertyType} />}
                    {selectedItem.monthlyRent && (
                      <Field label="Monthly Rent" value={`₹${selectedItem.monthlyRent.toLocaleString()}`} />
                    )}
                    {selectedItem.status && <Field label="Status" value={selectedItem.status} />}
                  </>
                )}
              </div>
            </Modal>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
