import { createPost } from "@/db/post";
import { findSubscriptionBySubpoedditIdAndUserId } from "@/db/subscription";
import { getAuthSession } from "@/lib/auth";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { subpoedditId, title, content } = PostValidator.parse(body);
    const subscriptionFound = findSubscriptionBySubpoedditIdAndUserId(
      subpoedditId,
      session.user.id
    );
    if (!subscriptionFound) {
      return new Response("Subscribe to post frst", { status: 400 });
    }

    await createPost({
      title,
      content,
      subpoedditId,
      authorId: session.user.id,
    });
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response(
      "Could not post subpoeddit at this time, try again later.",
      {
        status: 500,
      }
    );
  }
};
