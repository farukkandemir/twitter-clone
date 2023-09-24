"use server";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

export const sendTweet = async (formData: FormData) => {
  "use server";

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
