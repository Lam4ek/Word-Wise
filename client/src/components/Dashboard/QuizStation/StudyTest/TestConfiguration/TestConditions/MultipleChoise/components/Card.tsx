import { FC } from "react";
import styles from "../MultipleChoice.module.css";
import AnswerList from "./AnswerList";
import { QuestionCardProps } from "../types/types";

const QuestionCard: FC<QuestionCardProps> = ({
  question,
  questionIndex,
  handleClick,
  selectedAnswer,
}) => {
  return (
    <div className={styles.card} key={questionIndex}>
      <div className={styles.term__container}>
        <span>Term:</span>
        <h3>{question.term}</h3>
      </div>
      <AnswerList
        question={question}
        selectedAnswer={selectedAnswer}
        handleClick={handleClick}
        questionIndex={questionIndex}
      />
    </div>
  );
};

export default QuestionCard;
