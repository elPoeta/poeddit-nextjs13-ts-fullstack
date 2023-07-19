import { INFINITE_SCROLLING_PAGINATION } from '@/lib/constants'
import { db } from '@/lib/prisma'
import React, { FC } from 'react'
import PostFeed from '../posts/PostFeed'
import { Session } from 'next-auth'

interface CustomFeedProps {
  session: Session
}
const CustomFeed: FC<CustomFeedProps> = async ({ session }) => {

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      subpoeddit: true
    }
  })

  const posts = await db.post.findMany({
    where: {
      subpoeddit: {
        name: {
          in: followedCommunities.map(({ subpoeddit }) => subpoeddit.id)
        }
      }
    },
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

export default CustomFeed