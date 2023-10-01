import UserInfoCard from "../shared/UserInfoCard";
import NavComponent from "./NavComponent";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { User } from "@/lib/types";

const LeftSideBar = async () => {
  const user = (await useCurrentUser()) as User;

  return (
    <div className="w-64 flex flex-col justify-between px-4 h-screen pt-4 sticky top-0">
      <NavComponent user={user?.name} username={user?.username} />
      <div className="mb-4">
        <UserInfoCard
          name={user?.name}
          imageUrl={user?.profileImage}
          userName={user?.username}
          isAdmin={true}
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
