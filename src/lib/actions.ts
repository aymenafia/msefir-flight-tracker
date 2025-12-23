
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { MessageType } from "./types";
import { formatISO } from "date-fns";
import type { RoomMessage } from "./types";

const messageSchema = z.object({
  flightNumber: z.string(),
  message: z.string().min(5, "Message must be at least 5 characters.").max(200, "Message must be 200 characters or less."),
  type: z.enum(["boarding", "gate", "delay", "info", "question"]),
  userId: z.string(),
});

export async function postMessageAction(prevState: any, formData: FormData) {
  // This action is now disabled as it depends on the Firebase Admin SDK.
  console.error("postMessageAction is disabled due to server-side Firebase issues.");
  return { message: "Failed to post message. This feature is temporarily disabled.", errors: {} };
}

export async function incrementHelpfulAction(messageId: string, flightNumber: string) {
  // This action is now disabled as it depends on the Firebase Admin SDK.
  console.error("incrementHelpfulAction is disabled due to server-side Firebase issues.");
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
