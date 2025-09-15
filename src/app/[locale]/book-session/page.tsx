

'use client';

import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';
import { add } from 'date-fns';
import { useTranslations } from 'next-intl';

const availableTimeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
];

export default function BookSessionPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { toast } = useToast();
  const t = useTranslations('BookSession');

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: t('incompleteSelection'),
        description: t('incompleteSelectionDesc'),
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: t('bookingConfirmed'),
      description: t('bookingConfirmedDesc', {
        date: selectedDate.toLocaleDateString(),
        time: selectedTime,
      }),
    });

    setSelectedTime(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {t('title')}
        </h1>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('cardTitle')}</CardTitle>
          <CardDescription>
            {t('cardDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) || date.getDay() === 0 || date.getDay() === 6}
                className="rounded-md border"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 font-headline text-lg font-semibold">
                  {t('availableSlots')} {selectedDate?.toLocaleDateString()}
                </h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {availableTimeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      onClick={() => setSelectedTime(time)}
                      className="flex items-center gap-2"
                    >
                      <Clock className="h-4 w-4" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              
              {selectedTime && (
                <div className="space-y-4 rounded-lg border bg-secondary/50 p-4">
                  <h3 className="font-headline text-lg font-semibold">{t('confirmBooking')}</h3>
                   <div className="text-sm">
                    <p><strong>{t('date')}:</strong> {selectedDate?.toLocaleDateString()}</p>
                    <p><strong>{t('time')}:</strong> {selectedTime}</p>
                  </div>
                  <Textarea
                    placeholder={t('reasonPlaceholder')}
                  />
                  <Button onClick={handleBooking} className="w-full">
                    {t('bookAppointment')}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
