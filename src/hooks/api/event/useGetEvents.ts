import { axiosInstamce } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetBlogsQuery extends PaginationQueries {
  search?: string;
  location?: string;
  category?: string;
}

const useGetEvents = (queries: GetBlogsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstamce.get<PageableResponse<Event>>(
        "/events",
        { params: queries },
      );
      return data;
    },
  });
};

export default useGetEvents;
