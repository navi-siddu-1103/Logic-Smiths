'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GratitudeEntry {
  id: number;
  text: string;
}

export default function GratitudePracticePage() {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem('gratitudeEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error("Failed to load gratitude entries from local storage", error);
    }
  }, []);

  const saveEntries = (updatedEntries: GratitudeEntry[]) => {
     try {
      localStorage.setItem('gratitudeEntries', JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
    } catch (error)
{
      console.error("Failed to save gratitude entries to local storage", error);
       toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save your entry.",
      });
    }
  };
  
  const handleAddEntry = () => {
    if (!newEntry.trim()) return;
    const newId = Date.now();
    const updatedEntries = [...entries, { id: newId, text: newEntry }];
    saveEntries(updatedEntries);
    setNewEntry('');
    toast({
        title: "Entry Added",
        description: "Your gratitude entry has been saved.",
      });
  };

  const handleRemoveEntry = (id: number) => {
    const updatedEntries = entries.filter(entry => entry.id !== id);
    saveEntries(updatedEntries);
     toast({
        title: "Entry Removed",
      });
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
          <CardTitle className="font-headline">Gratitude Practice</CardTitle>
          <CardDescription>
            What are you grateful for today? Acknowledging the good things, big or small, can improve your mood.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddEntry()}
              placeholder="e.g., A kind word from a friend, a good meal..."
            />
            <Button onClick={handleAddEntry} disabled={!newEntry.trim()}>
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Gratitude List</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length > 0 ? (
            <ul className="space-y-2">
              {entries.map((entry) => (
                <li key={entry.id} className="flex items-center justify-between p-3 bg-primary rounded-lg group">
                  <p className="text-primary-foreground font-medium">{entry.text}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                    onClick={() => handleRemoveEntry(entry.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center py-8">Your list is empty. Add something you're grateful for!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
