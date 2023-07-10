import SubscribeLeaveToggle from '@/components/subscriptions/SubscribeLeaveToggle'
import { buttonVariants } from '@/components/ui/Button'
import { findSubpoedditByNameIncludePosts } from '@/db/subPoeddit'
import { findSubscriptionBySubpoedditNameAndUserId, subscriptionCount } from '@/db/subscription'
import { getAuthSession } from '@/lib/auth'
import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { FC, ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode,
  params: {
    slug: string
  }
}

const Layout: FC<LayoutProps> = async ({ children, params }) => {
  const session = await getAuthSession();
  const subpoeddit = await findSubpoedditByNameIncludePosts(params.slug);
  const subscription = !session?.user ? undefined : await findSubscriptionBySubpoedditNameAndUserId(params.slug, session.user.id);
  const isSubscribed = !!subscription
  if (!subpoeddit) return notFound()
  const membersCount = await subscriptionCount(params.slug)
  return (
    <div className='sm:container max-w-7xl mx-auto h-full pt-12'>
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6'>
          <div className='flex flex-col col-sapn-2 space-y-6'>{children}</div>
          <div className='hidden md:block overflow-hidden h-fit rounded-lg  border border-slate-800 dark:border-gray-200 order-first md:order-last'>
            <div className='px-6 py-4'>
              <p className='font-semibold py-3'>About p/{subpoeddit.name}</p>
            </div>
            <dl className='divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white dark:bg-slate-800'>
              <div className='flex justify-between gap-x-4 py-3'>
                <dt className='text-gray-500 dark:text-gray-300'>Created</dt>
                <dd className='text-gray-700 dark:text-gray-400'>
                  <time dateTime={subpoeddit.createdAt.toDateString()}>
                    {format(subpoeddit.createdAt, 'MMMM d, yyyy')}
                  </time>
                </dd>
              </div>
              <div className='flex justify-between gap-x-4 py-3'>
                <dt className='text-gray-500 dark:text-gray-300'>Members</dt>
                <dd className='flex items-start gap-x-2'>
                  <div className='text-gray-900 dark:text-gray-100'>{membersCount}</div>
                </dd>
              </div>
              {subpoeddit.creatorId === session?.user?.id ? (
                <div className='flex justify-between gap-x-4 py-3'>
                  <dt className='text-gray-500 dark:text-gray-300'>You created this community</dt>
                </div>
              ) : null}

              {subpoeddit.creatorId !== session?.user?.id ? (
                <SubscribeLeaveToggle isSubscribed={isSubscribed} subpoedditId={subpoeddit.id} subpoedditName={subpoeddit.name} />
              ) : null}
              <Link
                className={buttonVariants({
                  variant: 'outline',
                  className: 'w-full mb-6',
                })}
                href={`r/${params.slug}/submit`}>
                Create Post
              </Link>

            </dl>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Layout