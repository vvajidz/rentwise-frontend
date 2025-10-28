"use client";

import React from "react";
import { Star, MessageCircle } from "lucide-react";

interface Review {
  user: string;
  comment: string;
  rating: number;
  avatarUrl?: string;
  date?: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews }) => {
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  return (
    <div
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
      data-aos="fade-up"
    >
      <h2
        className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2"
        data-aos="fade-down"
      >
        <MessageCircle className="text-yellow-500 w-5 h-5" />
        Tenant Reviews
      </h2>

      {reviews.length > 0 ? (
        <>
          <p
            className="text-gray-800 text-lg font-medium mb-4"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            ⭐ {averageRating} · {reviews.length} reviews
          </p>

          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border border-gray-100 shadow-sm bg-gray-50"
                data-aos="fade-up"
                data-aos-delay={`${(index + 1) * 100}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {review.user.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-800">{review.user}</span>
                  </div>
                  <div className="flex items-center text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-yellow-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">{review.comment}</p>
                {review.date && (
                  <p className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p
          className="text-gray-500 text-sm"
          data-aos="fade-in"
          data-aos-delay="200"
        >
          No reviews yet for this property.
        </p>
      )}
    </div>
  );
};

export default ReviewsSection;
