import { BsThreeDots } from "react-icons/bs";
import UserImage from "./UserImage";
import Link from "next/link";
import { splitUsername } from "@/utils/helpers";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";

const UserInfoCard = ({
  name,
  imageUrl,
  userName,
  isAdmin,
  cardUserId,
  currentUserId,
  isFollowing,
}: {
  name: string;
  imageUrl?: string;
  userName: string;
  isAdmin?: boolean;
  cardUserId?: string;
  currentUserId?: string;
  isFollowing?: boolean;
}) => {
  const handleFollowOrUnfollow = async () => {
    "use server";

    if (isFollowing) {
      const [follower, beingFollowed] = await Promise.all([
        prisma.user.findUnique({
          where: { id: currentUserId },
          select: { following: true },
        }),
        prisma.user.findUnique({
          where: { id: cardUserId },
          select: { followers: true },
        }),
      ]);

      await Promise.all([
        prisma.user.update({
          where: { id: currentUserId },
          data: {
            following: follower?.following.filter((id) => id !== cardUserId),
          },
        }),

        prisma.user.update({
          where: { id: cardUserId },
          data: {
            followers: beingFollowed?.followers.filter(
              (id) => id !== currentUserId
            ),
          },
        }),
      ]);
      return revalidatePath("/");
    }

    await Promise.all([
      prisma.user.update({
        where: { id: currentUserId },
        data: { following: { push: cardUserId } },
      }),
      prisma.user.update({
        where: { id: cardUserId },
        data: {
          followers: { push: currentUserId },
        },
      }),
    ]);

    return revalidatePath("/");
  };

  const bodyContent = (
    <div className="flex items-center gap-2">
      <UserImage imageUrl={imageUrl} />
      <div>
        <p className="text-sm">{name}</p>
        <p className="text-xs text-textGray">{userName}</p>
      </div>
    </div>
  );

  return (
    <div className="flex items-center justify-between">
      {isAdmin ? (
        <div className="flex items-center gap-2">{bodyContent}</div>
      ) : (
        <Link href={`/profile/${splitUsername(userName)}`}>{bodyContent}</Link>
      )}
      <div>
        {isAdmin ? (
          <button className="hover:bg-white/25 rounded-full p-1">
            <BsThreeDots
              style={{
                fontSize: "1.25rem",
              }}
            />
          </button>
        ) : (
          <form action={handleFollowOrUnfollow}>
            <button
              type="submit"
              className={`text-xs px-2 py-1 rounded-full  text-black ${
                isFollowing ? "bg-mainBlue text-white" : "bg-white"
              }`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
