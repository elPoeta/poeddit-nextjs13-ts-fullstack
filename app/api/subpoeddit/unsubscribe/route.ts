import { findSubpoedditByIdAndCreatorId } from "@/db/subPoeddit";
import {
  createSubscription,
  findSubscriptionBySubpoedditIdAndUserId,
  leaveSubscription,
} from "@/db/subscription";
import { getAuthSession } from "@/lib/auth";
import { SubPoeddiSubscriptiontValidator } from "@/lib/validators/subPoeddit";
import { z } from "zod";

export const POST = async (req: Request) => {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const body = await req.json();
    const { subpoedditId } = SubPoeddiSubscriptiontValidator.parse(body);
    const subscriptionFound = await findSubscriptionBySubpoedditIdAndUserId(
      subpoedditId,
      session.user.id
    );
    if (subscriptionFound) {
      return new Response("You are not subscribed to this subpoeddit.", {
        status: 409,
      });
    }

    const subPoeddit = await findSubpoedditByIdAndCreatorId(
      subpoedditId,
      session.user.id
    );
    if (subPoeddit) {
      return new Response("You can't unsubcribe from your own subpoeddit", {
        status: 400,
      });
    }

    await leaveSubscription(session.user.id, subpoedditId);
    new Response(subpoedditId);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not unsubscribe, try again later.", {
      status: 500,
    });
  }
};
