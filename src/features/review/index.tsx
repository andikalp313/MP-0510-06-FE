// src/features/review/components/ReviewList.tsx

"use client";

import useGetReviewsByEvent from "@/hooks/api/review/useGetReviewByEvent";
import { Review } from "@/types/review"; // Pastikan path import sesuai
import { Skeleton } from "@/components/ui/skeleton";

interface ReviewListProps {
  eventId: number;
}

const ReviewList: React.FC<ReviewListProps> = ({ eventId }) => {
  const { data: reviews, isLoading, error } = useGetReviewsByEvent(eventId);

  console.log("ReviewList - eventId:", eventId);
  console.log("ReviewList - fetched reviews:", reviews);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    console.error("ReviewList - error:", error);
    return <p>Error loading reviews: {error.message}</p>;
  }

  if (!reviews || reviews.length === 0) {
    console.log("ReviewList - No reviews found.");
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review: Review) => (
        <div key={review.id} className="rounded-md border p-4">
          <div className="flex items-center space-x-2">
            {review.user.profilPicture ? (
              <img
                src={review.user.profilPicture}
                alt={review.user.name}
                className="h-10 w-10 rounded-full"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                <span className="text-sm text-white">
                  {review.user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h4 className="text-lg font-semibold">{review.user.name}</h4>
              <p className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
            <p className="mt-1">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
