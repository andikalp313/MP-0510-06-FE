// src/hooks/api/useCreateReview.ts

"use client";

import useAxios from "@/hooks/api/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Review, CreateReviewPayload } from "@/types/review";

const useCreateReview = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation<Review, AxiosError, CreateReviewPayload>({
    mutationFn: async (payload: CreateReviewPayload) => {
      const { data } = await axiosInstance.post<Review>(
        "/reviews/create-review",
        payload,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Review successfully created.");
      // Misalnya, invalidasi query untuk ulasan berdasarkan event tertentu
      // Anda mungkin perlu menyesuaikan queryKey sesuai kebutuhan
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      router.refresh(); // Refresh halaman atau bagian tertentu
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data.message ||
          "You can only give a review when you have participated and the event has ended.",
      );
    },
  });
};

export default useCreateReview;
