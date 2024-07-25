import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styles from "./Progressbar.module.css";
import { FC } from "react";

interface ProgressbarProps {
  score: number;
  totalQuestions: string | number;
}

const Progressbar: FC<ProgressbarProps> = ({ score, totalQuestions }) => {
  return (
    <div className={styles.card}>
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: "rgb(148, 237, 207)",
            trailColor: "rgb(254, 119, 115)",
            backgroundColor: "#111",
          })}
          text={`${(score / Number(totalQuestions)) * 100}%`}
          value={score}
          maxValue={Number(totalQuestions)}
        />
      </div>
      <div className={styles.results}>
        <span style={{ color: "#94edcf" }}>Correct: {score}</span>
        <span style={{ color: "#fe7773" }}>
          Incorrect: {Number(totalQuestions) - score}
        </span>
      </div>
    </div>
  );
};

export default Progressbar;
