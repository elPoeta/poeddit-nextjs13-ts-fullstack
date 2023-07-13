import MiniPostCreator from '@/components/posts/MiniPostCreator'
import PostFeed from '@/components/posts/PostFeed'
import { findSubpoedditByNameIncludePostsAll } from '@/db/subPoeddit'
import { getAuthSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'

interface SubpoedditSlugPageProps {
  params: {
    slug: string
  }
}
const subpoedditSlugPage: FC<SubpoedditSlugPageProps> = async ({ params }) => {
  const { slug } = params
  const session = await getAuthSession();
  const subpoeddit = await findSubpoedditByNameIncludePostsAll(slug)

  if (!subpoeddit) return notFound()
  return (
    <div>
      <h2 className='font-bold text-3xl md:text-4xl h-14'>p/{subpoeddit.name}</h2>
      <MiniPostCreator session={session} />
      <PostFeed initialPosts={subpoeddit.posts} subpoedditName={subpoeddit.name} />
    </div>
  )
}

export default subpoedditSlugPage