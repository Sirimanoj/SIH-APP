'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is the root page of the entire application.
// It redirects the user to the dashboard for the default locale.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return null; // Return null as this page is for redirection only
}