
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { journalingPrompts } from '@/ai/flows/journaling-prompts-flow';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export default function JournalingPage() {
  const [prompts, setPrompts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPrompts = async () => {
    setIsLoading(true);
    try {
      const result = await journalingPrompts();
      setPrompts(result.prompts);
    } catch (error) {
      console.error('Error fetching journaling prompts:', error);
      setPrompts(['Could not load prompts. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  return (
    <div className="space-y-6">
       <Button variant="outline" asChild className="mb-4">
        <Link href="/cbt-exercises">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Exercises
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="font-headline">Journaling Prompts</CardTitle>
              <CardDescription>Use these prompts to explore your thoughts and feelings.</CardDescription>
            </div>
            <Button onClick={fetchPrompts} variant="outline" size="icon" disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </>
          ) : (
            prompts.map((prompt, index) => (
              <p key={index} className="p-3 bg-muted rounded-lg text-foreground">
                {prompt}
              </p>
            ))
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="font-headline">Your Space</CardTitle>
            <CardDescription>Write freely here. Your entry is private.</CardDescription>
        </CardHeader>
        <CardContent>
            <Textarea placeholder="Start writing..." className="min-h-64" />
        </CardContent>
      </Card>
    </div>
  );
}
