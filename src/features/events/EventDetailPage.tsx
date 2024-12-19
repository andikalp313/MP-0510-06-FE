"use client";
// import useDeleteBlog from "@/hooks/api/blog/useDeleteBlog";
import useGetEvent from "@/hooks/api/event/useGetEvent";
import { format } from "date-fns";

// import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";
// import Markdown from "../../components/Markdown";
// import ModalDelete from "./components/ModalDelete";
// import SkeletonBlog from "./components/SkeletonBlog";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import SkeletonEvent from "./components/SkeletonEvent";
import { Badge } from "@/components/ui/badge";
// import useGetEvent from "@/hooks/api/event/useGetEvent";

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
      <h1 className="text-center text-xl font-medium">No Data Available</h1>
    );
  }

  return (
    <main className="container mx-auto mt-5 max-w-6xl px-4">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
        <Badge
          variant="outline"
          className="rounded-sm bg-green-100 text-green-600"
        >
          {data.eventCategory || "Uncategorized"}
        </Badge>

        <div className="flex items-center justify-between text-gray-600">
          <p>
            {format(new Date(data.startDate), "dd MMM yyyy")} -{" "}
            {format(new Date(data.endDate), "dd MMM yyyy")}
          </p>
          <p>Event Organizer - {data.user?.name || "Unknown"}</p>
        </div>

        <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
          <Image
            src={data.thumbnail || "/default-thumbnail.jpg"}
            alt={data.title || "Event Thumbnail"}
            fill
            className="object-cover"
          />
        </div>

        <p className="mt-4 text-gray-600">
          {data.description || "No description available."}
        </p>

        <div className="mt-4 text-gray-800">
          <p>
            <strong>Location:</strong>{" "}
            {data.location || "Location not specified"}
          </p>
          <p>
            <strong>avaliableSeats:</strong>{" "}
            {data.avaliableSeats || "Location not specified"}
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {data.price ? `Rp ${data.price.toFixed(3)}` : "Free"}
          </p>
        </div>
      </section>

      <section className="mt-6 leading-relaxed text-gray-700">
        {data.content ? (
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        ) : (
          <p>No additional content available for this event.</p>
        )}
      </section>
    </main>
  );
};

export default EventDetailPage;
