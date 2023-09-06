"use client";
import { useState } from "react";

const TimeLineChangeButton = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: (label: string) => void;
}) => {
  return (
    <button
      className={`w-full text-sm py-4 hover:bg-mainGray ${
        selected ? "text-white font-bold" : "text-textGray"
      }`}
      onClick={() => onClick(label)}
    >
      {label}
    </button>
  );
};

const Home = () => {
  const [defaultTimeLine, setDefaultTimeLine] = useState<string>("following");
  const timeLineButtons = [{ label: "Following" }, { label: "For You" }];

  const changeTimeLine = (label: string) =>
    setDefaultTimeLine(label.toLowerCase());

  return (
    <div className="h-full border-x-[1px] border-mainGray flex flex-col gap-2">
      <div>
        <h1 className="text-md font-bold">Home</h1>
      </div>
      <div className="flex border-b-2 border-mainGray">
        {timeLineButtons.map(({ label }) => (
          <div className="flex-1">
            <TimeLineChangeButton
              label={label}
              selected={defaultTimeLine === label.toLowerCase()}
              onClick={changeTimeLine}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
