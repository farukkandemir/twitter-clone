"use server";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export const sendTweet = async (formData: FormData, userId: string) => {
  if (!userId) {
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
            id: userId,
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

const likeTweet = async (tweetId: string, userId: string) => {
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

  return await prisma.tweet.update({
    where: {
      id: tweetId,
    },
    data: {
      likes: [...tweet.likes, userId],
    },
  });
};

const likeComment = async (tweetId: string, userId: string) => {
  const tweet = await prisma.comment.findUnique({
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
    return await prisma.comment.update({
      where: {
        id: tweetId,
      },
      data: {
        likes: [...tweet.likes.filter((like) => like !== userId)],
      },
    });
  }

  return await prisma.comment.update({
    where: {
      id: tweetId,
    },
    data: {
      likes: [...tweet.likes, userId],
    },
  });
};

export const addOrRemoveLike = async (
  tweetId: string,
  userId: string,
  isComment?: boolean
) => {
  try {
    if (isComment) {
      await likeComment(tweetId, userId);
      return revalidatePath(`/`);
    }
    await likeTweet(tweetId, userId);
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

export const sendReply = async (
  formData: FormData,
  tweetId: string,
  userId: string
) => {
  const replyContent = formData.get("reply");

  try {
    await prisma.comment.create({
      data: {
        content: replyContent as string,
        tweet: {
          connect: {
            id: tweetId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return revalidatePath(`/`);
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};
