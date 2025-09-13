'use client';

import React from 'react';
import Link from 'next/link';
import { Bot, BookOpen, Users, CalendarCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const actions = [
  {
    href: '/chatbot',
    icon: Bot,
    title: 'AI Chatbot',
    description: "Talk about what's on your mind.",
    color: 'bg-primary/10 text-primary',
  },
  {
    href: '/resources',
    icon: BookOpen,
    title: 'Resources',
    description: 'Explore articles and guides.',
    color: 'bg-accent/20 text-green-600',
  },
  {
    href: '/community',
    icon: Users,
    title: 'Community',
    description: 'Connect with your peers.',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    href: '/book-session',
    icon: CalendarCheck,
    title: 'Book a Session',
    description: 'Schedule a confidential appointment.',
    color: 'bg-blue-100 text-blue-600',
  },
];

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Quick Actions</CardTitle>
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
