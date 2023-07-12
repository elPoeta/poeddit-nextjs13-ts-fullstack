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
    const payload = PostValidator.parse(body);

    const { subpoedditId, title, content } = payload;
    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not subscribe, try again later.", {
      status: 500,
    });
  }
};
