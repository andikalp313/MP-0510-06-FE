"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserSchema } from "../schemas";
import { useFormik } from "formik";
import { useAppSelector } from "@/redux/hooks";
import { useDispatch } from "react-redux";
import Image from "next/image";
import useUpdateProfile from "@/hooks/api/user/useUpdateUser";
import { updateUserAction } from "@/redux/slices/userslice";

export function ProfileForm() {
  const user = useAppSelector((state) => state.user);

  const { mutateAsync: updateUser, isPending } = useUpdateProfile(user.token);
  const [selectedImage, setSelectedImage] = useState(user.profilePicture || "");
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("exploretix-storage");
  
      if (storedUser) {
        
        const parsedUser = JSON.parse(storedUser);
  
        if (parsedUser.token && parsedUser.profilePicture) {
          dispatch(updateUserAction(parsedUser));
        } else {
          console.warn("Incomplete user data in localStorage.");
        }
      } else {
        console.warn("No user data found in localStorage.");
      }
    } catch (error) {
      console.error("Error loading user data from localStorage:", error);
    }
  }, [dispatch]);
  

  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      organizerName: user.organizerName || "",
      email: user.email || "",
      address: user.address || "",
      profilePicture: null,
    },
    validationSchema: updateUserSchema,
    onSubmit: async (values) => {
      try {
        const updatedUser = await updateUser(values);
        dispatch(updateUserAction(updatedUser));
        localStorage.setItem("exploretix-storage", JSON.stringify(updatedUser));
        setError("");
      } catch (error) {
        setError("Failed to update profile. Please try again.");
      }
    },
  });

  const onChangeProfilePicture = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("profilePicture", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div
      className={`p-4 grid gap-5 ${
        user.role === "ADMIN"
          ? "place-items-center" 
          : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      
      <div className={`${user.role === "ADMIN" ? "w-full max-w-md" : ""}`}>
        <form onSubmit={formik.handleSubmit} >
          <Card className="mb-6 bg-transparent">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={selectedImage || "/icon-cwo.png"} alt="Profile picture" />
                  <AvatarFallback>
                    <Image src="/icon-cwo.png" alt="default profile picture" width={96} height={96} />
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => profilePictureRef.current?.click()}
                >
                  Change Picture
                </Button>
                <input
                  type="file"
                  ref={profilePictureRef}
                  style={{ display: "none" }}
                  onChange={onChangeProfilePicture}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder={user.name}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="bg-transparent rounded border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organizerName">Organizer name</Label>
                  <Input
                    id="organizerName"
                    name="organizerName"
                    placeholder={user.organizerName}
                    onChange={formik.handleChange}
                    value={formik.values.organizerName}
                    className="bg-transparent rounded border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder={user.address}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    className="bg-transparent rounded border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={user.email}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="bg-transparent rounded border p-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Update Profile"}
            Update Profile
          </Button>
        </form>
      </div>

      
      {user.role !== "ADMIN" && (
        <form>
          <Card className="bg-transparent">
            <CardHeader>
              <CardTitle>Rewards Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="referralCode">Referral Code</Label>
                  <Input
                    id="referralCode"
                    value={user.referralCode}
                    readOnly
                    className="bg-transparent rounded border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="points">Points</Label>
                  <Input
                    id="points"
                    value={user.points}
                    readOnly
                    className="bg-transparent rounded border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pointExpiresDate">Points Expiry Date</Label>
                  <Input
                    id="pointExpiresDate"
                    value={
                      user.pointsExpiryDate
                        ? new Date(user.pointsExpiryDate).toLocaleDateString(
                            "en-GB"
                          )
                        : ""
                    }
                    readOnly
                   className="bg-transparent rounded border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountValue">Discount Value</Label>
                  <Input
                    id="discountValue"
                    value={user.discountValue}
                    readOnly
                    className="bg-transparent rounded border p-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountValueExpiresDate">
                    Discount Expiry Date
                  </Label>
                  <Input
                    id="discountValueExpiresDate"
                    value={
                      user.couponsExpiryDate
                        ? new Date(
                            user.couponsExpiryDate
                          ).toLocaleDateString("en-GB")
                        : ""
                    }
                    readOnly
                    className="bg-transparent rounded border p-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  );
}

