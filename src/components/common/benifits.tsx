"use client";

import { UserCheck, Home, Wallet, FileText, MessageSquare } from "lucide-react";
import useAOS from "../../hooks/aox";

export default function SupportSection() {
  useAOS(); // 💥 Call the custom hook

  return (
    <section className="bg-transparent py-12 px-4" id="support">
      <div
        className="max-w-4xl mx-auto text-center mb-8"
        data-aos="fade-up"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-3">
          Premium Support, Tailored For You
        </h2>
        <p className="text-blue-700 max-w-xl mx-auto text-base font-medium">
          RentWise ensures every Tenant and Property Owner gets luxury-level care and assistance, always.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Tenants Card */}
        <div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col justify-between text-left border border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:bg-blue-50/50"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-blue-600" />
              </div>
              For Tenants
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <UserCheck className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium text-sm">24/7 Help Center for quick resolutions</span>
            </li>
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageSquare className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium text-sm">Instant maintenance & issue support</span>
            </li>
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium text-sm">Document assistance & lease help</span>
            </li>
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <Home className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium text-sm">Personalized alerts & property updates</span>
            </li>
          </ul>
        </div>

        {/* Owners Card */}
        <div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 flex flex-col justify-between text-left border border-blue-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:bg-blue-50/50"
          data-aos="fade-left"
          data-aos-delay="400"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-blue-950 mb-2 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Home className="w-4 h-4 text-blue-600" />
              </div>
              For Property Owners
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
          </div>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <Home className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium text-sm">Dedicated owner support team</span>
            </li>
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <Wallet className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium text-sm">Payment & payout assistance</span>
            </li>
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileText className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium text-sm">Listing management help & edits</span>
            </li>
            <li className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-50/50 transition-colors">
              <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                <MessageSquare className="w-3 h-3 text-blue-600" />
              </div>
              <span className="text-blue-900 font-medium text-sm">Guidance on tenant communication</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}