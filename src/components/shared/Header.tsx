import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Header = ({
  title,
  subtitle,
  backArrow,
}: {
  title: string;
  subtitle: string;
  backArrow?: boolean;
}) => {
  return (
    <div className="flex items-center gap-6">
      {backArrow && <AiOutlineArrowLeft className="text-lg " />}
      <div className="flex flex-col gap-1">
        <h1 className="text-md font-semibold">{title}</h1>
        <h2 className="text-xs text-white/60">{subtitle}</h2>
      </div>
    </div>
  );
};

export default Header;
