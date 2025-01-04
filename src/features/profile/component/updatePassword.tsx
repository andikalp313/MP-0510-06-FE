// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import React, { useState } from "react";

// const UpdatePasswordForm = () => {
//   const [passwordChangeMessage, setPasswordChangeMessage] = useState<string | null>(null);
//   const [formValues, setFormValues] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
//   };

//   const handlePasswordChange = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const { currentPassword, newPassword, confirmPassword } = formValues;

//     if (!currentPassword || !newPassword || !confirmPassword) {
//       setPasswordChangeMessage("All fields are required.");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       setPasswordChangeMessage("New password and confirmation do not match.");
//       return;
//     }

    
//     setTimeout(() => {
//       setPasswordChangeMessage("Password changed successfully!");
//       setFormValues({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     }, 1000); 
//   };

//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Change Password</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handlePasswordChange} className="space-y-4">
//             <div className="grid gap-4 sm:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="currentPassword">Current Password</Label>
//                 <Input
//                   id="currentPassword"
//                   name="currentPassword"
//                   type="password"
//                   value={formValues.currentPassword}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="newPassword">New Password</Label>
//                 <Input
//                   id="newPassword"
//                   name="newPassword"
//                   type="password"
//                   value={formValues.newPassword}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2 sm:col-span-2">
//                 <Label htmlFor="confirmPassword">Confirm New Password</Label>
//                 <Input
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type="password"
//                   value={formValues.confirmPassword}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="flex justify-end">
//               <Button type="submit">Change Password</Button>
//             </div>
//           </form>
//           {passwordChangeMessage && (
//             <p
//               className={`mt-4 text-center ${
//                 passwordChangeMessage.includes("successfully")
//                   ? "text-green-600"
//                   : "text-red-600"
//               }`}
//             >
//               {passwordChangeMessage}
//             </p>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UpdatePasswordForm;
