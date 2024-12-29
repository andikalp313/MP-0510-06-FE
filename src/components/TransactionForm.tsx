"use client";

import React, { useState, FC, FormEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCreateTransaction from "@/hooks/api/transaction/useTransaction";
// -> Hook yang memanggil POST /transactions/create
//    Pastikan useCreateTransaction menambahkan header Authorization jika butuh token

// Misal Anda punya interface 'Event' atau minimal memerlukan 'eventId'
interface Event {
  id: number;
  title: string;
  // dsb.
}

interface TransactionFormProps {
  event?: Event; // optional, jika Anda sudah punya data event
  defaultEventId?: number; // kalau mau input eventId manual
  onClose: () => void; // menutup form, jika Anda pakai modal
}

export const TransactionForm: FC<TransactionFormProps> = ({
  event,
  defaultEventId = 0,
  onClose,
}) => {
  // Gunakan custom hook
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  // State
  // - eventId didapat dari event?.id atau defaultEventId
  const [eventId, setEventId] = useState(event?.id ?? defaultEventId);
  const [qty, setQty] = useState(1);
  const [ticketType, setTicketType] = useState<"REGULER" | "VIP" | "VVIP">(
    "REGULER",
  );

  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [paymentProof, setPaymentProof] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createTransaction(
      {
        eventId,
        qty,
        ticketType,
        pointsUsed: pointsUsed > 0 ? pointsUsed : undefined,
        voucherCode: voucherCode || undefined,
        couponCode: couponCode || undefined,
        paymentProof: paymentProof || undefined,
      },
      {
        onSuccess: () => {
          // Tutup form setelah sukses
          onClose();
        },
      },
    );
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {event ? `Buy Ticket for ${event.title}` : "Create Transaction"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Jika event belum diketahui, tampilkan field eventId */}
          {!event && (
            <div>
              <Label>Event ID</Label>
              <Input
                type="number"
                value={eventId}
                onChange={(e) => setEventId(Number(e.target.value))}
              />
            </div>
          )}

          <div>
            <Label>Ticket Type</Label>
            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value as any)}
              className="input"
            >
              <option value="REGULER">REGULER</option>
              <option value="VIP">VIP</option>
              <option value="VVIP">VVIP</option>
            </select>
          </div>

          <div>
            <Label>Quantity</Label>
            <Input
              type="number"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Points Used (optional)</Label>
            <Input
              type="number"
              placeholder="0"
              value={pointsUsed}
              onChange={(e) => setPointsUsed(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Voucher Code (optional)</Label>
            <Input
              type="text"
              placeholder="ABC123"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
          </div>

          <div>
            <Label>Coupon Code (optional)</Label>
            <Input
              type="text"
              placeholder="XYZ999"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
          </div>

          <div>
            <Label>Payment Proof (optional)</Label>
            <Input
              type="text"
              placeholder="URL or base64"
              value={paymentProof}
              onChange={(e) => setPaymentProof(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Processing..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
