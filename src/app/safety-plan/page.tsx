'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

interface SafetyPlanData {
  warningSigns: string;
  copingStrategies: string;
  peopleAndPlaces: string;
  helpers: string;
  safeEnvironment: string;
}

export default function SafetyPlanPage() {
  const [plan, setPlan] = useState<SafetyPlanData>({
    warningSigns: '',
    copingStrategies: '',
    peopleAndPlaces: '',
    helpers: '',
    safeEnvironment: '',
  });
  const { toast } = useToast();

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('safetyPlan');
      if (savedPlan) {
        setPlan(JSON.parse(savedPlan));
      }
    } catch (error) {
      console.error("Failed to load safety plan from local storage", error);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setPlan(prevPlan => ({ ...prevPlan, [id]: value }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem('safetyPlan', JSON.stringify(plan));
      toast({
        title: "Plan Saved",
        description: "Your safety plan has been saved locally on your device.",
      });
    } catch (error) {
      console.error("Failed to save safety plan to local storage", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not save your safety plan. Your browser might not support local storage or is in private mode.",
      });
    }
  };

  return (
    <div className="space-y-6">
       <Alert className="bg-accent border-accent/60">
        <ShieldCheck className="h-4 w-4 text-accent-foreground" />
        <AlertTitle className="font-headline text-accent-foreground">Your Private Safe Space</AlertTitle>
        <AlertDescription className="text-accent-foreground/80">
          This safety plan is for you. It's stored securely and only you can see it. Fill it out to help you stay safe during tough times.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Safety Plan</CardTitle>
          <CardDescription>Thinking about these things ahead of time can help when you're feeling overwhelmed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-headline">1. Warning Signs</h3>
            <div className="grid gap-2">
              <Label htmlFor="warningSigns">What are my personal signs that a crisis might be developing?</Label>
              <Textarea id="warningSigns" value={plan.warningSigns} onChange={handleChange} placeholder="e.g., Not sleeping, feeling hopeless, isolating myself..." className="min-h-24" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-headline">2. Internal Coping Strategies</h3>
            <div className="grid gap-2">
              <Label htmlFor="copingStrategies">Things I can do on my own to relax and distract myself.</Label>
              <Textarea id="copingStrategies" value={plan.copingStrategies} onChange={handleChange} placeholder="e.g., Listen to my favorite playlist, watch a comfort movie, deep breathing..." className="min-h-24" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-headline">3. People &amp; Places for Distraction</h3>
            <div className="grid gap-2">
              <Label htmlFor="peopleAndPlaces">Who can I talk to or where can I go to take my mind off things?</Label>
              <Textarea id="peopleAndPlaces" value={plan.peopleAndPlaces} onChange={handleChange} placeholder="e.g., Call my friend Alex, go to the park, visit the library..." className="min-h-24" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg font-headline">4. People I Can Ask for Help</h3>
            <div className="grid gap-2">
              <Label htmlFor="helpers">Who can I contact for help?</Label>
              <Input id="helpers" value={plan.helpers} onChange={handleChange} placeholder="e.g., Mom (555-1234), my therapist, my school counselor..." />
            </div>
          </div>

           <div className="space-y-4">
            <h3 className="font-semibold text-lg font-headline">5. Making My Environment Safe</h3>
            <div className="grid gap-2">
              <Label htmlFor="safeEnvironment">What can I do to make my surroundings safer?</Label>
              <Textarea id="safeEnvironment" value={plan.safeEnvironment} onChange={handleChange} placeholder="This is a step to consider with a trusted adult or professional." className="min-h-24" />
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={handleSave}>Save My Plan</Button>
        </CardContent>
      </Card>
    </div>
  );
}
