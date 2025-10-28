"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import StatusBadge from "./StatusBadge";
import Image from "next/image";
import { MapPin, Calendar, Home, IndianRupee, Ruler } from "lucide-react";

interface Property {
  _id: string;
  propertyName: string;
  propertyType: string;
  address: string;
  images: string[];
  monthlyRent: number;
  securityDeposit: number;
  availableFrom: string;
  leaseTerms: number;
  areaSqFt: number;
  furnishing: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  description: string;
  isAvailable: boolean;
}

export default function RentalsSection() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentProperty = async () => {
      try {
        const res = await axios.get("/tenant/myProperty");
        setProperty(res.data.property);
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentProperty();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading current property...</p>;
  }

  if (!property) {
    return <p className="text-gray-500">No active rental found.</p>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative w-full h-56">
        <Image
          src={property.images?.[0] || "/fallback.jpg"}
          alt={property.propertyName}
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute top-3 left-3">
          <StatusBadge status={property.isAvailable ? "Active" : "Ended"} />
        </div>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800">
            {property.propertyName}
          </h3>
          <span className="text-sm text-gray-500">{property.propertyType}</span>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {property.address}
        </div>

        {/* Rent & Lease */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <IndianRupee className="w-4 h-4 mx-auto text-green-700" />
            <div className="font-semibold text-gray-900">
              ₹{property.monthlyRent.toLocaleString()}
            </div>
            <div className="text-gray-600">Monthly Rent</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <IndianRupee className="w-4 h-4 mx-auto text-blue-700" />
            <div className="font-semibold text-gray-900">
              ₹{property.securityDeposit.toLocaleString()}
            </div>
            <div className="text-gray-600">Deposit</div>
          </div>
        </div>

        {/* Lease Terms */}
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          Available from:{" "}
          <span className="ml-1 font-medium text-gray-800">
            {new Date(property.availableFrom).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Home className="w-4 h-4 mr-2" />
          Lease Terms:{" "}
          <span className="ml-1 font-medium text-gray-800">
            {property.leaseTerms} months
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Ruler className="w-4 h-4 mr-2" />
          Area:{" "}
          <span className="ml-1 font-medium text-gray-800">
            {property.areaSqFt} sq.ft
          </span>
        </div>

        {/* Beds & Baths */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-gray-900">
              {property.bedrooms}
            </div>
            <div className="text-gray-600">Bedrooms</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2 text-center">
            <div className="font-semibold text-gray-900">
              {property.bathrooms}
            </div>
            <div className="text-gray-600">Bathrooms</div>
          </div>
        </div>

        {/* Amenities */}
        <div>
          <h4 className="text-sm font-semibold text-gray-800 mb-2">Amenities</h4>
          <ul className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 6).map((amenity, idx) => (
              <li
                key={idx}
                className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs"
              >
                {amenity}
              </li>
            ))}
            {property.amenities.length > 6 && (
              <li className="text-xs text-gray-500">
                +{property.amenities.length - 6} more
              </li>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-xl hover:bg-amber-700 transition-colors text-sm font-medium">
            View Details
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium">
            Request Service
          </button>
        </div>
      </div>
    </div>
  );
}
