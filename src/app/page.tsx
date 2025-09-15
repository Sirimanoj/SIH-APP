
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is a temporary redirect to the dashboard.
// In a real app, you might have a landing page here.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return null;
}
