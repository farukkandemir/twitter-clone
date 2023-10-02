import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsBarChart } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import UserImage from "./UserImage";
import { splitUsername, timePassed } from "@/utils/helpers";
import { CommentType, TweetType, TweetUserInfoType, User } from "@/lib/types";
import LikeButton from "./IconButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";

const Tweet = async ({
  tweet,
  userInfo,
}: {
  tweet: TweetType | CommentType;
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
            <Link href={`/profile/${splitUsername(userInfo.username)}`}>
              <div className="flex items-center gap-1 text-textGray text-sm">
                <p className="text-white hover:underline">{userInfo.name}</p>
                <p>{userInfo.username}</p>
                <span>&bull;</span>
                <p>{timePassed(tweet.createdAt)}</p>
              </div>
            </Link>
            <div className="text-textGray cursor-pointer p-1 hover:bg-mainGray rounded-full transition-all duration-100 ease-in">
              <BsThreeDots />
            </div>
          </div>
          <Link
            href={`/profile/${splitUsername(userInfo.username)}/${tweet.id}`}
          >
            <div className="text-sm">
              <p>{tweet.content}</p>
            </div>
            {/* <div className="w-full h-72 rounded-lg bg-mainGray mt-2">Image</div> */}

            <div className="flex items-center justify-between text-lg text-textGray mt-4">
              <FaRegComment />
              <FaRetweet />
              <LikeButton
                tweetId={tweet.id}
                likes={likes}
                currentUserId={user?.id}
              />
              <BsBarChart />
              <FiShare />
            </div>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Tweet;
