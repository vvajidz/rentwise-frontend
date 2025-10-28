"use client";

import React from "react";
import { MapPin, Home, CalendarDays } from "lucide-react";

interface PropertyHeaderProps {
  property?: {
    propertyName: string;
    address: string;
    propertyType: string;
    availableFrom?: string;
  };
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  if (!property) return null;

  const { propertyName, address, propertyType, availableFrom } = property;

  return (
    <div className="space-y-4" data-aos="fade-down" data-aos-duration="600">
      <h1
        className="text-4xl font-bold text-gray-900 tracking-tight"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        {propertyName}
      </h1>

      <div
        className="flex items-center gap-2 text-lg text-gray-600"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <MapPin size={20} className="text-blue-600" />
        <span>{address}</span>
      </div>

      <div
        className="flex items-center gap-4 flex-wrap text-sm"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-medium">
          <Home size={16} />
          {propertyType}
        </span>

        {availableFrom && (
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 font-medium">
            <CalendarDays size={16} />
            Available from{" "}
            {new Date(availableFrom).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default PropertyHeader;
