import * as Yup from "yup";
import YupPassword from "yup-password";
import ChangePasswordForm from "./component/updatePassword";

YupPassword(Yup);


export const updateUserSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  organizerName: Yup.string().required("organizer name is required"),
  email: Yup.string().required("Email is required").email(),
  address: Yup.string().required("address is required"),
});


export const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current Password is required")
    .min(6)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(6)
    .minLowercase(1)
    .minUppercase(1)
    .minNumbers(1),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "New Password must match")
    .required("Confirm New Password is required"),
});


function ParentComponent() {
  const user = { id: 123 };

  if (!user?.id) {
    return <div>Loading...</div>; 
  }

  const token = "someToken"; 
  return <ChangePasswordForm token={token} />;
}
