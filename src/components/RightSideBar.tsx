"use client";
import { ReactElement } from "react";
import { BsSearch } from "react-icons/bs";

const dailyTrends = [{ category: "", name: "" }];

const SearhBar = () => (
  <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-mainGray">
    <BsSearch style={{ color: "#75828E" }} />
    <input
      className="bg-mainGray w-full outline-none border-none text-sm"
      placeholder="Search"
    />
  </div>
);

const Trending = () => (
  <div className="w-full bg-bgGray p-4 rounded-lg">
    <div className="flex flex-col gap-4">
      <span className="font-semibold text-lg tracking-wide">
        What`s happening
      </span>
      {[...Array(5)].map((_) => (
        <div className="flex flex-col gap-1">
          <span className="text-xs text-textGray">Category</span>
          <p className="text-sm font-bold">Name</p>
          <span className="text-xs text-textGray">25K Tweet</span>
        </div>
      ))}
    </div>
  </div>
);

export const UserUiComponent = ({
  name,
  image,
  userName,
  action,
}: {
  name: string;
  image: string;
  userName: string;
  action: ReactElement;
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-red-900"></div>
        <div>
          <p className="text-sm font-bold">Name</p>
          <p className="text-xs text-textGray">Username</p>
        </div>
      </div>
      <div>Action</div>
    </div>
  );
};

const RecommendedUsers = () => (
  <div className="w-full bg-bgGray p-4 rounded-lg flex flex-col gap-4">
    <span className="font-semibold text-lg tracking-wide">Who to follow</span>

    {[...Array(4)].map((_) => (
      <UserUiComponent
        name="Faruk Kandemir"
        image="far"
        userName=""
        action={<div></div>}
      />
    ))}
  </div>
);

const RightSideBar = () => {
  return (
    <div className="w-[350px]  flex flex-col gap-4 ">
      <SearhBar />
      <Trending />
      <RecommendedUsers />
    </div>
  );
};

export default RightSideBar;
