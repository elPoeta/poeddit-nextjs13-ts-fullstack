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
