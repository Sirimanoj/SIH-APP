'use server';
/**
 * @fileOverview A Genkit flow that provides guided mindfulness and breathing exercises.
 *
 * - getGuidedExercise - A function that returns a guided exercise based on a topic.
 * - GetGuidedExerciseInput - The input type for the getGuidedExercise function.
 * - GetGuidedExerciseOutput - The return type for the getGuidedExercise function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GetGuidedExerciseInputSchema = z.object({
  topic: z
    .string()
    .describe('The topic for the guided exercise (e.g., "stress", "anxiety", "breathing").'),
});
export type GetGuidedExerciseInput = z.infer<
  typeof GetGuidedExerciseInputSchema
>;

const GetGuidedExerciseOutputSchema = z.object({
  exercise: z
    .string()
    .describe('A step-by-step guided exercise script.'),
});
export type GetGuidedExerciseOutput = z.infer<
  typeof GetGuidedExerciseOutputSchema
>;

export async function getGuidedExercise(
  input: GetGuidedExerciseInput
): Promise<GetGuidedExerciseOutput> {
  return getGuidedExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getGuidedExercisePrompt',
  input: {schema: GetGuidedExerciseInputSchema},
  output: {schema: GetGuidedExerciseOutputSchema},
  prompt: `You are a compassionate mental health assistant. Your task is to provide a simple, clear, and effective guided exercise for a college student.

  The user is asking for an exercise related to: {{{topic}}}

  Please generate a step-by-step guided exercise script. The script should be easy to follow and suitable for someone who may be feeling stressed or anxious. For breathing exercises, be specific about the counts (e.g., inhale for 4, hold for 7, exhale for 8). For mindfulness, guide the user to focus on their senses.
`,
});

const getGuidedExerciseFlow = ai.defineFlow(
  {
    name: 'getGuidedExerciseFlow',
    inputSchema: GetGuidedExerciseInputSchema,
    outputSchema: GetGuidedExerciseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
