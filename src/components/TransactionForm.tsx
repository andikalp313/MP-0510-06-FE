"use client";

import React, { useState, FC, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, ChevronDown, Ticket, Gift, CreditCard } from "lucide-react";
import useCreateTransaction from "@/hooks/api/transaction/useTransaction";

interface Event {
  id: number;
  title: string;
}

interface TransactionFormProps {
  event?: Event;
  defaultEventId?: number;
  onClose: () => void;
}

const ticketTypes = [
  { value: "REGULER", label: "Regular", color: "from-blue-300 to-blue-500" },
  { value: "VIP", label: "VIP", color: "from-blue-400 to-blue-600" },
  { value: "VVIP", label: "VVIP", color: "from-blue-500 to-blue-700" },
];

export const TransactionForm: FC<TransactionFormProps> = ({
  event,
  defaultEventId = 0,
  onClose,
}) => {
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  const [eventId, setEventId] = useState(event?.id ?? defaultEventId);
  const [qty, setQty] = useState(1);
  const [ticketType, setTicketType] = useState<"REGULER" | "VIP" | "VVIP">(
    "REGULER",
  );
  const [isTicketDropdownOpen, setIsTicketDropdownOpen] = useState(false);
  const [pointsUsed, setPointsUsed] = useState<number>(0);
  const [voucherCode, setVoucherCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"BRIMO" | "GOPAY">(
    "BRIMO",
  );
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createTransaction({
      eventId,
      qty,
      ticketType,
      pointsUsed: pointsUsed > 0 ? pointsUsed : undefined,
      voucherCode: voucherCode || undefined,
      couponCode: couponCode || undefined,
      // Menambahkan metode pembayaran
    });

    // Tidak perlu lagi mengirim onSuccess di sini karena sudah ditangani di hook
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-xl bg-gradient-to-br from-blue-400 to-sky-600 p-0 text-white sm:max-w-[600px]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-center text-3xl font-bold text-white">
            <div>
              Explore<span className="text-sky-600">TiK</span>
            </div>
            {event ? `Get Tickets for ${event.title}` : "Create Transaction"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-6 p-6">
          <div className="space-y-4">
            {!event && (
              <div className="space-y-2">
                <Label htmlFor="eventId" className="text-white">
                  Event ID
                </Label>
                <Input
                  id="eventId"
                  type="number"
                  value={eventId}
                  onChange={(e) => setEventId(Number(e.target.value))}
                  className="w-full border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-white focus:ring-white"
                />
              </div>
            )}

            {/* Dropdown untuk Jenis Tiket */}
            <div className="space-y-2">
              <Label htmlFor="ticketType" className="text-white">
                Ticket Type
              </Label>
              <div className="relative">
                <button
                  type="button"
                  className="w-full rounded-md border border-white/30 bg-white/20 px-4 py-3 text-left shadow-sm transition-all duration-200 focus:border-white focus:outline-none focus:ring-2 focus:ring-white"
                  onClick={() => setIsTicketDropdownOpen(!isTicketDropdownOpen)}
                >
                  <div className="flex items-center justify-between">
                    <span>
                      {ticketTypes.find((t) => t.value === ticketType)?.label}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isTicketDropdownOpen ? "rotate-180 transform" : ""
                      }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {isTicketDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 mt-1 w-full overflow-hidden rounded-md bg-white shadow-lg"
                    >
                      {ticketTypes.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          className={`w-full px-4 py-3 text-left text-sky-600 transition-colors duration-200 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${
                            ticketType === type.value ? "bg-blue-100" : ""
                          }`}
                          onClick={() => {
                            setTicketType(
                              type.value as "REGULER" | "VIP" | "VVIP",
                            );
                            setIsTicketDropdownOpen(false);
                          }}
                        >
                          <div className="flex items-center">
                            <span
                              className={`mr-2 h-3 w-3 rounded-full bg-gradient-to-r ${type.color}`}
                            ></span>
                            {type.label}
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Input untuk Quantity */}
            <div className="space-y-2">
              <Label htmlFor="qty" className="text-white">
                Quantity
              </Label>
              <Input
                id="qty"
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                className="w-full border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-white focus:ring-white"
              />
            </div>
          </div>

          {/* Bagian Opsional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 rounded-lg bg-white/10 p-4 backdrop-blur-sm"
          >
            <div className="space-y-2">
              <Label
                htmlFor="pointsUsed"
                className="flex items-center text-white"
              >
                <Gift className="mr-2 h-4 w-4" />
                Points Used (optional)
              </Label>
              <Input
                id="pointsUsed"
                type="number"
                placeholder="0"
                value={pointsUsed}
                onChange={(e) => setPointsUsed(Number(e.target.value))}
                className="w-full border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-white focus:ring-white"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="voucherCode"
                className="flex items-center text-white"
              >
                <Ticket className="mr-2 h-4 w-4" />
                Voucher Code (optional)
              </Label>
              <Input
                id="voucherCode"
                type="text"
                placeholder="ABC123"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="w-full border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-white focus:ring-white"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="couponCode"
                className="flex items-center text-white"
              >
                <Gift className="mr-2 h-4 w-4" />
                Coupon Code (optional)
              </Label>
              <Input
                id="couponCode"
                type="text"
                placeholder="XYZ999"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="w-full border-white/30 bg-white/20 text-white placeholder-white/50 focus:border-white focus:ring-white"
              />
            </div>
          </motion.div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              type="button"
              className="border-blue-200 bg-white text-sky-600 hover:bg-blue-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-white text-sky-600 hover:bg-blue-50"
            >
              {isPending ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </motion.div>
              ) : (
                "Order Tickets"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
