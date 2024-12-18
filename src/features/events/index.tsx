"use client";

import { useState } from "react";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import PaginationSection from "@/components/PaginationSection";
import { Input } from "@/components/ui/input";
import { useDebounceValue } from "usehooks-ts";
import EventCard from "../events/components/Eventcard";
import Navigation from "./components/Navgiation"; // Import Navigation

const EventList = () => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const [debouncedValue] = useDebounceValue(search, 500);
  const { data, isLoading } = useGetEvents({ page, search: debouncedValue });

  const onChangePage = (page: number) => {
    setPage(page);
  };

  const handleSearch = (category: string) => {
    setPage(1); // Reset to page 1 for new search
    setSearch(category);
  };

  return (
    <main className="">
      <Navigation onSearch={handleSearch} /> {/* Add Navigation */}
      <Input
        className="mx-auto my-2 max-w-xl"
        placeholder="Search events..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {isLoading && (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="text-center">Processing...</h1>
        </div>
      )}
      {!data?.data.length ? (
        <div className="flex h-[30vh] items-center justify-center">
          <h1 className="text-center">No Data</h1>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-7 md:grid-cols-3 mx-24 ">
            {data.data.map((event, index) => {
              return <EventCard key={index} event={event} />;
            })}
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
