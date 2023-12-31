import Link from "next/link";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Header = ({
  title,
  subtitle,
  backArrow,
  small,
  nextToEachOther,
}: {
  title: string | number;
  subtitle: string;
  backArrow?: boolean;
  small?: boolean;
  nextToEachOther?: boolean;
}) => {
  return (
    <div className="flex items-center gap-6">
      {backArrow && (
        <Link href="/">
          <AiOutlineArrowLeft className="text-lg " />
        </Link>
      )}
      <div
        className={`
      flex 
      gap-1
      ${nextToEachOther ? "flex-row items-center" : "flex-col"}
      `}
      >
        <h1
          className={`
        ${small ? "text-xs" : "text-md"}
        font-semibold
        `}
        >
          {title}
        </h1>
        <h2
          className={`
          text-xs
        text-white/60
        `}
        >
          {subtitle}
        </h2>
      </div>
    </div>
  );
};

export default Header;
