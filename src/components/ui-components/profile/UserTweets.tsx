import Tweet from "@/components/shared/Tweet";
import { TweetType, TweetUserInfoType, User } from "@/lib/types";
import React from "react";

const UserTweets = async ({
  tweets,
  userInfo,
}: {
  tweets: TweetType[];
  userInfo: TweetUserInfoType;
}) => {
  //   const { tweets, userInfo } = await getTweetAndUserInfo(user);

  return (
    <div className="px-4 flex flex-col gap-4">
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} userInfo={userInfo} />
      ))}
    </div>
  );
};

export default UserTweets;
