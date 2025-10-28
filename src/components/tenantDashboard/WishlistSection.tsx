import { MapPin } from 'lucide-react';

interface SavedProperty {
  id: number;
  name: string;
  location: string;
  rent: string;
  image: string;
}

interface WishlistSectionProps {
  savedProperties: SavedProperty[];
}

const WishlistSection = ({ savedProperties }: WishlistSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Saved Properties</h2>
        <span className="text-gray-600">{savedProperties.length} properties saved</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedProperties.map(property => (
          <div key={property.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <img src={property.image} alt={property.name} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="font-semibold text-gray-800 mb-2">{property.name}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
              <p className="text-lg font-bold text-amber-600 mb-4">{property.rent}/month</p>
              
              <div className="flex space-x-3">
                <button className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-xl hover:bg-amber-700 transition-colors text-sm font-medium">
                  View Details
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
                  Book Visit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistSection;