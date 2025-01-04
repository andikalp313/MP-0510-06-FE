'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

interface TransactionDetailModalProps {
  transaction: {
    id: number
    event: string
    customer: string
    amount: number
    status: string
    tickets: number
    paymentProof: string
  }
  onClose: () => void
  onApprove: () => void
  onReject: () => void
}

export function TransactionDetailModal({ transaction, onClose, onApprove, onReject }: TransactionDetailModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>Review the transaction details before approving or rejecting.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event" className="text-right">
              Event
            </Label>
            <div id="event" className="col-span-3">
              {transaction.event}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customer" className="text-right">
              Customer
            </Label>
            <div id="customer" className="col-span-3">
              {transaction.customer}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <div id="amount" className="col-span-3">
              ${transaction.amount}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tickets" className="text-right">
              Tickets
            </Label>
            <div id="tickets" className="col-span-3">
              {transaction.tickets}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <div id="status" className="col-span-3">
              {transaction.status}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="paymentProof" className="text-right">
              Payment Proof
            </Label>
            <div id="paymentProof" className="col-span-3">
              <Image src={transaction.paymentProof} alt="Payment Proof" width={200} height={200} className="rounded-md" />
            </div>
          </div>
        </div>
        <DialogFooter>
          {transaction.status === 'Pending' && (
            <>
              <Button variant="outline" onClick={onReject}>
                Reject
              </Button>
              <Button onClick={onApprove}>Approve</Button>
            </>
          )}
          {transaction.status !== 'Pending' && (
            <Button onClick={onClose}>Close</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

