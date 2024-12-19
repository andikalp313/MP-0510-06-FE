import EventDetailPage from "@/features/events/EventDetailPage";
import React from "react";

const EventDetail = ({ params }: { params: { id: string } }) => {
  return <EventDetailPage eventId={Number(params.id)} />;
};

export default EventDetail;
