'use client';
import CbtExercise from '@/components/cbt/cbt-exercise';
import { useTranslations } from 'next-intl';

export default function CbtExercisePage() {
  const t = useTranslations('CbtExercise');
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>
      <CbtExercise />
    </div>
  );
}
