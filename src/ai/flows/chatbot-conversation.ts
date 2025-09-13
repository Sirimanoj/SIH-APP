'use server';
/**
 * @fileOverview A conversational AI agent for the chatbot.
 *
 * - getChatbotResponse - A function that provides a conversational response.
 * - GetChatbotResponseInput - The input type for the getChatbotResponse function.
 * - GetChatbotResponseOutput - The return type for the getChatbotResponse function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetChatbotResponseInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The history of the conversation with the chatbot.'),
});
export type GetChatbotResponseInput = z.infer<
  typeof GetChatbotResponseInputSchema
>;

const GetChatbotResponseOutputSchema = z.object({
  response: z
    .string()
    .describe(
      'A natural and empathetic response to continue the conversation.'
    ),
});
export type GetChatbotResponseOutput = z.infer<
  typeof GetChatbotResponseOutputSchema
>;

export async function getChatbotResponse(
  input: GetChatbotResponseInput
): Promise<GetChatbotResponseOutput> {
  return getChatbotResponseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getChatbotResponsePrompt',
  input: {schema: GetChatbotResponseInputSchema},
  output: {schema: GetChatbotResponseOutputSchema},
  prompt: `You are a compassionate mental health assistant for college students in India. Your goal is to provide supportive and empathetic conversation.

  Continue the following conversation. Keep your responses concise and natural.

  Conversation History:
  {{{conversationHistory}}}
`,
});

const getChatbotResponseFlow = ai.defineFlow(
  {
    name: 'getChatbotResponseFlow',
    inputSchema: GetChatbotResponseInputSchema,
    outputSchema: GetChatbotResponseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
