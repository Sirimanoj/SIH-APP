
import React from 'react';
import { ClientProviders } from '@/components/layout/client-providers';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function AppLayout({ children, params: {locale} }: { children: React.ReactNode, params: {locale: string} }) {
  let messages;
  try {
    messages = await getMessages();
  } catch (error) {
    notFound();
  }
  
  return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </NextIntlClientProvider>
  );
}
