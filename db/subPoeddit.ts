import { db } from "@/lib/prisma";

export const findSubpoedditByName = async (name: string) => {
  return await db.subpoeddit.findFirst({
    where: {
      name,
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
