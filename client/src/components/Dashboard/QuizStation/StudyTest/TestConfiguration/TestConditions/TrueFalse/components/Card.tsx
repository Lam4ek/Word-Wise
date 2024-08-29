import styles from "../TrueFalse.module.css";
import React, { FC } from "react";
import Header from "./Header";
import Buttons from "./Buttons";
import { TrueFalseQuestion } from "../types/types";

interface QuestionCardProps {
  question: TrueFalseQuestion;
  index: number;
  handleAnswer: (index: number, answer: boolean) => void;
}

const QuestionCard: FC<QuestionCardProps> = React.memo(
  ({ question, index, handleAnswer }) => {
    return (
      <div className={styles.card}>
        <Header question={question} />

        <Buttons
          question={question}
          handleAnswer={handleAnswer}
          index={index}
        />
      </div>
    );
  }
);

export default QuestionCard;
