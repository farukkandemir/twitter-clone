"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { AiOutlineGif } from "react-icons/ai";
import { BiImage } from "react-icons/bi";
import { BsEmojiSunglasses } from "react-icons/bs";
import TweetButton from "../shared/TweetButton";
import { sendReply, sendTweet } from "@/server-actions/actions";
import CircleProgressBar from "./CircleProgressBar";
import toast from "react-hot-toast";

const TweetTextArea = ({
  isReply,
  tweetId,
  userId,
}: {
  isReply?: boolean;
  tweetId?: string;
  userId?: string;
}) => {
  const [textLength, setTextLength] = useState<number>(0);
  const ref = useRef<HTMLFormElement>(null);

  const resizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
    return setTextLength(textarea.value.length);
  };

  return (
    <div className="flex flex-col gap-8">
      <form
        ref={ref}
        action={async (formData) => {
          ref.current?.reset();
          setTextLength(0);
          if (!userId) {
            return toast.error("Something went wrong, please try again later");
          }

          if (!isReply) {
            return await sendTweet(formData, userId);
          }
          if (!tweetId) {
            return toast.error("Something went wrong, please try again later");
          }

          return await sendReply(formData, tweetId, userId);
          //// send a reply
        }}
      >
        <textarea
          placeholder={isReply ? "Tweet your reply" : "What's happening?"}
          name={isReply ? "reply" : "tweet"}
          className={`w-full px-2 bg-inherit outline-none resize-none overflow-hidden whitespace-pre-wrap text-sm 
          ${textLength > 140 ? "text-red-500" : "text-white/90"}
          `}
          onChange={resizeTextarea}
          required
        />
        <div className="flex justify-between items-center pl-2">
          <div className="flex items-center gap-2 text-xl text-mainBlue">
            <BiImage />
            <AiOutlineGif />
            <BsEmojiSunglasses style={{ fontSize: "1rem" }} />
          </div>
          <div className="flex items-center gap-2">
            {textLength > 0 && <CircleProgressBar value={textLength} />}
            <TweetButton
              small
              disabled={textLength > 140 || textLength === 0}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TweetTextArea;
