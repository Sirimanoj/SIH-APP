'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock user data since auth is disabled
const user = {
  displayName: 'Student',
  email: 'student@example.com',
  photoURL: '',
};

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Since auth is disabled, we can just navigate to a "logged out" state if one exists
    // For now, we'll just log to the console.
    console.log("User logged out (simulation)");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and personal information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.photoURL || undefined} />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="font-headline text-2xl">{user.displayName || 'Anonymous User'}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4">
                <h3 className="font-headline text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" defaultValue={user.displayName || ''} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" defaultValue={user.email || ''} disabled />
                    </div>
                </div>
                 <Button>Update Profile</Button>
            </div>
            
            <div className="space-y-4 rounded-lg border border-destructive p-4">
                <h3 className="font-headline text-lg font-semibold text-destructive">Danger Zone</h3>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className="font-medium">Log Out</p>
                        <p className="text-sm text-muted-foreground">Simulate logging out of the application.</p>
                    </div>
                    <Button variant="destructive" onClick={handleLogout}>Log Out</Button>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
