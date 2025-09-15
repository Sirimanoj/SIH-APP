
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
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
import { useToast } from '@/hooks/use-toast';
import { HeartPulse } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(email, password, displayName);
      toast({
        title: 'Registration Successful',
        description: 'Welcome to MannMitra! Please log in.',
      });
      router.push('/login');
    } catch (error: any)
      {
      console.error(error);
      let errorMessage = 'An error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use. Please log in or use a different email.';
      } else if (error.code === 'auth/weak-password') {
          errorMessage = 'The password is too weak. It must be at least 6 characters long.';
      } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/configuration-not-found') {
          errorMessage = "Configuration error. Please enable Email/Password sign-in provider in your Firebase console's Authentication section.";
      } else if (error.message) {
          errorMessage = error.message;
      }
      
      toast({
        title: 'Registration Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                        <HeartPulse className="h-8 w-8 text-primary-foreground" />
                    </div>
                </Link>
            </div>
          <CardTitle className="font-headline text-2xl">Create an Account</CardTitle>
          <CardDescription>Join MannMitra to start your wellness journey</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Full Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="John Doe"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
