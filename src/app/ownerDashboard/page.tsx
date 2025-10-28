"use client";

import { useEffect, useState } from "react";
import { Home, Users, Wrench } from "lucide-react";
import api from "@/lib/axios";
import { useUserStore } from "@/store/zustand/zustand";

interface DashboardStatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
}

interface Maintenance {
  _id: string;
  propertyName: string;
  date: string;
  status: string;
}

interface Property {
  _id: string;
  name: string;
  createdAt: string;
}

export default function OwnerDashboardPage() {
  const { user } = useUserStore();
  const [propertyCount, setPropertyCount] = useState(0);
  const [tenantCount, setTenantCount] = useState(0);
  const [maintenanceCount, setMaintenanceCount] = useState(0);
  const [recentMaintenances, setRecentMaintenances] = useState<Maintenance[]>([]);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchDashboardData = async () => {
      try {
        // Total tenants
        const tenantsRes = await api.get("/owner/confirm/tenants");
        setTenantCount(tenantsRes.data.length || 0);

        // Total properties + recent properties
        const propertiesRes = await api.get(`/owner/property/${user._id}`);
        const properties = propertiesRes.data.properties || [];
        setPropertyCount(properties.length);
        setRecentProperties(properties.slice(0, 5)); // latest 5

        // Maintenance stats
        const maintRes = await api.get(`/owner/maintenance/${user._id}`);
        setMaintenanceCount(maintRes.data.totalPending || 0);
        setRecentMaintenances(maintRes.data.recent || []);
      } catch (error) {
        console.error("❌ Failed to fetch dashboard stats:", error);
      }
    };

    fetchDashboardData();
  }, [user?._id]);

  const stats: DashboardStatCardProps[] = [
    { title: "Total Properties", value: propertyCount, icon: Home },
    { title: "Total Tenants", value: tenantCount, icon: Users },
    { title: "Maintenance Pending", value: maintenanceCount, icon: Wrench },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-950 mb-8">
          Dashboard Overview
        </h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, idx) => (
            <DashboardStatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Two-column layout for recent lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Recent Maintenances */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-950 mb-4">
              Recently Added Maintenances
            </h2>
            {recentMaintenances.length === 0 ? (
              <p className="text-gray-500">No recent maintenance records</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {recentMaintenances.map((m) => (
                  <li key={m._id} className="py-4 flex justify-between items-center">
                    <div>
                      <p className="font-medium text-blue-950">{m.propertyName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(m.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        m.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : m.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {m.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Properties */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-blue-950 mb-4">
              Recently Added Properties
            </h2>
            {recentProperties.length === 0 ? (
              <p className="text-gray-500">No recent properties</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {recentProperties.map((p) => (
                  <li key={p._id} className="py-4">
                    <p className="font-medium text-blue-950">{p.propertyName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardStatCard({ title, value, icon: Icon }: DashboardStatCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg flex items-center justify-between hover:shadow-xl transition">
      <div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-4xl font-bold text-blue-950 mt-1">{value}</p>
      </div>
      <div className="p-4 bg-blue-50 rounded-full">
        <Icon className="w-8 h-8 text-blue-700" />
      </div>
    </div>
  );
}
