import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleProgressBar = ({ value }: { value: number }) => {
  const getColor = (value: number) => {
    const colors: Record<string, boolean> = {
      red: value > 140,
      orange: value > 120 && value <= 140,
      green: value <= 120,
    };

    const selectedColor = Object.keys(colors).find((color) => colors[color]);
    return selectedColor || "green";
  };

  return (
    <div className="w-6 h-6">
      <CircularProgressbar
        value={value}
        text={`${value > 120 ? 140 - value : ""}`}
        maxValue={140}
        styles={buildStyles({
          textSize: "2.5rem",
          textColor: getColor(value),
          pathColor: getColor(value),
        })}
      />
    </div>
  );
};

export default CircleProgressBar;
