
import React from 'react';
import Link from 'next/link';
import MoodTracker from '@/components/dashboard/mood-tracker';
import DailyTip from '@/components/dashboard/daily-tip';
import QuickActions from '@/components/dashboard/quick-actions';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Welcome back, Student!
        </h1>
        <p className="text-muted-foreground">
          Your mental wellness journey continues here.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MoodTracker />
        </div>
        <div className="flex flex-col gap-6">
          <QuickActions />
          <DailyTip />
        </div>
      </div>
    </div>
  );
}

