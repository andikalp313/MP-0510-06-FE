"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAxios from "../useAxios";

interface UploadPaymentProofPayload {
  transactionId: number;
  paymentProof: File;
}

const useUploadPaymentProof = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UploadPaymentProofPayload) => {
      const formData = new FormData();
      formData.append("paymentProof", payload.paymentProof);

      // Perubahan URL endpoint di sini
      const { data } = await axiosInstance.patch(
        `/transactions/payment-proof/${payload.transactionId}`,
        formData,
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success("Payment proof uploaded successfully");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // router.push(`/transactions/${data.id}`);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while uploading",
      );
    },
  });
};

export default useUploadPaymentProof;
