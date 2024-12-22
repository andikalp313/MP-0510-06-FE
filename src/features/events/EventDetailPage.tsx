"use client";

import useGetEvent from "@/hooks/api/event/useGetEvent";
import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import SkeletonEvent from "./components/SkeletonEvent";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  MapPinIcon,
  TicketIcon,
  CurrencyIcon as CurrencyDollarIcon,
  UserIcon,
} from "lucide-react";

interface EventDetailPageProps {
  eventId: number;
}

const EventDetailPage: FC<EventDetailPageProps> = ({ eventId }) => {
  const { data, isPending: isPendingGet } = useGetEvent(eventId);

  if (isPendingGet) {
    return <SkeletonEvent />;
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          No Data Available
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
              {data.eventCategory || "Uncategorized"}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Organized by {data.user?.name || "Unknown"}
            </p>
          </div>
          <CardTitle className="text-3xl font-bold">{data.title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="relative mb-6 h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={data.thumbnail || "/default-thumbnail.jpg"}
              alt={data.title || "Event Thumbnail"}
              fill
              className="object-cover"
            />
          </div>

          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {format(new Date(data.startDate), "dd MMM yyyy")} -{" "}
                {format(new Date(data.endDate), "dd MMM yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {data.location || "Location not specified"}
              </span>
            </div>
            <div className="flex items-center">
              <TicketIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {data.avaliableSeats || "Seats not specified"} available seats
              </span>
            </div>
            <div className="flex items-center">
              <CurrencyDollarIcon className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-sm">
                {data.price ? `Rp ${data.price.toFixed(3)}` : "Free"}
              </span>
            </div>
          </div>

          <p className="mb-6 text-muted-foreground">
            {data.description || "No description available."}
          </p>

          <Separator className="my-6" />

          <div className="prose max-w-none">
            {data.content ? (
              <div dangerouslySetInnerHTML={{ __html: data.content }} />
            ) : (
              <p>No additional content available for this event.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default EventDetailPage;
