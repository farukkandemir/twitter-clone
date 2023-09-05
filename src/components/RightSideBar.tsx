"use client";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const RightSideBar = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className="w-[350px] px-8 flex flex-col gap-4">
      <div className="flex items-center gap-4 px-4 py-2 rounded-full bg-mainGray">
        <BsSearch style={{ color: "#75828E" }} />
        <input
          className="bg-mainGray w-full outline-none border-none text-sm"
          placeholder="Search"
        />
      </div>
      <div className="w-full bg-bgGray">
        <div>
          <span className="font-semibold text-lg tracking-wide">
            What`s happening
          </span>
        </div>
      </div>
      <div>Who to follw</div>
    </div>
  );
};

export default RightSideBar;
