import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/axios';
import { Transaction } from '@/types/transaction';

interface GetTransactionsByUserParams {
  userId: number;
}

const useGetTransactionsByUser = ({ userId }: GetTransactionsByUserParams) => {
  return useQuery({
    queryKey: ['transactions', userId],
    queryFn: async () => {

      const { data } = await axiosInstance.get<Transaction[]>(`/transactions/by-user/${userId}`);
      return data;
    },
    enabled: !!userId, // Hanya dijalankan jika userId ada
  });
};

export default useGetTransactionsByUser;
