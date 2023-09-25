"use client";
import React, { useState } from "react";
import ButtonGroups from "../shared/ButtonGroups";

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
            <ButtonGroups
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
