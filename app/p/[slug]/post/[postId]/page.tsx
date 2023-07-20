import EditorOutput from '@/components/editor/EditorOutput'
import PostVoteServer from '@/components/posts/PostVoteServer'
import { buttonVariants } from '@/components/ui/Button'
import { db } from '@/lib/prisma'
import { redis } from '@/lib/redis'
import { formatTimeToNow } from '@/lib/utils'
import { CachedPost } from '@/types/redis'
import { Post, User, Vote } from '@prisma/client'
import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import React, { FC, Suspense } from 'react'

interface PageProps {
  params: {
    postId: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const page: FC<PageProps> = async ({ params }) => {
  const cachedPost = await redis.hgetall(`post: ${params.postId}`) as CachedPost
  let post: (Post & { votes: Vote[]; author: User }) | null = null
  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId
      },
      include: {
        votes: true,
        author: true
      }
    })
  }
  if (!post && !cachedPost) return notFound()


  return (
    <div>
      <div className='h-full flex flex-col sm:flex-row items-center sm:items-start justify-between '>
        <Suspense fallback={<PostVoteShell />}>
          <PostVoteServer postId={post?.id ?? cachedPost?.id} initialVotesAmount={0} getData={async () => {
            return await db.post.findUnique({
              where: {
                id: params.postId
              },
              include: {
                votes: true
              }
            })
          }} />
        </Suspense>
        <div className='w-full sm:w-0 flex-1 bg-white dark:bg-slate-800 rounded-sm p-4'>
          <p className='max-h-40 mt-1 truncate text-xs text-gray-500 dark:text-gray-300'>
            Posted by {post?.author.username ?? cachedPost.authortUserName}{' '}
            {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
          </p>
          <h1 className='text-xl font-semibold py-2 leading-6 text-gray-900 dark:text-gray-100'>
            {post?.title ?? cachedPost.title}
          </h1>
          <EditorOutput content={post?.content ?? cachedPost.content} />
        </div>
      </div>
    </div>
  )
}

function PostVoteShell() {
  return (
    <div className='flex flex-col items-center pr-6 w-20'>
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigUp className='h-5 w-5 text-zinc-700 dark:text-slate-300' />
      </div>

      <div className='text-center py-2 font-medium text-sm text-zinc-900 dark:text-slate-100'>
        <Loader2 className='h-3 w-3 animate-spin' />
      </div>

      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigDown className='h-5 w-5 text-zinc-700 dark:text-slate-300' />
        d</div>
    </div>)
}
export default page