'use server';
/**
 * @fileOverview A Genkit flow that provides a guided CBT exercise for identifying and reframing negative thoughts.
 *
 * - cbtGuidedExercise - A function that returns an analysis of a negative thought, including cognitive distortions, challenging questions, and a reframed perspective.
 * - CbtGuidedExerciseInput - The input type for the function.
 * - CbtGuidedExerciseOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CbtGuidedExerciseInputSchema = z.object({
  negativeThought: z
    .string()
    .describe('The negative thought the user wants to analyze and reframe.'),
});
export type CbtGuidedExerciseInput = z.infer<
  typeof CbtGuidedExerciseInputSchema
>;

const CbtGuidedExerciseOutputSchema = z.object({
  cognitiveDistortions: z
    .array(
      z.object({
        name: z.string().describe('The name of the cognitive distortion (e.g., "Catastrophizing").'),
        description: z
          .string()
          .describe('A brief, simple explanation of what this distortion is.'),
      })
    )
    .describe(
      'An array of cognitive distortions identified in the negative thought.'
    ),
  socraticQuestions: z
    .array(z.string())
    .describe(
      'An array of 3-4 gentle, Socratic questions to help the user challenge the negative thought.'
    ),
  reframedThought: z
    .string()
    .describe(
      'A more balanced, positive, and realistic way to reframe the original negative thought.'
    ),
});
export type CbtGuidedExerciseOutput = z.infer<
  typeof CbtGuidedExerciseOutputSchema
>;

export async function cbtGuidedExercise(
  input: CbtGuidedExerciseInput
): Promise<CbtGuidedExerciseOutput> {
  return cbtGuidedExerciseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cbtGuidedExercisePrompt',
  input: {schema: CbtGuidedExerciseInputSchema},
  output: {schema: CbtGuidedExerciseOutputSchema},
  prompt: `You are an expert in Cognitive Behavioral Therapy (CBT) acting as a compassionate mental health assistant. Your task is to guide a user through the process of identifying, challenging, and reframing a negative thought.

The user has provided the following negative thought:
"{{{negativeThought}}}"

1.  **Identify Cognitive Distortions:** Analyze the thought and identify the primary cognitive distortions at play. For each distortion, provide its name and a simple, one-sentence explanation. Common distortions include: Catastrophizing, All-or-Nothing Thinking, Overgeneralization, Mind Reading, Personalization, Mental Filtering.

2.  **Generate Socratic Questions:** Create a list of 3-4 gentle, open-ended Socratic questions to help the user challenge the validity of their negative thought. These questions should encourage reflection, not give advice. Examples: "What is the evidence for and against this thought?", "Is there another way of looking at this situation?", "What would you say to a friend who had this thought?".

3.  **Suggest a Reframe:** Based on the analysis, provide a more balanced, positive, and realistic "reframed thought". This should be a healthier alternative to the user's original negative thought.
`,
});

const cbtGuidedExerciseFlow = ai.defineFlow(
  {
    name: 'cbtGuidedExerciseFlow',
    inputSchema: CbtGuidedExerciseInputSchema,
    outputSchema: CbtGuidedExerciseOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
