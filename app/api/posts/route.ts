import { getPaginationPosts } from "@/db/post";
import { findSubscriptionsByUserId } from "@/db/subscription";
import { getAuthSession } from "@/lib/auth";
import { z } from "zod";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);

    const session = await getAuthSession();

    let followedCommunitiesIds: string[] = [];
    if (session) {
      const followedCommunities = await findSubscriptionsByUserId(
        session.user.id
      );
      followedCommunitiesIds = followedCommunities.map(
        ({ subpoeddit }) => subpoeddit.id
      );
    }

    const { limit, page, subpoedditName } = z
      .object({
        limit: z.string(),
        page: z.string(),
        subpoedditName: z.string().nullish().optional(),
      })
      .parse({
        limit: url.searchParams.get("limit"),
        page: url.searchParams.get("page"),
        subpoedditName: url.searchParams.get("subpoeditName"),
      });

    let whereCluse = {};
    if (subpoedditName) {
      whereCluse = {
        subpoeddit: {
          name: subpoedditName,
        },
      };
    } else if (session) {
      whereCluse = {
        subpoeddit: {
          id: {
            in: followedCommunitiesIds,
          },
        },
      };
    }

    const posts = await getPaginationPosts(
      parseInt(limit),
      parseInt(page),
      whereCluse
    );

    return new Response(JSON.stringify(posts));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not fetch more posts.", {
      status: 500,
    });
  }
};
