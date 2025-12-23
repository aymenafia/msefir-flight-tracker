'use server';

/**
 * @fileOverview Summarizes key updates from a flight room for passengers.
 *
 * - summarizeFlightUpdates - A function that summarizes flight updates.
 * - SummarizeFlightUpdatesInput - The input type for the summarizeFlightUpdates function.
 * - SummarizeFlightUpdatesOutput - The return type for the summarizeFlightUpdates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFlightUpdatesInputSchema = z.object({
  messages: z
    .array(
      z.object({
        type: z.string(),
        text: z.string(),
        userId: z.string(),
        createdAt: z.string(),
      })
    )
    .describe('An array of messages from the flight room.'),
});
export type SummarizeFlightUpdatesInput = z.infer<typeof SummarizeFlightUpdatesInputSchema>;

const SummarizeFlightUpdatesOutputSchema = z.object({
  summary: z.string().describe('A summary of the key updates from the flight room.'),
});
export type SummarizeFlightUpdatesOutput = z.infer<typeof SummarizeFlightUpdatesOutputSchema>;

export async function summarizeFlightUpdates(input: SummarizeFlightUpdatesInput): Promise<SummarizeFlightUpdatesOutput> {
  return summarizeFlightUpdatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeFlightUpdatesPrompt',
  input: {schema: SummarizeFlightUpdatesInputSchema},
  output: {schema: SummarizeFlightUpdatesOutputSchema},
  prompt: `You are an AI assistant summarizing flight updates for passengers in a flight room. Provide a concise summary (around 50 words) of the key updates from the provided messages.

Messages:
{{#each messages}}
- Type: {{type}}, Text: {{text}}, User: {{userId}}, CreatedAt: {{createdAt}}
{{/each}}
`,
});

const summarizeFlightUpdatesFlow = ai.defineFlow(
  {
    name: 'summarizeFlightUpdatesFlow',
    inputSchema: SummarizeFlightUpdatesInputSchema,
    outputSchema: SummarizeFlightUpdatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
