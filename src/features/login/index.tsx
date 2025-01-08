"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { LoginSchema } from "./schema";
import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/api/auth/useLogin";
import Link from "next/link";
import Footer from "@/components/Footer";

const LoginPage = () => {
  const { mutateAsync: login, isPending } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <div
      className="flex min-h-screen flex-col justify-between bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-login2.png')" }}
    >
      <main className="flex justify-center pt-20">
        <Card className="md:w-[500px]  bg-white/70 p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@mail.com"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                     className="bg-transparent rounded border p-2"
                  />
                  {!!formik.touched.email && !!formik.errors.email ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                     className="bg-transparent rounded border p-2"
                  />
                  {!!formik.touched.password && !!formik.errors.password ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>
              </div>

              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={isPending}
              >
                {isPending ? "loading..." : "Login"}
              </Button>
              <div className="mt-4 flex justify-between text-xs">
                <Link href="/register" className="text-sky-600 hover:underline">
                  Register Here
                </Link>
                <Link
                  href="/forgot-password"
                  className="text-sky-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
