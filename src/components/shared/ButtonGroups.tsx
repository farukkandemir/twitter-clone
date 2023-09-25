import React from "react";

const ButtonGroups = ({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected?: boolean;
  onClick: (label: string) => void;
}) => {
  return (
    <button
      className={`relative w-full text-sm py-4 transition-all duration-200 ease-in ${
        selected ? "text-white font-bold" : "text-textGray hover:bg-mainGray"
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

export default ButtonGroups;
