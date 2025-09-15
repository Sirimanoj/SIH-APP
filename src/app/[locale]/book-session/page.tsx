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

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: 'Incomplete Selection',
        description: 'Please select a date and a time slot to book your session.',
        variant: 'destructive',
      });
      return;
    }

    // In a real application, you would handle the booking logic here,
    // like calling an API to save the appointment.
    toast({
      title: 'Booking Confirmed!',
      description: `Your session is booked for ${selectedDate.toLocaleDateString()} at ${selectedTime}. You will receive a confirmation email shortly.`,
    });

    // Reset selection after booking
    setSelectedTime(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          Book a Confidential Session
        </h1>
        <p className="text-muted-foreground">
          Schedule a private appointment with a campus counselor.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Schedule Your Appointment</CardTitle>
          <CardDescription>
            Select a date and time that works for you. All sessions are confidential.
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
                  Available Time Slots for {selectedDate?.toLocaleDateString()}
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
                  <h3 className="font-headline text-lg font-semibold">Confirm Your Booking</h3>
                   <div className="text-sm">
                    <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {selectedTime}</p>
                  </div>
                  <Textarea
                    placeholder="Reason for visit (optional, confidential)"
                  />
                  <Button onClick={handleBooking} className="w-full">
                    Book Appointment
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
