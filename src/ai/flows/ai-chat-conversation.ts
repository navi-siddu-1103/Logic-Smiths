
'use server';

/**
 * @fileOverview A flow for engaging in empathetic, confidential conversations with an AI tool.
 *
 * - aiChatConversation - A function that handles the AI chat conversation process.
 * - AIChatConversationInput - The input type for the aiChatConversation function.
 * - AIChatConversationOutput - The return type for the aiChatConversation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { navigateToTool } from '../tools/navigation';

const AIChatConversationInputSchema = z.object({
  message: z.string().describe('The user message to the AI.'),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant', 'tool']),
    content: z.any(),
  })).optional().describe('The history of the conversation.'),
});
export type AIChatConversationInput = z.infer<typeof AIChatConversationInputSchema>;

const AIChatConversationOutputSchema = z.object({
  response: z.string().describe('The AI response to the user message.'),
  navigation: z.object({
    page: z.string(),
    text: z.string(),
  }).optional().describe('An optional navigation action to be performed.'),
});
export type AIChatConversationOutput = z.infer<typeof AIChatConversationOutputSchema>;

export async function aiChatConversation(input: AIChatConversationInput): Promise<AIChatConversationOutput> {
  return aiChatConversationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatConversationPrompt',
  input: {schema: AIChatConversationInputSchema},
  output: {schema: AIChatConversationOutputSchema},
  tools: [navigateToTool],
  system: `You are an empathetic, confidential, and culturally-aware AI assistant designed to provide mental wellness support to youth in India (ages 13-25).

Your primary goal is to provide personalized support in a safe, accessible, and non-judgmental manner. You must be sensitive to the unique pressures they face, such as intense academic competition, family expectations, and the stigma around mental health in India.

Your persona should be:
- Encouraging, patient, and supportive.
- Non-judgmental and respectful of cultural and family values.
- Conversational and easy to talk to. Avoid being overly clinical.

When appropriate, you can gently introduce concepts from Cognitive Behavioral Therapy (CBT) or suggest helpful exercises available in the app, like journaling or mindful breathing. Your aim is to empower users, not to replace a therapist. Intelligently decide when and how to incorporate mental health resources into the conversation.

If the user asks to navigate to a page, use the navigateToTool to help them.
`,
  prompt: `{{#each conversationHistory}}
{{this.role}}: {{{this.content}}}
{{/each}}
user: {{{message}}}
assistant:`, // Keep the 'assistant:' token to bias towards assistant role
});

const aiChatConversationFlow = ai.defineFlow(
  {
    name: 'aiChatConversationFlow',
    inputSchema: AIChatConversationInputSchema,
    outputSchema: AIChatConversationOutputSchema,
  },
  async input => {
    // Pre-process conversation history to stringify tool content
    const processedHistory = input.conversationHistory?.map(msg => {
        if (msg.role === 'tool' && typeof msg.content !== 'string') {
            return { ...msg, content: JSON.stringify(msg.content) };
        }
        return msg;
    });

    const llmResponse = await prompt({ ...input, conversationHistory: processedHistory });
    const toolRequest = llmResponse.toolRequests?.[0];
    if(toolRequest?.toolRequest) {
      if(toolRequest.toolRequest.name === 'navigateTo') {
        const page = (toolRequest.toolRequest.input as any)?.page;
        const text = (toolRequest.toolRequest.input as any)?.text;
        const response = llmResponse.output?.response || "Of course! Taking you there now.";
        return {
          response,
          navigation: { page, text },
        };
      }
    }
    const response = llmResponse.output?.response || "I'm sorry, I didn't understand that. Could you rephrase?";
    return { response };
  }
);
