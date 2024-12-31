// hooks/api/transaction/useTransaction.ts
"use client";

import useAxios from "@/hooks/api/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateTransactionPayload {
  eventId: number;
  qty: number;
  pointsUsed?: number;
  voucherCode?: string;
  couponCode?: string;
  paymentProof?: string;
  ticketType: "REGULER" | "VIP" | "VVIP";
}

const useCreateTransaction = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    // Fungsi utama untuk memanggil endpoint backend
    mutationFn: async (payload: CreateTransactionPayload) => {
      // Jika `paymentProof` Anda berupa file, Anda bisa ubah logika
      // menjadi FormData. Kalau masih JSON biasa, cukup seperti ini:
      const { data } = await axiosInstance.post(
        "/transactions/create",
        payload,
      );
      return data;
    },

    onSuccess: async (data) => {
      toast.success("Create Transaction success");
      // Jika Anda menyimpan cache daftar transaksi, bisa di-invalidate di sini.
      await queryClient.invalidateQueries({ queryKey: ["transaction-list"] });

      // Arahkan user ke halaman detail transaksi
      router.push(`/transactions/${data.id}`);
    },

    onError: (error: AxiosError<any>) => {
      // Tampilkan error dari backend, kalau ada field message
      toast.error(
        error.response?.data?.message || "Failed to create transaction",
      );
    },
  });
};

export default useCreateTransaction;
