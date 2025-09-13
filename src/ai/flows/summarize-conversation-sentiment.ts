'use server';
/**
 * @fileOverview A Genkit flow that summarizes the sentiment of a conversation.
 *
 * - summarizeConversationSentiment - A function that summarizes the sentiment of a conversation.
 * - SummarizeConversationSentimentInput - The input type for the summarizeConversationSentiment function.
 * - SummarizeConversationSentimentOutput - The return type for the summarizeConversationSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeConversationSentimentInputSchema = z.object({
  conversationText: z
    .string()
    .describe('The complete text of the conversation to summarize.'),
});
export type SummarizeConversationSentimentInput = z.infer<
  typeof SummarizeConversationSentimentInputSchema
>;

const SummarizeConversationSentimentOutputSchema = z.object({
  sentimentSummary: z
    .string()
    .describe(
      'A summary of the overall sentiment of the conversation (positive, negative, neutral, mixed), and any specific concerns or issues raised.'
    ),
  escalationNeeded: z
    .boolean()
    .describe(
      'Whether the conversation requires escalation to a counselor due to concerning content or sentiment.'
    ),
});
export type SummarizeConversationSentimentOutput = z.infer<
  typeof SummarizeConversationSentimentOutputSchema
>;

export async function summarizeConversationSentiment(
  input: SummarizeConversationSentimentInput
): Promise<SummarizeConversationSentimentOutput> {
  return summarizeConversationSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeConversationSentimentPrompt',
  input: {schema: SummarizeConversationSentimentInputSchema},
  output: {schema: SummarizeConversationSentimentOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing the sentiment of a conversation and determining if escalation to a counselor is needed.

  Here is the conversation text:
  {{conversationText}}

  Provide a summary of the overall sentiment of the conversation (positive, negative, neutral, mixed), and any specific concerns or issues raised.  Also, set the escalationNeeded flag to true if the conversation contains indications of crisis, harm, or severe distress; otherwise, set it to false.

  Your summary should be concise and accurate.
`,
});

const summarizeConversationSentimentFlow = ai.defineFlow(
  {
    name: 'summarizeConversationSentimentFlow',
    inputSchema: SummarizeConversationSentimentInputSchema,
    outputSchema: SummarizeConversationSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
