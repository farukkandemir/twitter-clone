"use client";
import { addOrRemoveLike } from "@/server-actions/actions";
import React, { experimental_useOptimistic as useOptimistic } from "react";
import { AiFillHeart } from "react-icons/ai";

const IconButton = ({
  tweetId,
  likes,
  userId,
}: {
  tweetId: string;
  likes: string[];
  userId: string;
}) => {
  const [optimisticLikes, addOrRemoveOptimisticLikes] = useOptimistic(
    likes,
    (state: string[], newLike: string) => {
      if (state.includes(newLike)) {
        return state.filter((like) => like !== newLike);
      }
      return [...state, newLike];
    }
  );

  return (
    <>
      <button
        onClick={async () => {
          addOrRemoveOptimisticLikes(userId);
          await addOrRemoveLike(tweetId, userId);
        }}
      >
        <AiFillHeart
          style={{
            color: optimisticLikes.includes(userId) ? "red" : "inherit",
          }}
        />
      </button>
      {!!optimisticLikes.length ? (
        <span>{optimisticLikes.length}</span>
      ) : (
        <span>0</span>
      )}
    </>
  );
};

export default IconButton;
