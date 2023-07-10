'use client'

import React, { FC, startTransition } from 'react'
import { Button } from '../ui/Button';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToSubpoedditValidator } from '@/lib/validators/subPoeddit';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useCustomToast } from '@/hooks/use-custom-toast';

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean
  subpoedditId: string
  subpoedditName: string
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({ isSubscribed, subpoedditId, subpoedditName }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { logintoast } = useCustomToast();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubpoedditValidator = {
        subpoedditId,
      }
      const { data } = await axios.post('/api/subpoeddit/subscribe', payload)
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
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
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without losing client-side browser or React state.
        router.refresh()
      })
      toast({
        title: 'Subscribed!',
        description: `You are now subscribed to r/${subpoedditName}`,
      })
    },
  })

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubpoedditValidator = {
        subpoedditId,
      }
      const { data } = await axios.post('/api/subpoeddit/unsubscribe', payload)
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
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
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without losing client-side browser or React state.
        router.refresh()
      })
      toast({
        title: 'Unsubscribed!',
        description: `You are now unsubscribed from r/${subpoedditName}`,
      })
    },
  })

  return isSubscribed ? (
    <Button isLoading={isUnsubLoading} onClick={() => unsubscribe()} disabled={isUnsubLoading} className='w-full mt-1 mb-4'>Leave Community</Button>
  ) : (
    <Button isLoading={isSubLoading} onClick={() => subscribe()} disabled={isSubLoading} className='w-full mt-1 mb-4'>Join to post</Button>
  )
}

export default SubscribeLeaveToggle