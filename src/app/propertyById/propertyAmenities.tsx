"use client";

import React from "react";
import { AlertCircle, Wifi, Car, CheckCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AmenitiesSectionProps {
  amenities?: string[];
  guidelines?: string[];
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  amenities = [],
  guidelines = [],
}) => {
  const hasContent = amenities.length > 0 || guidelines.length > 0;
  if (!hasContent) return null;

  const amenityIcons: Record<string, LucideIcon> = {
    "High-Speed WiFi": Wifi,
    "WiFi": Wifi,
    "Parking Space": Car,
    "Parking": Car,
  };

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <h2
        className="text-2xl font-semibold mb-4 text-gray-800"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        Amenities & Guidelines
      </h2>

      {amenities.length > 0 && (
        <div data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Available Amenities</h3>
          <div className="flex flex-wrap gap-3">
            {amenities.map((amenity, index) => {
              const IconComponent = amenityIcons[amenity] || CheckCircle;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl border border-green-200"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium">{amenity}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {guidelines.length > 0 && (
        <div data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-lg font-medium mb-3 text-gray-700">Property Guidelines</h3>
          <div className="space-y-2">
            {guidelines.map((guideline, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>{guideline}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AmenitiesSection;
