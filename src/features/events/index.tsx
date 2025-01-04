"use client";

import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { Event } from "@/types/event";
import { motion } from "framer-motion";
import { Calendar, Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import EventCard from "../events/components/Eventcard";
import Navigation from "./components/Navgiation"; // Pastikan nama file benar

const EventListPage = () => {
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
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
        className="overflow-hidden rounded-xl bg-white shadow-md"
      >
        <EventCard event={event} />
      </motion.div>
    ));
  }, [data]);

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-sky-100 to-sky-200">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-4 max-w-md rounded-lg bg-white p-8 text-center shadow-lg"
        >
          <h1 className="text-3xl font-bold text-red-600">Ups!</h1>
          <p className="mt-4 text-gray-700">
            Gagal memuat acara. Silakan coba lagi nanti.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-sky-50 to-sky-100">
      {/* Navigation */}
      <Navigation onCity={handleCity} onCategory={handleCategory} />

      {/* Main Content */}
      <main className="container mx-auto flex-grow px-4 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto mb-8 max-w-xl"
        >
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-sky-400" />
          <Input
            className="w-full rounded-full border-2 border-sky-300 py-3 pl-12 pr-4 text-sm text-gray-800 placeholder-gray-500 transition-colors duration-300 focus:border-sky-500 focus:ring-0"
            placeholder="Cari acara..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            aria-label="Search events"
          />
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-64 flex-col items-center justify-center"
          >
            <Loader2 className="h-10 w-10 animate-spin text-sky-500" />
            <span className="mt-4 text-lg font-medium text-sky-600">
              Memuat acara...
            </span>
          </motion.div>
        ) : !data?.data?.length ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-64 flex-col items-center justify-center text-center"
          >
            <Calendar className="mb-4 h-14 w-14 text-sky-500" />
            <p className="text-2xl font-medium text-sky-600">
              Tidak ada acara ditemukan
            </p>
          </motion.div>
        ) : (
          <>
            {/* Event Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {eventCards}
            </motion.div>

            {/* Pagination */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 flex justify-center"
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
      </main>
    </div>
  );
};

export default EventListPage;
