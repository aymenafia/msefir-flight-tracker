"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { MessageType } from "./types";
import { firestoreAdmin, admin } from "./firebase-admin";
import { formatISO } from "date-fns";
import type { RoomMessage } from "./types";

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
    const { flightNumber, message, type, userId } = validatedFields.data;
    const newMessage: Omit<RoomMessage, 'id'> = {
        text: message,
        type: type as MessageType,
        userId: userId,
        flightNumber,
        createdAt: formatISO(new Date()),
        helpfulCount: 0,
    };
    await firestoreAdmin.collection(`rooms/${flightNumber}/messages`).add(newMessage);
    revalidatePath(`/flight/${flightNumber}`);
    return { message: "Message posted successfully.", errors: {} };
  } catch (error) {
    console.error("Failed to post message:", error);
    return { message: "Failed to post message.", errors: {} };
  }
}

export async function incrementHelpfulAction(messageId: string, flightNumber: string) {
    try {
        const messageRef = firestoreAdmin.doc(`rooms/${flightNumber}/messages/${messageId}`);
        await messageRef.update({
            helpfulCount: admin.firestore.FieldValue.increment(1)
        });
        revalidatePath(`/flight/${flightNumber}`);
    } catch (error) {
        console.error("Failed to increment helpful count:", error);
    }
}

export async function summarizeFlightUpdates(flightNumber: string, messages: any[]) {
  const { summarizeFlightUpdates: summarizeFlightUpdatesAI } = await import("@/ai/flows/summarize-flight-updates");
  try {
    const summary = await summarizeFlightUpdatesAI({ messages });
    return { summary: summary.summary, error: null };
  } catch (error) {
    console.error("Failed to summarize updates:", error);
    return { summary: null, error: "Could not generate summary at this time." };
  }
}
