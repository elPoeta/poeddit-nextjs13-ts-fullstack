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

export const findSubscriptionBySubpoedditNameAndUserId = async (
  name: string,
  userId: string
) => {
  return await db.subscription.findFirst({
    where: {
      subpoeddit: {
        name,
      },
      user: {
        id: userId,
      },
    },
  });
};

export const subscriptionCount = async (name: string) => {
  return db.subscription.count({
    where: {
      subpoeddit: {
        name,
      },
    },
  });
};
