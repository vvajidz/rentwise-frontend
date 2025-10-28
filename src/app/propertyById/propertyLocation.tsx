"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface MapSectionProps {
  coordinates: [number, number]; // [longitude, latitude]
}

const MapSection: React.FC<MapSectionProps> = ({ coordinates }) => {
  const [lng, lat] = coordinates;
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <MapPin className="text-rose-600 w-5 h-5" />
        Location
      </h2>

      <div
        className="w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-md border border-gray-300"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <iframe
          src={mapUrl}
          className="w-full h-full"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default MapSection;
