import React from 'react';
import {NextIntlClientProvider, useMessages} from 'next-intl';
import { ClientProviders } from '@/components/layout/client-providers';

export default function AppLayout({ children, params: {locale} }: { children: React.ReactNode, params: {locale: string} }) {
  const messages = useMessages();
  
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientProviders>
            {children}
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}