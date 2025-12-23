'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a helpful room starter message for flight rooms.
 *
 * The flow takes a flight number as input and returns a suggested opening message to encourage room participation.
 * It exports:
 * - `generateHelpfulRoomStarter` - The main function to trigger the flow.
 * - `HelpfulRoomStarterInput` - The input type for the function (flight number).
 * - `HelpfulRoomStarterOutput` - The output type for the function (suggested message).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HelpfulRoomStarterInputSchema = z.object({
  flightNumber: z.string().describe('The flight number for which to generate a room starter message.'),
});
export type HelpfulRoomStarterInput = z.infer<typeof HelpfulRoomStarterInputSchema>;

const HelpfulRoomStarterOutputSchema = z.object({
  message: z.string().describe('A suggested opening message for the flight room.'),
});
export type HelpfulRoomStarterOutput = z.infer<typeof HelpfulRoomStarterOutputSchema>;

export async function generateHelpfulRoomStarter(input: HelpfulRoomStarterInput): Promise<HelpfulRoomStarterOutput> {
  return helpfulRoomStarterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'helpfulRoomStarterPrompt',
  input: {schema: HelpfulRoomStarterInputSchema},
  output: {schema: HelpfulRoomStarterOutputSchema},
  prompt: `You are an AI assistant that helps create engaging opening messages for flight rooms.
  Your goal is to suggest a message that encourages passengers to share useful updates (gate changes, boarding, delays).
  The message should be short (under 200 characters), friendly, and relevant to the flight.
  
  Generate an initial message for the flight room for flight number {{{flightNumber}}}.
  Here are some examples of messages that you could generate:

  - "Hi everyone! Let's use this room to share any gate changes or boarding updates for our flight."
  - "Hello! Anyone at the gate yet? Share any updates you have!"
  - "Hi folks, has anyone heard about boarding?"
  `,
});

const helpfulRoomStarterFlow = ai.defineFlow(
  {
    name: 'helpfulRoomStarterFlow',
    inputSchema: HelpfulRoomStarterInputSchema,
    outputSchema: HelpfulRoomStarterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
