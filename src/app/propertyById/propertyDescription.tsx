"use client";

import React from "react";

interface DescriptionSectionProps {
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({ description }) => {
  return (
    <div
      className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
      data-aos="fade-up"
      data-aos-duration="600"
    >
      <h2
        className="text-2xl font-semibold text-gray-800 mb-4"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        Property Description
      </h2>
      <p
        className="text-gray-600 leading-relaxed"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {description?.trim()
          ? description
          : "No description provided. Please contact the owner for more information."}
      </p>
    </div>
  );
};

export default DescriptionSection;
