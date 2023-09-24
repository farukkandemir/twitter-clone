import { BsThreeDots } from "react-icons/bs";
import UserImage from "./UserImage";

const UserInfoCard = ({
  name,
  imageUrl,
  userName,
  isAdmin,
}: {
  name: string;
  imageUrl?: string;
  userName: string;
  isAdmin?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <UserImage imageUrl={imageUrl} />
        <div>
          <p className="text-sm">{name}</p>
          <p className="text-xs text-textGray">{userName}</p>
        </div>
      </div>
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
          <button className="text-xs px-2 py-1 rounded-full bg-white text-black">
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
