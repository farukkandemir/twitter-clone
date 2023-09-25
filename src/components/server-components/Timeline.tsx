import { useCurrentUser } from "@/hooks/useCurrentUser";
import prisma from "@/utils/db";
import Tweet from "../shared/Tweet";
import { TweetAndUserInfo, User } from "@/lib/types";

const Timeline = async () => {
  const user = (await useCurrentUser()) as User;

  // const { tweets, userInfo } = await getTweetAndUserInfo(user);

  return (
    <section>
      <div className="flex flex-col gap-3">
        {/* {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} userInfo={userInfo} />
        ))} */}
        <div>hello</div>
      </div>
    </section>
  );
};

export default Timeline;
