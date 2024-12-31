import { axiosInstance } from "@/lib/axios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

const useGetTransaction = (id: number) => {
  return useQuery({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction>(
        `/transactions/${id}`,
      );
      return data;
    },
  });
};

export default useGetTransaction;
