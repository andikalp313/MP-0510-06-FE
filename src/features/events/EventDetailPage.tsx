"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  Trash2,
  Wallet,
  ArrowDownFromLine,
  ClockIcon,
} from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { formatRupiah } from "../../utils/formatRupiah";
import SkeletonEvent from "./components/SkeletonEvent";
import { TransactionForm } from "@/components/TransactionForm";
import CreateReviewForm from "../../features/review/components/CreateReviewForm";
import ReviewList from "../../features/review/index";
import ModalDelete from "./components/ModalDelete";
import useDeleteEvent from "@/hooks/api/event/useDeleteEvent";
import { useAppSelector } from "@/redux/hooks";
import { motion } from "framer-motion";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { Voucher } from "@/types/voucher";
import { toast } from "react-toastify";

interface EventDetailPageProps {
  eventId: number;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ eventId }) => {
  const { data: event, isLoading, error } = useGetEvent(eventId);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  useAppSelector((state) => state.user);

  // State untuk mengontrol visibilitas ulasan
  const [showReviews, setShowReviews] = useState(false);
  const { mutateAsync: deleteEvent, isPending: isPendingDelete } =
    useDeleteEvent();

  const onClickDeleteEvent = async () => {
    await deleteEvent(eventId);
  };

  if (isLoading) {
    return <SkeletonEvent />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-100 p-4">
        <h1 className="text-2xl font-semibold text-red-600">
          Error loading event: {error.message}
        </h1>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-100 p-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Event not found
        </h1>
      </div>
    );
  }

  return (
    <motion.main
      className="container mx-auto mt-8 max-w-screen-2xl px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="hover:shadow-3xl overflow-hidden shadow-2xl transition-shadow duration-500">
        <CardHeader className="bg-gradient-to-r from-sky-400 to-sky-600 p-6 text-white">
          <div className="mb-4 flex items-center justify-between">
            <Badge
              variant="secondary"
              className="rounded-full bg-sky-200 px-4 py-1 text-sm text-sky-800"
            >
              {event.eventCategory || "Uncategorized"}
            </Badge>
            <ModalDelete
              onClick={onClickDeleteEvent}
              isPending={isPendingDelete}
            />
          </div>
          <CardTitle className="text-3xl font-extrabold transition-colors duration-500 hover:text-yellow-400 sm:text-4xl md:text-5xl">
            {event.title}
          </CardTitle>

          <p className="mt-2 text-sm text-gray-200">
            Organized by {event.user?.name || "Unknown"}
          </p>
        </CardHeader>
        <CardContent className="bg-white p-6 sm:p-8">
          {/* Layout Flexbox untuk Dua Kolom */}
          <div className="flex flex-col gap-12 md:flex-row">
            {/* Kolom 1: Deskripsi Event dan Konten Utama */}
            <div className="flex w-full flex-col md:w-2/3">
              {/* Gambar Event */}
              <motion.div
                className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={event.thumbnail || "/default-thumbnail.jpg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Deskripsi dan Konten */}
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Separator className="my-4" />
                <p className="text-base leading-relaxed text-sky-800 sm:text-lg">
                  {event.description || "No description available."}
                </p>

                <Separator className="my-6" />

                <div className="prose max-w-none">
                  {event.content ? (
                    <div dangerouslySetInnerHTML={{ __html: event.content }} />
                  ) : (
                    <p>No additional content available for this event.</p>
                  )}
                </div>
              </motion.div>

              {/* Konten Tambahan Jika Ada */}
              {/* ... (Tambahkan konten lain jika diperlukan) ... */}
            </div>

            {/* Kolom 2: Informasi Tiket */}
            <div className="flex w-full flex-col md:w-1/3">
              {/* Kotak Transaksi Modern */}
              <motion.div
                className="flex flex-col justify-between rounded-lg bg-gradient-to-t from-sky-50 to-sky-100 p-6 shadow-md sm:p-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div>
                  {/* Detail Event */}
                  <div className="mb-4 space-y-4">
                    {/* Bagian Tanggal dan Waktu Mulai */}
                    <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
                      {/* Mulai */}
                      <div className="mb-4 flex items-center text-base text-sky-700 sm:text-lg">
                        <CalendarIcon
                          className="mr-3 h-6 w-6 text-sky-500"
                          aria-hidden="true"
                        />
                        <span className="font-medium">
                          Mulai:{" "}
                          {format(
                            new Date(event.startDate),
                            "dd MMM yyyy, HH:mm 'WIB'",
                          )}
                        </span>
                      </div>

                      {/* Selesai */}
                      <div className="mb-4 flex items-center text-base text-sky-700 sm:text-lg">
                        <CalendarIcon
                          className="mr-3 h-6 w-6 text-sky-500"
                          aria-hidden="true"
                        />
                        <span className="font-medium">
                          Selesai:{" "}
                          {format(
                            new Date(event.endDate),
                            "dd MMM yyyy, HH:mm 'WIB'",
                          )}
                        </span>
                      </div>

                      {/* Lokasi */}
                      <div className="flex items-center text-base text-sky-700 sm:text-lg">
                        <MapPinIcon
                          className="mr-3 h-6 w-6 text-sky-500"
                          aria-hidden="true"
                        />
                        <span className="font-medium">
                          Lokasi: {event.location || "Lokasi tidak ditentukan"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Harga Tiket */}
                  <div className="mb-4 grid gap-4">
                    {[
                      {
                        type: "Reguler",
                        seats: event.avaliableSeatsReguler,
                        price: event.priceReguler,
                        color: "text-sky-500",
                      },
                      {
                        type: "Vip",
                        seats: event.avaliableSeatsVip,
                        price: event.priceVip,
                        color: "text-yellow-500",
                      },
                      {
                        type: "Vvip",
                        seats: event.avaliableSeatsVvip,
                        price: event.priceVvip,
                        color: "text-red-500",
                      },
                    ].map(({ type, seats, price, color }, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between rounded-lg border bg-sky-50 p-4 shadow-sm"
                        whileHover={{
                          scale: 1.02,
                          boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Informasi Seats */}
                        <div className="flex items-center space-x-2">
                          <TicketIcon className={`h-5 w-5 ${color}`} />
                          <span className="text-sm font-medium text-sky-700 sm:text-base">
                            {seats || "0"} seats {type}
                          </span>
                        </div>

                        {/* Informasi Harga */}
                        <div className="flex items-center space-x-1">
                          <Wallet className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-semibold text-sky-900 sm:text-base">
                            {price ? formatRupiah(price) : "Free"}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tombol Beli Tiket */}
                <div className="mt-4">
                  <motion.button
                    onClick={() => setShowTransactionForm(true)}
                    className="w-full transform rounded-full bg-gradient-to-r from-sky-500 to-sky-700 px-4 py-3 text-lg font-semibold text-white shadow-lg transition-colors duration-500 hover:scale-105 hover:from-sky-700 hover:to-sky-500 sm:px-6"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Buy Ticket
                  </motion.button>
                </div>

                {showTransactionForm && (
                  <TransactionForm
                    event={{ ...event, id: parseInt(event.id) }}
                    onClose={() => setShowTransactionForm(false)}
                  />
                )}
              </motion.div>
              <div className="mt-8 rounded-lg bg-gradient-to-r from-yellow-400 to-red-500 p-6 text-center shadow-lg">
                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  🎁 Spesial Voucher 🎁
                </h2>
                {event.vouchers.length > 0 ? (
                  <ul className="mt-4 space-y-4">
                    {event.vouchers.map((voucher: Voucher) => (
                      <li
                        key={voucher.voucherCode}
                        className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-lg font-semibold text-red-600 shadow-md sm:text-xl"
                      >
                        <span className="flex items-center">
                          🏷️ <span className="ml-2">{voucher.voucherCode}</span>
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(voucher.voucherCode);
                            toast.success(
                              `Voucher "${voucher.voucherCode}" telah disalin!`,
                            );
                          }}
                          className="ml-4 rounded-full bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-md transition-transform duration-300 hover:scale-105 hover:bg-yellow-600"
                        >
                          Copy
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-4 text-lg font-medium text-yellow-100">
                    Tidak ada voucher tersedia saat ini.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-8 sm:mt-12">
            {/* Informasi Rating */}
            <div className="mt-4 flex items-center space-x-2">
              <span className="text-lg text-yellow-500">
                {"⭐".repeat(Math.round(Number(event.averageRating)))}
              </span>
              <span className="text-sm text-gray-700">
                {event.averageRating.toString()} dari {event.totalReviews}{" "}
                ulasan
              </span>
            </div>
            <motion.button
              onClick={() => setShowReviews(!showReviews)}
              className="flex w-full items-center justify-center space-x-2 rounded-md border border-sky-300 px-4 py-3 text-base font-medium transition-colors duration-500 hover:border-sky-400 sm:px-6 sm:text-lg"
              whileHover={{ backgroundColor: "#e0f7fa" }}
              whileTap={{ scale: 0.95 }}
            >
              {showReviews ? "Hide Reviews" : "Show Reviews"}
              <ArrowDownFromLine
                className={`h-5 w-5 transition-transform duration-500 ${
                  showReviews ? "rotate-180 transform" : ""
                }`}
              />
            </motion.button>
            {showReviews && (
              <motion.div
                className="mt-6 sm:mt-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <ReviewList eventId={Number(event.id)} />
                <Separator className="my-6 sm:my-8" />
                <CreateReviewForm eventId={eventId} />
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.main>
  );
};

export default EventDetailPage;
