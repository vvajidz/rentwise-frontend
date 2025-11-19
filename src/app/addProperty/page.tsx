"use client"

import React, { useState } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Calendar, DollarSign, Home, Bed, Bath, Building, Zap, Wifi, Car, Dog, Shield, TreePine, Waves, Users, Camera, Plus, X, Sparkles, CheckCircle } from 'lucide-react';

interface FormData {
  propertyName: string;
  propertyType: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  images: string[];
  monthlyRent: number;
  securityDeposit: number;
  utilitiesIncluded: boolean;
  availableFrom: string;
  minimumStay: number;
  leaseTerms: number;
  amenities: string[];
  guidelines: string[];
  requiredDocuments: string[];
  description: string;
  bathrooms: number;
  bedrooms: number;
  totalFloors: number;
  furnishing: "unfurnished" | "semi-furnished" | "fully-furnished";
}

const PropertyForm: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newGuideline, setNewGuideline] = useState('');
  const [newDocument, setNewDocument] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');

  const [formData, setFormData] = useState<FormData>({
    propertyName: '',
    propertyType: 'Apartment',
    address: '',
    location: {
      type: "Point",
      coordinates: [0, 0]
    },
    images: [],
    monthlyRent: 0,
    securityDeposit: 0,
    utilitiesIncluded: false,
    availableFrom: new Date().toISOString().split('T')[0],
    minimumStay: 1,
    leaseTerms: 12,
    amenities: [],
    guidelines: [],
    requiredDocuments: [],
    description: '',
    bathrooms: 1,
    bedrooms: 1,
    totalFloors: 1,
    furnishing: 'unfurnished'
  });

  const propertyTypes = [
    'Apartment', 'Condo', 'House', 'Studio', 'Townhouse', 'Loft', 'Villa'
  ];

  const standardAmenities = [
    { id: 'AC', label: 'Air Conditioning', icon: Zap },
    { id: 'WiFi', label: 'High-Speed WiFi', icon: Wifi },
    { id: 'Parking', label: 'Parking Space', icon: Car },
    { id: 'Pet Friendly', label: 'Pet Friendly', icon: Dog },
    { id: 'Swimming Pool', label: 'Swimming Pool', icon: Waves },
    { id: 'Security', label: '24/7 Security', icon: Shield },
    { id: 'Furnished', label: 'Furnished', icon: Home },
    { id: 'Balcony', label: 'Balcony', icon: TreePine },
    { id: 'Gym', label: 'Gym Access', icon: Users }
  ];

  const handleInputChange = (field: keyof FormData, value: string | number | boolean | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCoordinateChange = (index: 0 | 1, value: number) => {
    const newCoordinates = [...formData.location.coordinates] as [number, number];
    newCoordinates[index] = value;
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        coordinates: newCoordinates
      }
    }));
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const addImageUrl = () => {
    if (newImageUrl.trim() && !formData.images.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl('');
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image !== imageToRemove)
    }));
  };

  const addGuideline = () => {
    if (newGuideline.trim()) {
      setFormData(prev => ({
        ...prev,
        guidelines: [...prev.guidelines, newGuideline.trim()]
      }));
      setNewGuideline('');
    }
  };

  const removeGuideline = (index: number) => {
    setFormData(prev => ({
      ...prev,
      guidelines: prev.guidelines.filter((_, i) => i !== index)
    }));
  };

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData(prev => ({
        ...prev,
        requiredDocuments: [...prev.requiredDocuments, newDocument.trim()]
      }));
      setNewDocument('');
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const submissionData = {
        ...formData,
        availableFrom: new Date(formData.availableFrom),
        monthlyRent: Number(formData.monthlyRent),
        securityDeposit: Number(formData.securityDeposit),
        bathrooms: Number(formData.bathrooms),
        bedrooms: Number(formData.bedrooms),
        totalFloors: Number(formData.totalFloors),
      };

      const response = await axios.post('/property/createproperty', submissionData);
      console.log('✅ Property created:', response.data);
      router.push('/all-properties');
    } catch (err) {
      console.error('❌ Submission error:', err);
      setError('Failed to create property. Please check all fields and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-12 px-4 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-6 py-3 mb-6">
            <Sparkles className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600 font-medium">Property Listing</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            List Your Property
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your space into someone's perfect home with our listing platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <X className="w-5 h-5" />
                {error}
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Property Name*</label>
                <input
                  type="text"
                  value={formData.propertyName}
                  onChange={(e) => handleInputChange('propertyName', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter property name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Property Type*</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type} className="bg-white">{type}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address*</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full address"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Longitude*</label>
                <input
                  type="number"
                  step="any"
                  value={formData.location.coordinates[0]}
                  onChange={(e) => handleCoordinateChange(0, parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.0000"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Latitude*</label>
                <input
                  type="number"
                  step="any"
                  value={formData.location.coordinates[1]}
                  onChange={(e) => handleCoordinateChange(1, parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.0000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Building className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Property Details</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Bed className="w-4 h-4 mr-2" /> Bedrooms*
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.bedrooms}
                  onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Bath className="w-4 h-4 mr-2" /> Bathrooms*
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.bathrooms}
                  onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Building className="w-4 h-4 mr-2" /> Total Floors
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.totalFloors}
                  onChange={(e) => handleInputChange('totalFloors', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Furnishing*</label>
                <select
                  value={formData.furnishing}
                  onChange={(e) => handleInputChange('furnishing', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="unfurnished" className="bg-white">Unfurnished</option>
                  <option value="semi-furnished" className="bg-white">Semi-furnished</option>
                  <option value="fully-furnished" className="bg-white">Fully-furnished</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description*</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Describe your property's unique features..."
                required
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Property Images*</h2>
            </div>

            <div className="flex gap-3 mb-6">
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={addImageUrl}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            
            {formData.images.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Property ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Add at least one property image</p>
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Pricing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <DollarSign className="w-4 h-4 mr-2" /> Monthly Rent*
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.monthlyRent}
                  onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <DollarSign className="w-4 h-4 mr-2" /> Security Deposit*
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.securityDeposit}
                  onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.utilitiesIncluded}
                    onChange={(e) => handleInputChange('utilitiesIncluded', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 font-medium">Utilities Included</span>
                </label>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Availability</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4 mr-2" /> Available From*
                </label>
                <input
                  type="date"
                  value={formData.availableFrom}
                  onChange={(e) => handleInputChange('availableFrom', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Minimum Stay (months)*</label>
                <select
                  value={formData.minimumStay}
                  onChange={(e) => handleInputChange('minimumStay', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {[1, 2, 3, 6, 12].map(months => (
                    <option key={months} value={months} className="bg-white">{months} month{months !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Lease Terms (months)*</label>
                <input
                  type="number"
                  min="1"
                  value={formData.leaseTerms}
                  onChange={(e) => handleInputChange('leaseTerms', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Amenities</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {standardAmenities.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = formData.amenities.includes(amenity.id);
                return (
                  <label key={amenity.id} className={`flex items-center space-x-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleAmenity(amenity.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-gray-500'}`} />
                    <span className={`text-sm ${isSelected ? 'text-blue-800 font-medium' : 'text-gray-700'}`}>{amenity.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">House Rules</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newGuideline}
                  onChange={(e) => setNewGuideline(e.target.value)}
                  placeholder="Add a house rule (e.g., No smoking)"
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={addGuideline}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {formData.guidelines.length > 0 && (
                <ul className="space-y-2">
                  {formData.guidelines.map((guideline, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-300">
                      <span className="text-gray-700">{guideline}</span>
                      <button
                        type="button"
                        onClick={() => removeGuideline(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Required Documents */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gray-700" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Required Documents</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newDocument}
                  onChange={(e) => setNewDocument(e.target.value)}
                  placeholder="Add required document (e.g., ID proof)"
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={addDocument}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
                >
                  <Plus className="w-4 h-4" /> Add
                </button>
              </div>
              {formData.requiredDocuments.length > 0 && (
                <ul className="space-y-2">
                  {formData.requiredDocuments.map((document, index) => (
                    <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-300">
                      <span className="text-gray-700">{document}</span>
                      <button
                        type="button"
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={isLoading || formData.images.length === 0}
              className={`relative inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white rounded-lg transition-colors ${
                (isLoading || formData.images.length === 0)
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Publish Property
                </div>
              )}
            </button>
            
            {formData.images.length === 0 && (
              <p className="text-gray-500 text-sm mt-3">Please add at least one image to publish your property</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;