"use client";

import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import RichTextEditor from "@/components/ui/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { CreateEventSchema } from "./components/schema";
import RoleGuard from "@/hoc/roleGuard";
import { FiEdit3 } from "react-icons/fi";

enum EventCategory {
  TECHNOLOGY = "TECHNOLOGY",
  BUSINESS = "BUSINESS",
  EDUCATION = "EDUCATION",
  ENTERTAINMENT = "ENTERTAINMENT",
  SPORTS = "SPORTS",
  HEALTH = "HEALTH",
  ART = "ART",
}

// Variants untuk container (membungkus seluruh form)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // jeda sebelum item pertama muncul
      delayChildren: 0.2,
      // jeda antar item
      staggerChildren: 0.15,
    },
  },
};

// Variants untuk item tunggal (setiap motion.div di dalam form)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CreateEventPage = () => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      title: "",
      eventCategory: EventCategory.TECHNOLOGY,
      description: "",
      content: "",
      priceReguler: 0,
      priceVip: 0,
      priceVvip: 0,
      startDate: "",
      endDate: "",
      avaliableSeatsReguler: 0,
      avaliableSeatsVip: 0,
      avaliableSeatsVvip: 0,
      location: "",
      thumbnail: null,
    },
    validationSchema: CreateEventSchema,
    onSubmit: async (values) => {
      const payload = {
        ...values,
        startDate: new Date(values.startDate),
        endDate: new Date(values.endDate),
      };
      await createEvent(payload);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeThumbnail = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  return (
    <motion.main
      className="container mx-auto max-w-5xl px-4 py-8"
      // Animasi masuk untuk kontainer utama
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Create New Event
      </motion.h1>

      {/* Jadikan form ini container untuk stagger children */}
      <motion.form
        className="space-y-6 rounded-lg bg-white p-8 shadow-xl"
        onSubmit={formik.handleSubmit}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* TITLE */}
        <motion.div
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 to-sky-500 p-8 shadow-2xl transition-all duration-500 hover:from-sky-500 hover:to-sky-600"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          // tambahkan variants item
          variants={itemVariants}
        >
          {/* Decorative Elements */}
          <div className="absolute -left-10 -top-10 h-32 w-32 animate-pulse rounded-full bg-white opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 h-32 w-32 animate-pulse rounded-full bg-white opacity-20 blur-3xl"></div>

          <div className="flex flex-col space-y-6">
            {/* Header with Icon */}
            <div className="flex items-center space-x-3">
              <FiEdit3 className="animate-bounce text-2xl text-white" />
              <h2 className="text-2xl font-bold text-white">Create Event</h2>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col space-y-4">
              <label htmlFor="title" className="font-medium text-white">
                Title
              </label>
              <div className="relative">
                <Input
                  name="title"
                  type="text"
                  placeholder="Enter event title"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border bg-white bg-opacity-80 px-4 py-3 ${
                    formik.touched.title && formik.errors.title
                      ? "border-red-400"
                      : "border-sky-300"
                  } rounded-lg shadow-inner transition duration-300 focus:outline-none focus:ring-2 focus:ring-sky-300`}
                />
                {/* Icon inside input */}
                <FiEdit3 className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sky-400" />
              </div>
              {formik.touched.title && formik.errors.title && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-300"
                >
                  {formik.errors.title}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* CATEGORY */}
        <motion.div
          className="grid w-full items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          // tambahkan variants item
          variants={itemVariants}
        >
          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="eventCategory"
              className="font-semibold text-gray-700"
            >
              Category
            </Label>
            <select
              name="eventCategory"
              value={formik.values.eventCategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`input border bg-white ${
                formik.touched.eventCategory && formik.errors.eventCategory
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              {Object.values(EventCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {formik.touched.eventCategory && formik.errors.eventCategory && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {formik.errors.eventCategory}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.div
          className="grid w-full items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          // tambahkan variants item
          variants={itemVariants}
        >
          <div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="description"
              className="font-semibold text-gray-700"
            >
              Description
            </Label>
            <Textarea
              name="description"
              placeholder="Enter event description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              className={`border ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.description && formik.errors.description && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {formik.errors.description}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* PRICING */}
        <motion.div
          // Hilangkan initial & animate di sini, karena sudah diatur oleh container
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
          // tambahkan variants item
          variants={itemVariants}
        >
          {/* Price Reguler */}
          <motion.div
            className="flex flex-col space-y-1.5"
            // item child bisa saja pakai itemVariants lagi,
            // tapi kita cukup satu level untuk contoh ini
          >
            <Label
              htmlFor="priceReguler"
              className="font-semibold text-gray-700"
            >
              Price Reguler
            </Label>
            <Input
              name="priceReguler"
              type="number"
              placeholder="e.g., 50"
              value={formik.values.priceReguler}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.priceReguler && formik.errors.priceReguler
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.priceReguler && formik.errors.priceReguler && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {formik.errors.priceReguler}
              </motion.p>
            )}
          </motion.div>

          {/* Price VIP */}
          <motion.div className="flex flex-col space-y-1.5">
            <Label htmlFor="priceVip" className="font-semibold text-gray-700">
              Price VIP
            </Label>
            <Input
              name="priceVip"
              type="number"
              placeholder="e.g., 100"
              value={formik.values.priceVip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.priceVip && formik.errors.priceVip
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.priceVip && formik.errors.priceVip && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {formik.errors.priceVip}
              </motion.p>
            )}
          </motion.div>

          {/* Price VVIP */}
          <motion.div className="flex flex-col space-y-1.5">
            <Label htmlFor="priceVvip" className="font-semibold text-gray-700">
              Price VVIP
            </Label>
            <Input
              name="priceVvip"
              type="number"
              placeholder="e.g., 200"
              value={formik.values.priceVvip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.priceVvip && formik.errors.priceVvip
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.priceVvip && formik.errors.priceVvip && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {formik.errors.priceVvip}
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* DATES */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          // tambahkan variants item
          variants={itemVariants}
        >
          {/* Start Date & Time */}
          <motion.div className="flex flex-col space-y-1.5">
            <Label htmlFor="startDate" className="font-semibold text-gray-700">
              Start Date & Time
            </Label>
            <Input
              name="startDate"
              type="datetime-local"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.startDate && formik.errors.startDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {formik.errors.startDate}
              </motion.p>
            )}
          </motion.div>

          {/* End Date & Time */}
          <motion.div className="flex flex-col space-y-1.5">
            <Label htmlFor="endDate" className="font-semibold text-gray-700">
              End Date & Time
            </Label>
            <Input
              name="endDate"
              type="datetime-local"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.endDate && formik.errors.endDate
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {formik.errors.endDate}
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* AVAILABLE SEATS */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
          // tambahkan variants item
          variants={itemVariants}
        >
          {/* Seats Reguler */}
          <motion.div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="avaliableSeatsReguler"
              className="font-semibold text-gray-700"
            >
              Available Seats Reguler
            </Label>
            <Input
              name="avaliableSeatsReguler"
              type="number"
              placeholder="e.g., 100"
              value={formik.values.avaliableSeatsReguler}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.avaliableSeatsReguler &&
                formik.errors.avaliableSeatsReguler
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.avaliableSeatsReguler &&
              formik.errors.avaliableSeatsReguler && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {formik.errors.avaliableSeatsReguler}
                </motion.p>
              )}
          </motion.div>

          {/* Seats VIP */}
          <motion.div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="avaliableSeatsVip"
              className="font-semibold text-gray-700"
            >
              Available Seats VIP
            </Label>
            <Input
              name="avaliableSeatsVip"
              type="number"
              placeholder="e.g., 50"
              value={formik.values.avaliableSeatsVip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.avaliableSeatsVip &&
                formik.errors.avaliableSeatsVip
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.avaliableSeatsVip &&
              formik.errors.avaliableSeatsVip && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {formik.errors.avaliableSeatsVip}
                </motion.p>
              )}
          </motion.div>

          {/* Seats VVIP */}
          <motion.div className="flex flex-col space-y-1.5">
            <Label
              htmlFor="avaliableSeatsVvip"
              className="font-semibold text-gray-700"
            >
              Available Seats VVIP
            </Label>
            <Input
              name="avaliableSeatsVvip"
              type="number"
              placeholder="e.g., 20"
              value={formik.values.avaliableSeatsVvip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.avaliableSeatsVvip &&
                formik.errors.avaliableSeatsVvip
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.avaliableSeatsVvip &&
              formik.errors.avaliableSeatsVvip && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {formik.errors.avaliableSeatsVvip}
                </motion.p>
              )}
          </motion.div>
        </motion.div>

        {/* LOCATION */}
        <motion.div
          className="grid w-full items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          // tambahkan variants item
          variants={itemVariants}
        >
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="location" className="font-semibold text-gray-700">
              Location
            </Label>
            <Input
              name="location"
              type="text"
              placeholder="Enter event location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.location && formik.errors.location
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.location && formik.errors.location && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {formik.errors.location}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* CONTENT (RichTextEditor) */}
        <motion.div
          className="grid w-full items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          // tambahkan variants item
          variants={itemVariants}
        >
          <RichTextEditor
            label="Content"
            value={formik.values.content}
            onChange={(value: string) => formik.setFieldValue("content", value)}
            isError={!!formik.errors.content}
          />
          {formik.touched.content && formik.errors.content && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-500"
            >
              {formik.errors.content}
            </motion.p>
          )}
        </motion.div>

        {/* THUMBNAIL */}
        <motion.div
          className="grid w-full items-center gap-4"
          // tambahkan variants item
          variants={itemVariants}
        >
          {/* Image Preview */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                className="relative h-40 w-60 overflow-hidden rounded-md shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={selectedImage}
                  alt="Thumbnail Preview"
                  className="object-cover"
                  fill
                />
                <motion.button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute right-2 top-2 rounded-full bg-red-600 p-1 text-white transition-colors hover:bg-red-700"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  &times;
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* File Input */}
          <motion.div
            className="flex flex-col space-y-1.5"
            // item child (opsional)
          >
            <Label htmlFor="thumbnail" className="font-semibold text-gray-700">
              Thumbnail
            </Label>
            <Input
              ref={thumbnailRef}
              type="file"
              accept="image/*"
              onChange={onChangeThumbnail}
              className="rounded-md border border-gray-300 p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </motion.div>
        </motion.div>

        {/* SUBMIT BUTTON */}
        <motion.div
          className="flex justify-end"
          // tambahkan variants item
          variants={itemVariants}
        >
          <Button
            type="submit"
            className="rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </motion.div>
      </motion.form>
    </motion.main>
  );
};

export default RoleGuard(CreateEventPage);
