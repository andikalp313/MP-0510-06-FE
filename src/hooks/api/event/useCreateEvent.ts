"use client";

import useAxios from "@/hooks/api/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateEventPayload {
  title: string;
  description: string;
  price: number;
  content: string;
  eventCategory: string;
  startDate: Date;
  endDate: Date;
  avaliableSeats: number;
  location: string;
  thumbnail: File | null;
}

const useCreateEvent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const createEventForm = new FormData();

      createEventForm.append("title", payload.title);
      createEventForm.append("description", payload.description);
      createEventForm.append("eventCategory", payload.eventCategory);
      createEventForm.append("content", payload.content);
      createEventForm.append("price", payload.price.toString());
      createEventForm.append("startDate", payload.startDate.toISOString());
      createEventForm.append("endDate", payload.endDate.toISOString());
      createEventForm.append(
        "avaliableSeats",
        payload.avaliableSeats.toString(),
      );
      createEventForm.append("location", payload.location);
      createEventForm.append("thumbnail", payload.thumbnail!);

      const { data } = await axiosInstance.post(
        "/events/create-event",
        createEventForm,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Create Event success");
      await queryClient.invalidateQueries({ queryKey: ["event-storage"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateEvent;
