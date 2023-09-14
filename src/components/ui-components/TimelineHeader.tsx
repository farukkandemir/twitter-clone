"use client";
import React, { useState } from "react";

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
      className={`relative w-full text-sm py-4 hover:bg-mainGray ${
        selected ? "text-white font-bold" : "text-textGray"
      }`}
      onClick={() => onClick(label)}
    >
      {label}
      {selected && (
        <div
          className={`absolute bottom-0 left-0 right-0 mx-auto bg-mainBlue`}
          style={{ width: `${label.length * 8}px`, height: "2px" }}
        ></div>
      )}
    </button>
  );
};

const TimelineHeader = () => {
  const [defaultTimeLine, setDefaultTimeLine] = useState<string>("following");
  const timeLineButtons = [{ label: "Following" }, { label: "For You" }];
  const changeTimeLine = (label: string) =>
    setDefaultTimeLine(label.toLowerCase());

  return (
    <div className="sticky top-0 flex flex-col gap-4 bg-bgGray bg-opacity-90">
      <header className="px-4 pt-4">
        <h1 className="text-md font-bold">Home</h1>
      </header>
      <div className="flex border-b-2 border-mainGray">
        {timeLineButtons.map(({ label }) => (
          <div key={label} className="flex-1">
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

export default TimelineHeader;
