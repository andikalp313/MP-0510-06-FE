"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UpdateUserBody {
  name: string;
  organizerName:string;
  email: string;
  address: string;
  profilePicture: File | null;
}

const useUpdateProfile = (token: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: UpdateUserBody) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("organizerName", payload.organizerName);
      formData.append("email", payload.email);
      formData.append("address", payload.address);
      if (payload.profilePicture) {
        formData.append("profilePicture", payload.profilePicture);
      }

      const { data } = await axiosInstance.patch(
        "/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "Failed to update profile.");
    },
  });
};

export default useUpdateProfile;