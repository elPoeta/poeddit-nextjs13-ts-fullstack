import Navbar from '@/components/navbar/Navbar'
import Providers from '@/components/providers/Providers'
import { Toaster } from '@/components/ui/Toaster'
import { cn } from '@/lib/utils'
import '@/styles/globals.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'poeddit',
  description: 'poeddit - reddit clone',
}

export default function RootLayout({
  children,
 //authModal
}: {
  children: React.ReactNode,
 // authModal: React.ReactNode
}) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body suppressHydrationWarning className={cn(' min-h-screen pt-12 antialiased', nunito.className)} style={{ colorScheme: 'dark' }}>
        <Providers>
          <header className='fixed top-0 inset-x-0 h-fit border-b dark:bg-slate-800  dark:border-slate-600 bg-zinc-100 border-zinc-300 z-[10] py-2'>
            <Navbar />
          </header>
          <main className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </main>
        {/*{authModal}*/}
        </Providers>
        <Toaster />
      </body>
    </html>
  )
}
