"use client";

import {
  CheckCircle,
  CalendarDays,
  ShieldCheck,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import api from "../../lib/axios";
import { toast } from "react-hot-toast";

interface PricingCardProps {
  property: {
    _id: string; // propertyId from backend
    monthlyRent?: number;
    securityDeposit?: number;
    utilitiesIncluded?: boolean;
    availableFrom?: string;
    leaseTerms?: number;
    isAvailable?: boolean;
  };
}

const PricingCard: React.FC<PricingCardProps> = ({ property }) => {
  const {
    _id: propertyId,
    monthlyRent,
    securityDeposit,
    utilitiesIncluded,
    availableFrom,
    leaseTerms,
    isAvailable,
  } = property;

  const [isBooking, setIsBooking] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleBookNow = async () => {
    if (!propertyId) {
      toast.error("Property ID missing");
      return;
    }

    setIsBooking(true);
    try {
      const res = await api.post("/booking/request", { propertyId });
      toast.success(res.data.message || "Booking request sent!");
      setRequestSent(true);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
    } finally {
      setIsBooking(false);
    }
  };

  const formattedAvailableFrom = availableFrom
    ? new Date(availableFrom).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <div
      data-aos="fade-up"
      data-aos-once="true"
      className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200"
    >
      {/* Top Section */}
      <div
        className="flex items-center justify-between mb-6"
        data-aos="fade-down"
      >
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            ${monthlyRent?.toLocaleString() || "N/A"}
            <span className="text-base text-gray-500 font-medium"> /month</span>
          </h2>

          {utilitiesIncluded && (
            <p className="text-sm text-emerald-600 mt-1 font-medium flex items-center gap-1">
              <CheckCircle size={16} />
              Utilities Included
            </p>
          )}
        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
          RentWise Verified
        </div>
      </div>

      {/* Info Grid */}
      <div
        className="border-t pt-4 border-gray-200 space-y-4 text-sm text-gray-700"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            <span>
              Security Deposit:{" "}
              <span className="font-medium text-gray-900">
                ${securityDeposit?.toLocaleString() || "N/A"}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-blue-500" />
            <span>
              Available From:{" "}
              <span className="font-medium text-gray-900">
                {formattedAvailableFrom}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-500" />
            <span>
              Lease Term:{" "}
              <span className="font-medium text-gray-900">
                {leaseTerms ?? "N/A"} months
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Button */}
      <div
        className="pt-6 flex justify-end"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <button
          onClick={handleBookNow}
          disabled={!isAvailable || isBooking || requestSent}
          className={`w-48 text-white font-semibold text-sm py-3 px-6 rounded-xl transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 ${
            !isAvailable || isBooking || requestSent
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {!isAvailable
            ? "Not Available Yet"
            : requestSent
            ? "Request Sent"
            : isBooking
            ? "Booking..."
            : "Book Now"}
        </button>
      </div>
    </div>
  );
};

export default PricingCard;
