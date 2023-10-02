"use client";
import { addOrRemoveLike } from "@/server-actions/actions";
import React, { experimental_useOptimistic as useOptimistic } from "react";
import { AiFillHeart } from "react-icons/ai";

const LikeButton = ({
  tweetId,
  likes,
  currentUserId,
  isComment,
}: {
  tweetId: string;
  likes: string[];
  currentUserId: string;
  isComment?: boolean;
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
    <div className="flex gap-2">
      <button
        onClick={async () => {
          addOrRemoveOptimisticLikes(currentUserId);
          await addOrRemoveLike(tweetId, currentUserId, isComment);
        }}
      >
        <AiFillHeart
          style={{
            color: optimisticLikes.includes(currentUserId) ? "red" : "inherit",
          }}
        />
      </button>
      {!!optimisticLikes.length && (
        <span className="text-xs">{optimisticLikes.length}</span>
      )}
    </div>
  );
};

export default LikeButton;
