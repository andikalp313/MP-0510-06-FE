// schema.js
import * as Yup from "yup";

export const CreateEventSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  eventCategory: Yup.string()
    .required("Category is required")
    .min(2, "Category must be at least 2 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  content: Yup.string().required("Content is required"),
  priceReguler: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  priceVip: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  priceVvip: Yup.number()
    .required("Price is required")
    .min(0, "Price cannot be negative"),
  startDate: Yup.date()
    .required("Start date is required")
    .typeError("Invalid date format"),
  endDate: Yup.date()
    .required("End date is required")
    .typeError("Invalid date format")
    .min(Yup.ref("startDate"), "End date cannot be before start date"),
  avaliableSeatsReguler: Yup.number()
    .required("Available seats are required")
    .min(1, "Available seats must be at least 1"),
  avaliableSeatsVip: Yup.number()
    .required("Available seats are required")
    .min(1, "Available seats must be at least 1"),
  avaliableSeatsVvip: Yup.number()
    .required("Available seats are required")
    .min(1, "Available seats must be at least 1"),
  location: Yup.string()
    .required("Location is required")
    .min(5, "Location must be at least 5 characters"),
  thumbnail: Yup.mixed()
    .nullable()
    .required("Thumbnail is required")
    .test(
      "fileFormat",
      "Only image files are allowed",
      (value) =>
        !value ||
        (value &&
          [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/avif",
            "image/webp",
            "image/heif",
          ].includes((value as File).type)),
    ),
});
