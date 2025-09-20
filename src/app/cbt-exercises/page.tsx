
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Wind, Edit, Smile } from 'lucide-react';
import Link from 'next/link';

const exercises = [
  {
    title: 'Cognitive Reframing',
    description: 'Challenge and change negative thoughts into more balanced ones.',
    icon: Brain,
    link: '/cbt-exercises/cognitive-reframing',
  },
  {
    title: 'Mindful Breathing',
    description: 'A simple exercise to calm your mind and body in moments of stress.',
    icon: Wind,
    link: '/cbt-exercises/mindful-breathing',
  },
  {
    title: 'Journaling Prompts',
    description: 'Use guided prompts to explore your feelings and thoughts.',
    icon: Edit,
    link: '/cbt-exercises/journaling',
  },
  {
    title: 'Gratitude Practice',
    description: 'Focus on the positive aspects of your life to improve your mood.',
    icon: Smile,
    link: '/cbt-exercises/gratitude-practice',
  }
];

export default function CbtExercisesPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-primary/10 border-primary/40">
        <CardHeader>
          <CardTitle className="font-headline">Build Your Mental Toolkit</CardTitle>
          <CardDescription>
            These simple exercises are tools that can help you understand and manage your thoughts and feelings. Practicing them can help you build resilience over time.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {exercises.map((exercise) => (
          <Card key={exercise.title} className="flex flex-col">
            <CardHeader className="flex-row items-center gap-4">
              <div className="bg-primary/20 p-3 rounded-lg">
                <exercise.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="font-headline text-lg">{exercise.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{exercise.description}</p>
            </CardContent>
            <div className="p-6 pt-0">
               <Button asChild className="w-full">
                <Link href={exercise.link}>Start Exercise</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
