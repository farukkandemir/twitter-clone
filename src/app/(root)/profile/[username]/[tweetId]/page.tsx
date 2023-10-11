import ComposeTweet from "@/components/server-components/ComposeTweet";
import Header from "@/components/shared/Header";
import Tweet from "@/components/shared/Tweet";
import { getSingleTweet } from "@/utils/helpers";
import React from "react";

const SingleTweetPage = async ({
  params,
}: {
  params: {
    tweetId: string;
  };
}) => {
  const { user, comments, ...otherProps } = await getSingleTweet(
    params.tweetId
  );

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="border-b border-mainGray">
        <Header title="Tweet" subtitle="" backArrow />
      </div>
      <div>
        <Tweet tweet={otherProps} userInfo={user} />
      </div>

      <div
        className="
        border-t border-b border-mainGray
      "
      >
        <ComposeTweet isReply={true} tweetId={params.tweetId} />
      </div>

      <div className="flex flex-col gap-4">
        {!!comments.length &&
          comments.map(({ user, ...otherProps }) => (
            <div key={otherProps.id}>
              <Tweet tweet={otherProps} userInfo={user} isComment={true} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SingleTweetPage;
