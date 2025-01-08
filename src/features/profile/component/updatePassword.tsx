"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { useState } from "react";
import { changePasswordSchema } from "../schemas"; 
import useChangePassword from "@/hooks/api/user/useChangePassword";

function ChangePasswordForm({ token }: { token: string }) {
  const { mutate: changePassword } = useChangePassword(token); 
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      userId: 0,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        changePassword(
          {
            userId: values.userId,
            oldPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmNewPassword,
          },
          {
            onSuccess: () => {
              formik.resetForm();
              setError("");
            },
            onError: (err: any) => {
              setError(err?.response?.data?.message || "Failed to change password. Please try again.");
            },
          }
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Card className="mb-12 w-full md:w-[500px]" >
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-transparent rounded border p-2"
              required
            />
            {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.currentPassword}
              </div>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-transparent rounded border p-2"
              required
            />
            {formik.touched.newPassword && formik.errors.newPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
            <Input
              id="confirmNewPassword"
              type="password"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="bg-transparent rounded border p-2"
              required
            />
            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
              <div className="text-sm text-red-600">
                {formik.errors.confirmNewPassword}
              </div>
            ) : null}
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Changing..." : "Change Password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ChangePasswordForm;
