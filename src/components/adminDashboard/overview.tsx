'use client';

import { useEffect, useState } from 'react';
import { fetchStats } from "./dataFetch"
import StatCard from './stateCard';
import { Building2, UserCheck, Users, DollarSign, BarChart3, PieChart } from 'lucide-react';

export default function Overview() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalOwners: 0,
    totalTenants: 0,
    activeRentals: 0,
    monthlyRevenue: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchStats();
      console.log("dataa : " , data)
      setStats(data);
    };
    loadStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Properties" value={stats.totalProperties} icon={Building2} trend={12} />
        <StatCard title="Total Owners" value={stats.totalOwners} icon={UserCheck} trend={8} />
        <StatCard title="Total Tenants" value={stats.totalTenants} icon={Users} trend={15} />
        <StatCard title="Monthly Revenue" value={stats.monthlyRevenue} icon={DollarSign} trend={18} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-blue-900">Revenue Trends</h3>
            <div className="flex space-x-2">
              <button className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">Monthly</button>
              <button className="text-xs px-2 py-1 hover:bg-gray-100 rounded">Yearly</button>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <BarChart3 className="w-12 h-12 text-gray-300" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Property Distribution</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
            <PieChart className="w-12 h-12 text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
