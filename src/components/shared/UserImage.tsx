import Image from "next/image";
import React from "react";

const UserImage = ({
  imageUrl,
  profilePage,
}: {
  imageUrl?: string;
  profilePage?: boolean;
}) => {
  return (
    <div className="rounded-full">
      <Image
        src={imageUrl ? imageUrl : "/images/placeholder.png"}
        alt="profile image"
        width={!profilePage ? 35 : 150}
        height={!profilePage ? 35 : 150}
        className="rounded-full"
      />
    </div>
  );
};

export default UserImage;
