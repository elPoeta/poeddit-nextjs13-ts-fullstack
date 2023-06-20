'use client'

import { ThemeProvider } from 'next-themes'
import { FC, ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

const Providers:FC<ProviderProps> = ({children}) => {
  return (
    <ThemeProvider attribute='class'>{children}</ThemeProvider>
  )
}

export default Providers