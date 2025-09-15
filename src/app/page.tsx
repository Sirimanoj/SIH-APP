'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page redirects the user from the root of the site (e.g., /)
// to the main dashboard page for the default locale.
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return null;
}
