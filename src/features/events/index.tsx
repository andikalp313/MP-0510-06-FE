"use client";

import { useState, useMemo } from "react";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import EventCard from "../events/components/Eventcard";
import Navigation from "./components/Navgiation";
import Footer from "@/components/Footer";
import { Event } from "@/types/event";
import { Loader2, Search, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const EventList = () => {
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isLoading, error } = useGetEvents({
    page,
    search: debouncedValue,
    category: category,
    location: city,
  });

  const onChangePage = (page: number) => setPage(page);
  const handleCity = (searchTerm: string) => {
    setPage(1);
    setCity(searchTerm);
  };
  const handleCategory = (category: string) => {
    setPage(1);
    setCategory(category);
  };

  const eventCards = useMemo(() => {
    return data?.data?.map((event: Event, index: number) => (
      <motion.div
        key={event.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <EventCard event={event} />
      </motion.div>
    ));
  }, [data]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-red-50 to-red-100">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="rounded-lg bg-white p-8 shadow-lg"
        >
          <h1 className="text-2xl font-bold text-red-600">Oops!</h1>
          <p className="mt-2 text-gray-600">
            Failed to load events. Please try again later.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navigation onCity={handleCity} onCategory={handleCategory} />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-8 max-w-xl"
        >
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            className="rounded-full border-2 border-sky-200 py-2 pl-10 pr-4 transition-colors duration-300 focus:border-sky-400"
            placeholder="Search events..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </motion.div>
        {isLoading ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-64 items-center justify-center"
          >
            <Loader2 className="h-8 w-8 animate-spin text-sky-400" />
            <span className="ml-2 text-lg font-medium text-sky-500">
              Loading events...
            </span>
          </motion.div>
        ) : !data?.data?.length ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-64 items-center justify-center"
          >
            <Calendar className="mr-4 h-12 w-12 text-sky-400" />
            <p className="text-center text-xl font-medium text-sky-500">
              No events found
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {eventCards}
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <PaginationSection
                onChangePage={onChangePage}
                page={page}
                take={data.meta.take}
                total={data.meta.total}
              />
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
};

export default EventList;
