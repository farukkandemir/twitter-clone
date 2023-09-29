import { useCurrentUser } from "@/hooks/useCurrentUser";

import { TweetAndUserInfo, User } from "@/lib/types";
import { getTweetAndUserInfoByUsername } from "@/utils/helpers";
import Tweet from "../shared/Tweet";

const Timeline = async () => {
  const user = (await useCurrentUser()) as User;

  const { tweets, userInfo } = await getTweetAndUserInfoByUsername(
    user.username.split("@")[1]
  );

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
