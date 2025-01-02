"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import { format } from "date-fns";
import { CalendarIcon, MapPinIcon, TicketIcon, Wallet } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import { formatRupiah } from "../../utils/formatRupiah";
import SkeletonEvent from "./components/SkeletonEvent";
import { Button } from "@/components/ui/button";
import { TransactionForm } from "@/components/TransactionForm";
import CreateReviewForm from "../../features/review/components/CreateReviewForm"; // Pastikan path sesuai
import ReviewListt from "../../features/review/index"; // Path benar

interface EventDetailPageProps {
  eventId: number;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ eventId }) => {
  const { data: event, isLoading, error } = useGetEvent(eventId);
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  // State untuk mengontrol visibilitas ulasan
  const [showReviews, setShowReviews] = useState(false);

  if (isLoading) {
    return <SkeletonEvent />;
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-600">
          Error loading event: {error.message}
        </h1>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Event not found
        </h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto mt-8 max-w-4xl px-4">
      <Card className="overflow-hidden">
        <CardHeader className="pb-0">
          <div className="mb-2 flex items-center justify-between">
            <Badge variant="secondary" className="text-sm">
              {event.eventCategory || "Uncategorized"}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Organized by {event.user?.name || "Unknown"}
            </p>
          </div>
          <CardTitle className="text-3xl font-bold">{event.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Thumbnail */}
          <div className="relative mb-6 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={event.thumbnail || "/default-thumbnail.jpg"}
              alt={event.title || "Event Thumbnail"}
              fill
              className="object-cover"
            />
          </div>

          {/* Info seats dan harga */}
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {format(new Date(event.startDate), "dd MMM yyyy")} -{" "}
                {format(new Date(event.endDate), "dd MMM yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {event.location || "Location not specified"}
              </span>
            </div>

            <div>
              <div className="flex items-center">
                <TicketIcon className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">
                  {event.avaliableSeatsReguler || "Seats not specified"}{" "}
                  available seats Reguler
                </span>
                <div className="ml-2 flex items-center">
                  <Wallet className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm">
                    {event.priceReguler
                      ? formatRupiah(event.priceReguler)
                      : "Free"}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <TicketIcon className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">
                  {event.avaliableSeatsVip || "Seats not specified"} available
                  seats Vip
                </span>
                <div className="ml-2 flex items-center">
                  <Wallet className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm">
                    {event.priceVip ? formatRupiah(event.priceVip) : "Free"}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <TicketIcon className="mr-2 h-4 w-4 opacity-70" />
                <span className="text-sm">
                  {event.avaliableSeatsVvip || "Seats not specified"} available
                  seats VVIP
                </span>
                <div className="ml-2 flex items-center">
                  <Wallet className="mr-2 h-4 w-4 opacity-70" />
                  <span className="text-sm">
                    {event.priceVvip ? formatRupiah(event.priceVvip) : "Free"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Deskripsi & Konten */}
          <p className="mb-6 text-muted-foreground">
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
          {/* Tombol Buy Ticket */}
          <div className="my-20">
            <Button onClick={() => setShowTransactionForm(true)}>
              Buy Ticket
            </Button>
          </div>

          {/* Tampilkan Form Transaksi jika user klik Buy Ticket */}
          {showTransactionForm && (
            <TransactionForm
              event={{ ...event, id: parseInt(event.id) }} // Convert id to a number
              onClose={() => setShowTransactionForm(false)}
            />
          )}

          {/* Informasi Rating */}
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-lg text-yellow-500">
              {"⭐".repeat(Math.round(Number(event.averageRating)))}
            </span>
            <span className="text-sm text-gray-700">
              {event.averageRating.toString()} dari {event.totalReviews} ulasan
            </span>
          </div>

          {/* Tombol untuk Menampilkan/Unggah Ulasan */}
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => setShowReviews(!showReviews)}
            >
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </Button>
          </div>

          {/* Render Ulasan dan Formulir jika showReviews true */}
          {showReviews && (
            <>
              <ReviewListt eventId={Number(event.id)} />
              <Separator className="my-6" />

              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-semibold">Leave a Review</h2>
                <CreateReviewForm eventId={eventId} />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
};

export default EventDetailPage;
