"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RegisterOrganizerPayload {
  name: string;
  organizerName: string;
  email: string;
  address: string;
  role: string;
  password: string;
  
}

const useRegisterOrganizer = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: RegisterOrganizerPayload) => {
      const { data } = await axiosInstance.post("auth/register", payload);
      return data;

    },
    onSuccess: () => {
      toast.success("Register success");
      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useRegisterOrganizer;
