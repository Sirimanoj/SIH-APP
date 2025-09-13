'use server';
/**
 * @fileOverview An AI agent that recommends relevant mental health resources based on the conversation and expressed concerns.
 *
 * - chatbotResourceRecommendation - A function that handles the resource recommendation process.
 * - ChatbotResourceRecommendationInput - The input type for the chatbotResourceRecommendation function.
 * - ChatbotResourceRecommendationOutput - The return type for the chatbotResourceRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotResourceRecommendationInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The history of the conversation with the chatbot.'),
  userConcerns: z.string().describe('The user expressed concerns.'),
});
export type ChatbotResourceRecommendationInput = z.infer<
  typeof ChatbotResourceRecommendationInputSchema
>;

const ChatbotResourceRecommendationOutputSchema = z.object({
  recommendedResources: z
    .array(z.string())
    .describe('An array of recommended mental health resources.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type ChatbotResourceRecommendationOutput = z.infer<
  typeof ChatbotResourceRecommendationOutputSchema
>;

export async function chatbotResourceRecommendation(
  input: ChatbotResourceRecommendationInput
): Promise<ChatbotResourceRecommendationOutput> {
  return chatbotResourceRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatbotResourceRecommendationPrompt',
  input: {schema: ChatbotResourceRecommendationInputSchema},
  output: {schema: ChatbotResourceRecommendationOutputSchema},
  prompt: `You are a mental health support assistant. Your goal is to recommend relevant resources to the user based on their conversation history and expressed concerns.

Conversation History: {{{conversationHistory}}}
User Concerns: {{{userConcerns}}}

Please provide a list of recommended mental health resources and explain your reasoning for each recommendation.
`,
});

const chatbotResourceRecommendationFlow = ai.defineFlow(
  {
    name: 'chatbotResourceRecommendationFlow',
    inputSchema: ChatbotResourceRecommendationInputSchema,
    outputSchema: ChatbotResourceRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
