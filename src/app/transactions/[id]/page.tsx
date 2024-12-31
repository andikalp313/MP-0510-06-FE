"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import useGetTransaction from "@/hooks/api/transaction/useGetTransaction";
import useUploadPaymentProof from "@/hooks/api/transaction/usepaymentProof"; // Pastikan pathnya benar
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Label } from "@radix-ui/react-label";

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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Transaction not found</div>;
  }

  const renderTransferInstructions = () => {
    if (paymentMethod === "BRIMO") {
      return (
        <div>
          <p>
            Silakan transfer sejumlah <strong>Rp {data.totalPrice}</strong> ke
            rekening berikut:
          </p>
          <ul className="list-inside list-disc">
            <li>
              <strong>Bank:</strong> BRI
            </li>
            <li>
              <strong>Nomor Rekening:</strong> 6907 0101 7166 536
            </li>
            <li>
              <strong>Atas Nama:</strong> Andika Luhur Pambudi
            </li>
          </ul>
          <p>
            Setelah melakukan transfer, Anda dapat mengupload bukti transfer
            pada form dibawah
          </p>
        </div>
      );
    } else if (paymentMethod === "GOPAY") {
      return (
        <div>
          <p>
            Silakan transfer sejumlah <strong>Rp {data.totalPrice}</strong>{" "}
            melalui Gopay ke nomor berikut:
          </p>
          <ul className="list-inside list-disc">
            <li>
              <strong>Nomor Gopay:</strong> 082178342897
            </li>
          </ul>
          <div>
            <p>
              Setelah melakukan transfer, Anda dapat mengupload bukti transfer
              pada form di bawah.
            </p>
            <div className="rounded-md">
              <img
                src="/gopay.jpeg"
                alt="gopay"
                className="h-[500px] rounded-md"
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
          // Reset file input
          setSelectedFile(null);
        },
      },
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Transaction Detail</h1>
      <div className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md">
        <p>
          <strong>Transaction Id:</strong> {data.id}
        </p>
        <p>
          <strong>Username:</strong> {data.user.name}
        </p>

        <p>
          <strong>Order Event :</strong> {data.event.title}
        </p>
        <p>
          <strong>Quantity:</strong> {data.quantity}
        </p>
        <p>
          <strong>Total Price:</strong> Rp {data.totalPrice}
        </p>
        <p>
          <strong>Status:</strong> {data.status}
        </p>
        <p>
          <strong>Expires At:</strong>{" "}
          {new Date(data.expiresAt).toLocaleString("id-ID")}
        </p>
        {data.paymentProof && (
          <div className="mt-4">
            <strong>Bukti Pembayaran:</strong>
            <div className="mt-2">
              <img
                src={data.paymentProof}
                alt="Payment Proof"
                className="max-w-xs rounded"
              />
            </div>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="paymentMethod" className="text-gray-700">
          Payment Method
        </Label>
        <div className="relative">
          <button
            type="button"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
          >
            <div className="flex items-center justify-between">
              <span>
                {paymentMethods.find((p) => p.value === paymentMethod)?.label}
              </span>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-200 ${
                  isPaymentDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>
          <AnimatePresence>
            {isPaymentDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-10 mt-1 w-full overflow-hidden rounded-md bg-white shadow-lg"
              >
                {paymentMethods.map((method) => (
                  <button
                    key={method.value}
                    type="button"
                    className={`w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 focus:outline-none ${
                      paymentMethod === method.value ? "bg-gray-200" : ""
                    }`}
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
      <div className="mt-4">
        <h2 className="text-xl font-semibold">
          {paymentMethod === "BRIMO"
            ? "Instruksi Transfer BRIMO"
            : "Instruksi Transfer Gopay"}
        </h2>
        <div className="mt-2">{renderTransferInstructions()}</div>
      </div>
      {data.status === "PENDING" && (
        <div className="mt-6 rounded bg-white px-8 pb-8 pt-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold">
            Upload Bukti Pembayaran
          </h3>
          <form onSubmit={handleUpload}>
            <div className="mb-4">
              <Label htmlFor="paymentProof" className="block text-gray-700">
                Pilih File
              </Label>
              <input
                type="file"
                id="paymentProof"
                accept="image/jpeg, image/png"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <button
              type="submit"
              disabled={uploadMutation.isPending}
              className={`w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 ${
                uploadMutation.isPending ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {uploadMutation.isPending ? "Uploading..." : "Upload Bukti"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TransactionDetail;
