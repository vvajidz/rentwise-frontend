"use client";

import React from "react";
import { FileText } from "lucide-react";

interface DocumentsSectionProps {
  documents: string[];
}

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ documents }) => {
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
        Required Documents
      </h2>

      {documents && documents.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-200"
              data-aos="fade-up"
              data-aos-delay={150 + index * 100} // staggered animations
              data-aos-duration="400"
            >
              <FileText className="w-4 h-4" />
              <span className="text-sm font-medium">{doc}</span>
            </div>
          ))}
        </div>
      ) : (
        <p
          className="text-sm text-gray-500"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          No documents specified for this property.
        </p>
      )}
    </div>
  );
};

export default DocumentsSection;
