import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

interface GetEventsByUserParams {
  userId: number;
}

const useGetEventsByUserId = ({ userId }: GetEventsByUserParams) => {
  return useQuery({
    queryKey: ["events", userId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event[]>(
        `/events/user/${userId}`,
      );
      return data;
    },
    enabled: !!userId,
  });
};

export default useGetEventsByUserId;
