"use client";
import { Building2, KeyRound, Home, Sparkles } from "lucide-react";
import useAOS from "../../hooks/aox"; // ✅ use hook

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    title: "Find Your Dream Property",
    description: "Explore premium luxury listings curated to match your vibe and lifestyle goals.",
    icon: <Building2 className="text-white" size={24} />,
  },
  {
    title: "Connect with Verified Owners",
    description: "Chat and negotiate directly with trusted property owners — transparency first.",
    icon: <KeyRound className="text-white" size={24} />,
  },
  {
    title: "Book & Move In Smoothly",
    description: "Easy online booking, secure payments, and VIP-level move-in support.",
    icon: <Home className="text-white" size={24} />,
  },
  {
    title: "Enjoy Exclusive Support",
    description: "Get 24/7 assistance and premium aftercare service to keep life stress-free.",
    icon: <Sparkles className="text-white" size={24} />,
  },
];

export default function HowItWorks() {
  useAOS(); // 💥 use hook instead of useEffect directly

  return (
    <section
      id="how-it-works"
      className="relative bg-transparent py-12 px-6 text-center overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-48 h-48 bg-[#1e3a8a] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-[#1e40af] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#0f172a] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Enhanced heading with gradient text */}
        <h2
          className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#1e40af] bg-clip-text text-transparent mb-4 leading-tight"
          data-aos="fade-up"
        >
          How It Works
        </h2>
        
        <p
          className="text-gray-800 text-base md:text-lg max-w-3xl mx-auto mb-8 leading-relaxed font-medium"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Renting made simple, luxurious, and totally stress-free. Here's how{" "}
          <span className="font-bold text-[#1e3a8a]">RentWise</span> makes it all happen.
        </p>

        {/* Enhanced grid with better spacing and animations */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={600 + index * 200}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a]/5 to-[#1e40af]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              {/* Enhanced icon container */}
              <div className="relative bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] rounded-xl p-3 mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e40af] to-[#1d4ed8] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                <div className="relative z-10">
                  {step.icon}
                </div>
              </div>
              
              {/* Enhanced typography */}
              <h3 className="text-lg font-bold text-[#0f172a] mb-3 relative z-10 group-hover:text-[#1e3a8a] transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="text-gray-700 text-sm leading-relaxed relative z-10 group-hover:text-gray-800 transition-colors duration-300">
                {step.description}
              </p>

              {/* Number indicator */}
              <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-action section */}
        <div
          className="mt-10 p-6 bg-gradient-to-r from-[#0f172a] to-[#1e3a8a] rounded-2xl max-w-3xl mx-auto text-white shadow-xl"
          data-aos="fade-up"
          data-aos-delay="1000"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3">
            Ready to Experience Premium Rentals?
          </h3>
          <p className="text-gray-200 text-base mb-4">
            Join thousands of satisfied tenants who've made RentWise their trusted rental partner.
          </p>
          <button className="group px-6 py-2 bg-white text-[#1e3a8a] font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span className="relative z-10">Get Started Today</span>
          </button>
        </div>
      </div>
    </section>
  );
}