"use client"

import React, { useState, useEffect } from "react"
import {
  Calendar, MapPin, DollarSign, Home, Bed, Bath, Square, Building, Zap, Wifi,
  Car, Dog, Shield, TreePine, Waves, Users, Camera, Plus, X, Sparkles, CheckCircle, Pencil
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import axios from "@/lib/axios"
import { Property } from "@/types/property"

interface EditPropertyDialogProps {
  property: Property
  open: boolean
  onOpenChange: (open: boolean) => void
  onPropertyUpdated: (updatedProperty: Property) => void
  onSuccess?: () => void
  onError?: (error: any) => void
}


const propertyTypes = [
  "Apartment", "Condo", "House", "Studio", "Townhouse", "Loft", "Villa"
]

const standardAmenities = [
  { id: "AC", label: "Air Conditioning", icon: Zap },
  { id: "WiFi", label: "High-Speed WiFi", icon: Wifi },
  { id: "Parking", label: "Parking Space", icon: Car },
  { id: "Pet Friendly", label: "Pet Friendly", icon: Dog },
  { id: "Swimming Pool", label: "Swimming Pool", icon: Waves },
  { id: "Security", label: "24/7 Security", icon: Shield },
  { id: "Furnished", label: "Furnished", icon: Home },
  { id: "Balcony", label: "Balcony", icon: TreePine },
  { id: "Gym", label: "Gym Access", icon: Users }
]

export function EditPropertyDialog({
  property,
  open,
  onOpenChange,
  onPropertyUpdated,
  onSuccess,
  onError
}: EditPropertyDialogProps) {
  const [formData, setFormData] = useState<Partial<Property>>(property)
  const [isLoading, setIsLoading] = useState(false)
  const [newGuideline, setNewGuideline] = useState("")
  const [newDocument, setNewDocument] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")

  useEffect(() => {
    if (open) {
      setFormData(property)
      setNewGuideline("")
      setNewDocument("")
      setNewImageUrl("")
    }
  }, [open, property])

  const handleInputChange = (field: keyof Property, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCoordinateChange = (index: 0 | 1, value: number) => {
    const newCoordinates: [number, number] = [
      ...(formData.location?.coordinates || [0, 0])
    ] as [number, number]
    newCoordinates[index] = value
    setFormData(prev => ({
      ...prev,
      location: {
        type: "Point",
        coordinates: newCoordinates
      }
    }))
  }

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities?.includes(amenityId)
        ? prev.amenities.filter(a => a !== amenityId)
        : [...(prev.amenities || []), amenityId]
    }))
  }

  const addImageUrl = () => {
    if (newImageUrl.trim() && !formData.images?.includes(newImageUrl.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), newImageUrl.trim()]
      }))
      setNewImageUrl("")
    }
  }

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter(image => image !== imageToRemove)
    }))
  }

  const addGuideline = () => {
    if (newGuideline.trim()) {
      setFormData(prev => ({
        ...prev,
        guidelines: [...(prev.guidelines || []), newGuideline.trim()]
      }))
      setNewGuideline("")
    }
  }

  const removeGuideline = (index: number) => {
    setFormData(prev => ({
      ...prev,
      guidelines: prev.guidelines?.filter((_, i) => i !== index)
    }))
  }

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData(prev => ({
        ...prev,
        requiredDocuments: [...(prev.requiredDocuments || []), newDocument.trim()]
      }))
      setNewDocument("")
    }
  }

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments?.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.patch(`/owner/property/edit/${property._id}`, formData)
      onPropertyUpdated(response.data)
      onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      onError?.(error)
      console.error("Update error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pencil className="w-5 h-5" />
            Edit Property
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={formData.propertyName || ''}
                  onChange={(e) => handleInputChange('propertyName', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Property Type*</label>
                <select
                  value={formData.propertyType || ''}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address*</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Longitude*</label>
                <input
                  type="number"
                  step="any"
                  value={formData.location?.coordinates?.[0] || 0}
                  onChange={(e) => handleCoordinateChange(0, parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Latitude*</label>
                <input
                  type="number"
                  step="any"
                  value={formData.location?.coordinates?.[1] || 0}
                  onChange={(e) => handleCoordinateChange(1, parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                  value={formData.bedrooms || 1}
                  onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
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
                  value={formData.bathrooms || 1}
                  onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
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
                  value={formData.totalFloors || 1}
                  onChange={(e) => handleInputChange('totalFloors', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Furnishing*</label>
                <select
                  value={formData.furnishing || 'unfurnished'}
                  onChange={(e) => handleInputChange('furnishing', e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi-furnished</option>
                  <option value="fully-furnished">Fully-furnished</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description*</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
            
            {formData.images?.length ? (
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
                  value={formData.monthlyRent || 0}
                  onChange={(e) => handleInputChange('monthlyRent', parseFloat(e.target.value))}
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
                  value={formData.securityDeposit || 0}
                  onChange={(e) => handleInputChange('securityDeposit', parseFloat(e.target.value))}
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center bg-gray-50 p-3 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.utilitiesIncluded || false}
                    onChange={(e) => handleInputChange('utilitiesIncluded', e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 font-medium">Utilities Included</span>
                </label>
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
                const Icon = amenity.icon
                const isSelected = formData.amenities?.includes(amenity.id) || false
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
                )
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !formData.images?.length}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}