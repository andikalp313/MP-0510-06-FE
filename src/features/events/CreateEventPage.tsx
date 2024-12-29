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
import { CreateEventSchema } from "./components/schema";

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
            <select
              name="eventCategory"
              value={formik.values.eventCategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="input"
            >
              {Object.values(EventCategory).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
            <Label htmlFor="priceReguler">Price Reguler</Label>
            <Input
              name="priceReguler"
              type="number"
              placeholder="Price Reguler"
              value={formik.values.priceReguler}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.priceReguler && !!formik.errors.priceReguler ? (
              <p className="text-xs text-red-500">
                {formik.errors.priceReguler}
              </p>
            ) : null}
          </div>
        </div>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="priceVip">Price Vip</Label>
            <Input
              name="priceVip"
              type="number"
              placeholder="Price Vip"
              value={formik.values.priceVip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.priceVip && !!formik.errors.priceVip ? (
              <p className="text-xs text-red-500">{formik.errors.priceVip}</p>
            ) : null}
          </div>
        </div>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="priceVvip">Price Vvip</Label>
            <Input
              name="priceVvip"
              type="number"
              placeholder="Price Vvip"
              value={formik.values.priceVvip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.priceVvip && !!formik.errors.priceVvip ? (
              <p className="text-xs text-red-500">{formik.errors.priceVvip}</p>
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
            <Label htmlFor="avaliableSeatsReguler">
              Available Seats Reguler
            </Label>
            <Input
              name="avaliableSeatsReguler"
              type="number"
              placeholder="Available Seats Reguler"
              value={formik.values.avaliableSeatsReguler}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.avaliableSeatsReguler &&
            !!formik.errors.avaliableSeatsReguler ? (
              <p className="text-xs text-red-500">
                {formik.errors.avaliableSeatsReguler}
              </p>
            ) : null}
          </div>
        </div>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="avaliableSeatsVip">Available Seats Vip</Label>
            <Input
              name="avaliableSeatsVip"
              type="number"
              placeholder="Available Seats Vip"
              value={formik.values.avaliableSeatsVip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.avaliableSeatsVip &&
            !!formik.errors.avaliableSeatsVip ? (
              <p className="text-xs text-red-500">
                {formik.errors.avaliableSeatsVip}
              </p>
            ) : null}
          </div>
        </div>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="avaliableSeatsVvip">Available Seats Vvip</Label>
            <Input
              name="avaliableSeatsVvip"
              type="number"
              placeholder="Available Seats Vvip"
              value={formik.values.avaliableSeatsVvip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.avaliableSeatsVvip &&
            !!formik.errors.avaliableSeatsVvip ? (
              <p className="text-xs text-red-500">
                {formik.errors.avaliableSeatsVvip}
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
        <div></div>

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
