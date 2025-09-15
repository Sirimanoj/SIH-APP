import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { MainNav } from '@/components/layout/main-nav';
import { Header } from '@/components/layout/header';

// This file is intentionally left blank. 
// The layout is now handled by src/app/[locale]/layout.tsx
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
