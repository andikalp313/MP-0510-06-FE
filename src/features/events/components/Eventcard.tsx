import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Event } from "@/types/event";
import Image from "next/image";
import { FC } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { motion } from "framer-motion";

interface EventCardProps {
  event: Event;
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const cardVariants = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <Link href={`/events/${event.id}`} passHref>
      <motion.a
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="block"
      >
        <Card className="overflow-hidden rounded-3xl bg-gradient-to-tr from-sky-50 to-white transition-transform duration-300">
          <CardHeader className="relative h-56 w-full">
            <Image
              src={event.thumbnail}
              alt={event.title}
              layout="fill"
              objectFit="cover"
              className="transform transition-transform duration-500 ease-in-out hover:scale-110"
              placeholder="blur"
              blurDataURL="/placeholder.png" // Pastikan Anda memiliki placeholder
            />
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
          </CardHeader>
          <CardContent className="p-6">
            <h2 className="mb-2 line-clamp-2 text-xl font-semibold text-sky-700">
              {event.title}
            </h2>
            <p className="mb-4 line-clamp-3 text-gray-600">
              {event.description}
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-auto flex items-center justify-between"
            >
              <span className="text-sm font-medium text-sky-600">
                Selengkapnya
              </span>
              <svg
                className="h-5 w-5 transform text-sky-600 transition-transform duration-300 hover:translate-x-1"
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
            </motion.div>
          </CardContent>
        </Card>
      </motion.a>
    </Link>
  );
};

export default EventCard;
