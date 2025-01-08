// src/types/transaction.ts

import { ReactNode } from "react";

export interface Transaction {
  tickets: number;
  paymentProof: any;
  voucher: any;
  event: any;
  totalPrice: ReactNode;
  quantity: ReactNode;
  expiresAt: string | number | Date;
  status: ReactNode;
  id: number;
  userId: number;
  eventId: number;
  ticketType: string;
  pointsUsed?: number;
  voucherCode?: string;
  couponCode?: string;
  createdAt: string;
  user: {
    points: ReactNode;
    name: string;
  };
}
