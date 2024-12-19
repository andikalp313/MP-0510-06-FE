import { axiosInstamce } from "@/lib/axios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

const useGetEvent = (id: number) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await axiosInstamce.get<Event>(`/events/${id}`);
      return data;
    },
  });
};

export default useGetEvent;
