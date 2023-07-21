'use client'
import React, { FC, useRef, useState } from 'react'
import UserAvatar from '../user/UserAvatar'
import { Comment, CommentVote, User, VoteType } from '@prisma/client'
import { formatTimeToNow } from '@/lib/utils'
import CommentVotes from './CommentVotes'
import { Button } from '../ui/Button'
import { MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Label } from '../ui/Label'
import { Textarea } from '../ui/Textarea'
import axios, { AxiosError } from 'axios'
import { toast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { CommentRequest } from '@/lib/validators/comment'

type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}

interface PostCommentProps {
  comment: ExtendedComment
  postId: string
  initialVotesAmount: number
  initialVote?: Pick<CommentVote, 'type'> | null | undefined
}

const PostComment: FC<PostCommentProps> = ({ comment, initialVotesAmount, initialVote, postId }) => {
  const commentRef = useRef<HTMLDivElement>(null)
  const router = useRouter();
  const { data: session } = useSession()
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const { logintoast } = useCustomToast()

  const { mutate: replyComment, isLoading } = useMutation({
    mutationFn: async (commentRequest: CommentRequest) => {
      const payload: CommentRequest = commentRequest
      const { data } = await axios.patch('/api/subpoeddit/post/comment', payload)
      return data
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return logintoast()
        }
      }

      return toast({
        title: 'There was a problem.',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      router.refresh()
      setInput('')
    }
  })

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
      <div className='flex gap-2 items-center flex-wrap'>
        <CommentVotes commentId={comment.id} initialVotesAmount={initialVotesAmount} initialVote={initialVote} />
        <Button onClick={() => {
          if (!session) return router.push('/sign-in')
          setIsReplying(true)
        }} variant='ghost' size='xs' aria-label='reply'>
          <MessageSquare className='h-4 w-4 mr-1.5' />
          Reply
        </Button>
        {isReplying ? (
          <div className='grid w-full gap-1.5'>
            <Label htmlFor='replyComment'>Your Comment</Label>
            <div className='mt-2'>
              <Textarea id='replyComment' value={input} onChange={(ev) => setInput(ev.target.value)} rows={1} placeholder='What are your thoughts?' />
              <div className='mt-2 flex justify-end gap-2'>
                <Button tabIndex={-1} variant='secondary' onClick={() => setIsReplying(false)}>Cancel</Button>
                <Button isLoading={isLoading} disabled={input.length === 0} onClick={() => replyComment({ postId, text: input, replyToId: comment.replyToId ?? comment.id })}>Post</Button>
              </div>
            </div>
          </div >) : null}
      </div>
    </div>
  )
}

export default PostComment