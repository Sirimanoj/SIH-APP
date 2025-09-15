
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page redirects the user from the root of a locale (e.g., /en or /hi)
// to the main dashboard page for that locale.
export default function LocaleRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return null;
}
