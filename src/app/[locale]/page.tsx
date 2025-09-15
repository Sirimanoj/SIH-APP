'use client';
import {redirect} from 'next/navigation';

// This page will be responsible for redirecting from a locale root 
// (e.g., /en) to the dashboard page for that locale.
export default function LocaleRootPage() {
  redirect('/dashboard');
}
