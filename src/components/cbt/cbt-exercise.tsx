'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { cbtGuidedExercise, CbtGuidedExerciseOutput } from '@/app/actions';
import { ArrowRight, BrainCircuit, Lightbulb, Loader, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Step = 'input' | 'analysis' | 'complete';

export default function CbtExercise() {
  const t = useTranslations('CbtExercise');
  const [step, setStep] = useState<Step>('input');
  const [negativeThought, setNegativeThought] = useState('');
  const [analysis, setAnalysis] = useState<CbtGuidedExerciseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStartAnalysis = async () => {
    if (!negativeThought.trim()) return;
    setIsLoading(true);
    try {
      const result = await cbtGuidedExercise({ negativeThought });
      setAnalysis(result);
      setStep('analysis');
    } catch (error) {
      console.error('Error getting CBT analysis:', error);
      // You could show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const resetExercise = () => {
    setStep('input');
    setNegativeThought('');
    setAnalysis(null);
  };
  
  const renderStep = () => {
    switch (step) {
      case 'input':
        return (
          <Card>
            <CardHeader>
              <CardTitle>{t('step1Title')}</CardTitle>
              <CardDescription>{t('step1Description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={t('thoughtPlaceholder')}
                value={negativeThought}
                onChange={(e) => setNegativeThought(e.target.value)}
                rows={4}
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleStartAnalysis} disabled={isLoading || !negativeThought.trim()}>
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    {t('analyzingButton')}
                  </>
                ) : (
                  <>
                    {t('analyzeButton')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      case 'analysis':
        if (!analysis) return null;
        return (
          <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className='font-headline'>{t('originalThoughtTitle')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="italic">"{negativeThought}"</p>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline">{t('distortionsTitle')}</CardTitle>
                </div>
                <CardDescription className="pt-2">{t('distortionsDescription')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {analysis.cognitiveDistortions.map((distortion, index) => (
                  <div key={index} className="rounded-lg border bg-secondary/50 p-4">
                    <p className="font-semibold">{distortion.name}</p>
                    <p className="text-sm text-muted-foreground">{distortion.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-green-600">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline">{t('challengeTitle')}</CardTitle>
                </div>
                 <CardDescription className="pt-2">{t('challengeDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  {analysis.socraticQuestions.map((q, index) => (
                    <li key={index}>{q}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                        <Sparkles className="h-6 w-6" />
                    </div>
                  <CardTitle className="font-headline">{t('reframeTitle')}</CardTitle>
                </div>
                <CardDescription className="pt-2">{t('reframeDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="italic">"{analysis.reframedThought}"</p>
              </CardContent>
            </Card>

             <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={resetExercise}>{t('startOverButton')}</Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}
