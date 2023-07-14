
import { formatTimeToNow } from '@/lib/utils'
import { Post, User, Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'
import React, { FC, useRef } from 'react'

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  subpoedditName: string
  votesAmount: number
  commentAmount: number
}

const Post: FC<PostProps> = ({ post, subpoedditName, votesAmount, commentAmount }) => {
  const postRef = useRef<HTMLDivElement>(null)
  return (
    <div className='rounded-md shadow dark:shadow-slate-700'>
      <div className='px-6 py-4 flex justify-between'>

        <div className='w-0 flex-1'>
          <div className='max-h-40 mt-1 text-xs text-gray-500 dark:text-slate-300'>
            {subpoedditName ? (
              <>
                <a href={`/p/${subpoedditName}`} className='underline text-zinc-900 dark:text-slate-100 text-sm underline-offset-2'>p/{subpoedditName}</a>
                <span className='px-1'>∙</span>
              </>
            ) : null}
            <span>Posted by {post.author.name}</span>{' '}
            {formatTimeToNow(new Date(post.createdAt))}
          </div>
          <a href={`/p/${subpoedditName}/post/${post.id}`}>
            <h2 className='text-lg font-semibold py-2 leading-6 text-gray-900 dark:text-slate-100'>{post.title}</h2>
          </a>
          <div className='relative text-sm max-h-40 w-full overflow-clip' ref={postRef}>{postRef.current?.clientHeight === 160 ?
            (<div className='absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent'></div>) : null}</div>
        </div>
      </div>
      <div className='bg-gray-50 dark:bg-slate-800 z-20 text-sm px-4 py-4 sm:px-6'>
        <Link
          href={`/r/${subpoedditName}/post/${post.id}`}
          className='w-fit flex items-center gap-2'>
          <MessageSquare className='h-4 w-4' /> {commentAmount} comments
        </Link>
      </div>
    </div>
  )
}

export default Post