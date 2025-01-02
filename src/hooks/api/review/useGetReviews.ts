// src/hooks/api/useGetAllReviews.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { Review } from "@/types/review";

const useGetAllReviews = () => {
  return useQuery<Review[], Error>({
    queryKey: ["reviews", "all"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Review[]>("/reviews");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 menit
  });
};

export default useGetAllReviews;
