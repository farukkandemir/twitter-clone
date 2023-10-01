import { useCurrentUser } from "@/hooks/useCurrentUser";
import UserImage from "../shared/UserImage";
import { User } from "@/lib/types";
import TweetTextArea from "../shared/TweetTextArea";

const ComposeTweet = async () => {
  const user = (await useCurrentUser()) as User;

  return (
    <section className="flex gap-2 items-center">
      <div className="self-start">
        <UserImage imageUrl={user.profileImage} />
      </div>
      <div className="flex-1 pt-2">
        <TweetTextArea />
      </div>
    </section>
  );
};

export default ComposeTweet;
