import { INFINITE_SCROLLING_PAGINATION } from "@/lib/constants";
import { db } from "@/lib/prisma";

export const findSubpoedditByName = async (name: string) => {
  return await db.subpoeddit.findFirst({
    where: {
      name,
    },
  });
};

export const findSubpoedditByNameIncludePosts = async (name: string) => {
  return await db.subpoeddit.findFirst({
    where: {
      name,
    },
    include: {
      posts: {
        include: {
          author: true,
          comments: true,
          votes: true,
          subpoeddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION,
      },
    },
  });
};

export const createSubpoeddit = async (id: string, name: string) => {
  return await db.subpoeddit.create({
    data: {
      name,
      creatorId: id,
    },
  });
};
