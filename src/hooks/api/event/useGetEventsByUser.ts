"use client";
import useAxios from "@/hooks/api/useAxios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

const useGetEventsByUser = () => {
  const { axiosInstance } = useAxios();

  return useQuery({
    queryKey: ["eventsByUser"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event[]>("/events/byuser");
      return data || [];
    },
  });
};

export default useGetEventsByUser;
