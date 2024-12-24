"use client";

import InputField from "@/components/InputField";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetEventsByUser from "@/hooks/api/event/useGetEventsByUser";
import useCreateVoucher from "@/hooks/api/voucher/useCreateVoucher";
import { useFormik } from "formik";
// import { DateInput } from "@/components/DateInput";
import { createVoucherSchema } from "./schema";
import { Input } from "@/components/ui/input";

const CreateVoucherPage = () => {
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher();
  const { data: events } = useGetEventsByUser();

  const formik = useFormik({
    initialValues: {
      voucherCode: "",
      qty: 0,
      value: 0,
      expDate: "",
      eventId: "",
    },
    validationSchema: createVoucherSchema,
    onSubmit: async (values) => {
      const payload = { ...values, eventId: Number(values.eventId) };
      await createVoucher(payload);
    },
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-5 text-2xl font-bold">Create Voucher</h1>
      <form className="max-w-md space-y-4" onSubmit={formik.handleSubmit}>
        {/* Voucher Code Field */}
        <div>
          <InputField
            htmlFor="voucherCode"
            label="Voucher Code"
            type="text"
            placeholder="Voucher Code"
            onChange={formik.handleChange}
            value={formik.values.voucherCode}
            onBlur={formik.handleBlur}
          />
          {formik.touched.voucherCode && formik.errors.voucherCode && (
            <div className="text-sm text-red-600">
              {formik.errors.voucherCode}
            </div>
          )}
        </div>

        {/* Quantity Field */}
        <div>
          <InputField
            htmlFor="qty"
            label="Quantity"
            type="number"
            placeholder="0"
            onChange={formik.handleChange}
            value={formik.values.qty}
            onBlur={formik.handleBlur}
          />
          {formik.touched.qty && formik.errors.qty && (
            <div className="text-sm text-red-600">{formik.errors.qty}</div>
          )}
        </div>

        {/* Value Field */}
        <div>
          <InputField
            htmlFor="value"
            label="Value"
            type="number"
            placeholder="0"
            onChange={formik.handleChange}
            value={formik.values.value}
            onBlur={formik.handleBlur}
          />
          {formik.touched.value && formik.errors.value && (
            <div className="text-sm text-red-600">{formik.errors.value}</div>
          )}
        </div>

        {/* Expired Date Field */}
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="expDate">End Date</Label>
            <Input
              name="expDate"
              type="date"
              value={formik.values.expDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.expDate && !!formik.errors.expDate ? (
              <p className="text-xs text-red-500">{formik.errors.expDate}</p>
            ) : null}
          </div>
        </div>

        {/* Select Event Field */}
        <div>
          <Label htmlFor="eventId">Select Event</Label>
          <Select
            onValueChange={(value) => formik.setFieldValue("eventId", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Events</SelectLabel>
                {events?.map((event) => (
                  <SelectItem key={event.id} value={String(event.id)}>
                    {event.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {formik.touched.eventId && formik.errors.eventId && (
            <div className="text-sm text-red-600">{formik.errors.eventId}</div>
          )}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isPending}>
          {isPending ? "Loading..." : "Create Voucher"}
        </Button>
      </form>
    </div>
  );
};

export default CreateVoucherPage;
