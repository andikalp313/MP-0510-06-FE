"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import useRegisteror from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import { useState } from "react";
import { RegisterOrganizerSchema } from "./schema";
import Link from "next/link";
import useRegisterOrganizer from "@/hooks/api/auth/useRegisterOrganizer";
import { Label } from "@/components/ui/label-ui";
import { Input } from "@/components/ui/input-ui";

const RegisterOrganizerPage = () => {
  const { mutateAsync: registerAdmin, isPending } = useRegisterOrganizer();
  const [role, setRole] = useState("ADMIN");
  const formik = useFormik({
    initialValues: {
      name: "",
      organizerName: "",
      email: "",
      address: "",
      role: "ADMIN",
      password: "",
    },
    validationSchema: RegisterOrganizerSchema,
    onSubmit: async (values) => {
      await registerAdmin(values);
    },
  });

  return (
    <main className="flex justify-center pt-5">
      <Card className="w-full md:w-[500px]">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name">person in charge</Label>
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
            <div className="grid w-full items-center gap-8">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="organizerName">Organizer name</Label>
                <Input
                  name="organizerName"
                  type="text"
                  placeholder="Your organizer name"
                  value={formik.values.organizerName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.organizerName &&
                !!formik.errors.organizerName ? (
                  <p className="text-xs text-red-500">
                    {formik.errors.organizerName}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
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
                  <p className="text-xs text-red-500">
                    {formik.errors.address}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
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
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
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
            <Button type="submit" className="mt-6 w-full" disabled={isPending}>
              {isPending ? "Loading..." : "Register"}
            </Button>
          </form>
          <Link href="/login">Do you have an account?</Link>
        </CardContent>
      </Card>
    </main>
  );
};

export default RegisterOrganizerPage;
