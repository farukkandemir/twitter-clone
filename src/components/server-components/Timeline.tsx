import { useCurrentUser } from "@/hooks/useCurrentUser";

import { TweetAndUserInfo, User } from "@/lib/types";
import { getTweetAndUserInfoByUsername } from "@/utils/helpers";
import Tweet from "../shared/Tweet";
import prisma from "@/utils/db";

const Timeline = async () => {
  const user = (await useCurrentUser()) as User;

  const { tweets, userInfo } = await getTweetAndUserInfoByUsername(
    user?.username.split("@")[1]
  );

  const {
    tweets: [pinnedTweet],
    ...otherProps
  } = (await prisma.user.findUnique({
    where: {
      username: "@farukkandemir",
    },
    select: {
      id: true,
      name: true,
      username: true,
      profileImage: true,

      tweets: {
        where: {
          content: {
            contains: "Welcome",
          },
        },
      },
    },
  })) as TweetAndUserInfo;

  return (
    <section>
      <div className="flex flex-col gap-3">
        {user.username !== "@farukkandemir" && pinnedTweet && (
          <Tweet
            key={pinnedTweet.id}
            tweet={pinnedTweet}
            userInfo={otherProps}
          />
        )}
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} userInfo={userInfo} />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
