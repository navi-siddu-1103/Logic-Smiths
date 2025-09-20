'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cognitiveReframing } from '@/ai/flows/cognitive-reframing-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { Lightbulb, ArrowLeft } from 'lucide-react';

export default function CognitiveReframingPage() {
  const [negativeThought, setNegativeThought] = useState('');
  const [reframedThought, setReframedThought] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!negativeThought.trim()) return;

    setIsLoading(true);
    setReframedThought('');

    try {
      const result = await cognitiveReframing({ negativeThought });
      setReframedThought(result.reframedThought);
    } catch (error) {
      console.error('Error with cognitive reframing:', error);
      setReframedThought('Sorry, I had trouble processing that. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <Button variant="outline" asChild className="mb-4">
        <Link href="/cbt-exercises">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Exercises
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Cognitive Reframing</CardTitle>
          <CardDescription>
            Challenge a negative thought, and we'll work together to find a more balanced perspective.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="negative-thought">What's a negative thought on your mind?</Label>
            <Textarea
              id="negative-thought"
              placeholder="e.g., If I fail this exam, I'll disappoint everyone."
              value={negativeThought}
              onChange={(e) => setNegativeThought(e.target.value)}
              className="min-h-24"
              disabled={isLoading}
            />
          </div>
          <Button onClick={handleSubmit} disabled={isLoading || !negativeThought.trim()} className="w-full">
            {isLoading ? 'Reframing...' : 'Reframe My Thought'}
          </Button>
        </CardContent>
      </Card>

      {(isLoading || reframedThought) && (
        <Card className="bg-accent/30 border-accent">
          <CardHeader className="flex-row items-center gap-4">
            <div className="bg-primary/20 p-3 rounded-lg">
                <Lightbulb className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
                <CardTitle className="font-headline text-lg">A New Perspective</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ) : (
                <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground">
                    {reframedThought}
                </blockquote>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
