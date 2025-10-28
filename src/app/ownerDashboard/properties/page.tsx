"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"
import { useUserStore } from "@/store/zustand/zustand"
import { MapPin, Eye, Pencil, Trash2 } from "lucide-react"
import { EditPropertyDialog } from "./editProperty"
import { toast } from "sonner"
import Link from "next/link"
import { Point } from "framer-motion"
import { Property } from "@/types/property"

export default function PropertiesPage() {
  const { user } = useUserStore()
  const [properties, setProperties] = useState<Property[]>([])
  const [deleteConfirm, setDeleteConfirm] = useState<Property | null>(null)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user?._id) return
      try {
        const response = await api.get(`/owner/property/${user._id}`)
        console.log(response.data.properties)
        setProperties(response.data.properties)
      } catch (error) {
        console.error("Failed to fetch properties:", error)
        toast.error("Failed to load properties")
      }
    }
    fetchProperties()
  }, [user?._id])

  const handleDeleteClick = (property: Property) => {
    setDeleteConfirm(property)
  }

  const confirmDelete = async () => {
    if (!deleteConfirm) return
    try {
      await api.delete(`/property/deleteproperty/${deleteConfirm._id}`)
      setProperties((prev) => prev.filter((p) => p._id !== deleteConfirm._id))
      setDeleteConfirm(null)
      toast.success("Property deleted successfully")
    } catch (err) {
      console.error("Delete failed:", err)
      toast.error("Failed to delete property")
    }
  }

  const handlePropertyUpdate = (updatedProperty: Property) => {
    setProperties(prev =>
      prev.map(p => p._id === updatedProperty._id ? updatedProperty : p)
    )
    setEditingProperty(null)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-blue-950">My Properties</h1>
          <Link href="/addProperty">
            <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Property
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onDelete={() => handleDeleteClick(property)}
              onEdit={() => setEditingProperty(property)}
            />
          ))}
        </div>

        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
              <h2 className="text-xl font-bold text-blue-950 mb-2">Delete Property</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{deleteConfirm.propertyName}</span>?
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                  onClick={() => setDeleteConfirm(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {editingProperty && (
          <EditPropertyDialog
            property={editingProperty}
            open={!!editingProperty}
            onOpenChange={(open) => !open && setEditingProperty(null)}
            onPropertyUpdated={handlePropertyUpdate}
            onSuccess={() => toast.success("Property updated successfully")}
            onError={() => toast.error("Failed to update property")}
          />
        )}
      </div>
    </div>
  )
}

interface PropertyCardProps {
  property: Property
  onDelete: () => void
  onEdit: () => void
}

function PropertyCard({ property, onDelete, onEdit }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative h-56 bg-gradient-to-br from-blue-950 to-blue-700 flex items-center justify-center">
        {property.images?.length ? (
          <img
            src={property.images[0]}
            alt={property.propertyName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-white text-lg font-medium">📸 No Image</div>
        )}

        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${property.status === "occupied"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
              }`}
          >
            {(property.propertyType || "Unknown").toUpperCase()}
          </span>
        </div>

        <div className="absolute top-4 left-4">
          <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-xs font-medium">
            {property.propertyType || "N/A"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-blue-950 mb-1">
            {property.propertyName}
          </h3>
          <p className="text-gray-600 text-sm flex items-center">
            <MapPin className="inline-block mr-1 text-blue-900" size={16} />
            <span className="text-sm text-blue-950">
              {property.location?.coordinates?.length === 2
                ? `${property.location.coordinates[1]}, ${property.location.coordinates[0]}`
                : "Unknown location"}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-blue-600 font-semibold">{property.bedrooms}</div>
            <div className="text-xs text-gray-500">Beds</div>
          </div>
          <div className="text-center">
            <div className="text-blue-600 font-semibold">{property.bathrooms}</div>
            <div className="text-xs text-gray-500">Baths</div>
          </div>
          <div className="text-center">
            <div className="text-blue-600 font-semibold">
              ₹ {typeof property.areaSqFt === "number" ? property.areaSqFt.toLocaleString() : "N/A"}
            </div>
            <div className="text-xs text-gray-500">Sq Ft</div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {(property.amenities ?? []).slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {amenity}
              </span>
            ))}

            {(property.amenities?.length ?? 0) > 3 && (
              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                +{(property.amenities?.length ?? 0) - 3} more
              </span>
            )}
          </div>

        </div>

        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="text-2xl font-bold text-blue-950">
              ₹ {typeof property.monthlyRent === "number" ? property.monthlyRent.toLocaleString() : "N/A"}
            </span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              👥 {property.tenants} tenant{property.tenants !== 1 ? "s" : ""}
            </div>
            {property.status === "occupied" && property.leaseExpiry && (
              <div className="text-xs text-gray-500">
                Lease ends: {new Date(property.leaseExpiry).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex text-xs text-gray-500 gap-4">
            <span>Built: {property.yearBuilt || "N/A"}</span>
            <span>
              Last Maint.: {property.lastMaintenance ? new Date(property.lastMaintenance).toLocaleDateString() : "N/A"}
            </span>
          </div>
          <div className="flex gap-2">
            <button title="View" className="text-blue-700 hover:text-blue-900">
              <Eye size={18} />
            </button>
            <button
              title="Edit"
              className="text-green-700 hover:text-green-900"
              onClick={onEdit}
            >
              <Pencil size={18} />
            </button>
            <button
              title="Delete"
              onClick={onDelete}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}