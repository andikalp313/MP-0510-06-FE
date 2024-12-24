import * as Yup from "yup";
import YupPassword from "yup-password";

YupPassword(Yup);

export const createVoucherSchema = Yup.object().shape({
  voucherCode: Yup.string().required("Voucher Code is required"),
  qty: Yup.number()
    .required("Quantity is required")
    .positive("Must be greater than zero"),
  value: Yup.number()
    .required("Value is required")
    .positive("Must be greater than zero"),
  expDate: Yup.date()
    .nullable()
    .required("Expired date is required")
    .min(new Date(), "Expired date must be in the future"),
  eventId: Yup.string().required("Event must be selected"),
});
