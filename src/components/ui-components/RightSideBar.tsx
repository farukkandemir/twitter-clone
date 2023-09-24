"use client";
import { ReactElement } from "react";
import { BsSearch } from "react-icons/bs";
import UserInfoCard from "../shared/UserInfoCard";

const SearhBar = () => (
  <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-mainGray ">
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
      {[...Array(5)].map((_, index) => (
        <div className="flex flex-col gap-1" key={index}>
          <span className="text-xs text-textGray">Category</span>
          <p className="text-sm font-bold">Name</p>
          <span className="text-xs text-textGray">25K Tweet</span>
        </div>
      ))}
    </div>
  </div>
);

const RecommendedUsers = () => (
  <div className="w-full bg-bgGray p-4 rounded-lg flex flex-col gap-4">
    <span className="font-semibold text-lg tracking-wide">Who to follow</span>

    {[...Array(4)].map((_, index) => (
      <UserInfoCard key={index} name="Faruk Kandemir" image="far" userName="" />
    ))}
  </div>
);

const RightSideBar = () => {
  return (
    <div className="w-[350px] flex flex-col gap-4 pt-4 sticky top-0">
      <SearhBar />
      <Trending />
      <RecommendedUsers />
    </div>
  );
};

export default RightSideBar;
