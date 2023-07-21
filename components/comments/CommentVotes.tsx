import { useCustomToast } from '@/hooks/use-custom-toast';
import { toast } from '@/hooks/use-toast';
import { VoteCommentRequest } from '@/lib/validators/vote';
import { usePrevious } from '@mantine/hooks';
import { CommentVote, VoteType } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import React, { FC, useState } from 'react'
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';

interface CommentVotesProps {
  commentId: string
  initialVotesAmount: number
  initialVote?: Pick<CommentVote, 'type'> | null | undefined
}

const CommentVotes: FC<CommentVotesProps> = ({ commentId, initialVotesAmount, initialVote }) => {
  const { logintoast } = useCustomToast()
  const [votesAmount, setVotesAmount] = useState<number>(initialVotesAmount);
  const [currentVote, setCurrentVote] = useState<Pick<CommentVote, 'type'> | null | undefined>(initialVote);
  const previusVote = usePrevious(initialVote);

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: Pick<CommentVote, 'type'>) => {
      const payload: VoteCommentRequest = {
        commentId,
        voteType: voteType.type
      }
      const { data } = await axios.patch('/api/subpoeddit/post/comment/vote', payload)
    },
    onError: (error, voteType) => {
      if (voteType.type === 'UP') {
        setVotesAmount((prev) => prev - 1);
      } else {
        setVotesAmount((prev) => prev + 1);
      }
      setCurrentVote(previusVote)
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return logintoast()
        }
      }
      return toast({
        title: 'Somthing went wrong',
        description: 'Your vote was not registered, please try again.',
        variant: 'destructive'
      })
    },
    onMutate: (voteType: Pick<CommentVote, 'type'>) => {
      if (currentVote?.type === voteType.type) {
        setCurrentVote(undefined)
        if (voteType.type === 'UP') {
          setVotesAmount((prev) => prev - 1)
        } else if (voteType.type === 'DOWN') {
          setVotesAmount((prev) => prev + 1)
        }
      } else {
        setCurrentVote(voteType)
        if (voteType.type === 'UP') {
          setVotesAmount((prev) => prev + (currentVote?.type ? 2 : 1))
        } else if (voteType.type === 'DOWN') {
          setVotesAmount((prev) => prev - (currentVote?.type ? 2 : 1))

        }
      }
    }
  })
  return (
    <div className='flex gap-1'>
      <Button onClick={() => vote({ type: 'UP' })} size='sm' variant='ghost' aria-label='upvote'>
        <ArrowBigUp className={cn('h-5 w-5 text-zinc-700 dark:text-slate-300', { 'text-emerald-500 fill-emerald-500': currentVote?.type === 'UP' })} />
      </Button>
      <p className='text-center py-2 font-medium text-sm text-zinc-900 dark:text-slate-100'>{votesAmount}</p>
      <Button onClick={() => vote({ type: 'DOWN' })} size='sm' variant='ghost' aria-label='downvote'>
        <ArrowBigDown className={cn('h-5 w-5 text-zinc-700 dark:text-slate-300', { 'text-red-500 fill-red-500': currentVote?.type === 'DOWN' })} />
      </Button>
    </div>
  )
}

export default CommentVotes