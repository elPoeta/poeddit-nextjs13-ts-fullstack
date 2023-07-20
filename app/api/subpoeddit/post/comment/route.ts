import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { CommentValidator } from "@/lib/validators/comment";
import { z } from "zod";

export const PATCH = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { postId, text, replyToId } = CommentValidator.parse(body);
    await db.comment.create({
      data: {
        postId,
        authorId: session.user.id,
        text,
        replyToId,
      },
    });
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response(
      "Could not create commnet at this time, try again later.",
      {
        status: 500,
      }
    );
  }
};
