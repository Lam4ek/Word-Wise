import { TrueFalseQuestion } from ".";
import styles from "./TrueFalse.module.css";
import React, { FC } from "react";

interface QuestionCardProps {
  question: TrueFalseQuestion;
  index: number;
  handleAnswer: (index: number, answer: boolean) => void;
}

const QuestionCard: FC<QuestionCardProps> = React.memo(
  ({ question, index, handleAnswer }) => {
    return (
      <div className={styles.card}>
        <div className={styles.term__wrapper}>
          <div className={styles.term__container}>
            <span>Term</span>
            <h3>{question.term}</h3>
          </div>
          <span className={styles.horizontal__line}></span>
          <div className={styles.definition__container}>
            <span>Definition</span>
            <h3>{question.displayedValue}</h3>
          </div>
        </div>

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
      </div>
    );
  }
);

export default QuestionCard;
