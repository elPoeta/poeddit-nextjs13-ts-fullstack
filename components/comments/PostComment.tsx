'use client'
import React, { FC, useRef } from 'react'
import UserAvatar from '../user/UserAvatar'
import { Comment, CommentVote, User, Vote } from '@prisma/client'
import { formatTimeToNow } from '@/lib/utils'

type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}

interface PostCommentProps {
  comment: ExtendedComment
}

const PostComment: FC<PostCommentProps> = ({ comment }) => {
  const commentRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={commentRef} className='flex flex-col'>
      <div className='flex items-center'>
        <UserAvatar user={{
          name: comment.author.name || null,
          image: comment.author.image || null
        }} className='h-6 w-6' />
      </div>
      <div className='ml-2 flex items-center gap-x-2'>
        <p className='text-sm font-medium text-gray-500 dark:text-gray-300'>{comment.author.username}</p>
        <p className='max-h-40 truncate text-xs text-zinc-500 dark:text-slate-500'>{formatTimeToNow(new Date(comment.createdAt))}</p>
      </div>
      <p className='text-sm text-zinc-900 dark:text-slate-100 mt-2'>{comment.text}</p>
    </div>
  )
}

export default PostComment