
import React from 'react';
import { ClientProviders } from '@/components/layout/client-providers';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
      <ClientProviders>
        {children}
      </ClientProviders>
  );
}
