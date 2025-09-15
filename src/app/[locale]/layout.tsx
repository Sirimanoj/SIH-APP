
import React from 'react';
import { ClientProviders } from '@/components/layout/client-providers';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export default async function AppLayout({ children, params: {locale} }: { children: React.ReactNode, params: {locale: string} }) {
  const messages = await getMessages();
  
  return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </NextIntlClientProvider>
  );
}
