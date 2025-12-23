"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addMessageToFlight, incrementHelpfulCount } from "./data";
import { MessageType } from "./types";
import { summarizeFlightUpdates as summarizeFlightUpdatesAI } from "@/ai/flows/summarize-flight-updates";

const messageSchema = z.object({
  flightNumber: z.string(),
  message: z.string().min(5, "Message must be at least 5 characters.").max(200, "Message must be 200 characters or less."),
  type: z.enum(["boarding", "gate", "delay", "info", "question"]),
  userId: z.string(),
});

export async function postMessageAction(prevState: any, formData: FormData) {
  const validatedFields = messageSchema.safeParse({
    flightNumber: formData.get("flightNumber"),
    message: formData.get("message"),
    type: formData.get("type"),
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }
  
  try {
    addMessageToFlight(validatedFields.data.flightNumber, {
        text: validatedFields.data.message,
        type: validatedFields.data.type as MessageType,
        userId: validatedFields.data.userId,
    });
    revalidatePath(`/flight/${validatedFields.data.flightNumber}`);
    return { message: "Message posted successfully.", errors: {} };
  } catch (error) {
    return { message: "Failed to post message.", errors: {} };
  }
}


export async function incrementHelpfulAction(messageId: string, flightNumber: string) {
    try {
        incrementHelpfulCount(messageId);
        revalidatePath(`/flight/${flightNumber}`);
    } catch (error) {
        console.error("Failed to increment helpful count:", error);
        // Optionally, return an error to be handled by the client
    }
}

export async function summarizeFlightUpdates(flightNumber: string, messages: any[]) {
  try {
    const summary = await summarizeFlightUpdatesAI({ messages });
    return { summary: summary.summary, error: null };
  } catch (error) {
    console.error("Failed to summarize updates:", error);
    return { summary: null, error: "Could not generate summary at this time." };
  }
}
