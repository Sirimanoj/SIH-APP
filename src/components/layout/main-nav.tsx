
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, BookOpen, HeartPulse, LayoutDashboard, Users, CalendarCheck, User as UserIcon, LogOut, BrainCircuit } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useTranslations } from 'next-intl';

export function MainNav() {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  const menuItems = [
    { href: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/chatbot', label: t('mitra'), icon: Bot },
    { href: '/resources', label: t('resources'), icon: BookOpen },
    { href: '/community', label: t('community'), icon: Users },
    { href: '/book-session', label: t('bookSession'), icon: CalendarCheck },
    { href: '/cbt-exercise', label: t('cbtExercise'), icon: BrainCircuit },
  ];

  return (
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <HeartPulse className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="font-headline text-xl font-semibold">MannMitra</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton
                    isActive={pathname.endsWith(item.href)}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <Link href="/profile" passHref>
                        <SidebarMenuButton isActive={pathname.endsWith('/profile')} tooltip={t('profile')}>
                             <Avatar className="h-6 w-6">
                                <AvatarFallback>
                                    <UserIcon className="h-4 w-4"/>
                                </AvatarFallback>
                            </Avatar>
                            <span>{t('profile')}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
  );
}
