import Image from 'next/image';
import { Home, MapPin, DollarSign, Users } from 'react-feather';
import { Property } from '@/types/property';

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative h-48 bg-blue-100">
        {property.imageUrl ? (
          <Image 
            src={property.imageUrl} 
            alt={property.title} 
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-blue-800">
            <Home size={48} />
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-blue-950 mb-1">{property.title}</h3>
        <div className="flex items-center text-blue-700 text-sm mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{property.location}</span>
        </div>
        
        <div className="flex justify-between mt-4 pt-4 border-t border-blue-100">
          <div className="flex items-center text-blue-800">
            <DollarSign size={14} className="mr-1" />
            <span>${property.price.toLocaleString()}/mo</span>
          </div>
          <div className="flex items-center text-blue-800">
            <Users size={14} className="mr-1" />
            <span>{property.tenants} {property.tenants === 1 ? 'tenant' : 'tenants'}</span>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button className="flex-1 bg-blue-50 text-blue-800 py-2 rounded hover:bg-blue-100">
            View Details
          </button>
          <button className="flex-1 bg-blue-950 text-white py-2 rounded hover:bg-blue-900">
            Manage
          </button>
        </div>
      </div>
    </div>
  );
}