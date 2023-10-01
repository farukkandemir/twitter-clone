import React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

const TweetButton = ({
  small,
  disabled,
  onClick,
}: {
  small?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        className={`
        bg-mainBlue 
        text-white 
        text-sm 
        w-full 
        rounded-full 
        ${small ? "px-4 py-1" : "py-2"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        `}
        type="submit"
        disabled={disabled}
        onClick={onClick}
      >
        {pending ? "Tweeting..." : "Tweet"}
      </button>
    </div>
  );
};

export default TweetButton;
