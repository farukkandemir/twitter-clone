import useTweetModal from "@/hooks/useTweetModal";
import React from "react";
import ComposeTweet from "./ComposeTweet";

const TweetModal = () => {
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-10">
        <div className="w-96 h-48 bg-bgGray rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <ComposeTweet />
        </div>
      </div>
    </>
  );
};

export default TweetModal;
