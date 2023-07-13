
import { formatTimeToNow } from '@/lib/utils'
import { Post, User, Vote } from '@prisma/client'
import React, { FC } from 'react'

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  subpoedditName: string
}

const Post: FC<PostProps> = ({ post, subpoedditName }) => {
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
        </div>
      </div>
    </div>
  )
}

export default Post