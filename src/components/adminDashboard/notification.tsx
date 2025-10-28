// src/components/admin/Dashboard/Notifications.tsx
import { Bell, Activity, Check, X } from 'lucide-react';
import { mockNotifications, mockActivityLog } from './dataFetch';

export default function Notifications() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-blue-900 flex items-center">
            <Bell className="w-5 h-5 mr-2 text-blue-600" />
            Pending Approvals
          </h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">3 new</span>
        </div>
        <div className="space-y-3">
          {mockNotifications.map((notification) => (
            <div key={notification.id} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                <div className="flex gap-1 ml-2">
                  <button className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-blue-900 flex items-center mb-4">
          <Activity className="w-5 h-5 mr-2 text-blue-600" />
          Activity Log
        </h3>
        <div className="space-y-4">
          {mockActivityLog.map((activity) => (
            <div key={activity.id} className="border-l-2 border-blue-400 pl-3 py-1">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-xs text-gray-500 mt-1">
                <span className="font-medium">{activity.admin}</span> • {activity.time} • {activity.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}