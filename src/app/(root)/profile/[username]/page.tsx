import Header from "@/components/shared/Header";
import UserImage from "@/components/shared/UserImage";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { User } from "@/lib/types";
import prisma from "@/utils/db";
import { getTweetAndUserInfo } from "@/utils/helpers";
import Image from "next/image";
import React from "react";

const Profile = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const user = (await useCurrentUser()) as User;
  const { tweets, userInfo } = await getTweetAndUserInfo(user);

  return (
    // <div className=" flex flex-col">
    //   <div className="px-2 pt-1">
    //     <Header title="Faruk" subtitle="25 posts" backArrow />
    //   </div>
    //   <div className="relative flex flex-col gap-4">
    //     <div>
    //       <Image
    //         src="/images/placeholder.png"
    //         width="0"
    //         height="0"
    //         sizes="100vw"
    //         className="w-full h-48"
    //         alt="profile"
    //       />
    //     </div>
    //     <div className="flex justify-between">
    //       <div className="">
    //         <UserImage imageUrl={user.profileImage} profilePage />
    //       </div>
    //       <button>Edit Profile</button>
    //     </div>
    //     <div>
    //       <Header title="Faruk" subtitle="@faruk" />
    //     </div>

    //     <div>
    //       <span>360 Following</span>
    //       <span>20 Followers</span>
    //     </div>
    //   </div>
    // </div>

    <div>
      <div className="px-2 pt-1">
        <Header title="Faruk" subtitle="25 posts" backArrow />
      </div>

      <div>
        <div className="bg-neutral-700 h-44 relative">
          <Image
            src="/images/placeholder.png"
            fill
            className="w-full"
            alt="profile"
          />

          <div className="absolute -bottom-16 left-4">
            <UserImage imageUrl={user.profileImage} profilePage hasBorder />
          </div>
        </div>
      </div>

      <div className="border-b-[1px] border-neutral-800 pb-4">
        <div className="flex justify-end p-2">
          <button className="bg-white text-black px-4 py-1 text-sm rounded-full font-semibold">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
