// src/hooks/api/useGetReviewsByEvent.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Review } from "@/types/review";

const useGetReviewsByEvent = (eventId: number) => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews", "event", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Review[]>(
        `/reviews/event/${eventId}`,
      );
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 menit
  });
};

export default useGetReviewsByEvent;
