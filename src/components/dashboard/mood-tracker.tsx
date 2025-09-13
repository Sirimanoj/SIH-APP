'use client';

import React, { useState } from 'react';
import { Smile, Meh, Frown, Laugh, Annoyed } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartTooltip, ChartTooltipContent, ChartContainer } from '@/components/ui/chart';

const moodData = [
  { day: 'Mon', mood: 3 },
  { day: 'Tue', mood: 4 },
  { day: 'Wed', mood: 5 },
  { day: 'Thu', mood: 2 },
  { day: 'Fri', mood: 4 },
  { day: 'Sat', mood: 5 },
  { day: 'Sun', mood: 3 },
];

const chartConfig = {
  mood: {
    label: "Mood Level",
    color: "hsl(var(--primary))",
  },
};

const moods = [
  { level: 1, icon: Annoyed, label: 'Awful', color: 'text-red-500' },
  { level: 2, icon: Frown, label: 'Bad', color: 'text-orange-500' },
  { level: 3, icon: Meh, label: 'Okay', color: 'text-yellow-500' },
  { level: 4, icon: Smile, label: 'Good', color: 'text-green-500' },
  { level: 5, icon: Laugh, label: 'Great', color: 'text-blue-500' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">How are you feeling today?</CardTitle>
        <CardDescription>
          Track your mood to understand your emotional patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around rounded-lg bg-secondary/50 p-4 mb-6">
          {moods.map((mood) => (
            <Button
              key={mood.level}
              variant="ghost"
              size="icon"
              className={`h-16 w-16 flex-col gap-1 transition-transform duration-200 hover:scale-110 ${
                selectedMood === mood.level ? 'scale-110 bg-primary/20' : ''
              }`}
              onClick={() => setSelectedMood(mood.level)}
              aria-label={mood.label}
            >
              <mood.icon
                className={`h-8 w-8 ${mood.color} transition-colors`}
              />
              <span className="text-xs text-muted-foreground">{mood.label}</span>
            </Button>
          ))}
        </div>
        <div>
          <h3 className="mb-4 font-headline text-lg font-semibold">
            This Week's Mood
          </h3>
          <div className="h-[200px] w-full">
            <ChartContainer config={chartConfig} className="w-full">
              <BarChart data={moodData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 5]}
                  ticks={[1, 2, 3, 4, 5]}
                  tickFormatter={(value) => moods.find(m => m.level === value)?.label || ''}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent 
                        labelFormatter={(label, payload) => `${payload[0]?.payload.day}: ${moods.find(m => m.level === payload[0]?.value)?.label}`}
                        indicator="dot"
                    />}
                />
                <Bar dataKey="mood" radius={[4, 4, 0, 0]} fill="var(--color-mood)" />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
