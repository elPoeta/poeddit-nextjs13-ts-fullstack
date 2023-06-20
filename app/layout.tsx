import Providers from '@/components/providers/Providers'
import { classTwMerge } from '@/lib/utils'
import '@/styles/globals.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'poeddit',
  description: 'poeddit - reddit clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={classTwMerge('dark:bg-slate-900 dark:text-white dark bg-white text-slate-900 antialiased', nunito.className)} style={{ colorScheme: 'dark' }}>
        <Providers>
          <header></header>
          <main>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
