import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { VoteCommentValidator } from "@/lib/validators/vote";
import { z } from "zod";

export const PATCH = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { commentId, voteType } = VoteCommentValidator.parse(body);

    const voteExist = await db.commentVote.findFirst({
      where: {
        userId: session.user.id,
        commentId,
      },
    });

    if (voteExist) {
      if (voteExist.type === voteType) {
        await db.commentVote.delete({
          where: {
            userId_commentId: {
              userId: session.user.id,
              commentId,
            },
          },
        });
      } else {
        await db.commentVote.update({
          where: {
            userId_commentId: {
              userId: session.user.id,
              commentId,
            },
          },
          data: {
            type: voteType,
          },
        });
      }
      return new Response("OK");
    }

    await db.commentVote.create({
      data: {
        type: voteType,
        commentId,
        userId: session.user.id,
      },
    });
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
