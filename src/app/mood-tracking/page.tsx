'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, Frown, Meh, Laugh, Angry } from 'lucide-react';
import MoodChart from '@/components/mood-chart';

type Mood = 'Happy' | 'Okay' | 'Sad' | 'Excited' | 'Angry';

export interface MoodEntry {
  date: string;
  mood: Mood;
  value: number;
}

const moodOptions: { name: Mood; icon: React.ElementType; value: number }[] = [
  { name: 'Excited', icon: Laugh, value: 5 },
  { name: 'Happy', icon: Smile, value: 4 },
  { name: 'Okay', icon: Meh, value: 3 },
  { name: 'Sad', icon: Frown, value: 2 },
  { name: 'Angry', icon: Angry, value: 1 },
];

const initialMoodData: MoodEntry[] = [
  { date: 'Mon', mood: 'Happy', value: 4 },
  { date: 'Tue', mood: 'Okay', value: 3 },
  { date: 'Wed', mood: 'Sad', value: 2 },
  { date: 'Thu', mood: 'Okay', value: 3 },
  { date: 'Fri', mood: 'Excited', value: 5 },
  { date: 'Sat', mood: 'Happy', value: 4 },
  { date: 'Sun', mood: 'Happy', value: 4 },
];

export default function MoodTrackingPage() {
  const [moodData, setMoodData] = useState<MoodEntry[]>(initialMoodData);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const handleMoodSelect = (mood: Mood, value: number) => {
    setSelectedMood(mood);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' });
    const newEntry: MoodEntry = { date: today, mood, value };
    // This is a simple update logic, for a real app it would be more complex
    setMoodData(prevData => [...prevData.slice(-6), newEntry]); 
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">How are you feeling today?</CardTitle>
          <CardDescription>Select a mood to log it for today.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center gap-4">
          {moodOptions.map(({ name, icon: Icon, value }) => (
            <Button
              key={name}
              variant={selectedMood === name ? 'default' : 'outline'}
              size="lg"
              className="flex flex-col h-24 w-24 gap-2"
              onClick={() => handleMoodSelect(name, value)}
            >
              <Icon className="h-8 w-8" />
              <span>{name}</span>
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Weekly Mood</CardTitle>
          <CardDescription>Here's a look at your mood patterns over the last week.</CardDescription>
        </CardHeader>
        <CardContent className="p-2 sm:p-6">
          <MoodChart data={moodData} />
        </CardContent>
      </Card>
    </div>
  );
}
