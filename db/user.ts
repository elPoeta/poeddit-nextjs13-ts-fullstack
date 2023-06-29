import { db } from "@/lib/prisma";

export const findUserByEmail = async (email: string | null | undefined) => {
  try {
    return await db.user.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error("Error find user by email", error);
    return null;
  }
};

export const updateUserById = async (
  id: string,
  data: { username: string }
) => {
  try {
    await db.user.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.error("Error update user by id", error);
  }
};
