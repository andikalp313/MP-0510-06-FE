"use server";

import { revalidatePath } from "next/cache";

interface TransactionResult {
  success: boolean;
  message: string;
}

export async function processTransaction(
  prevState: TransactionResult | null,
  formData: FormData,
): Promise<TransactionResult> {
  try {
    const eventId = formData.get("eventId");
    const ticketType = formData.get("ticketType");
    const quantity = formData.get("quantity");

    if (!eventId || !ticketType || !quantity) {
      throw new Error("Missing required fields");
    }

    // Simulate a delay to mimic processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demonstration purposes, we'll just return a success message
    const result: TransactionResult = {
      success: true,
      message: `Successfully processed order for ${quantity} ${ticketType} ticket(s) for event ${eventId}.`,
    };

    // Revalidate the event detail page to reflect any changes
    revalidatePath(`/events/${eventId}`);

    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
