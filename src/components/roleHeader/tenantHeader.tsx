"use client";

import FloatingIcons from "../../animations/floatings";
import useAOS from "../../hooks/aox";
import { useProperties } from "@/app/all-properties/propertyFetch";
import PropertyCard from "@/components/common/propertyCard";
import Link from "next/link";
import { useUserStore } from "@/store/zustand/zustand";

export default function RentWiseTenants() {
  useAOS();
  const { properties, loading } = useProperties();
  const { user } = useUserStore();

  return (
    <div className="relative bg-transparent min-h-screen overflow-hidden pb-20">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-lg opacity-20"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-lg opacity-15"></div>
        <div className="absolute bottom-20 left-1/2 w-36 h-36 bg-blue-950 rounded-full mix-blend-multiply filter blur-lg opacity-10"></div>
      </div>

      {/* Hero/Header */}
      <section className="relative text-center px-4 pt-20 pb-12 z-10">
        <div className="max-w-4xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight"
            data-aos="fade-up"
          >
            Find Your New Home,{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-800 to-blue-950 bg-clip-text text-transparent">
              {user?.fullName?.split(" ")[0] || "Guest"}
            </span>
          </h1>

          <div
            className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-blue-950 mx-auto rounded-full mb-4"
            data-aos="zoom-in"
            data-aos-delay="150"
          ></div>

          <p
            className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="250"
          >
            Discover premium listings, luxury vibes, and your next dream space — all in one place.
          </p>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2
              className="text-2xl md:text-3xl font-bold text-gray-800 mb-2"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Featured Properties
            </h2>
            <div
              className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-blue-950 mx-auto rounded-full"
              data-aos="zoom-in"
              data-aos-delay="200"
            ></div>
          </div>

          {/* Loading state */}
          {loading ? (
            <div
              className="flex items-center justify-center py-20"
              data-aos="fade-in"
            >
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-blue-700 rounded-full animate-bounce delay-100"></div>
                <div className="w-4 h-4 bg-blue-950 rounded-full animate-bounce delay-200"></div>
              </div>
              <p className="text-blue-700 ml-4 font-medium">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div
              className="text-center py-20"
              data-aos="zoom-in-up"
              data-aos-delay="300"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <p className="text-gray-600 text-lg font-medium">
                No properties available at the moment.
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Check back soon for new listings!
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {properties.slice(0, 4).map((property, index) => (
                <div
                  key={property._id}
                  data-aos="zoom-in-up"
                  data-aos-delay={index * 150}
                >
                  <PropertyCard
                    property={{
                      _id: property._id,
                      propertyName: property.propertyName,
                      address: property.address,
                      monthlyRent: property.monthlyRent,
                      image: property.images?.[0] || "/default-house.jpg",
                      rating: 4.5,
                      propertyType: property.propertyType,
                      leaseTerms: property.leaseTerms,
                    }}
                    aosDelay={index * 150}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Explore All Button */}
      <div
        className="mt-12 flex justify-center relative z-10"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <Link
          href="/all-properties"
          className="bg-blue-800 hover:bg-blue-950 text-white text-sm font-medium py-2 px-6 rounded-full transition duration-200"
        >
          Explore Properties
        </Link>
      </div>
    </div>
  );
}
