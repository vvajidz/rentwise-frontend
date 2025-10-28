// components/owner/TenantReviewsCard.tsx
"use client";

import { Star } from "lucide-react";
import { OwnerProfile } from "@/types/owner";

interface Props {
  profile: OwnerProfile;
}

export default function TenantReviewsCard({ profile }: Props) {
  const reviews = profile.reviews ?? [];

  return (
    <div className="col-span-12 lg:col-span-6 bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-indigo-500 to-violet-700 rounded-xl">
          <Star className="w-6 h-6 text-white" />
        </div>
        <span className="text-xs text-slate-400">Feedback</span>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Tenant Reviews</h3>

      {reviews.length === 0 ? (
        <p className="text-slate-500 text-sm">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg p-4">
              <p className="text-slate-200 text-sm">"{review.comment}"</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400 text-xs mr-2">
                  {review.rating} ★
                </span>
                <span className="text-slate-400 text-xs">
                  - {review.tenantName}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
