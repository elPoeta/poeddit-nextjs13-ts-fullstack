import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from '../ui/Button'
import '@/styles/home.css'

const HomeCard = () => {
  return (
    <div className='overflow-hidden h-fit rounded-lg border border-slate-800 dark:border-gray-200 order-first md:order-last'>
      <div className='banner text-slate-900 px-4 py-2'>
        <p className='font-semibold py-3 flex items-center gap-1.5'>
          <HomeIcon className='h-4 w-4' />
          Home
        </p>
      </div>
      <dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6'>
        <div className='flex justify-between gap-x-4 py-3'>
          <p>This is your main poeddit page. Use it to catch up with your favorite communities.</p>
        </div>

        <Link
          className={buttonVariants({
            className: 'w-full mt-4 mb-6',
          })}
          href={`/p/create`}>
          Create Community
        </Link>
      </dl>
    </div>
  )
}

export default HomeCard