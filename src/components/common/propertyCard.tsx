"use client";
import { Button } from "@/components/ui/button";
import { MapPinIcon, BuildingIcon, Clock4Icon, ShieldCheckIcon, FlameIcon, PawPrintIcon } from "lucide-react";
import Link from "next/link";

export type PropertyCardProps = {
  property: {
    _id: string;
    propertyName: string;
    address: string;
    monthlyRent: number;
    image: string;
    rating?: number;
    propertyType: string;
    leaseTerms: number;
    isVerified?: boolean;
    isPetFriendly?: boolean;
    isTrending?: boolean;
  };
  aosDelay?: number;
};

export default function PropertyCard({
  property,
  aosDelay = 0,
}: PropertyCardProps) {
  const {
    _id,
    propertyName,
    address,
    monthlyRent,
    image,
    propertyType,
    leaseTerms,
    isVerified,
    isPetFriendly,
    isTrending,
  } = property;

  return (
    <Link
      href={`/propertyById/${_id}`}
      className="group overflow-hidden rounded-3xl hover:scale-[1.02] transition-all duration-500 ease-out shadow-2xl max-w-sm backdrop-blur-xl bg-white/10 border border-white/20 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] hover:border-white/30"
      data-aos="zoom-in"
      data-aos-duration="500"
      data-aos-delay={aosDelay}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={propertyName}
          className="w-full h-52 object-cover rounded-t-3xl group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute top-3 right-3 backdrop-blur-md bg-black/40 border border-white/20 text-white text-xs px-4 py-2 rounded-full font-semibold shadow-lg">
          ₹{monthlyRent ? monthlyRent.toLocaleString() : "N/A"}
        </div>
        <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
        
        {/* Glassy overlay with subtle animation */}
        <div className="absolute inset-0 rounded-t-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6 backdrop-blur-lg bg-white/20 border-t border-white/10 rounded-b-3xl relative">
        {/* Subtle inner glow */}
        <div className="absolute inset-0 rounded-b-3xl bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <h3 className="font-bold text-lg text-gray-900 mb-2 truncate drop-shadow-sm">
            {propertyName}
          </h3>
          <p className="text-sm text-gray-700 mb-4 flex items-center font-medium drop-shadow-sm">
            <MapPinIcon className="w-4 h-4 mr-2 text-gray-600" /> {address}
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            <span className="backdrop-blur-sm bg-white/30 border border-white/20 text-gray-800 px-3 py-1.5 rounded-full text-xs flex items-center font-medium shadow-sm hover:bg-white/40 transition-colors duration-200">
              <BuildingIcon className="w-3 h-3 mr-1.5" /> {propertyType}
            </span>
            <span className="backdrop-blur-sm bg-white/30 border border-white/20 text-gray-800 px-3 py-1.5 rounded-full text-xs flex items-center font-medium shadow-sm hover:bg-white/40 transition-colors duration-200">
              <Clock4Icon className="w-3 h-3 mr-1.5" /> {leaseTerms} Month Lease
            </span>
            {isVerified && (
              <span className="backdrop-blur-sm bg-emerald-200/60 border border-emerald-300/30 text-emerald-900 px-3 py-1.5 rounded-full text-xs flex items-center font-medium shadow-sm hover:bg-emerald-200/80 transition-colors duration-200">
                <ShieldCheckIcon className="w-3 h-3 mr-1.5" /> Verified
              </span>
            )}
            {isTrending && (
              <span className="backdrop-blur-sm bg-orange-200/60 border border-orange-300/30 text-orange-900 px-3 py-1.5 rounded-full text-xs flex items-center font-medium shadow-sm hover:bg-orange-200/80 transition-colors duration-200">
                <FlameIcon className="w-3 h-3 mr-1.5" /> Popular
              </span>
            )}
            {isPetFriendly && (
              <span className="backdrop-blur-sm bg-blue-200/60 border border-blue-300/30 text-blue-900 px-3 py-1.5 rounded-full text-xs flex items-center font-medium shadow-sm hover:bg-blue-200/80 transition-colors duration-200">
                <PawPrintIcon className="w-3 h-3 mr-1.5" /> Pet-Friendly
              </span>
            )}
          </div>

          <Button
            variant="outline"
            className="w-full backdrop-blur-sm bg-white/20 border border-white/30 text-gray-800 hover:bg-white/30 hover:border-white/40 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 py-2.5 hover:scale-[1.02]"
          >
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
}
