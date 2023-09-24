import { getServerSession } from "next-auth";
import UserInfoCard from "../shared/UserInfoCard";
import NavComponent from "./NavComponent";
import { authOptions } from "@/lib/auth";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { User } from "@/lib/types";

const LeftSideBar = async () => {
  const session = await getServerSession(authOptions);

  const user = (await useCurrentUser()) as User;

  const { name, username, profileImage } = user;

  return (
    <div className="w-64 flex flex-col justify-between px-4 h-screen pt-4 sticky top-0">
      <NavComponent user={name} username={username} />
      <div className="mb-4">
        <UserInfoCard
          name={name}
          imageUrl={profileImage}
          userName={username}
          isAdmin={true}
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
