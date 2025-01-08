"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "./schemas";

const ForgotPasswordPage = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values) => {
      await forgotPassword(values);
    },
  });

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg-login2.png')" }}
    >
      <main className="flex justify-center pt-20">
        <Card className="md:w-[500px]  bg-white/70 p-6 shadow-lg">
          <CardHeader>
            <CardTitle>Forgot password</CardTitle>
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
              </div>

              <Button
                type="submit"
                className="mt-4 w-full"
                disabled={isPending}
              >
                {isPending ? "loading..." : "submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ForgotPasswordPage;
