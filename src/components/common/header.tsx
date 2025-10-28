"use client";
import Link from "next/link";
import { Home } from "lucide-react";
import useAOS from "../../hooks/aox"; // 💥 Import your hook here

export default function RentWiseHeader() {
  useAOS(); // 💥 Call it once

  return (
    <div className="relative bg-transparent overflow-hidden min-h-[80vh]">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#3182ce] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#1e3a8a] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-[#2563eb] rounded-full blur-3xl"></div>
      </div>
      
      <section className="relative flex flex-col items-center text-center px-4 pt-20 pb-12 z-10">
        {/* Enhanced main heading with gradient text */}
        <div className="mb-6">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#1f2937] via-[#005e5e] to-[#111827] bg-clip-text text-transparent mb-2 leading-tight tracking-tight"
            data-aos="fade-down"
          >
            Rent Smarter.
          </h1>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#0b004d] via-[#336c6e] to-[#06003b] bg-clip-text text-transparent leading-tight tracking-tight"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Live Better.
          </h1>
        </div>

        {/* Enhanced description with better typography */}
        <p
          className="text-gray-800 text-base md:text-lg mb-6 max-w-2xl leading-relaxed font-medium"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Discover premium rental properties and manage them effortlessly with{" "}
          <span className="font-bold text-[#1e3a8a]">RentWise</span>. 
          <br className="hidden md:block" />
          <span className="text-[#1e40af] font-semibold">Trust the vibes, live your best life.</span>
        </p>

        {/* Enhanced buttons with hover effects */}
        <div
          className="flex flex-col sm:flex-row gap-4 mb-10"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <Link href="/all-properties">
            <button className="group px-8 py-3 bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] text-white hover:from-[#1e3a8a] hover:to-[#0f172a] text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden">
              <span className="relative z-10">Explore Properties</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e40af] to-[#1d4ed8] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
          </Link>
          <Link href="/#how-it-works">
            <button className="group px-8 py-3 border-2 border-[#1e3a8a] text-[#1e3a8a] bg-transparent backdrop-blur-sm hover:bg-[#1e3a8a] hover:text-white text-base font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="relative z-10">How It Works</span>
            </button>
          </Link>
        </div>

        {/* Enhanced property showcase with better styling */}
        <div
          className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl mb-10 group"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10"></div>
          <img
            src="https://i.pinimg.com/1200x/ed/fb/4f/edfb4fbeacf09381d29bae140e849da0.jpg"
            alt="Premium Property"
            className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white px-6 py-4 z-20">
            <div className="flex justify-between items-end">
              <div className="text-left">
                <p className="text-xs uppercase tracking-widest text-[#1e3a8a] font-semibold mb-1">Luxury Collection</p>
                <p className="text-base md:text-lg font-bold leading-tight">Elite living spaces,<br />curated for you</p>
              </div>
              <div className="flex items-center justify-center bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] rounded-full w-10 h-10 shadow-lg">
                <Home className="text-white w-5 h-5" />
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced stats cards with better visual hierarchy */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl px-6 py-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
            <p className="text-3xl font-black text-transparent bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">500+</p>
            <p className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Luxury Units</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl px-6 py-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
            <p className="text-3xl font-black text-transparent bg-gradient-to-br from-[#1e40af] to-[#1e3a8a] bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">20K</p>
            <p className="text-gray-700 text-xs font-semibold uppercase tracking-wider">Happy Tenants</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white rounded-xl px-6 py-6 flex flex-col items-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af] to-[#1d4ed8] opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <p className="text-3xl font-black mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">99%</p>
            <p className="text-gray-200 text-xs font-semibold uppercase tracking-wider relative z-10">Satisfaction Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
}