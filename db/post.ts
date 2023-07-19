import { db } from "@/lib/prisma";
import { PostCreator } from "@/lib/validators/post";

interface PostCreated extends PostCreator {
  authorId: string;
}
export const createPost = async ({
  title,
  content,
  authorId,
  subpoedditId,
}: PostCreated) => {
  return db.post.create({
    data: {
      title,
      content,
      authorId,
      subpoedditId,
    },
  });
};

export const findPostById = async (id: string) => {
  return db.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      votes: true,
    },
  });
};

export const getPaginationPosts = async (
  limit: number,
  page: number,
  whereCluse: {}
) => {
  return db.post.findMany({
    take: limit,
    skip: (page - 1) * limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      subpoeddit: true,
      votes: true,
      comments: true,
      author: true,
    },
    where: whereCluse,
  });
};
