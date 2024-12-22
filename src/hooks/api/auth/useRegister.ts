"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  referredBy: string;
}

const useRegister = () => {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Register success");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useRegister;
