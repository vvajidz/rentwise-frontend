// src/types/property.ts
export interface Property {
  _id: string
  propertyName: string
  title?: string // optional if not always present
  propertyType?: string
  tenants?: number
  status?: "occupied" | "vacant"
  address?: string
  location?: {
    type: "Point"
    coordinates: [number, number]
  }
  bedrooms?: number
  bathrooms?: number
  totalFloors?: number
  furnishing?: string
  description?: string
  images?: string[]
  monthlyRent?: number
  securityDeposit?: number
  utilitiesIncluded?: boolean
  amenities?: string[]
  guidelines?: string[]
  requiredDocuments?: string[]
  lastMaintenance?: string
  leaseExpiry?: string
  areaSqFt?: number
  yearBuilt?: number
}
