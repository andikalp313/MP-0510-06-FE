export interface Voucher {
  id: number;
  voucherCode: string;
  qty: number;
  usedQty: number;
  value: number;
  expDate: Date;
  event: {
    id: number;
    title: string; // Atau atribut lain sesuai model Event
  };
}
