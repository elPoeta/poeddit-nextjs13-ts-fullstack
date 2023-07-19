import { INFINITE_SCROLLING_PAGINATION } from '@/lib/constants'
import { db } from '@/lib/prisma'
import React from 'react'
import PostFeed from '../posts/PostFeed'

const GeneralFeed = async () => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      subpoeddit: true,
      author: true,
      votes: true,
      comments: true
    },
    take: INFINITE_SCROLLING_PAGINATION
  })
  return <PostFeed initialPosts={posts} />

}

export default GeneralFeed