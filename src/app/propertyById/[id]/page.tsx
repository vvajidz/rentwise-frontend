"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import api from "@/lib/axios";

import PropertyHeader from "../propertyHeader";
import PricingCard from "../propertPricingCard";
import ImageGallery from "../propertyImage";
import DescriptionSection from "../propertyDescription";
import OverviewSection from "../propertyOverview";
import AmenitiesSection from "../propertyAmenities";
import DocumentsSection from "../propertyDocuments";
import MapSection from "../propertyLocation";
import ReviewsSection from "../propertyReview";
import RentWiseFooter from "@/components/common/about";

import useAOS from "@/hooks/aox";
import BookingCTA from "../propertyBooking";

interface Property {
  _id: string;
  propertyName: string;
  propertyType: string;
  address: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
  images: string[];
  monthlyRent: number;
  securityDeposit: number;
  utilitiesIncluded: boolean;
  availableFrom: string;
  minimumStay: number;
  leaseTerms: number;
  amenities: string[];
  guidelines: string[];
  requiredDocuments: string[];
  description: string;
  reviews?: { user: string; comment: string; rating: number }[];
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  balconyCount: number;
  floorNumber: number;
  totalFloors: number;
  furnishing: string;
  isAvailable: boolean;
  tenants: string[];
  nearbyLocations?: {
    category: string;
    places: { name: string; distance: string }[];
  }[];
}


export default function PropertyDetailsPage() {
  useAOS();

  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

  const [property, setProperty] = useState<Property | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/property/${id}`);
        if (res.data?.property) {
          setProperty(res.data.property);
        } else {
          console.warn("Property not found in response");
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    if (id) fetchProperty();
  }, [id]);

  if (!property) {
    return (
      <div className="text-center py-20 text-xl text-gray-500">
        Property not found.
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
        {/* Back Button */}
        <div>
          <Link
            href="/all-properties"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-600 text-yellow-900 hover:bg-yellow-800 hover:text-white text-sm font-medium transition-all duration-200 shadow-sm"
            data-aos="fade-right"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>


        <PropertyHeader property={property} />
        <ImageGallery images={property.images} />
        <PricingCard property={property} />
        <DescriptionSection description={property.description || "No description available."} />
        <OverviewSection property={property} />
        <AmenitiesSection
          amenities={property.amenities}
          guidelines={property.guidelines}
        />
        <DocumentsSection documents={property.requiredDocuments} />
        <MapSection coordinates={property.location.coordinates} />
        <ReviewsSection reviews={property.reviews || []} />
      </div>

      <RentWiseFooter />
    </div>
  );
}
