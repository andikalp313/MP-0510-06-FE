"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import { useState } from "react";
import { RegisterSchema } from "./schema";

const RegisterUserPage = () => {
  const { mutateAsync: register, isPending } = useRegister();
  const [role, setRole] = useState("USER");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address:"",
      password: "",
      role: "USER",
      referredBy: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });
  return (
    <main className="flex justify-center pt-20">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.name && !!formik.errors.name ? (
                  <p className="text-xs text-red-500">{formik.errors.name}</p>
                ) : null}
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.email && !!formik.errors.email ? (
                  <p className="text-xs text-red-500">{formik.errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="address">Address</Label>
                <Input
                  name="address"
                  type="text"
                  placeholder="Your Address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.name && !!formik.errors.address ? (
                  <p className="text-xs text-red-500">{formik.errors.address}</p>
                ) : null}
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <select
                  name="role"
                  value={role} 
                  onChange={(e) => {
                    const selectedRole = e.target.value;
                    setRole(selectedRole); 
                    formik.setFieldValue("role", selectedRole); 
                  }}
                  onBlur={formik.handleBlur}
                  className="rounded border p-2"
                >
                  <option value="USER">User</option>
                </select>
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  type="password"
                  placeholder="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.password && !!formik.errors.password ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
            </div>
            {role === "USER" && (
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="referredBy">
                    Do you have a referral code?
                  </Label>
                  <Input
                    name="referredBy"
                    type="text"
                    placeholder="Referral code"
                    value={formik.values.referredBy}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>
            )}
            <Button type="submit" className="mt-4 w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterUserPage;
