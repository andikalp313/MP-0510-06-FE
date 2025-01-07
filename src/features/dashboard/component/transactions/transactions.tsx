'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TransactionDetailModal } from './transactionDetailModal';
import RoleGuard from '@/hoc/roleGuard';
import { updateUserAction } from '@/redux/slices/userslice';
import { useAppSelector } from '@/redux/hooks';
import { useDispatch } from 'react-redux';
import useGetTransactionsByUser from '@/hooks/api/transaction/useGetTransactions';

interface LocalTransaction {
  id: number;
  event: string;
  userId: number;
  totalPrice: number;
  status: 'Pending' | 'Approved' | 'Rejected'; 
  tickets: number;
  paymentProof: string;
}

function TransactionsPage() {
  const user = useAppSelector((state) => state.user);
  const userId= user.id;
  const dispatch = useDispatch();

  const { data: transactions = [], isLoading, isError } = useGetTransactionsByUser({ userId: user.id });
  const [localTransactions, setLocalTransactions] = useState<LocalTransaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<LocalTransaction | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('exploretix-storage');
    if (storedUser) {
      dispatch(updateUserAction(JSON.parse(storedUser)));
    }

    const transformedTransactions = transactions.map((transaction) => ({
      ...transaction,
      userId: transaction.userId, 
      tickets: transaction.tickets || 0, 
      totalPrice: typeof transaction.totalPrice === 'number' ? transaction.totalPrice : parseFloat(transaction.totalPrice as string || '0'), // Konversi totalPrice menjadi number
      status: transaction.status === 'Pending' || transaction.status === 'Approved' || transaction.status === 'Rejected' ? transaction.status : 'Pending', // Set status default jika tidak sesuai
    }));
  }, [transactions, dispatch]);

  // const handleApprove = (id: number) => {
  //   setLocalTransactions((prev) =>
  //     prev.map((transaction) =>
  //       transaction.id === id ? { ...transaction, status: 'Approved' } : transaction
  //     )
  //   );
  // };

  // const handleReject = (id: number) => {
  //   setLocalTransactions((prev) =>
  //     prev.map((transaction) =>
  //       transaction.id === id ? { ...transaction, status: 'Rejected' } : transaction
  //     )
  //   );
  // };

  if (isLoading) {
    return <p>Loading transactions...</p>;
  }

  if (isError) {
    return <p>Failed to load transactions. Please try again.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction Management</CardTitle>
        <CardDescription>View and manage customer transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.event}</TableCell>
                <TableCell>{transaction.userId}</TableCell>
                <TableCell>${transaction.totalPrice}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mr-2"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    View Details
                  </Button>
                  {transaction.status === 'Pending' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mr-2"
                        // onClick={() => handleApprove(transaction.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleReject(transaction.id)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onApprove={() => {
            // handleApprove(selectedTransaction.id);
            setSelectedTransaction(null);
          }}
          onReject={() => {
            // handleReject(selectedTransaction.id);
            setSelectedTransaction(null);
          }}
        />
      )}
    </Card>
  );
}

export default RoleGuard(TransactionsPage);
