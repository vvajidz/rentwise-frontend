"use client";

import {
  FileText,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

// 1. Define status type
type DocumentStatus = "verified" | "pending" | "rejected";

// 2. Define document object type
interface DocumentItem {
  name: string;
  type: string;
  size: string;
  status: DocumentStatus;
  uploadDate: string;
}

export default function DocumentsCard() {
  // 3. Type the documents array
  const documents: DocumentItem[] = [
    {
      name: "Lease Agreement",
      type: "PDF",
      size: "2.4 MB",
      status: "verified",
      uploadDate: "Dec 15, 2024",
    },
    {
      name: "ID Proof (Aadhar)",
      type: "PDF",
      size: "1.2 MB",
      status: "verified",
      uploadDate: "Dec 10, 2024",
    },
    {
      name: "Income Certificate",
      type: "PDF",
      size: "890 KB",
      status: "pending",
      uploadDate: "Dec 20, 2024",
    },
    {
      name: "Bank Statement",
      type: "PDF",
      size: "3.1 MB",
      status: "rejected",
      uploadDate: "Dec 18, 2024",
    },
  ];

  // 4. Strongly type function input
  const getStatusIcon = (status: DocumentStatus) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "verified":
        return "text-green-700 bg-green-100";
      case "pending":
        return "text-yellow-700 bg-yellow-100";
      case "rejected":
        return "text-red-700 bg-red-100";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-bold text-gray-900">Documents</h3>
        </div>
        <span className="text-sm text-gray-600">
          {
            documents.filter((doc) => doc.status === "verified").length
          }{" "}
          of {documents.length} verified
        </span>
      </div>

      {/* Document List */}
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            {/* Top Section */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {doc.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {getStatusIcon(doc.status)}
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    doc.status
                  )}`}
                >
                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 mt-3">
              <button className="flex items-center space-x-1 px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <Eye className="w-3 h-3" />
                <span>View</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Download className="w-3 h-3" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
