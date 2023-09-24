import { useCurrentUser } from "@/hooks/useCurrentUser";
import prisma from "@/utils/db";
import Tweet from "../shared/Tweet";
import { TweetAndUserInfo, User } from "@/lib/types";
import { getTweetAndUserInfo } from "@/utils/helpers";

const Timeline = async () => {
  const user = (await useCurrentUser()) as User;

  const { tweets, userInfo } = await getTweetAndUserInfo(user);

  return (
    <section>
      <div className="flex flex-col gap-3">
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} userInfo={userInfo} />
        ))}
      </div>
    </section>
  );
};

export default Timeline;
