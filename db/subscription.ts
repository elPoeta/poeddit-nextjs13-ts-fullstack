import { db } from "@/lib/prisma";

export const createSubscription = async (
  userId: string,
  subpoedditId: string
) => {
  return await db.subscription.create({
    data: {
      userId,
      subpoedditId,
    },
  });
};
