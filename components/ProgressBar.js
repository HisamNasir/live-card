import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: "36px", height: "36px" }}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          strokeLinecap: "round",
          // pathTransitionDuration: 0.5,
          textColor: "#fff",
          trailColor: "transparent",
          pathColor: `rgba(255, 232, 116, ${progress / 100})`,
        })}
      />
    </div>
  );
};

export default ProgressBar;
