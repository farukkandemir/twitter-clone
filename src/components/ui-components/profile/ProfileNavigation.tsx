"use client";
import ButtonGroups from "@/components/shared/ButtonGroups";
import React, { useState } from "react";

const ProfileNavigation = () => {
  const [profileNavigation, setProfileNavigation] = useState<string>("Tweets");

  const changeProfileNavigation = (label: string) => {
    setProfileNavigation(label);
  };

  const profileNavigationLinks = [
    {
      label: "Tweets",
    },
    {
      label: "Replies",
    },
    {
      label: "Highlights",
    },
    {
      label: "Media",
    },
    {
      label: "Likes",
    },
  ];

  return (
    <div className="flex border-b-2 border-mainGray">
      {profileNavigationLinks.map(({ label }) => (
        <div key={label} className="flex-1">
          <ButtonGroups
            label={label}
            onClick={changeProfileNavigation}
            selected={profileNavigation === label}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileNavigation;
