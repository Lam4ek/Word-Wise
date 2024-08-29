import React from "react";
import styles from "../MultipleChoice.module.css";
import { QuestionCardProps } from "../types/types";

const AnswerList: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  handleClick,
  questionIndex,
}) => {
  return (
    <div className={styles.buttons}>
      {question.answers.map((answer: string, answerIndex: number) => {
        const isSelected = selectedAnswer[questionIndex] !== undefined;
        const isCorrect = answer === question.definition;
        const isWrong =
          selectedAnswer[questionIndex] === answerIndex &&
          answer !== question.definition;

        return (
          <button
            key={answerIndex}
            className={`
						${
              isCorrect && selectedAnswer[questionIndex] === answerIndex
                ? styles.correct
                : ""
            } 
						${isWrong ? styles.wrong : ""} 
					`}
            onClick={() => handleClick(questionIndex, answerIndex, isCorrect)}
            disabled={isSelected}
          >
            {answer}
          </button>
        );
      })}
    </div>
  );
};

export default AnswerList;
