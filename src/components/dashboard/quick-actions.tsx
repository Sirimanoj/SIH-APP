
'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, BookOpen, Users, CalendarCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslations } from 'next-intl';

export default function QuickActions() {
  const t = useTranslations('QuickActions');

  const actions = [
    {
      href: '/chatbot',
      icon: Bot,
      title: t('mitraTitle'),
      description: t('mitraDescription'),
      color: 'bg-primary/10 text-primary',
    },
    {
      href: '/resources',
      icon: BookOpen,
      title: t('resourcesTitle'),
      description: t('resourcesDescription'),
      color: 'bg-accent/20 text-green-600',
    },
    {
      href: '/community',
      icon: Users,
      title: t('communityTitle'),
      description: t('communityDescription'),
      color: 'bg-orange-100 text-orange-600',
    },
    {
      href: '/book-session',
      icon: CalendarCheck,
      title: t('bookSessionTitle'),
      description: t('bookSessionDescription'),
      color: 'bg-blue-100 text-blue-600',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">{t('title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {actions.map((action) => (
          <Link href={action.href} key={action.title} className="group">
            <div className="flex items-center gap-4 rounded-lg border p-4 transition-all group-hover:bg-secondary/50 group-hover:shadow-sm">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${action.color}`}>
                <action.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">{action.title}</p>
                <p className="text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
