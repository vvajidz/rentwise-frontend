import PropertyCard from './propertyCrad';
import { Property } from '@/types/property';

export default function PropertiesList({ properties }: { properties: Property[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-blue-950">My Properties</h2>
        <button className="bg-blue-950 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
          Add New Property
        </button>
      </div>
      
      {properties.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-blue-800">You haven't added any properties yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}
    </div>
  );
}