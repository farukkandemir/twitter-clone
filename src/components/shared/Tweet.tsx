import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsBarChart } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import UserImage from "./UserImage";
import { timePassed } from "@/utils/helpers";
import { TweetType, TweetUserInfoType, User } from "@/lib/types";
import IconButton from "./IconButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const Tweet = async ({
  tweet,
  userInfo,
}: {
  tweet: TweetType;
  userInfo: TweetUserInfoType;
}) => {
  const user = (await useCurrentUser()) as User;
  const { likes } = tweet;

  return (
    <article className="flex gap-2">
      {userInfo.profileImage && <UserImage imageUrl={userInfo.profileImage} />}
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="flex-1 flex items-start justify-between">
            <div className="flex items-center gap-1 text-textGray text-sm">
              <p className="text-white">{userInfo.name}</p>
              <p>{userInfo.username}</p>
              <span>&bull;</span>
              <p>{timePassed(tweet.createdAt)}</p>
            </div>
            <div className="text-textGray cursor-pointer p-1 hover:bg-mainGray rounded-full transition-all duration-100 ease-in">
              <BsThreeDots />
            </div>
          </div>
          <div className="text-sm">
            <p>{tweet.content}</p>
          </div>
          {/* <div className="w-full h-72 rounded-lg bg-mainGray mt-2">Image</div> */}

          <div className="flex items-center justify-between text-lg text-textGray mt-4">
            <FaRegComment />
            <FaRetweet />
            <IconButton
              tweetId={tweet.id}
              userId={userInfo.id}
              likes={likes}
              currentUserId={user?.id}
            />
            <BsBarChart />
            <FiShare />
          </div>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
