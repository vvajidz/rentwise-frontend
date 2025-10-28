"use client"
import { useState } from 'react';

export default function IncomePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
  
  const monthlyIncome = [
    { month: 'Jan', income: 18500, change: 2.5, properties: 8, latePayments: 0 },
    { month: 'Feb', income: 22000, change: 8.7, properties: 9, latePayments: 1 },
    { month: 'Mar', income: 19500, change: -3.2, properties: 8, latePayments: 2 },
    { month: 'Apr', income: 24500, change: 12.1, properties: 10, latePayments: 0 },
    { month: 'May', income: 26800, change: 9.4, properties: 11, latePayments: 0 },
    { month: 'Jun', income: 23200, change: -13.4, properties: 10, latePayments: 1 },
  ];

  const recentPayments = [
    { id: 1, property: 'Sunset Apartments #4B', tenant: 'Sarah Johnson', amount: 2500, date: '2025-08-01', status: 'paid', type: 'rent' },
    { id: 2, property: 'Downtown Plaza #12A', tenant: 'Michael Davis', amount: 3200, date: '2025-08-01', status: 'paid', type: 'rent' },
    { id: 3, property: 'Garden View #7C', tenant: 'Emma Wilson', amount: 1800, date: '2025-07-28', status: 'late', type: 'rent' },
    { id: 4, property: 'Luxury Penthouse', tenant: 'Robert Brown', amount: 4200, date: '2025-07-30', status: 'paid', type: 'rent' },
    { id: 5, property: 'Family Home Denver', tenant: 'Lisa Garcia', amount: 500, date: '2025-07-25', status: 'paid', type: 'deposit' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-950 mb-2">Income Overview</h1>
            <p className="text-gray-600">Track your rental income and payment history</p>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white border-2 border-blue-200 rounded-xl px-4 py-2 text-sm font-medium focus:border-blue-500 focus:outline-none"
            >
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium">
              📊 Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Total Income" 
            value="$134,500" 
            icon="💰"
            trend={7.2}
            subtitle="Last 6 months"
            color="green"
          />
          <StatCard 
            title="Average Rent" 
            value="$2,408" 
            icon="🏠"
            trend={3.1}
            subtitle="Per property"
            color="blue"
          />
          <StatCard 
            title="Occupancy Rate" 
            value="91.7%" 
            icon="👥"
            trend={-1.2}
            subtitle="Current rate"
            color="purple"
          />
          <StatCard 
            title="On-Time Payments" 
            value="94.2%" 
            icon="⏰"
            trend={2.8}
            subtitle="This month"
            color="teal"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Monthly Performance */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-blue-950">Monthly Performance</h2>
                <div className="flex gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">Income</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">Properties</span>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="text-left pb-4 font-semibold text-gray-700">Month</th>
                      <th className="text-left pb-4 font-semibold text-gray-700">Income</th>
                      <th className="text-left pb-4 font-semibold text-gray-700">Properties</th>
                      <th className="text-left pb-4 font-semibold text-gray-700">Change</th>
                      <th className="text-left pb-4 font-semibold text-gray-700">Late Payments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {monthlyIncome.map((item, index) => (
                      <tr key={item.month} className="border-b border-gray-50 hover:bg-blue-25 transition-colors">
                        <td className="py-4">
                          <div className="font-medium text-gray-900">{item.month} 2025</div>
                        </td>
                        <td className="py-4">
                          <div className="font-bold text-green-600">${item.income.toLocaleString()}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-gray-700">{item.properties} units</div>
                        </td>
                        <td className="py-4">
                          <div className={`flex items-center font-medium ${
                            item.change >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            <span className="mr-1">
                              {item.change >= 0 ? '📈' : '📉'}
                            </span>
                            {Math.abs(item.change)}%
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.latePayments === 0 
                              ? 'bg-green-100 text-green-800' 
                              : item.latePayments <= 1
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.latePayments} late
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Income Insights */}
            <div className="bg-gradient-to-br from-blue-950 to-blue-800 rounded-xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">💡 Income Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Best Performing Month</h4>
                  <p className="text-blue-900">May 2025 with $26,800 income</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Growth Trend</h4>
                  <p className="text-blue-900">+7.2% average monthly growth</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-blue-950 mb-4">📈 Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-green-600">$23,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Month</span>
                  <span className="font-bold text-gray-700">$26,800</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">YTD Total</span>
                  <span className="font-bold text-blue-600">$134,500</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projected Annual</span>
                  <span className="font-bold text-purple-600">$290,400</span>
                </div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-blue-950 mb-4">💳 Payment Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <div className="font-medium text-green-800">On Time</div>
                    <div className="text-sm text-green-600">This month</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">8</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <div className="font-medium text-yellow-800">Late</div>
                    <div className="text-sm text-yellow-600">Outstanding</div>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">1</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-red-800">Overdue</div>
                    <div className="text-sm text-red-600">Action needed</div>
                  </div>
                  <div className="text-2xl font-bold text-red-600">0</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-blue-950">Recent Payments</h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">View All →</button>
          </div>
          
          <div className="space-y-4">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-blue-950">{payment.property}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.type === 'rent' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {payment.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">👤 {payment.tenant} • 📅 {payment.date}</p>
                </div>
                <div className="flex items-center gap-4 mt-3 md:mt-0">
                  <div className="text-right">
                    <p className="font-bold text-lg text-gray-900">${payment.amount.toLocaleString()}</p>
                    <p className={`text-sm font-medium ${
                      payment.status === 'paid' 
                        ? 'text-green-600' 
                        : payment.status === 'late'
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}>
                      {payment.status === 'paid' ? '✅ Paid' : 
                       payment.status === 'late' ? '⏰ Late' : '❌ Overdue'}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-blue-600">
                    ⋯
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, trend, subtitle, color }: { 
  title: string; 
  value: string; 
  icon: string;
  trend: number;
  subtitle: string;
  color: string;
}) {
  const colorClasses = {
    green: 'from-green-500 to-green-600',
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    teal: 'from-teal-500 to-teal-600',
  }[color] || 'from-blue-500 to-blue-600';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`bg-gradient-to-br ${colorClasses} p-3 rounded-xl text-white text-xl`}>
          {icon}
        </div>
      </div>
      
      <div className={`flex items-center text-sm ${
        trend >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        <span className="mr-1">
          {trend >= 0 ? '📈' : '📉'}
        </span>
        {Math.abs(trend)}% {trend >= 0 ? 'increase' : 'decrease'}
      </div>
    </div>
  );
}