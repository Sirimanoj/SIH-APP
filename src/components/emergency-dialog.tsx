'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Phone, LifeBuoy } from 'lucide-react';

type EmergencyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function EmergencyDialog({ open, onOpenChange }: EmergencyDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center gap-2">
              <LifeBuoy className="h-6 w-6 text-destructive" />
              Immediate Support Available
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            If you are in a crisis or any other person may be in danger, please don't use this app. These resources can provide you with immediate help.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
            <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <Phone className="h-5 w-5 text-destructive" />
                </div>
                <div>
                    <h3 className="font-semibold">National Suicide Prevention Lifeline</h3>
                    <p className="text-muted-foreground">Call or text 988 anytime in the US and Canada.</p>
                    <a href="tel:988" className="text-sm font-medium text-primary hover:underline">Call 988</a>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <Phone className="h-5 w-5 text-destructive" />
                </div>
                <div>
                    <h3 className="font-semibold">iCALL Psychosocial Helpline (India)</h3>
                    <p className="text-muted-foreground">Available Mon-Sat, 10 AM to 8 PM.</p>
                    <a href="tel:022-25521111" className="text-sm font-medium text-primary hover:underline">Call 022-25521111</a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-destructive/10">
                    <LifeBuoy className="h-5 w-5 text-destructive" />
                </div>
                <div>
                    <h3 className="font-semibold">Crisis Text Line</h3>
                    <p className="text-muted-foreground">Text HOME to 741741 from anywhere in the US, anytime, about any type of crisis.</p>
                     <a href="sms:741741" className="text-sm font-medium text-primary hover:underline">Text HOME to 741741</a>
                </div>
            </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction>I understand</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
