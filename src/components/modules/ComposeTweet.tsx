import { useState } from "react";
import { AiOutlineGif } from "react-icons/ai";
import { BiImage } from "react-icons/bi";
import { BsEmojiSunglasses } from "react-icons/bs";

const ComposeTweet = () => {
  const [text, setText] = useState<string>("");

  const handleTextChange = (e: any) => {
    const textarea = e.target;
    setText(textarea.value);
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <section className="flex gap-2 items-center">
      <div className="self-start">
        <div className="w-10 h-10 rounded-full bg-red-900"></div>
      </div>
      <div className="flex-1 pt-2">
        <div className="flex flex-col gap-8">
          <textarea
            placeholder="What is happening?!"
            value={text}
            className="w-full bg-inherit outline-none resize-none overflow-hidden whitespace-pre-wrap text-white/90"
            onChange={handleTextChange}
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-xl text-mainBlue">
              <BiImage />
              <AiOutlineGif />
              <BsEmojiSunglasses style={{ fontSize: "1rem" }} />
            </div>
            <div>
              <button
                className={`${
                  !text && "bg-opacity-50"
                } bg-mainBlue text-white text-sm w-full rounded-full px-4 py-1`}
                disabled={!text}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComposeTweet;
