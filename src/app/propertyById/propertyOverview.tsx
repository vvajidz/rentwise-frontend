"use client";

import React from "react";
import {
  BedDouble,
  Bath,
  Ruler,
  Sofa,
  Calendar,
  Clock,
  FileText,
  Building2,
  CheckCircle,
  XCircle,
  AlignHorizontalJustifyCenter,
} from "lucide-react";

interface OverviewSectionProps {
  property: {
    bedrooms?: number;
    bathrooms?: number;
    areaSqFt?: number;
    furnishing?: string;
    availableFrom?: string;
    minimumStay?: number;
    leaseTerms?: number;
    balconyCount?: number;
    floorNumber?: number;
    totalFloors?: number;
    isAvailable?: boolean;
  };
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ property }) => {
  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
      data-aos="fade-up"
    >
      <h2
        className="text-2xl font-semibold mb-4 text-gray-800"
        data-aos="fade-down"
      >
        Overview
      </h2>

      <div className="flex flex-wrap gap-3">
        {[
          {
            label: "Bedrooms",
            value:
              property.bedrooms !== undefined
                ? `${property.bedrooms} Bedroom${property.bedrooms > 1 ? "s" : ""}`
                : undefined,
            icon: BedDouble,
          },
          {
            label: "Bathrooms",
            value:
              property.bathrooms !== undefined
                ? `${property.bathrooms} Bathroom${property.bathrooms > 1 ? "s" : ""}`
                : undefined,
            icon: Bath,
          },
          {
            label: "Area",
            value: property.areaSqFt ? `${property.areaSqFt} sq. ft.` : undefined,
            icon: Ruler,
          },
          {
            label: "Furnishing",
            value: property.furnishing
              ? property.furnishing.charAt(0).toUpperCase() + property.furnishing.slice(1)
              : undefined,
            icon: Sofa,
          },
          {
            label: "Available From",
            value: property.availableFrom
              ? `From ${new Date(property.availableFrom).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}`
              : undefined,
            icon: Calendar,
          },
          {
            label: "Minimum Stay",
            value: property.minimumStay
              ? `${property.minimumStay} month${property.minimumStay > 1 ? "s" : ""}`
              : undefined,
            icon: Clock,
          },
          {
            label: "Lease Term",
            value: property.leaseTerms
              ? `${property.leaseTerms} month${property.leaseTerms > 1 ? "s" : ""}`
              : undefined,
            icon: FileText,
          },
          {
            label: "Balconies",
            value:
              property.balconyCount !== undefined
                ? `${property.balconyCount} Balcony${property.balconyCount > 1 ? "ies" : ""}`
                : undefined,
            icon: AlignHorizontalJustifyCenter,
          },
          {
            label: "Floor Info",
            value:
              property.floorNumber !== undefined && property.totalFloors !== undefined
                ? `Floor ${property.floorNumber} of ${property.totalFloors}`
                : undefined,
            icon: Building2,
          },
          {
            label: "Availability",
            value:
              typeof property.isAvailable === "boolean"
                ? property.isAvailable
                  ? "Currently Available"
                  : "Not Available"
                : undefined,
            icon: property.isAvailable ? CheckCircle : XCircle,
          },
        ]
          .filter((item) => item.value)
          .map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-700 hover:bg-gray-200 transition-all"
                data-aos="fade-up"
                data-aos-delay={`${index * 100}`}
              >
                <Icon className="w-4 h-4 text-blue-600" />
                <span className="font-medium">
                  {item.value}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OverviewSection;
