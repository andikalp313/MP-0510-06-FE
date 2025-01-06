"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import useGetTransaction from "@/hooks/api/transaction/useGetTransaction";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { formatRupiah } from "@/utils/formatRupiah";
import useUploadPaymentProof from "@/hooks/api/payment-proof/useUploadPaymentProof";

const TransactionDetail: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const [paymentMethod, setPaymentMethod] = useState<"BRIMO" | "GOPAY">(
    "BRIMO",
  );
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const paymentMethods = [
    { value: "BRIMO", label: "BRI Mobile" },
    { value: "GOPAY", label: "Gopay" },
  ];

  const transactionId = Number(id) || 0;

  const { data, isLoading, isError, error } = useGetTransaction(transactionId);
  const uploadMutation = useUploadPaymentProof();

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message || "Failed to fetch transaction details");
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-sky-50">
        <div className="text-lg text-sky-600">Loading...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center bg-red-50">
        <div className="text-lg text-red-600">Error: {error.message}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-yellow-50">
        <div className="text-lg text-yellow-600">Transaction not found</div>
      </div>
    );
  }

  const renderTransferInstructions = () => {
    if (paymentMethod === "BRIMO") {
      return (
        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            Silakan transfer sejumlah{" "}
            <strong className="text-sky-600">
              {formatRupiah(Number(data.totalPrice) ?? 0)}
            </strong>{" "}
            ke rekening berikut:
          </p>
          <ul className="list-inside list-disc">
            <li>
              <strong>Bank:</strong> BRI
            </li>
            <li>
              <strong>Nomor Rekening:</strong> 6907
            </li>
            <li>
              <strong>Atas Nama:</strong> Andika Luhur Pambudi
            </li>
          </ul>
          <p>
            Setelah melakukan transfer, Anda dapat mengupload bukti transfer
            pada form di bawah.
          </p>
        </div>
      );
    } else if (paymentMethod === "GOPAY") {
      return (
        <div className="mt-4 space-y-2 text-gray-700">
          <p>
            Silakan transfer sejumlah{" "}
            <strong className="text-sky-600">Rp {data.totalPrice}</strong>{" "}
            melalui Gopay ke nomor berikut:
          </p>
          <ul className="list-inside list-disc">
            <li>
              <strong>Nomor Gopay:</strong> 082178342897
            </li>
          </ul>
          <div className="mt-4">
            <p>
              Setelah melakukan transfer, Anda dapat mengupload bukti transfer
              pada form di bawah.
            </p>
            <div className="mt-2 overflow-hidden rounded-md shadow-lg">
              <img
                src="/gopay.jpeg"
                alt="Gopay"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    // Validasi file (opsional)
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only JPEG and PNG files are allowed.");
      return;
    }

    if (selectedFile.size > maxSize) {
      toast.error("File size exceeds the maximum limit of 5MB.");
      return;
    }

    // Panggil mutation untuk mengupload bukti pembayaran
    uploadMutation.mutate(
      {
        transactionId: transactionId,
        paymentProof: selectedFile,
      },
      {
        onSuccess: () => {
          toast.success("Bukti pembayaran berhasil diupload.");
          // Reset file input
          setSelectedFile(null);
          // Invalidate and refetch transactions
          queryClient.invalidateQueries({
            queryKey: ["transaction", transactionId],
          });
        },
        onError: (err: any) => {
          toast.error(err.message || "Gagal mengupload bukti pembayaran.");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-100 p-6">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-6 text-3xl font-bold text-sky-700">
          Detail Transaksi
        </h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Informasi Transaksi */}
          <div className="space-y-2">
            <p>
              <strong className="text-sky-600">Transaction Id:</strong>{" "}
              {data.id}
            </p>
            <p>
              <strong className="text-sky-600">Username:</strong>{" "}
              {data.user.name}
            </p>
            <p>
              <strong className="text-sky-600">Order Event:</strong>{" "}
              {data.event.title}
            </p>
            <p>
              <strong className="text-sky-600">Ticket Type:</strong>{" "}
              {data.ticketType}
            </p>
            <p>
              <strong className="text-sky-600">Quantity:</strong>{" "}
              {data.quantity}
            </p>
            <p>
              <strong className="text-sky-600">Total Price:</strong>{" "}
              {formatRupiah(Number(data.totalPrice) ?? 0)}
            </p>
            <p>
              <strong className="text-sky-600">Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  data.status === "PENDING"
                    ? "text-yellow-500"
                    : data.status === "COMPLETED"
                      ? "text-green-500"
                      : "text-red-500"
                }`}
              >
                {data.status}
              </span>
            </p>
            <p>
              <strong className="text-sky-600">Expires At:</strong>{" "}
              {new Date(data.expiresAt).toLocaleString("id-ID")}
            </p>
          </div>
          {/* Bukti Pembayaran */}
          {data.paymentProof && (
            <div className="space-y-2">
              <strong className="text-sky-600">Bukti Pembayaran:</strong>
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={data.paymentProof}
                  alt="Payment Proof"
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        {/* Metode Pembayaran */}
        <div className="mt-8">
          <Label
            htmlFor="paymentMethod"
            className="mb-2 block font-semibold text-sky-600"
          >
            Payment Method
          </Label>
          <div className="relative">
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-sky-300 bg-sky-50 px-4 py-3 text-sky-700 shadow-sm transition-colors hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500"
              onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
            >
              <span>
                {paymentMethods.find((p) => p.value === paymentMethod)?.label}
              </span>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  isPaymentDropdownOpen ? "rotate-180" : ""
                } text-sky-600`}
              />
            </button>
            <AnimatePresence>
              {isPaymentDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-1 w-full rounded-lg border border-sky-300 bg-white shadow-lg"
                >
                  {paymentMethods.map((method) => (
                    <button
                      key={method.value}
                      type="button"
                      className={`w-full px-4 py-3 text-left text-sky-700 hover:bg-sky-50 ${
                        paymentMethod === method.value ? "bg-sky-100" : ""
                      } transition-colors`}
                      onClick={() => {
                        setPaymentMethod(method.value as "BRIMO" | "GOPAY");
                        setIsPaymentDropdownOpen(false);
                      }}
                    >
                      {method.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Instruksi Transfer */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-sky-700">
            {paymentMethod === "BRIMO"
              ? "Instruksi Transfer BRIMO"
              : "Instruksi Transfer Gopay"}
          </h2>
          <div className="mt-3 text-gray-700">
            {renderTransferInstructions()}
          </div>
        </div>

        {/* Upload Bukti Pembayaran */}
        {data.status === "PENDING" && (
          <div className="mt-8 rounded-lg bg-sky-50 p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-sky-700">
              Upload Bukti Pembayaran
            </h3>
            <form onSubmit={handleUpload}>
              <div className="mb-4">
                <Label
                  htmlFor="paymentProof"
                  className="mb-2 block font-medium text-sky-600"
                >
                  Pilih File
                </Label>
                <input
                  type="file"
                  id="paymentProof"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-sky-700 transition-colors file:rounded-lg file:border file:border-sky-300 file:bg-sky-100 file:px-4 file:py-2 file:text-sky-700 hover:file:bg-sky-200"
                />
              </div>
              <button
                type="submit"
                disabled={uploadMutation.isPending}
                className={`w-full rounded-lg bg-sky-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-sky-700 ${
                  uploadMutation.isPending
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                {uploadMutation.isPending ? "Uploading..." : "Upload Bukti"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionDetail;
