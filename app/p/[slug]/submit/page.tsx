import Editor from '@/components/editor/Editor';
import { Button } from '@/components/ui/Button';
import { findSubpoedditByName } from '@/db/subPoeddit';
import { notFound } from 'next/navigation';
import React, { FC } from 'react'

interface SubmitPageProps {
  params: {
    slug: string
  }
}

const submitPostPage: FC<SubmitPageProps> = async ({ params }) => {
  const { slug } = params;
  const subpoeddit = await findSubpoedditByName(slug);
  if (!subpoeddit) return notFound();

  return (
    <div className='flex flex-col items-start gap-6'>
      <div className='border-b border-gray-200 dark:border-slate-500 pb-5'>
        <div className='-ml-2 mt-2 flex flex-wrap items-baseline'>
          <h3 className='ml-2 mt-2 text-base font-semibold leading-6'>Create Post</h3>
          <p className='ml-2 mt-1 truncate text-sm text-gray-500 dark:text-slate-400'>in p/{subpoeddit.name}</p>
        </div>
      </div>

      <Editor subpoedditId={subpoeddit.id} />

      <div className='w-full flex justify-end'>
        <Button type='submit' className='w-full' form='subpoeddit-post-form'>Post</Button>
      </div>
    </div>
  )
}

export default submitPostPage