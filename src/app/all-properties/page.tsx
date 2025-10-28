"use client";
import { useState } from "react";
import SearchBar from "@/components/common/tenantSearch";
import PropertyCard from "@/components/common/propertyCard";
import { useProperties } from "./propertyFetch";
import { useUserStore } from "@/store/zustand/zustand";
import Homenavbar from "@/components/common/navbar";
import HowItWorks from "@/components/common/working";
import RentWiseFooter from "@/components/common/about";

type Property = {
  _id: string;
  propertyName: string;
  address: string;
  monthlyRent: number;
  images?: string[];
  propertyType: string;
  leaseTerms: string;
  // Add the optional properties that PropertyCard might use
  isVerified?: boolean;
  isPetFriendly?: boolean;
  isTrending?: boolean;
  rating?: number;
  // Keep your other optional fields
  description?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  amenities?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export default function ExplorePage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const { properties, loading, totalPages } = useProperties(currentPage, itemsPerPage);
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const { user } = useUserStore();

  const getGreetingName = (): string => {
    if (!user?.fullName) return "Guest";
    const splitName = user.fullName.split(" ");
    return splitName.length > 1 ? splitName[1] : splitName[0];
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        <Homenavbar />
      </header>

      <main className="min-h-screen bg-transparent">
        <div className="pt-24 pb-16 px-4 max-w-7xl mx-auto">
          {/* Hero Section with Greeting */}
          <section className="text-center mb-12 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
                Welcome to RentWise,{" "}
                <span className="bg-gradient-to-r from-blue-950 to-blue-700 bg-clip-text text-transparent">
                  {getGreetingName()} 
                </span>
              </h1>
              <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                Find verified, transparent homes ready for you.
              </p>
              <div className="mt-6 flex justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-900 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </section>

          {/* Enhanced Search Section */}
          <section className="mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
              <div className="mb-4 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Find Your Perfect Home</h2>
                <p className="text-gray-600">Search through thousands of verified properties</p>
              </div>
              <SearchBar
                location={location}
                setLocation={setLocation}
                date={date}
                setDate={setDate}
              />
            </div>
          </section>

          {/* Properties Section */}
          <section className="relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Available Properties
                </h2>
                <p className="text-gray-600">
                  {properties.length} properties found
                </p>
              </div>
              <div className="flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md border border-white/30">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select className="text-sm font-medium text-gray-800 bg-transparent border-none outline-none">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <p className="mt-4 text-lg font-medium text-gray-600">
                  Finding amazing properties for you...
                </p>
                <div className="mt-2 flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-white/30 max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Properties Found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any properties matching your criteria. Try adjusting your search filters.
                  </p>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                    Clear Filters
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {properties.map((item: Property, index: number) => {
  const propertyData = {
    _id: item._id,
    propertyName: item.propertyName,
    address: item.address,
    monthlyRent: item.monthlyRent,
    image: item.images?.[0] || "/default-house.jpg",
    propertyType: item.propertyType,
    leaseTerms: item.leaseTerms,
    // These are optional in PropertyCardProps
    isVerified: item.isVerified,
    isPetFriendly: item.isPetFriendly,
    isTrending: item.isTrending,
    rating: item.rating
  };

  return (
    <div
      key={item._id}
      className="transform transition-all duration-300 hover:scale-105"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: 'fadeInUp 0.6s ease-out forwards',
        opacity: 0
      }}
    >
      <PropertyCard
        property={propertyData}
        aosDelay={index * 100}
      />
    </div>
  );
})}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-white/30 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                              : "bg-white/80 backdrop-blur-sm text-gray-700 border border-white/30 hover:bg-blue-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-white/30 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* Floating Elements for Visual Appeal */}
        <div className="fixed top-1/4 left-4 w-8 h-8 bg-blue-400/20 rounded-full blur-sm animate-pulse"></div>
        <div className="fixed top-1/2 right-8 w-6 h-6 bg-purple-400/20 rounded-full blur-sm animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="fixed bottom-1/4 left-1/3 w-4 h-4 bg-yellow-400/20 rounded-full blur-sm animate-pulse" style={{animationDelay: '2s'}}></div>
      </main>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <HowItWorks/>
      <RentWiseFooter/>
    </>
  );
}