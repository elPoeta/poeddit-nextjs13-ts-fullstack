'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {Sun, Moon } from 'lucide-react'

const ToggleTheme = () => {
  const { resolvedTheme, setTheme } = useTheme()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return null
  }

  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='flex items-center justify-center rounded-lg p-2 transition-colors hover:bg-slate-300 dark:hover:bg-zinc-700'
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className='h-5 w-5 text-orange-300' />
      ) : (
        <Moon className='h-5 w-5 text-slate-800' />
      )}
    </button>
  )
}

export default ToggleTheme