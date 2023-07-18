import { z } from "zod";
import { getAuthSession } from "@/lib/auth";
import { VotePostValidator } from "@/lib/validators/vote";
import {
  createVote,
  deleteVoteByUserAndPostId,
  findVoteByUserIdAndPostId,
  updateVoteByUserAndPostId,
} from "@/db/vote";
import { findPostById } from "@/db/post";
import { CachedPost } from "@/types/redis";
import { redis } from "@/lib/redis";
import { Post, User, Vote, VoteType } from "@prisma/client";

const CACHE_AFTER_UPVOTES = 1;

const getVotesAmount = (
  post: Post & {
    author: User;
    votes: Vote[];
  }
) => {
  return post.votes.reduce((acc, vote) => {
    if (vote.type === "UP") return acc + 1;
    if (vote.type === "DOWN") return acc - 1;
    return acc;
  }, 0);
};

const getCachedPostPayload = (
  post: Post & {
    author: User;
    votes: Vote[];
  },
  voteType: VoteType
) => {
  return {
    id: post.id,
    title: post.title,
    content: JSON.stringify(post.content),
    authortUserName: post.author.username ?? "",
    currentVote: voteType,
    createdAt: post.createdAt,
  };
};

export const PATCH = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { postId, voteType } = VotePostValidator.parse(body);
    const voteExist = await findVoteByUserIdAndPostId(session.user.id, postId);
    const post = await findPostById(postId);
    if (!post) {
      return new Response("Post not found", { status: 404 });
    }
    if (voteExist) {
      if (voteExist.type === voteType) {
        await deleteVoteByUserAndPostId(session.user.id, postId);

        const votesAmount = getVotesAmount(post);
        if (votesAmount >= CACHE_AFTER_UPVOTES) {
          const cachedPayload: CachedPost = getCachedPostPayload(
            post,
            voteType
          );
          await redis.hset(`post:${postId}`, cachedPayload);
        }
        return new Response("OK");
      }
      await updateVoteByUserAndPostId(session.user.id, postId, voteType);
      const votesAmount = getVotesAmount(post);
      if (votesAmount >= CACHE_AFTER_UPVOTES) {
        const cachedPayload: CachedPost = getCachedPostPayload(post, voteType);
        await redis.hset(`post:${postId}`, cachedPayload);
      }
      return new Response("OK");
    }

    await createVote(session.user.id, postId, voteType);
    const votesAmount = getVotesAmount(post);
    if (votesAmount >= CACHE_AFTER_UPVOTES) {
      const cachedPayload: CachedPost = getCachedPostPayload(post, voteType);
      await redis.hset(`post:${postId}`, cachedPayload);
    }
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response(
      "Could not register your vote at this time, try again later.",
      {
        status: 500,
      }
    );
  }
};
