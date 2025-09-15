
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
import { useTranslations } from 'next-intl';

const user = {
  displayName: 'Student',
  email: 'student@example.com',
  photoURL: '',
};

export default function ProfilePage() {
  const t = useTranslations('Profile');

  const handleLogout = () => {
    // Since auth is disabled, we can just navigate to a "logged out" state if one exists
    // For now, we'll just log to the console.
    console.log("User logged out (simulation)");
    // In a real app with auth, you might do: router.push('/login');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground">
          {t('description')}
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
                <h3 className="font-headline text-lg font-semibold">{t('personalInfo')}</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="displayName">{t('displayName')}</Label>
                        <Input id="displayName" defaultValue={user.displayName || ''} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">{t('emailAddress')}</Label>
                        <Input id="email" defaultValue={user.email || ''} disabled />
                    </div>
                </div>
                 <Button>{t('updateProfile')}</Button>
            </div>
            
            <div className="space-y-4 rounded-lg border border-destructive p-4">
                <h3 className="font-headline text-lg font-semibold text-destructive">{t('dangerZone')}</h3>
                <div className='flex items-center justify-between'>
                    <div>
                        <p className="font-medium">{t('logOut')}</p>
                        <p className="text-sm text-muted-foreground">{t('logOutDescription')}</p>
                    </div>
                    <Button variant="destructive" onClick={handleLogout}>{t('logOut')}</Button>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
