import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  organizerName: Yup.string().required("Oerganizer name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("addrees is ruquired"),
  password: Yup.string()
    .required("Password is required")
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1)
    .min(6),
  referredBy: Yup.string().nullable(),
});
