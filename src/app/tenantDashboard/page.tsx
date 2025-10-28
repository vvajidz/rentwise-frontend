"use client";

import { useState } from 'react';
import Sidebar from '@/components/tenantDashboard/Sidebar';
import DashboardSection from '@/components/tenantDashboard/DashboardSection';
import RentalsSection from '@/components/tenantDashboard/RentalsSection';
import PaymentsSection from '@/components/tenantDashboard/PaymentsSection';
import ServicesSection from '@/components/tenantDashboard/ServicesSection';
import WishlistSection from '@/components/tenantDashboard/WishlistSection';
import MessagesSection from '@/components/tenantDashboard/MessagesSection';
import { Menu, X } from 'lucide-react';
import { useUserStore } from '@/store/zustand/zustand';

interface Rental {
  id: number;
  name: string;
  image: string;
  startDate: string;
  endDate: string;
  rent: string;
  status: string;
}

interface Payment {
  date: string;
  amount: string;
  property: string;
  method: string;
  status: string;
}

interface ServiceRequest {
  id: number;
  issue: string;
  property: string;
  status: string;
  date: string;
}

interface SavedProperty {
  id: number;
  name: string;
  location: string;
  rent: string;
  image: string;
}

interface Message {
  id: number;
  from: string;
  message: string;
  time: string;
  unread: boolean;
}

interface DashboardData {
  activeRentals: number;
  upcomingPayment: {
    date: string;
    amount: string;
  };
  savedProperties: number;
}

const TenantDashboard = () => {
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Get user data from Zustand store
  const { user } = useUserStore();
  const tenantName = user?.fullName || '';

  // Mock data
  const dashboardData: DashboardData = {
    activeRentals: 1,
    upcomingPayment: { date: 'Aug 15, 2025', amount: '₹45,000' },
    savedProperties: 8
  };

  const rentals: Rental[] = [
    {
      id: 1,
      name: 'Luxury Apartment - Bandra West',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop',
      startDate: 'Jan 15, 2025',
      endDate: 'Jan 14, 2026',
      rent: '₹45,000',
      status: 'Active'
    }
  ];

  const payments: Payment[] = [
    { date: 'Jul 15, 2025', amount: '₹45,000', property: 'Luxury Apartment - Bandra', method: 'UPI', status: 'Paid' },
    { date: 'Jun 15, 2025', amount: '₹45,000', property: 'Luxury Apartment - Bandra', method: 'Card', status: 'Paid' },
    { date: 'Jul 1, 2025', amount: '₹32,000', property: 'Premium Studio - Powai', method: 'UPI', status: 'Paid' }
  ];

  const serviceRequests: ServiceRequest[] = [
    { id: 1, issue: 'Wi-Fi connectivity issues', property: 'Luxury Apartment - Bandra', status: 'In Progress', date: 'Aug 2, 2025' },
    { id: 2, issue: 'AC repair needed', property: 'Premium Studio - Powai', status: 'Completed', date: 'Jul 28, 2025' }
  ];

  const savedProperties: SavedProperty[] = [
    {
      id: 1,
      name: 'Sea View Penthouse',
      location: 'Marine Drive',
      rent: '₹85,000',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'Modern Villa',
      location: 'Juhu',
      rent: '₹1,20,000',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop'
    }
  ];

  const messages: Message[] = [
    { id: 1, from: 'Property Owner - Bandra', message: 'Maintenance scheduled for tomorrow', time: '2 hours ago', unread: true },
    { id: 2, from: 'Admin', message: 'Payment reminder for August', time: '1 day ago', unread: false }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <DashboardSection
            tenantName={tenantName}
            dashboardData={dashboardData}
            messages={messages}
            serviceRequests={serviceRequests}
          />
        );
      case 'rentals':
        return <RentalsSection rentals={rentals} />;
      case 'payments':
        return (
          <PaymentsSection
            upcomingPayment={dashboardData.upcomingPayment}
            payments={payments}
          />
        );
      case 'services':
        return <ServicesSection serviceRequests={serviceRequests} />;
      case 'wishlist':
        return <WishlistSection savedProperties={savedProperties} />;
      case 'messages':
        return <MessagesSection messages={messages} />;
      default:
        return (
          <DashboardSection
            tenantName={tenantName}
            dashboardData={dashboardData}
            messages={messages}
            serviceRequests={serviceRequests}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-xl shadow-lg border border-gray-200"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          {renderContent()}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default TenantDashboard;
