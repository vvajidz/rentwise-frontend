import StatusBadge from './StatusBadge';
import { Wrench } from 'lucide-react';

interface ServiceRequest {
  id: number;
  issue: string;
  property: string;
  status: string;
  date: string;
}

interface ServicesSectionProps {
  serviceRequests: ServiceRequest[];
}

const ServicesSection = ({ serviceRequests }: ServicesSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Service Requests & Maintenance</h2>
        <button className="bg-amber-600 text-white px-6 py-2 rounded-xl hover:bg-amber-700 transition-colors font-medium">
          New Request
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {serviceRequests.map(request => (
          <div key={request.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-800">{request.issue}</h3>
                <p className="text-sm text-gray-600">{request.property}</p>
                <p className="text-xs text-gray-500">{request.date}</p>
              </div>
              <StatusBadge status={request.status} />
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-3 rounded-xl">
                <p className="text-sm text-gray-700">Updates will be posted here...</p>
              </div>
              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
                View Details & Chat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;