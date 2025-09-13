'use client';

import React, { useState, useEffect } from 'react';
import { Smile, Meh, Frown, Laugh, Annoyed } from 'lucide-react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartTooltipContent, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { format, subDays } from 'date-fns';

const moods = [
  { level: 1, icon: Annoyed, label: 'Awful', color: 'text-red-500' },
  { level: 2, icon: Frown, label: 'Bad', color: 'text-orange-500' },
  { level: 3, icon: Meh, label: 'Okay', color: 'text-yellow-500' },
  { level: 4, icon: Smile, label: 'Good', color: 'text-green-500' },
  { level: 5, icon: Laugh, label: 'Great', color: 'text-blue-500' },
];

const chartConfig = {
  mood: {
    label: "Mood Level",
    color: "hsl(var(--primary))",
  },
};

// A placeholder user ID. Replace with actual user ID after implementing auth.
const USER_ID = "anonymous_user"; 

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodData, setMoodData] = useState<{ day: string; mood: number }[]>([]);

  useEffect(() => {
    const today = new Date();
    const lastSevenDays = Array.from({ length: 7 }).map((_, i) => format(subDays(today, i), 'E'));
    
    const moodQuery = query(
      collection(db, "moods"),
      where("userId", "==", USER_ID),
      where("timestamp", ">=", subDays(new Date(), 7)),
      orderBy("timestamp", "desc"),
      limit(7)
    );

    const unsubscribe = onSnapshot(moodQuery, (querySnapshot) => {
      const dailyMoods = new Map<string, number>();
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const day = format(data.timestamp.toDate(), 'E');
        if (!dailyMoods.has(day)) {
            dailyMoods.set(day, data.moodLevel);
        }
      });

      const chartData = lastSevenDays.reverse().map(day => ({
          day,
          mood: dailyMoods.get(day) || 0, // Use 0 if no mood was logged for that day
      }));

      setMoodData(chartData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleMoodSelection = async (moodLevel: number) => {
    setSelectedMood(moodLevel);
    try {
      await addDoc(collection(db, "moods"), {
        userId: USER_ID,
        moodLevel: moodLevel,
        timestamp: serverTimestamp(),
      });
      // Optionally show a success toast
    } catch (error) {
      console.error("Error adding document: ", error);
      // Optionally show an error toast
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">How are you feeling today?</CardTitle>
        <CardDescription>
          Track your mood to understand your emotional patterns.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex justify-around rounded-lg bg-secondary/50 p-4">
          {moods.map((mood) => (
            <Button
              key={mood.level}
              variant="ghost"
              size="icon"
              className={`h-16 w-16 flex-col gap-1 transition-transform duration-200 hover:scale-110 ${
                selectedMood === mood.level ? 'scale-110 bg-primary/20' : ''
              }`}
              onClick={() => handleMoodSelection(mood.level)}
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
            <ChartContainer config={chartConfig} className="h-full w-full">
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
                          labelFormatter={(label, payload) => {
                             if (payload && payload.length > 0 && payload[0].value > 0) {
                                return `${payload[0]?.payload.day}: ${moods.find(m => m.level === payload[0]?.value)?.label}`
                             }
                             return `${payload[0]?.payload.day}: No entry`;
                          }}
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
