import React from "react";
import styles from "../TrueFalse.module.css";

interface IButtons {
  question: any;
  handleAnswer: any;
  index: number;
}

const Buttons: React.FC<IButtons> = ({ question, handleAnswer, index }) => {
  return (
    <div className={styles.term__buttons}>
      <button
        className={`${styles.button} ${
          question.answered && question.userAnswer === true
            ? question.isCorrect === true
              ? styles.correct
              : styles.wrong
            : ""
        }`}
        onClick={() => handleAnswer(index, true)}
        disabled={question.answered}
      >
        True
      </button>
      <button
        className={`${styles.button} ${
          question.answered && question.userAnswer === false
            ? question.isCorrect === false
              ? styles.correct
              : styles.wrong
            : ""
        }`}
        onClick={() => handleAnswer(index, false)}
        disabled={question.answered}
      >
        False
      </button>
    </div>
  );
};

export default Buttons;
