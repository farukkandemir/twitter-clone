import Image from "next/image";
import React from "react";

const UserImage = ({
  imageUrl,
  profilePage,
  hasBorder,
}: {
  imageUrl?: string;
  profilePage?: boolean;
  hasBorder?: boolean;
}) => {
  return (
    <div className="rounded-full">
      <Image
        src={imageUrl ? imageUrl : "/images/placeholder.png"}
        alt="profile image"
        width={!profilePage ? 35 : 100}
        height={!profilePage ? 35 : 100}
        className={`
        rounded-full
        ${hasBorder ? "border-2 border-black" : ""}
        `}
      />
    </div>
  );
};

export default UserImage;
