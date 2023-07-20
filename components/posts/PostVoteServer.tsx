import { Post, Vote, VoteType } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React, { FC } from 'react'
import PostVoteCilent from './PostVoteCilent'

interface PostVoteServerProps {
  postId: string
  initialVotesAmount: number
  initialVote?: VoteType | null
  getData?: () => Promise<(Post & { votes: Vote[] }) | null>
}

//const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

const PostVoteServer: FC<PostVoteServerProps> = async (postVoteServerProps) => {
  const { postId, initialVotesAmount, initialVote, getData } = postVoteServerProps
  const session = await getServerSession()
  let votesAmount: number = 0
  let currentVote: VoteType | null | undefined = undefined
  if (getData) {
    //await wait(2000)
    const post = await getData()
    if (!post) return notFound()
    votesAmount = post.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1
      if (vote.type === "DOWN") return acc - 1
      return acc
    }, 0)

    currentVote = post.votes.find(vote => vote.userId === session?.user.id)?.type
  } else {
    votesAmount = initialVotesAmount
    currentVote = initialVote
  }
  return <PostVoteCilent postId={postId} initialVotesAmount={votesAmount} initialVote={currentVote} />
}

export default PostVoteServer