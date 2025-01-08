"use client";

import { axiosInstance } from "@/lib/axios";
import { useAppSelector } from "@/redux/hooks";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ChangePasswordPayload {
  userId: number;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const useChangePassword = (authToken: string) => {
  const router = useRouter();
  const token = useAppSelector((state) => state.user.token);

  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const { data } = await axiosInstance.patch(
        "/profile/change-password",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("exploretix-token")}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Password changed successfully!");
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      const errorMessage = error.response?.data?.message || "An error occurred.";
      toast.error(error.response?.data?.message || "Failed to change password.");
      console.error(errorMessage);
    },
  });
};

export default useChangePassword;
