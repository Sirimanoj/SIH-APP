'use client';

import React, { useState, useEffect } from 'react';
import { MainNav } from './main-nav';

export function ClientNav() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <MainNav /> : null;
}
