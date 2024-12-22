"use client";

import RichTextEditor from "@/components/ui/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useCreateEvent from "@/hooks/api/event/useCreateEvent";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";

const CreateEventPage = () => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      title: "",
      eventCategory: "",
      description: "",
      content: "",
      price: 0,
      startDate: "",
      endDate: "",
      availableSeats: 0,
      location: "",
      thumbnail: null,
    },
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
    <main className="container mx-auto max-w-5xl px-4">
      <form className="mt-10 space-y-3" onSubmit={formik.handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              type="text"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.title && !!formik.errors.title ? (
              <p className="text-xs text-red-500">{formik.errors.title}</p>
            ) : null}
          </div>
        </div>

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="eventCategory">Category</Label>
            <Input
              name="eventCategory"
              type="text"
              placeholder="Category"
              value={formik.values.eventCategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.eventCategory && !!formik.errors.eventCategory ? (
              <p className="text-xs text-red-500">
                {formik.errors.eventCategory}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows={4}
              style={{ resize: "none" }}
            />
            {!!formik.touched.description && !!formik.errors.description ? (
              <p className="text-xs text-red-500">
                {formik.errors.description}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="price">Price</Label>
            <Input
              name="price"
              type="number"
              placeholder="Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.price && !!formik.errors.price ? (
              <p className="text-xs text-red-500">{formik.errors.price}</p>
            ) : null}
          </div>
        </div>

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              name="startDate"
              type="date"
              value={formik.values.startDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.startDate && !!formik.errors.startDate ? (
              <p className="text-xs text-red-500">{formik.errors.startDate}</p>
            ) : null}
          </div>
        </div>

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              name="endDate"
              type="date"
              value={formik.values.endDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.endDate && !!formik.errors.endDate ? (
              <p className="text-xs text-red-500">{formik.errors.endDate}</p>
            ) : null}
          </div>
        </div>

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="availableSeats">Available Seats</Label>
            <Input
              name="availableSeats"
              type="number"
              placeholder="Available Seats"
              value={formik.values.availableSeats}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.availableSeats &&
            !!formik.errors.availableSeats ? (
              <p className="text-xs text-red-500">
                {formik.errors.availableSeats}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input
              name="location"
              type="text"
              placeholder="Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.location && !!formik.errors.location ? (
              <p className="text-xs text-red-500">{formik.errors.location}</p>
            ) : null}
          </div>
        </div>

        <RichTextEditor
          label="Content"
          value={formik.values.content}
          onChange={(value: string) => formik.setFieldValue("content", value)}
          isError={!!formik.errors.content}
        />

        {selectedImage && (
          <>
            <div className="relative h-[150px] w-[200px]">
              <Image
                src={selectedImage}
                alt="Thumbnail"
                className="object-cover"
                fill
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              onClick={removeThumbnail}
            >
              Remove
            </Button>
          </>
        )}

        <div className="flex flex-col space-y-1.5">
          <Label>Thumbnail</Label>
          <Input
            ref={thumbnailRef}
            type="file"
            accept="image/*"
            onChange={onChangeThumbnail}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="my-10" disabled={isPending}>
            {isPending ? "Loading" : "Submit"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateEventPage;
