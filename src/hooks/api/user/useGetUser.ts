import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/User";
import { useQuery } from "@tanstack/react-query";

interface GetProfileQueries {
  id: number;
}

const useGetProfile = ({ id }: GetProfileQueries) => {
  return useQuery({
    queryKey: ["profiles", id], // Tambahkan ID ke queryKey untuk caching berbasis ID
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>(`/profiles/profile`); // Perbaiki endpoint URL agar sesuai dengan backend
      return data;
    },
    enabled: !!id, // Mengaktifkan query hanya jika ID valid
  });
};

export default useGetProfile;
