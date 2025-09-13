'use server';

/**
 * @fileOverview An AI agent for detecting crisis situations in chatbot conversations.
 *
 * - detectCrisis - A function that takes conversation text as input and determines if a crisis is present.
 * - DetectCrisisInput - The input type for the detectCrisis function.
 * - DetectCrisisOutput - The return type for the detectCrisis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectCrisisInputSchema = z.object({
  conversationText: z
    .string()
    .describe('The complete text of the user bot conversation.'),
});
export type DetectCrisisInput = z.infer<typeof DetectCrisisInputSchema>;

const DetectCrisisOutputSchema = z.object({
  isCrisis: z
    .boolean()
    .describe(
      'True if the conversation indicates a crisis, false otherwise.  A crisis includes expressions of self-harm or suicide.'
    ),
  suggestedResponse: z
    .string()
    .describe(
      'A suggested immediate response to the user in the event of a detected crisis.  This should include a safety assessment, breathing exercise, emergency contact information, and a notification that a counselor may be alerted.'
    ),
});
export type DetectCrisisOutput = z.infer<typeof DetectCrisisOutputSchema>;

export async function detectCrisis(input: DetectCrisisInput): Promise<DetectCrisisOutput> {
  return detectCrisisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectCrisisPrompt',
  input: {schema: DetectCrisisInputSchema},
  output: {schema: DetectCrisisOutputSchema},
  prompt: `You are an AI assistant that analyzes text to detect potential crisis situations, especially those involving self-harm or suicide.

  Analyze the following conversation text and determine if the user is in crisis. If there is a potential crisis, set isCrisis to true, otherwise false.

  If isCrisis is true, provide a suggestedResponse that includes the following:
  1. Acknowledge the user's distress and express concern.
  2. Perform a brief safety assessment by asking the user if they have a plan to harm themselves.
  3. Guide the user through a simple breathing exercise (e.g., 4-7-8 technique).
  4. Provide emergency contact information, such as a crisis hotline number.
  5. Inform the user that a counselor may be alerted to the situation.

  Conversation Text: {{{conversationText}}}
  `,
});

const detectCrisisFlow = ai.defineFlow(
  {
    name: 'detectCrisisFlow',
    inputSchema: DetectCrisisInputSchema,
    outputSchema: DetectCrisisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

