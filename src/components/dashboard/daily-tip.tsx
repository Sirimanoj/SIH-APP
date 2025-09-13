'use client';

import React, { useState, useMemo } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const tips = [
  "Take 5 deep breaths when you feel overwhelmed.",
  "Write down 3 things you're grateful for today.",
  "Go for a 10-minute walk to clear your head.",
  "Practice a digital detox for an hour before bed.",
  "Connect with a friend you haven't spoken to in a while.",
  "Mindful eating: Savor one meal without distractions.",
  "Spend 15 minutes in nature, if possible.",
];


export default function DailyTip() {
    const [tipIndex, setTipIndex] = useState(0);

    const getDailyTipIndex = () => {
        const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        return dayOfYear % tips.length;
    };
    
    React.useEffect(() => {
        setTipIndex(getDailyTipIndex());
    }, []);

    const handleRefresh = () => {
        setTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
    };


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="font-headline text-lg">Daily Wellness Tip</CardTitle>
        <Lightbulb className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-sm">"{tips[tipIndex]}"</p>
        <Button variant="link" size="sm" className="mt-2 px-0" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-3 w-3" />
          Get another tip
        </Button>
      </CardContent>
    </Card>
  );
}
