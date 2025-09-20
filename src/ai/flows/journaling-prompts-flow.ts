'use server';
/**
 * @fileOverview An AI flow for generating journaling prompts.
 *
 * - journalingPrompts - A function that generates journaling prompts.
 * - JournalingPromptsOutput - The return type for the journalingPrompts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const JournalingPromptsOutputSchema = z.object({
  prompts: z.array(z.string()).describe('A list of three unique journaling prompts.'),
});
export type JournalingPromptsOutput = z.infer<typeof JournalingPromptsOutputSchema>;

export async function journalingPrompts(): Promise<JournalingPromptsOutput> {
  return journalingPromptsFlow();
}

const journalingPromptsFlow = ai.defineFlow(
  {
    name: 'journalingPromptsFlow',
    outputSchema: JournalingPromptsOutputSchema,
  },
  async () => {
    const llmResponse = await ai.generate({
      prompt: `You are an AI assistant designed to help young people in India with their mental wellness through journaling. Your task is to generate three unique and thought-provoking journaling prompts.

The prompts should be:
1.  Open-ended and encourage self-reflection.
2.  Relevant to the challenges and experiences of Indian youth (ages 13-25), covering topics like academic stress, family expectations, self-discovery, relationships, and future aspirations.
3.  Gentle, supportive, and non-judgmental in tone.
4.  Varied in topic and style.

Here are some examples of good prompts:
*   "Write about a small personal achievement you were proud of this week, even if no one else noticed."
*   "What is one expectation from others that feels heavy right now? Write about it without judging your feelings."
*   "Describe a simple thing that brought you a moment of peace or happiness today."

Please provide three new prompts.`,
      output: {
        schema: JournalingPromptsOutputSchema,
      },
    });
    return llmResponse.output!;
  }
);
