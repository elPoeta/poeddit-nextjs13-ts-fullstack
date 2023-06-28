'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { FC, ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

const Providers: FC<ProviderProps> = ({ children }) => {
  return (
    <ThemeProvider attribute='class'>
      <SessionProvider>
        {children}
      </SessionProvider>
    </ThemeProvider>
  )
}

export default Providers