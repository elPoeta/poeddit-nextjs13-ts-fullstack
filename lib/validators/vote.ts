import { z } from "zod";

const PostVoteValidator = z.object({
  postId: z.string(),
});

const CommentVoteValidator = z.object({
  commentId: z.string(),
});

const VoteValidator = z.object({
  voteType: z.enum(["UP", "DOWN"]),
});

//export const VotePostValidator2 = VoteValidator.extend({PostVoteValidator});

export const VotePostValidator = VoteValidator.and(PostVoteValidator);
export const VoteCommentValidator = VoteValidator.and(CommentVoteValidator);

export type VotePostRequest = z.infer<typeof VotePostValidator>;
export type VoteCommentRequest = z.infer<typeof VoteCommentValidator>;
