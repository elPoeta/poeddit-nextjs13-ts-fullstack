import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/prisma'
import { CommentVote, Vote } from '@prisma/client'
import React, { FC } from 'react'
import PostComment from './PostComment'
import CreateComment from './CreateComment'

interface CommentsSectionProps {
  postId: string
}

const CommentsSection: FC<CommentsSectionProps> = async ({ postId }) => {
  const session = await getAuthSession()
  const comments = await db.comment.findMany({
    where: {
      postId,
      replyToId: null
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true
        }
      }
    }
  })

  const getVotesAmount = (votes: Pick<Vote, 'type'>[]) => {
    return votes.reduce((acc, vote) => {
      if (vote.type === 'UP') return acc + 1
      if (vote.type === 'DOWN') return acc - 1
      return acc
    }, 0)
  }

  const findVoteComment = (votes: Pick<CommentVote, 'userId' | 'type'>[]) => {
    return votes.find(vote => vote.userId === session?.user.id)
  }

  return (
    <div className='flex flex-col gap-y-4 mt-4'>
      <hr className='w-full h-px my-6' />
      <CreateComment postId={postId} />
      <div className='flex flex-col gap-y-6 mt-4'>
        {comments.filter(comment => !comment.replyToId).map(topLevelComment => {
          const topLevelCommentVotesAmount = getVotesAmount(topLevelComment.votes)
          const topLevelCommentVote = findVoteComment(topLevelComment.votes)
          return <div key={topLevelComment.id} className='flex flex-col'>
            <div className='mb-2'>
              <PostComment comment={topLevelComment} postId={postId} initialVotesAmount={topLevelCommentVotesAmount} initialVote={topLevelCommentVote} />
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default CommentsSection