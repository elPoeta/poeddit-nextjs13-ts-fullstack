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
