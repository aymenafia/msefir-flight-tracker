
"use server";

import { revalidatePath } from "next/cache";

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
