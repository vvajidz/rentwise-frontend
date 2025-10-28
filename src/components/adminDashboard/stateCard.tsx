// src/components/admin/UI/StatCard.tsx
import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
}

export default function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1 text-blue-900">
            {title.includes('Revenue') ? `₹${(value / 100000).toFixed(1)}L` : value.toLocaleString()}
          </p>
        </div>
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 flex items-center text-sm">
          <span className={`flex items-center ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`w-4 h-4 mr-1 ${trend > 0 ? '' : 'transform rotate-180'}`} />
            {Math.abs(trend)}% {trend > 0 ? 'increase' : 'decrease'} from last month
          </span>
        </div>
      )}
    </div>
  );
}