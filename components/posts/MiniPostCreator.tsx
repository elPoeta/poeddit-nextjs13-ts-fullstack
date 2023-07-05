'use client'
import { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import React, { FC } from 'react'
import UserAvatar from '../user/UserAvatar'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { ImageIcon, Link2 } from 'lucide-react'

interface MiniPostCreatorProps {
  session: Session | null
}

const MiniPostCreator: FC<MiniPostCreatorProps> = ({ session }) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div className='overflow-hidden rounded-md shadow bg-white dark:bg-slate-800'>
      <div className='h-full px-3 py-4 flex justify-between gap-3'>
        <div className='relative'>
          <UserAvatar user={{ name: session?.user.name || null, image: session?.user.image || null }} />
          <span className='absolute bottom-0 rounded-full right-0 w-3 h-3 bg-emerald-400 outline outline-2 outline-white dark:outline-slate-900'></span>
        </div>
        <Input readOnly onClick={() => router.push(`${pathName}/submit`)} placeholder='Create post' />
        <Button variant='ghost' onClick={() => router.push(`${pathName}/submit`)} >
          <ImageIcon />
        </Button>
        <Button variant='ghost' onClick={() => router.push(`${pathName}/submit`)} >
          <Link2 />
        </Button>
      </div>
    </div>
  )
}

export default MiniPostCreator