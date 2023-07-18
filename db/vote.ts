import { db } from "@/lib/prisma";
import { VoteType } from "@prisma/client";

export const findVoteByUserIdAndPostId = async (
  userId: string,
  postId: string
) => {
  return await db.vote.findFirst({
    where: {
      userId,
      postId,
    },
  });
};

export const createVote = async (
  userId: string,
  postId: string,
  type: VoteType
) => {
  await db.vote.create({
    data: {
      userId,
      postId,
      type,
    },
  });
};
export const deleteVoteByUserAndPostId = async (
  userId: string,
  postId: string
) => {
  await db.vote.delete({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
  });
};

export const updateVoteByUserAndPostId = async (
  userId: string,
  postId: string,
  type: VoteType
) => {
  await db.vote.update({
    where: {
      userId_postId: {
        userId,
        postId,
      },
    },
    data: {
      type,
    },
  });
};
