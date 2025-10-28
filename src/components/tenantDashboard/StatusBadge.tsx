import { ReactNode } from 'react';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const colors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-800',
    'Pending Approval': 'bg-yellow-100 text-yellow-800',
    'Ended': 'bg-gray-100 text-gray-800',
    'Paid': 'bg-green-100 text-green-800',
    'Unpaid': 'bg-red-100 text-red-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800'
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;