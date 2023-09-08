"use client";
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDots, BsBarChart } from "react-icons/bs";
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import ComposeTweet from "@/components/modules/ComposeTweet";

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

const Tweet = () => {
  return (
    <article className="flex gap-2">
      <div className="w-10 h-10 rounded-full bg-red-900"></div>
      <div className="flex-1">
        <div className="flex flex-col">
          <div className="flex-1 flex items-start justify-between">
            <div className="flex items-center gap-1 text-textGray text-sm">
              <p className="text-white">Name</p>
              <p>@username</p>
              <span>&bull;</span>
              <p>16hr</p>
            </div>
            <div className="text-textGray cursor-pointer p-1 hover:bg-mainGray rounded-full transition-all duration-100 ease-in">
              <BsThreeDots />
            </div>
          </div>
          <div className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            Hello Wordl asperiores consequatur nisi exercitationem laboriosam
            harum esse, amet alias nesciunt quibusdam vitae recusandae eius
            similique tenetur!
          </div>
          <div className="w-full h-72 rounded-lg bg-mainGray mt-2">Image</div>
          <div className="flex items-center justify-between text-lg text-textGray mt-4">
            <FaRegComment />
            <FaRetweet />
            <AiOutlineHeart />
            <BsBarChart />
            <FiShare />
          </div>
        </div>
      </div>
    </article>
  );
};

const Timeline = () => {
  return (
    <section>
      <Tweet />
      <Tweet />
      <Tweet />
      <Tweet />
    </section>
  );
};

const Home = () => {
  const [defaultTimeLine, setDefaultTimeLine] = useState<string>("following");
  const timeLineButtons = [{ label: "Following" }, { label: "For You" }];

  const changeTimeLine = (label: string) =>
    setDefaultTimeLine(label.toLowerCase());

  return (
    <div className="border-x-[1px] border-mainGray flex flex-col gap-2">
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
      <ComposeTweet />
      <hr style={{ borderColor: "#273340" }} />

      <Timeline />
    </div>
  );
};

export default Home;
