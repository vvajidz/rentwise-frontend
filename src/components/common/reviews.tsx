"use client";

import { Star, User } from "lucide-react";
import useAOS from "../../hooks/aox"; // ✅ Use custom hook

const ratingsData = [
  { stars: 5, count: 1200 },
  { stars: 4, count: 800 },
  { stars: 3, count: 120 },
  { stars: 2, count: 40 },
  { stars: 1, count: 20 },
];

export default function ReviewsSection() {
  useAOS(); // 💥 use the hook

  const totalRatings = ratingsData.reduce((acc, item) => acc + item.count, 0);
  const averageRating = (
    ratingsData.reduce((acc, item) => acc + item.stars * item.count, 0) / totalRatings
  ).toFixed(1);

  return (
    <section
      id="reviews"
      className="relative bg-transparent py-12 px-6 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#1e3a8a] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#1e40af] rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#0f172a] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced heading */}
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#1e40af] bg-clip-text text-transparent text-center mb-6 leading-tight"
          data-aos="fade-up"
        >
          Customer Ratings & Reviews
        </h2>

        {/* Main ratings container */}
        <div
          className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl p-6 flex flex-col lg:flex-row gap-8 hover:shadow-2xl transition-all duration-500"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Rating Bars Section */}
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-bold text-[#0f172a] mb-4">Rating Breakdown</h3>
            {ratingsData.map((rating, index) => (
              <div
                key={rating.stars}
                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
                data-aos="fade-right"
                data-aos-delay={300 + index * 100}
              >
                <div className="flex items-center gap-2 min-w-[50px]">
                  <Star size={16} fill="#d97706" className="text-[#d97706]" />
                  <span className="text-[#0f172a] font-semibold text-sm">{rating.stars}</span>
                </div>
                
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden relative">
                  <div
                    className="bg-gradient-to-r from-[#d97706] to-[#f59e0b] h-2 rounded-full transition-all duration-1000 ease-out relative overflow-hidden group-hover:shadow-lg"
                    style={{
                      width: `${(rating.count / totalRatings) * 100}%`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 animate-pulse"></div>
                  </div>
                </div>
                
                <span className="text-gray-600 font-medium min-w-[40px] text-right text-xs">
                  {rating.count}
                </span>
              </div>
            ))}
          </div>

          {/* Overall Ratings Section */}
          <div
            className="flex-1 flex flex-col justify-center items-center space-y-4 border-t lg:border-t-0 lg:border-l border-gray-200/50 pt-6 lg:pt-0 lg:pl-8"
            data-aos="fade-left"
            data-aos-delay="500"
          >
            <div className="text-center">
              <p className="text-5xl font-black bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] bg-clip-text text-transparent mb-2">
                {averageRating}
              </p>
              <p className="text-gray-600 text-xs uppercase tracking-wider font-semibold">
                Out of 5 Stars
              </p>
            </div>
            
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.round(parseFloat(averageRating)) ? "#d97706" : "none"}
                  className={i < Math.round(parseFloat(averageRating)) ? "text-[#d97706]" : "text-gray-300"}
                />
              ))}
            </div>
            
            <p className="text-gray-600 text-base font-medium">
              <span className="font-bold text-[#1e3a8a]">{totalRatings.toLocaleString()}</span> total ratings
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button className="group px-6 py-2 bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white font-bold rounded-xl hover:from-[#1e3a8a] hover:to-[#0f172a] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden text-sm">
                <span className="relative z-10">Write a Review</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              <button className="group px-6 py-2 border-2 border-[#1e3a8a] text-[#1e3a8a] bg-transparent font-bold rounded-xl hover:bg-[#1e3a8a] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm">
                <span className="relative z-10">See All Reviews</span>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Review Section */}
        <div
          className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl p-6 mt-8 text-left hover:shadow-2xl transition-all duration-500 group"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/5 to-[#1e40af]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] rounded-full p-2 shadow-lg">
                <User size={20} className="text-white" />
              </div>
              <div>
                <span className="text-base font-bold text-[#0f172a]">@john.doe</span>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} fill="#d97706" className="text-[#d97706]" />
                    ))}
                  </div>
                  <span className="text-gray-500 text-xs">Nov 01, 2023</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 relative">
              <div className="absolute top-0 left-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-gray-50 transform -translate-y-2"></div>
              <p className="text-gray-800 text-sm leading-relaxed italic">
                "I recently had the opportunity to explore <span className="font-bold text-[#1e3a8a]">RentWise</span>, and it left a lasting impression. The platform seamlessly blends luxury vibes with user-friendly features, making it the go-to for premium rental experiences."
              </p>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div
          className="flex flex-wrap justify-center items-center gap-6 mt-10 opacity-60"
          data-aos="fade-up"
          data-aos-delay="900"
        >
          <div className="text-center">
            <p className="text-xl font-bold text-[#1e3a8a]">4.8★</p>
            <p className="text-xs text-gray-600 uppercase tracking-wider">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#1e3a8a]">95%</p>
            <p className="text-xs text-gray-600 uppercase tracking-wider">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-[#1e3a8a]">{totalRatings.toLocaleString()}+</p>
            <p className="text-xs text-gray-600 uppercase tracking-wider">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  );
}