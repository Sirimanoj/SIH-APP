'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, BookOpen, HeartPulse, LayoutDashboard, Users, CalendarCheck, User as UserIcon, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
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

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/chatbot', label: 'Mitra', icon: Bot },
  { href: '/resources', label: 'Resources', icon: BookOpen },
  { href: '/community', label: 'Community', icon: Users },
  { href: '/book-session', label: 'Book a Session', icon: CalendarCheck },
];

export function MainNav() {
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();

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
                    isActive={pathname === item.href}
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
            {loading ? (
                <div className='p-2'></div>
            ) : user ? (
                 <SidebarMenu>
                    <SidebarMenuItem>
                        <Link href="/profile" passHref>
                            <SidebarMenuButton isActive={pathname === '/profile'} tooltip="Profile">
                                <Avatar className="h-6 w-6">
                                    <AvatarFallback>
                                        <UserIcon className="h-4 w-4"/>
                                    </AvatarFallback>
                                </Avatar>
                                <span>Profile</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={logout} tooltip="Logout">
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 </SidebarMenu>
            ) : (
                <SidebarMenu>
                    <SidebarMenuItem>
                         <Link href="/login" passHref>
                            <SidebarMenuButton isActive={pathname === '/login'} tooltip="Login">
                                <UserIcon />
                                <span>Login</span>
                            </SidebarMenuButton>
                        </Link>
                    </SidebarMenuItem>
                </SidebarMenu>
            )}
        </SidebarFooter>
      </Sidebar>
  );
}
