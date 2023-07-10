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

export const leaveSubscription = async (
  userId: string,
  subpoedditId: string
) => {
  return await db.subscription.delete({
    where: {
      userId_subpoedditId: {
        subpoedditId,
        userId,
      },
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

export const findSubscriptionBySubpoedditIdAndUserId = async (
  subPoedditId: string,
  userId: string
) => {
  return await db.subscription.findFirst({
    where: {
      subpoeddit: {
        id: subPoedditId,
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
