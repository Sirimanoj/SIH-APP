

'use client';
import React from 'react';
import Link from 'next/link';
import MoodTracker from '@/components/dashboard/mood-tracker';
import DailyTip from '@/components/dashboard/daily-tip';
import QuickActions from '@/components/dashboard/quick-actions';
import {useTranslations} from 'next-intl';

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {t('welcome')}
        </h1>
        <p className="text-muted-foreground">
          {t('subtitle')}
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
