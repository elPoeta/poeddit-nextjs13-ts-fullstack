import { VoteType } from "@prisma/client";

export type CachedPost = {
  id: string;
  title: string;
  content: string;
  authortUserName: string;
  currentVote: VoteType | null | undefined;
  createdAt: Date;
};
