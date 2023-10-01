import { TweetAndUserInfo, User } from "@/lib/types";
import prisma from "./db";

export const fetchTwitterApi = async ({
  path,
  method,
  data,
  setError,
  callback,
}: {
  path: string;
  method: string;
  data: any;
  setError?: Function;
  callback?: Function;
}) => {
  const stringifiedData =
    method === "POST" ? { body: JSON.stringify(data) } : {};

  return await fetch(`/api/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...stringifiedData,
  })
    .then(async (response) => {
      if (!callback) {
        return null;
      }

      if (!response.ok && setError) {
        const message = await response.text();
        return setError(message);
      }

      const data = await response.json();
      const { error } = data;
      if (error && setError) {
        return setError(error);
      }

      if (callback) {
        return callback(data);
      }

      return null;
    })
    .catch((error) => {
      console.log("Api Error", error);

      return { error: true };
    });
};

export const timePassed = (timestamp: Date | string | number) => {
  const timestampDate = new Date(timestamp);
  const currentDate = new Date();
  const timeDifference: number =
    currentDate.getTime() - timestampDate.getTime();

  const units = [
    { label: "day", ms: 24 * 60 * 60 * 1000 },
    { label: "hour", ms: 60 * 60 * 1000 },
    { label: "minute", ms: 60 * 1000 },
  ];

  const unit = units.find((unit) => timeDifference >= unit.ms);

  if (unit) {
    const value = Math.floor(timeDifference / unit.ms);
    return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
  }

  return "Just now";
};

export const getTweetAndUserInfoByUsername = async (username: string) => {
  const { tweets, ...userInfo } = (await prisma.user.findUnique({
    where: {
      username: `@${username}`,
    },
    select: {
      tweets: {
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          likes: true,
        },
      },
      id: true,
      name: true,
      username: true,
      profileImage: true,
      followers: true,
      following: true,
    },
  })) as TweetAndUserInfo;

  return { tweets, userInfo };
};

export const splitUsername = (username: string) => {
  return username.split("@")[1];
};
