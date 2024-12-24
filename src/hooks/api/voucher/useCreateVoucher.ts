"use client";

import useAxios from "@/hooks/api/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface useCreateVoucherPayload {
  voucherCode: string;
  qty: number;
  value: number;
  expDate: string;
  eventId: number;
}

const useCreateVoucher = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: useCreateVoucherPayload) => {
      const { data } = await axiosInstance.post("/vouchers", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Create voucher success");
      router.push("/");
      // router.push("/dashboard/my-event/my-vouchers");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data || error.response?.data.message);
    },
  });
};

export default useCreateVoucher;
