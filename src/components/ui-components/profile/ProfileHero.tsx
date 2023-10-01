import Header from "@/components/shared/Header";
import UserImage from "@/components/shared/UserImage";
import { TweetUserInfoType } from "@/lib/types";
import Image from "next/image";
import React from "react";

const ProfileHero = ({ userInfo }: { userInfo: TweetUserInfoType }) => {
  return (
    <div>
      <div>
        <div className="bg-neutral-700 h-44 relative">
          <Image
            src="/images/placeholder.png"
            fill
            className="w-full"
            alt="profile"
          />

          <div className="absolute -bottom-16 left-4">
            <UserImage imageUrl={userInfo.profileImage} profilePage hasBorder />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-end p-2">
          <button className="bg-white text-black px-4 py-1 text-sm rounded-full font-semibold">
            Edit
          </button>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-4 mt-10">
        <div>
          <Header title={userInfo.name} subtitle={userInfo.username} />
        </div>

        <div className="flex items-center gap-2">
          <Header
            title={
              !!userInfo.followers?.length ? userInfo.followers?.length : 0
            }
            subtitle="Followers"
            nextToEachOther
            small
          />
          <Header
            title={
              !!userInfo.following?.length ? userInfo.following?.length : 0
            }
            subtitle="Following"
            nextToEachOther
            small
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
