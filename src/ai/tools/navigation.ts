'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const pages = [
    '/',
    '/mood-tracking',
    '/cbt-exercises',
    '/cbt-exercises/cognitive-reframing',
    '/cbt-exercises/mindful-breathing',
    '/cbt-exercises/journaling',
    '/cbt-exercises/gratitude-practice',
    '/safety-plan',
    '/emergency-resources',
    '/privacy',
  ] as const;

export const navigateToTool = ai.defineTool(
    {
      name: 'navigateTo',
      description: 'Navigates to a specific page in the application.',
      inputSchema: z.object({
        page: z.enum(pages).describe('The page to navigate to.'),
        text: z.string().describe('The text to display on the navigation button. For example, "Take me to the breathing exercise".')
      }),
      outputSchema: z.string(),
    },
    async ({ page }) => {
      // This tool does not have a server-side implementation. 
      // The flow will handle the tool request and the client will perform the navigation.
      return `Navigating to ${page}`;
    }
  );