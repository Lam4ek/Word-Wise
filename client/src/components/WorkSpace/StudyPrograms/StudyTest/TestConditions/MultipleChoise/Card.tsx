import { FC } from "react";
import styles from "./MultipleChoice.module.css";
import { SelectedAnswer, MultipleChoiceQuestion } from ".";

interface QuestionCardProps {
  question: MultipleChoiceQuestion;
  questionIndex: number;
  handleClick: (
    questionIndex: number,
    answerIndex: number,
    isCorrect: boolean
  ) => void;
  selectedAnswer: SelectedAnswer;
}

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

      <div className={styles.buttons}>
        {question.answers.map((answer, answerIndex) => {
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
    </div>
  );
};

export default QuestionCard;
