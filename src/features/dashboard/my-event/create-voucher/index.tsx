"use client";

import { useFormik } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload, FiTrash2, FiGift } from "react-icons/fi"; // Import ikon tambahan

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
import { createVoucherSchema } from "./schema";
import { Input } from "@/components/ui/input";
import RoleGuard from "@/hoc/roleGuard";

const CreateVoucherPage = () => {
  const {
    mutateAsync: createVoucher,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateVoucher();
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
    onSubmit: async (values, { resetForm }) => {
      const payload = { ...values, eventId: Number(values.eventId) };
      await createVoucher(payload);
      resetForm();
    },
  });

  // Variants for animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.main
      className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sky-100 to-sky-200 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-lg rounded-3xl bg-white bg-opacity-30 p-8 shadow-2xl backdrop-blur-lg backdrop-filter"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="mb-8 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-center text-3xl font-extrabold text-transparent"
          variants={fieldVariants}
        >
          <FiGift className="text-2xl" />
          Create Voucher
        </motion.h1>
        <motion.form
          className="space-y-6"
          onSubmit={formik.handleSubmit}
          variants={containerVariants}
        >
          {/* Voucher Code Field */}
          <motion.div className="relative" variants={fieldVariants}>
            <Label
              htmlFor="voucherCode"
              className="mb-1 block font-semibold text-gray-700"
            >
              Voucher Code
            </Label>
            <div className="relative">
              <FiGift className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                id="voucherCode"
                name="voucherCode"
                type="text"
                placeholder="Enter Voucher Code"
                onChange={formik.handleChange}
                value={formik.values.voucherCode}
                onBlur={formik.handleBlur}
                className={`border py-2 pl-10 pr-4 ${
                  formik.touched.voucherCode && formik.errors.voucherCode
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg bg-white bg-opacity-70 transition-all duration-300 focus:ring-2 focus:ring-sky-400`}
              />
            </div>
            {formik.touched.voucherCode && formik.errors.voucherCode && (
              <motion.p
                className="mt-1 text-sm text-red-500"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formik.errors.voucherCode}
              </motion.p>
            )}
          </motion.div>

          {/* Quantity Field */}
          <motion.div className="relative" variants={fieldVariants}>
            <Label
              htmlFor="qty"
              className="mb-1 block font-semibold text-gray-700"
            >
              Quantity
            </Label>
            <div className="relative">
              <FiGift className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                id="qty"
                name="qty"
                type="number"
                placeholder="0"
                onChange={formik.handleChange}
                value={formik.values.qty}
                onBlur={formik.handleBlur}
                className={`border py-2 pl-10 pr-4 ${
                  formik.touched.qty && formik.errors.qty
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg bg-white bg-opacity-70 transition-all duration-300 focus:ring-2 focus:ring-sky-400`}
              />
            </div>
            {formik.touched.qty && formik.errors.qty && (
              <motion.p
                className="mt-1 text-sm text-red-500"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formik.errors.qty}
              </motion.p>
            )}
          </motion.div>

          {/* Value Field */}
          <motion.div className="relative" variants={fieldVariants}>
            <Label
              htmlFor="value"
              className="mb-1 block font-semibold text-gray-700"
            >
              Value
            </Label>
            <div className="relative">
              <FiGift className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                id="value"
                name="value"
                type="number"
                placeholder="0"
                onChange={formik.handleChange}
                value={formik.values.value}
                onBlur={formik.handleBlur}
                className={`border py-2 pl-10 pr-4 ${
                  formik.touched.value && formik.errors.value
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg bg-white bg-opacity-70 transition-all duration-300 focus:ring-2 focus:ring-sky-400`}
              />
            </div>
            {formik.touched.value && formik.errors.value && (
              <motion.p
                className="mt-1 text-sm text-red-500"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formik.errors.value}
              </motion.p>
            )}
          </motion.div>

          {/* Expired Date Field */}
          <motion.div className="relative" variants={fieldVariants}>
            <Label
              htmlFor="expDate"
              className="mb-1 block font-semibold text-gray-700"
            >
              Expiration Date
            </Label>
            <div className="relative">
              <FiGift className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
              <Input
                id="expDate"
                name="expDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.expDate}
                onBlur={formik.handleBlur}
                className={`border py-2 pl-10 pr-4 ${
                  formik.touched.expDate && formik.errors.expDate
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg bg-white bg-opacity-70 transition-all duration-300 focus:ring-2 focus:ring-sky-400`}
              />
            </div>
            {formik.touched.expDate && formik.errors.expDate && (
              <motion.p
                className="mt-1 text-sm text-red-500"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formik.errors.expDate}
              </motion.p>
            )}
          </motion.div>

          {/* Select Event Field */}
          <motion.div className="relative" variants={fieldVariants}>
            <Label
              htmlFor="eventId"
              className="mb-1 block font-semibold text-gray-700"
            >
              Select Event
            </Label>
            <Select
              value={formik.values.eventId}
              onValueChange={(value) => formik.setFieldValue("eventId", value)}
            >
              <SelectTrigger
                className="w-full rounded-lg border border-gray-300 bg-white bg-opacity-70 focus:ring-2 focus:ring-sky-400"
                onBlur={formik.handleBlur} // Move onBlur prop to SelectTrigger
              >
                <SelectValue placeholder="Select an event" />
              </SelectTrigger>
              <SelectContent className="rounded-lg bg-white bg-opacity-90 shadow-lg">
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
              <motion.p
                className="mt-1 text-sm text-red-500"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {formik.errors.eventId}
              </motion.p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div className="flex justify-center" variants={fieldVariants}>
            <motion.button
              type="submit"
              className="w-full max-w-md rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:from-sky-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              disabled={isPending}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {isPending ? "Creating..." : "Create Voucher"}
            </motion.button>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                className="mt-4 text-center font-medium text-green-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                Voucher created successfully!
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {isError && (
              <motion.div
                className="mt-4 text-center font-medium text-red-600"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {error instanceof Error ? error.message : "An error occurred."}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </motion.main>
  );
};

export default RoleGuard (CreateVoucherPage);
