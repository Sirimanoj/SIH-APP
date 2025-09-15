'use client';

import React, { useState } from 'react';
import { Menu, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import EmergencyDialog from '@/components/emergency-dialog';
import LanguageSwitcher from './language-switcher';

export function Header() {
  const [isEmergencyDialogOpen, setEmergencyDialogOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          {/* Page title could go here */}
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button
            variant="destructive"
            onClick={() => setEmergencyDialogOpen(true)}
          >
            <Phone className="mr-2 h-4 w-4" />
            Emergency Support
          </Button>
        </div>
      </header>
      <EmergencyDialog
        open={isEmergencyDialogOpen}
        onOpenChange={setEmergencyDialogOpen}
      />
    </>
  );
}
