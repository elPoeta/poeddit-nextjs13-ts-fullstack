'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { toast } from '@/hooks/use-toast'
import { CreateSubPoedditPayload } from '@/lib/validators/subPoeddit'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreatePage = () => {
  const router = useRouter()
  const [input, setInput] = useState<string>('')

  const { mutate: createSubpoeddit, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubPoedditPayload = { name: input }
      const { data } = await axios.post("/api/subpoeddit", payload)
      return data as string
    },
    onError: (error) => {
      //TODO handle axios errors
      console.error(error)

      toast({
        title: 'There was an error.',
        description: 'Could not create subpoeddit.',
        variant: 'destructive',
      })
    },
    onSuccess: (data) => {
      router.push(`/p/${data}`)
    },
  },
  )

  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto'>
      <div className='relative bg-white dark:bg-slate-900 w-full h-fit p-4 rounded-lg space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Community</h1>
        </div>

        <hr className='bg-red-500 h-px' />

        <div>
          <p className='text-lg font-medium'>Name</p>
          <p className='text-xs pb-2'>
            Community names including capitalization cannot be changed.
          </p>
          <div className='relative'>
            <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
              p/
            </p>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='pl-6'
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          <Button
            disabled={isLoading}
            variant='secondary'
            onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => createSubpoeddit()}>
            Create Community
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CreatePage