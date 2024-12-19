"use client";

import { useState, useMemo } from "react";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import EventCard from "../events/components/Eventcard";
import Navigation from "./components/Navgiation";

const EventList = () => {
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<string>("");

  console.log(city);

  // Use useDebounceValue to debounce the search input
  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isLoading, error } = useGetEvents({
    page,
    search: debouncedValue,
    category: category,
    location: city,
  });

  const onChangePage = (page: number) => {
    setPage(page);
  };
  const handleCity = (searchTerm: string) => {
    setPage(1); // Reset to page 1 for a new search
    setCity(searchTerm);
  };
  const handleCategory = (category: string) => {
    setPage(1); // Reset to page 1 for a new search
    setCategory(category);
  };

  const eventCards = useMemo(() => {
    return data?.data?.map((event, index) => (
      <EventCard key={event.id} event={event} />
    ));
  }, [data]);

  if (error) {
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <h1 className="text-center">
          Failed to load events. Please try again later.
        </h1>
      </div>
    );
  }

  return (
    <main>
      <Navigation onCity={handleCity} onCategory={handleCategory} />
      <Input
        className="mx-auto my-2 max-w-xl"
        placeholder={`Search events...`}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {isLoading && (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="text-center">Processing...</h1>
        </div>
      )}
      {!data?.data?.length ? (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="text-center">No Data</h1>
        </div>
      ) : (
        <>
          <div className="mx-24 mt-8 grid gap-7 md:grid-cols-3">
            {eventCards}
          </div>
          <PaginationSection
            onChangePage={onChangePage}
            page={page}
            take={data.meta.take}
            total={data.meta.total}
          />
        </>
      )}
    </main>
  );
};

export default EventList;
