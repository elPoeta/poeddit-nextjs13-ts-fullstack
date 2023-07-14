'use client'

import { ExtendedPost } from '@/types/db'
import React, { FC, useRef } from 'react'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { INFINITE_SCROLLING_PAGINATION } from '@/lib/constants'
import axios from 'axios'
import { Vote } from '@prisma/client'
import { useSession } from 'next-auth/react'
import Post from './Post'

interface PostFeedProps {
  initialPosts: ExtendedPost[]
  subpoedditName?: string
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subpoedditName }) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection<HTMLElement>({
    root: lastPostRef.current,
    threshold: 1
  })

  const { data: session } = useSession()

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query = `/api/posts?limit:${INFINITE_SCROLLING_PAGINATION}&page=${pageParam}${!!subpoedditName ? `&subpoedditName=${subpoedditName}` : ''}`
      const { data } = await axios.get(query)
      return data as ExtendedPost
    }, {
    getNextPageParam: (_, pages) => {
      return pages.length + 1
    },
    initialData: { pages: [initialPosts], pageParams: [1] }
  })

  const posts: ExtendedPost = data?.pages.flatMap(page => page) ?? initialPosts

  const getPostVotes = (votes: Vote[]) => {
    return votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1
      if (vote.type === 'DOWN') return acc - 1
      return acc
    }, 0)
  }

  const getCurrentVote = (votes: Vote[]) => votes.find(vote => vote.userId === session?.user.id)


  return (
    <ul className='flex flex-col col-span-2 space-y-6'>
      {posts.map((post: ExtendedPost, index: number) => {
        const votesAmount = getPostVotes(post.votes)
        const currentVote = getCurrentVote(post.votes)
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={ref}>
              <Post post={post} subpoedditName={post.subpoeddit.name} votesAmount={votesAmount} commentAmount={post.comments.length} />
            </li>)
        } else {
          return (
            <li key={post.id}>
              <Post post={post} subpoedditName={post.subpoeddit.name} votesAmount={votesAmount} commentAmount={post.comments.length} />
            </li>)

        }
      })}
    </ul>
  )
}

export default PostFeed