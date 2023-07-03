import { createSubpoeddit, findSubpoedditByName } from "@/db/subPoeddit";
import { createSubscription } from "@/db/subscription";
import { getAuthSession } from "@/lib/auth";
import { SubPoedditValidator } from "@/lib/validators/subPoeddit";
import { z } from "zod";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { name } = SubPoedditValidator.parse(body);

    const subpoedditFound = await findSubpoedditByName(name);
    if (subpoedditFound) {
      return new Response("subPoeddit already exists.", { status: 409 });
    }

    const subpoeddit = await createSubpoeddit(session.user.id, name);

    await createSubscription(session.user.id, subpoeddit.id);

    return new Response(subpoeddit.name, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not create subreddit", { status: 500 });
  }
};
