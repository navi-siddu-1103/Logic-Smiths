
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCw, ArrowLeft } from 'lucide-react';

export default function MindfulBreathingPage() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [text, setText] = useState('Press Start to Begin');
  const [cycle, setCycle] = useState(0);

  const totalTime = 16000; // 4s in, 4s hold, 6s out, 2s hold
  const breatheTime = 4000;
  const holdTime = 4000;
  const exhaleTime = 6000;

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isBreathing) {
      const breathAnimation = () => {
        setText('Breathe In...');
        setTimeout(() => {
          setText('Hold');
          setTimeout(() => {
            setText('Breathe Out...');
            setTimeout(() => {
              setText('Hold');
            }, exhaleTime);
          }, holdTime);
        }, breatheTime);
      };

      breathAnimation();
      interval = setInterval(breathAnimation, totalTime);
    } else {
        setText('Press Start to Begin');
    }

    return () => clearInterval(interval);
  }, [isBreathing, cycle]);

  const handleToggle = () => {
    setIsBreathing(prev => !prev);
  };
  
  const handleReset = () => {
    setIsBreathing(false);
    setCycle(prev => prev + 1);
  };

  return (
    <div className="space-y-6">
       <Button variant="outline" asChild className="mb-4">
        <Link href="/cbt-exercises">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Exercises
        </Link>
      </Button>
      <div className="flex flex-col items-center justify-center space-y-8 h-full text-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="font-headline">Mindful Breathing</CardTitle>
            <CardDescription>Follow the guide to calm your mind.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-8 p-8">
            <div className="relative h-48 w-48 bg-primary/20 rounded-full flex items-center justify-center">
              <div
                className={`absolute h-full w-full bg-primary/50 rounded-full ${isBreathing ? 'animate-breathing' : ''}`}
                style={{ animationDuration: `${totalTime}ms` }}
              ></div>
              <span className="relative z-10 text-xl font-semibold text-primary-foreground">{text}</span>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleToggle} size="lg">
                {isBreathing ? <Pause className="mr-2" /> : <Play className="mr-2" />}
                {isBreathing ? 'Pause' : 'Start'}
              </Button>
              <Button onClick={handleReset} size="lg" variant="outline">
                  <RefreshCw className="mr-2" />
                  Reset
              </Button>
            </div>
          </CardContent>
        </Card>
        <style jsx>{`
          @keyframes breathing {
            0% { transform: scale(0.5); opacity: 0.7; }
            25% { transform: scale(1); opacity: 1; } /* 4s in */
            50% { transform: scale(1); opacity: 1; } /* 4s hold */
            87.5% { transform: scale(0.5); opacity: 0.7; } /* 6s out */
            100% { transform: scale(0.5); opacity: 0.7; } /* 2s hold */
          }
          .animate-breathing {
            animation: breathing linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
}
