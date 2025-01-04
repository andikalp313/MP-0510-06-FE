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
import { Loader2, ChevronDown, Ticket, Gift, Plus, Minus } from "lucide-react";
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
  { value: "REGULER", label: "Regular", color: "from-sky-400 to-sky-600" },
  { value: "VIP", label: "VIP", color: "from-sky-500 to-sky-700" },
  { value: "VVIP", label: "VVIP", color: "from-sky-600 to-sky-800" },
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
    });

    // Tidak perlu lagi mengirim onSuccess di sini karena sudah ditangani di hook
  };

  const incrementQty = () => setQty((prev) => prev + 1);
  const decrementQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const incrementPoints = () => setPointsUsed((prev) => prev + 10);
  const decrementPoints = () =>
    setPointsUsed((prev) => (prev >= 10 ? prev - 10 : 0));

  return (
    <Dialog open onOpenChange={onClose}>
      <AnimatePresence>
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 p-0 text-white shadow-lg sm:max-w-md"
          >
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-center text-3xl font-bold">
                <div>
                  Explore<span className="text-white">TiK</span>
                </div>
                {event
                  ? `Get Tickets for ${event.title}`
                  : "Create Transaction"}
              </DialogTitle>
            </DialogHeader>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 space-y-6 rounded-b-2xl bg-white/10 p-6 backdrop-blur-md"
            >
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
                      className="w-full border border-white/30 bg-transparent text-white placeholder-white/50 focus:border-sky-300 focus:ring-sky-300"
                      required
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
                      className="flex w-full items-center justify-between rounded-md border border-white/30 bg-white/20 px-4 py-3 text-left shadow-sm transition-all duration-200 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300"
                      onClick={() =>
                        setIsTicketDropdownOpen(!isTicketDropdownOpen)
                      }
                    >
                      <span className="text-white">
                        {ticketTypes.find((t) => t.value === ticketType)?.label}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-200 ${
                          isTicketDropdownOpen ? "rotate-180" : ""
                        } text-white`}
                      />
                    </button>
                    <AnimatePresence>
                      {isTicketDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
                        >
                          {ticketTypes.map((type) => (
                            <button
                              key={type.value}
                              type="button"
                              className={`w-full px-4 py-3 text-left text-sky-600 transition-colors duration-200 hover:bg-sky-100 focus:bg-sky-100 focus:outline-none ${
                                ticketType === type.value ? "bg-sky-200" : ""
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

                {/* Input untuk Quantity dengan Increment/Decrement */}
                <div className="space-y-2">
                  <Label htmlFor="qty" className="text-white">
                    Quantity
                  </Label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={decrementQty}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 transition-colors duration-200 hover:bg-sky-400"
                    >
                      <Minus className="h-4 w-4 text-white" />
                    </button>
                    <Input
                      id="qty"
                      type="number"
                      value={qty}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 1) setQty(value);
                      }}
                      className="w-16 rounded border border-white/30 bg-transparent text-center text-white placeholder-white/50 focus:border-sky-300 focus:ring-sky-300"
                      min={1}
                      required
                    />
                    <button
                      type="button"
                      onClick={incrementQty}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 transition-colors duration-200 hover:bg-sky-400"
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bagian Opsional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4 rounded-lg bg-white/20 p-4 backdrop-blur-sm"
              >
                {/* Points Used with Increment/Decrement */}
                <div className="space-y-2">
                  <Label
                    htmlFor="pointsUsed"
                    className="flex items-center text-white"
                  >
                    <Gift className="mr-2 h-5 w-5" />
                    Points Used (optional)
                  </Label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={decrementPoints}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 transition-colors duration-200 hover:bg-sky-400"
                    >
                      <Minus className="h-4 w-4 text-white" />
                    </button>
                    <Input
                      id="pointsUsed"
                      type="number"
                      placeholder="0"
                      value={pointsUsed}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value >= 0) setPointsUsed(value);
                      }}
                      className="w-20 rounded border border-white/30 bg-transparent text-center text-white placeholder-white/50 focus:border-sky-300 focus:ring-sky-300"
                      min={0}
                    />
                    <button
                      type="button"
                      onClick={incrementPoints}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 transition-colors duration-200 hover:bg-sky-400"
                    >
                      <Plus className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Voucher Code */}
                <div className="space-y-2">
                  <Label
                    htmlFor="voucherCode"
                    className="flex items-center text-white"
                  >
                    <Ticket className="mr-2 h-5 w-5" />
                    Voucher Code (optional)
                  </Label>
                  <Input
                    id="voucherCode"
                    type="text"
                    placeholder="ABC123"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    className="w-full rounded border border-white/30 bg-transparent text-white placeholder-white/50 focus:border-sky-300 focus:ring-sky-300"
                  />
                </div>

                {/* Coupon Code */}
                <div className="space-y-2">
                  <Label
                    htmlFor="couponCode"
                    className="flex items-center text-white"
                  >
                    <Gift className="mr-2 h-5 w-5" />
                    Coupon Code (optional)
                  </Label>
                  <Input
                    id="couponCode"
                    type="text"
                    placeholder="XYZ999"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full rounded border border-white/30 bg-transparent text-white placeholder-white/50 focus:border-sky-300 focus:ring-sky-300"
                  />
                </div>
              </motion.div>

              {/* Tombol Aksi */}
              <div className="flex justify-end gap-4 pt-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  type="button"
                  className="border-sky-300 bg-transparent text-white transition-colors duration-200 hover:border-sky-500 hover:bg-sky-500"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className={`flex items-center justify-center bg-sky-500 text-white transition-colors duration-200 hover:bg-sky-600 ${
                    isPending ? "cursor-not-allowed" : ""
                  }`}
                >
                  {isPending ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center"
                    >
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </motion.div>
                  ) : (
                    "Order Tickets"
                  )}
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </DialogContent>
      </AnimatePresence>
    </Dialog>
  );
};
