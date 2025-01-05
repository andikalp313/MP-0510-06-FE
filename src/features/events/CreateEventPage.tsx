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

enum EventCategory {
  TECHNOLOGY = "TECHNOLOGY",
  BUSINESS = "BUSINESS",
  EDUCATION = "EDUCATION",
  ENTERTAINMENT = "ENTERTAINMENT",
  SPORTS = "SPORTS",
  HEALTH = "HEALTH",
  ART = "ART",
}

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
      <form
        className="space-y-6 rounded-lg bg-white p-8 shadow-xl"
        onSubmit={formik.handleSubmit}
      >
        {/* Title */}
        <motion.div
          className="grid w-full items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title" className="font-semibold text-gray-700">
              Title
            </Label>
            <Input
              name="title"
              type="text"
              placeholder="Enter event title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border ${
                formik.touched.title && formik.errors.title
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched.title && formik.errors.title && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500"
              >
                {formik.errors.title}
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* Category */}
        <motion.div
          className="grid w-full items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
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

        {/* Description */}
        <motion.div
          className="grid w-full items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
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

        {/* Pricing */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Price Reguler */}
          <motion.div
            className="flex flex-col space-y-1.5"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
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
          <motion.div
            className="flex flex-col space-y-1.5"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
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
          <motion.div
            className="flex flex-col space-y-1.5"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
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

        {/* Dates */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Start Date & Time */}
          <motion.div
            className="flex flex-col space-y-1.5"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
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
          <motion.div
            className="flex flex-col space-y-1.5"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
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

        {/* Available Seats */}
        <motion.div
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* Seats Reguler */}
          <motion.div
            className="flex flex-col space-y-1.5"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
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
          <motion.div
            className="flex flex-col space-y-1.5"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
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
          <motion.div
            className="flex flex-col space-y-1.5"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
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

        {/* Location */}
        <motion.div
          className="grid w-full items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
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

        {/* Content */}
        <motion.div
          className="grid w-full items-center gap-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
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

        {/* Thumbnail */}
        <motion.div
          className="grid w-full items-center gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
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
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
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

        {/* Submit Button */}
        <motion.div
          className="flex justify-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Button
            type="submit"
            className="rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white transition-all duration-300 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </motion.div>
      </form>
    </motion.main>
  );
};

export default RoleGuard (CreateEventPage);
