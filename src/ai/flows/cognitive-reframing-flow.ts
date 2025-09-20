'use server';
/**
 * @fileOverview An AI flow for helping users reframe negative thoughts.
 *
 * - cognitiveReframing - A function that handles the cognitive reframing process.
 * - CognitiveReframingInput - The input type for the cognitiveReframing function.
 * - CognitiveReframingOutput - The return type for the cognitiveReframing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CognitiveReframingInputSchema = z.object({
  negativeThought: z.string().describe('The negative thought the user wants to reframe.'),
});
export type CognitiveReframingInput = z.infer<typeof CognitiveReframingInputSchema>;

const CognitiveReframingOutputSchema = z.object({
  reframedThought: z.string().describe('A more balanced, positive, or realistic perspective on the negative thought.'),
});
export type CognitiveReframingOutput = z.infer<typeof CognitiveReframingOutputSchema>;

export async function cognitiveReframing(input: CognitiveReframingInput): Promise<CognitiveReframingOutput> {
  return cognitiveReframingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cognitiveReframingPrompt',
  input: {schema: CognitiveReframingInputSchema},
  output: {schema: CognitiveReframingOutputSchema},
  prompt: `You are an AI assistant trained in Cognitive Behavioral Therapy (CBT), specializing in helping Indian youth. Your task is to help a user reframe a negative thought into a more balanced and constructive one, keeping cultural context in mind.

  The user has provided the following negative thought:
  "{{{negativeThought}}}"

  Analyze this thought and provide a "reframed" version. The reframed thought should:
  1.  Challenge the negative assumptions gently.
  2.  Be realistic and believable, not overly positive.
  3.  Focus on a more helpful or neutral perspective.
  4.  Be supportive and encouraging in tone.

  For example, if the user says "If I don't get into a top college, my parents will be so disappointed. I'm a failure," a good reframing would be "Feeling the weight of expectations is tough, but your worth isn't defined by one exam result. There are many paths to success, and it's okay to find the one that's right for you."

  Provide only the reframed thought in your response.`,
});

const cognitiveReframingFlow = ai.defineFlow(
  {
    name: 'cognitiveReframingFlow',
    inputSchema: CognitiveReframingInputSchema,
    outputSchema: CognitiveReframingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
