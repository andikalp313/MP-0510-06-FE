import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

interface GetProfileQueries {
  id: number;
}

const useGetProfile = ({ id }: GetProfileQueries) => {
  return useQuery({
    queryKey: ["profiles", id], 
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/profiles/profile`); 
    },
    enabled: !!id, 
  });
};

export default useGetProfile;
