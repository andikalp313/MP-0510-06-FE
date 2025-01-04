'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TransactionDetailModal } from './transactionDetailModal'

interface Transaction {
  id: number
  event: string
  customer: string
  amount: number
  status: 'Pending' | 'Approved' | 'Rejected'
  tickets: number
  paymentProof: string
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, event: 'Summer Music Festival', customer: 'John Doe', amount: 100, status: 'Pending', tickets: 2, paymentProof: '/payment-proof-1.jpg' },
    { id: 2, event: 'Tech Conference 2023', customer: 'Jane Smith', amount: 200, status: 'Approved', tickets: 1, paymentProof: '/payment-proof-2.jpg' },
    { id: 3, event: 'Food & Wine Expo', customer: 'Bob Johnson', amount: 50, status: 'Rejected', tickets: 1, paymentProof: '/payment-proof-3.jpg' },
  ])

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const handleApprove = (id: number) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((t) =>
        t.id === id ? { ...t, status: 'Approved' } : t
      )
    )
    // TODO: Send approval email to customer
    // TODO: Update available seats
  }

  const handleReject = (id: number) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((t) =>
        t.id === id ? { ...t, status: 'Rejected' } : t
      )
    )
    // TODO: Send rejection email to customer
    // TODO: Return points/vouchers/coupons if used
    // TODO: Restore available seats
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
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.event}</TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>${transaction.amount}</TableCell>
                <TableCell>{transaction.status}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => setSelectedTransaction(transaction)}>
                    View Details
                  </Button>
                  {transaction.status === 'Pending' && (
                    <>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleApprove(transaction.id)}>
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleReject(transaction.id)}>
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
            handleApprove(selectedTransaction.id)
            setSelectedTransaction(null)
          }}
          onReject={() => {
            handleReject(selectedTransaction.id)
            setSelectedTransaction(null)
          }}
        />
      )}
    </Card>
  )
}
