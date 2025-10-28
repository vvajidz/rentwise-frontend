import { Home, Calendar, Heart, MessageCircle, Wrench } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface DashboardData {
  activeRentals: number;
  upcomingPayment: {
    date: string;
    amount: string;
  };
  savedProperties: number;
}

interface Message {
  id: number;
  from: string;
  message: string;
  time: string;
  unread: boolean;
}

interface ServiceRequest {
  id: number;
  issue: string;
  property: string;
  status: string;
  date: string;
}

interface DashboardSectionProps {
  tenantName: string;
  dashboardData: DashboardData;
  messages: Message[];
  serviceRequests: ServiceRequest[];
}

const DashboardSection = ({ tenantName, dashboardData, messages, serviceRequests }: DashboardSectionProps) => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {tenantName} 👋</h1>
        <p className="text-gray-600">Here's your rental overview for today</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Home className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{dashboardData.activeRentals}</span>
          </div>
          <h3 className="font-semibold text-gray-800">Active Rentals</h3>
          <p className="text-sm text-gray-600">Currently renting</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-gray-800">{dashboardData.upcomingPayment.amount}</div>
              <div className="text-sm text-gray-600">{dashboardData.upcomingPayment.date}</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-800">Upcoming Payment</h3>
          <p className="text-sm text-gray-600">Next due date</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Heart className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-2xl font-bold text-gray-800">{dashboardData.savedProperties}</span>
          </div>
          <h3 className="font-semibold text-gray-800">Saved Properties</h3>
          <p className="text-sm text-gray-600">In your wishlist</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Messages</h3>
          <div className="space-y-3">
            {messages.slice(0, 3).map(msg => (
              <div key={msg.id} className="flex items-start space-x-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800">{msg.from}</p>
                  <p className="text-sm text-gray-600">{msg.message}</p>
                  <p className="text-xs text-gray-500">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Service Requests</h3>
          <div className="space-y-3">
            {serviceRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div>
                  <p className="font-medium text-sm text-gray-800">{request.issue}</p>
                  <p className="text-xs text-gray-600">{request.property}</p>
                </div>
                <StatusBadge status={request.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;