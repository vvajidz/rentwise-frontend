"use client"

import RentWiseFooter from "@/components/common/about";
import SupportSection from "@/components/common/benifits";
import FloatingIcons from "@/animations/floatings";
import RentWiseHeader from "@/components/common/header";
import ReviewsSection from "@/components/common/reviews";
import HowItWorks from "@/components/common/working";
import { useUserStore } from "@/store/zustand/zustand";
import RentWiseOwner from "../../components/roleHeader/ownerHeader";
import RentWiseTenants from "../../components/roleHeader/tenantHeader";
import Homenavbar from "@/components/common/navbar";

export default function LandingPage() {

  const { user } = useUserStore()

  let headerComponent;

  if (user?.role === "tenant") {
    headerComponent = <RentWiseTenants />;
  } else if (user?.role === "owner") {
    headerComponent = <RentWiseOwner />;
  } else {
    headerComponent = <RentWiseHeader />;
  }

  return (
    <div className="relative bg-[#fdfcf9] overflow-hidden">
      <FloatingIcons />
      <div>
        <Homenavbar />
        <div className="pt-[80px]"> {/* 80px depending on navbar height */}
          {headerComponent}
        </div>
      </div>

      <HowItWorks />
      <ReviewsSection />
      <SupportSection />
      {/* About section wrapper hides icons */}
      <div className="relative overflow-hidden z-10">
        <RentWiseFooter />
      </div>
    </div>
  );
}
