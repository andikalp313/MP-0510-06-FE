import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatRupiah } from "@/utils/formatRupiah";

// Contoh ikon inline (SVG) untuk lokasi dan harga
const LocationIcon = () => (
  <svg
    className="h-5 w-5 text-sky-700"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 1114 0z"
    />
  </svg>
);

const PriceIcon = () => (
  <svg
    className="h-5 w-5 text-sky-700"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 10h10M7 14h10M9 6l-2 2m8-2l2 2m-2 10l2 2m-8-2l-2 2"
    />
  </svg>
);

// Ikon untuk tombol "Learn More"
const ArrowRightIcon = () => (
  <svg
    className="ml-2 h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 5l7 7-7 7"
    />
  </svg>
);

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  return (
    <Link href={`/events/${event.id}`} className="block">
      {/* Pastikan di tempat import Card pakai "overflow-hidden rounded-3xl" jika ingin sudut bulat */}
      <Card className="overflow-hidden rounded-xl bg-gradient-to-tr from-sky-50 to-white">
        {/* Header dengan gambar */}
        <CardHeader className="relative h-56 w-full p-0">
          <Image
            src={event.thumbnail}
            alt={event.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="/placeholder.png"
          />
          {/* Kategori dan Tanggal */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Badge
              variant="default"
              className="rounded-md bg-sky-200 px-2 py-1 text-xs text-sky-800"
            >
              {event.eventCategory}
            </Badge>
            <Badge
              variant="default"
              className="rounded-md bg-sky-200 px-2 py-1 text-xs text-sky-800"
            >
              {format(new Date(event.startDate), "dd MMM yyyy")}
            </Badge>
          </div>
          {/* Overlay gradient agar teks jelas di atas gambar */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-transparent to-transparent p-4">
            <h2 className="text-lg font-semibold text-white">{event.title}</h2>
          </div>
        </CardHeader>

        {/* Konten utama */}
        <CardContent className="flex flex-col p-6">
          <p className="mb-2 line-clamp-2 text-gray-600">{event.description}</p>

          {/* Lokasi dengan ikon */}
          <div className="mb-4 flex items-center gap-2 text-gray-600">
            <LocationIcon />
            <span>
              <span className="line-clamp-2 font-medium text-sky-700">
                Location:
              </span>{" "}
              {event.location}
            </span>
          </div>

          {/* Harga dengan ikon */}
          <div className="mb-4 flex items-center gap-2 text-gray-600">
            <PriceIcon />
            <span>
              <span className="font-medium text-sky-700">From:</span>{" "}
              {formatRupiah(Number(event.priceReguler) ?? 0)}
            </span>
          </div>

          {/* Tombol aksi */}
          <button
            className="mt-auto inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-sky-700"
            type="button"
          >
            Learn More
            <ArrowRightIcon />
          </button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
