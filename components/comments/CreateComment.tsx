'use client'

import React, { FC, useState } from 'react'
import { Label } from '../ui/Label'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { CommentRequest } from '@/lib/validators/comment'
import { toast } from '@/hooks/use-toast'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { useRouter } from 'next/navigation'

interface CreateCommentProps {
  postId: string
  replyToId?: string
}
const CreateComment: FC<CreateCommentProps> = ({ postId, replyToId }) => {
  const [input, setInput] = useState<string>('')
  const { logintoast } = useCustomToast()
  const router = useRouter()

  const { mutate: comment, isLoading } = useMutation({
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
    <div className='grid w-full gap-1.5'>
      <Label htmlFor='comment'>Your Comment</Label>
      <div className='mt-2'>
        <Textarea id='comment' value={input} onChange={(ev) => setInput(ev.target.value)} rows={1} placeholder='What are your thoughts?' />
        <div className='mt-2 flex justify-end'>
          <Button isLoading={isLoading} disabled={input.length === 0} onClick={() => comment({ postId, text: input, replyToId })}>Post</Button>
        </div>
      </div>
    </div >
  )
}

export default CreateComment