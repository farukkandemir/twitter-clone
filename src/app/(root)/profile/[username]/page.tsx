import React from "react";
import ProfileHeader from "@/components/ui-components/profile/ProfileHeader";
import ProfileHero from "@/components/ui-components/profile/ProfileHero";
import ProfileNavigation from "@/components/ui-components/profile/ProfileNavigation";
import UserTweets from "@/components/ui-components/profile/UserTweets";
import { getTweetAndUserInfoByUsername } from "@/utils/helpers";

const Profile = async ({
  params: { username },
}: {
  params: { username: string };
}) => {
  const { tweets, userInfo } = await getTweetAndUserInfoByUsername(username);

  return (
    <div className="flex flex-col gap-4">
      <ProfileHeader />
      <ProfileHero userInfo={userInfo} />
      <ProfileNavigation />
      <UserTweets tweets={tweets} userInfo={userInfo} />
    </div>
  );
};

export default Profile;
