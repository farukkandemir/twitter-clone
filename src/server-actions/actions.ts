"use server";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export const sendTweet = async (formData: FormData) => {
  const user = await useCurrentUser();

  if (!user) {
    return {
      status: 401,
      error: "Unauthorized",
    };
  }

  try {
    const tweet = formData.get("tweet");
    await prisma.tweet.create({
      data: {
        content: tweet as string,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    revalidatePath("/");
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export const addOrRemoveLike = async (tweetId: string, userId: string) => {
  try {
    const tweet = await prisma.tweet.findUnique({
      where: {
        id: tweetId,
      },
      select: {
        likes: true,
      },
    });

    if (!tweet) {
      return {
        status: 404,
        error: "Tweet not found",
      };
    }

    const isLiked = tweet.likes.find((like) => like === userId);

    if (isLiked) {
      return await prisma.tweet.update({
        where: {
          id: tweetId,
        },
        data: {
          likes: [...tweet.likes.filter((like) => like !== userId)],
        },
      });
    }

    await prisma.tweet.update({
      where: {
        id: tweetId,
      },
      data: {
        likes: [...tweet.likes, userId],
      },
    });

    return revalidatePath("/");
  } catch (error) {
    revalidatePath("/");
    return {
      status: 500,
      error,
    };
  }
};

export const getRecommendedUsers = async (userId: string) => {
  try {
    return await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      take: 4,
      select: {
        id: true,
        name: true,
        profileImage: true,
        username: true,
        followers: true,
        following: true,
      },
    });
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};
