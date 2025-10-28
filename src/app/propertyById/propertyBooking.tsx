"use client";

import { useRouter } from "next/navigation";

interface BookingCTAProps {
  propertyId: string;
  isAvailable?: boolean;
}

export default function BookingCTA({ propertyId, isAvailable = true }: BookingCTAProps) {
  const router = useRouter();

  const handleBooking = () => {
    if (!isAvailable) return;
    router.push(`/booking/${propertyId}`);
  };

  return (
    <div className="flex justify-center" data-aos="fade-up">
      <button
        onClick={handleBooking}
        disabled={!isAvailable}
        className={`mt-4 px-6 py-3 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 ${
          isAvailable
            ? "bg-blue-900 text-white hover:bg-blue-800"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {isAvailable ? "Book Now" : "Not Available"}
      </button>
    </div>
  );
}
