// src/components/admin/Dashboard/Properties.tsx
import { Search, Filter, Eye, Edit, Trash2, Building2, MapPin, IndianRupee, Calendar, Bed, Bath } from 'lucide-react';
import { useState } from 'react';
import { useProperties } from '@/app/all-properties/propertyFetch';
import { Property } from "../../types/property"

interface PropertiesProps {
  onViewItem: (item: Property) => void;
}

export default function Properties({ onViewItem }: PropertiesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const { properties, loading, totalPages } = useProperties(currentPage, itemsPerPage);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePrevious = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg animate-pulse"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden backdrop-blur-sm">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-blue-100">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Property Management</h2>
              <p className="text-sm text-gray-600 mt-1">Manage your property portfolio</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative min-w-0 flex-grow lg:flex-grow-0 lg:w-80">
              <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by name, type, or location..." 
                className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm hover:shadow-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-6 py-3 text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2 font-medium text-gray-700 shadow-sm hover:shadow-md">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Card View - Hidden on larger screens */}
      <div className="block lg:hidden">
        <div className="p-4 space-y-4">
          {properties.map((property) => (
            <div key={property._id.toString()} className="bg-gray-50 rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg truncate">{property.propertyName}</h3>
                  <p className="text-sm text-gray-600 capitalize mt-1">{property.propertyType}</p>
                </div>
                <div className="flex gap-2 ml-3">
                  <button 
                    onClick={() => onViewItem(property)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label="View property"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Edit property"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete property"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{property.address}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Bed className="w-4 h-4 text-gray-400" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Bath className="w-4 h-4 text-gray-400" />
                      <span>{property.bathrooms}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    property.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {property.isAvailable ? 'Available' : 'Occupied'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex items-center gap-1 font-semibold text-gray-900">
                    <IndianRupee className="w-4 h-4" />
                    <span>{property.monthlyRent?.toLocaleString() ?? 'N/A'}</span>
                    <span className="text-sm font-normal text-gray-600">/month</span>
                  </div>
                  {/* Furnishing removed here */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Desktop Table View - Hidden on mobile */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Property</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Location</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Monthly Rent</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              {/* Furnishing column removed from header */}
              <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr key={property._id.toString()} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">{property.propertyName}</div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Bed className="w-3 h-3" />
                          {property.bedrooms} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-3 h-3" />
                          {property.bathrooms} Baths
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900 capitalize bg-gray-100 px-3 py-1 rounded-full">
                    {property.propertyType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-sm text-gray-900 max-w-xs">
                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="truncate">{property.address}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm font-semibold text-gray-900">
                    <IndianRupee className="w-4 h-4 text-green-600" />
                    <span>{property.monthlyRent?.toLocaleString() ?? 'N/A'}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                    property.isAvailable 
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      property.isAvailable ? 'bg-emerald-500' : 'bg-red-500'
                    }`}></span>
                    {property.isAvailable ? 'Available' : 'Occupied'}
                  </span>
                </td>
                {/* Furnishing column removed from body */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onViewItem(property)}
                      className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-all duration-200"
                      aria-label="View property"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all duration-200"
                      aria-label="Edit property"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-all duration-200"
                      aria-label="Delete property"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Enhanced Pagination */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600 font-medium">
            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
            <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, properties.length)}</span> of{' '}
            <span className="font-semibold text-gray-900">{properties.length}</span> properties
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded-lg text-sm font-semibold transition-all duration-200 ${
                currentPage === 1 
                  ? 'text-gray-400 bg-gray-200 cursor-not-allowed border-gray-300' 
                  : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow'
              }`}
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Page</span>
              <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-lg border border-blue-200">
                {currentPage}
              </span>
              <span className="text-sm text-gray-600">of {totalPages}</span>
            </div>
            <button 
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded-lg text-sm font-semibold transition-all duration-200 ${
                currentPage === totalPages 
                  ? 'text-gray-400 bg-gray-200 cursor-not-allowed border-gray-300' 
                  : 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 shadow-sm hover:shadow'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
