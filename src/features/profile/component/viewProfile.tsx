// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import useGetProfile from "@/hooks/api/user/useGetUser";
// import { useFormik } from "formik";
// import { Upload } from "lucide-react";
// import Image from "next/image";
// import * as Yup from "yup";

// const UserProfilePage = () => {
//   const userId = 1; // Replace with dynamic user ID
//   const { data: userProfile, isLoading, error } = useGetProfile({ id: userId });

//   const formik = useFormik({
//     initialValues: {
//       name: userProfile?.name || "",
//       email: userProfile?.email || "",
//       address: userProfile?.address || "",
//     },
//     validationSchema: Yup.object({
//       name: Yup.string().required("Name is required"),
//       email: Yup.string().email("Invalid email format").required("Email is required"),
//       address: Yup.string(),
//     }),
//     enableReinitialize: true,
//     onSubmit: async (values) => {
//       try {
//         console.log("Submitting updated values:", values);
//         // Replace with API call
//       } catch (error) {
//         console.error("Error updating profile:", error);
//       }
//     },
//   });

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       console.log("Selected file:", file);
//       // Implement file upload logic
//     }
//   };

//   if (isLoading) return <p>Loading profile...</p>;
//   if (error) return <p>Error loading profile: {String(error)}</p>;

//   return (
//     <div className="grid gap-10 md:grid-cols-2">
//       <div>
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle className="mb-4 text-center text-lg font-semibold">
//               Profile Information
//             </CardTitle>
//             <CardDescription className="text-center">
//               Manage your profile information
//             </CardDescription>
//           </CardHeader>
//           <form onSubmit={formik.handleSubmit}>
//             <CardContent className="space-y-6">
//               <div className="flex justify-center">
//                 <div className="relative h-32 w-32 overflow-hidden rounded-full">
//                   {userProfile?.profilePicture ? (
//                     <Image
//                       src={userProfile.profilePicture}
//                       alt="Profile picture"
//                       fill
//                       style={{ objectFit: "cover" }}
//                     />
//                   ) : (
//                     <div className="flex h-full w-full items-center justify-center bg-gray-200">
//                       <Upload className="h-8 w-8 text-gray-400" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <Input
//                   id="profilePicture"
//                   name="profilePicture"
//                   type="file"
//                   accept="image/*"
//                   className="hidden"
//                   onChange={handleFileChange}
//                 />
//                 <Label
//                   htmlFor="profilePicture"
//                   className="inline-flex h-10 cursor-pointer items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
//                 >
//                   Upload Photo
//                 </Label>
//               </div>
//               <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formik.values.name}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.touched.name && formik.errors.name && (
//                     <p className="text-sm text-red-600">{formik.errors.name}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.touched.email && formik.errors.email && (
//                     <p className="text-sm text-red-600">{formik.errors.email}</p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="address">Address</Label>
//                   <Textarea
//                     id="address"
//                     name="address"
//                     value={formik.values.address}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.touched.address && formik.errors.address && (
//                     <p className="text-sm text-red-600">{formik.errors.address}</p>
//                   )}
//                 </div>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <Button type="submit" disabled={formik.isSubmitting}>
//                 {formik.isSubmitting ? "Updating..." : "Update Profile"}
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>
//       </div>
//       {/* Rewards Section */}
//       <div>
//         <Card>
//           {/* Rewards card remains unchanged */}
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;
