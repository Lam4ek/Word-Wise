import { FC, useEffect, useState } from "react";
import QuestionCard from "./components/Card";
import { generateMultipleChoiceQuestions } from "./utils/multipleChoiseUtils";
import {
  MultipleChoiceProps,
  MultipleChoiceQuestion,
  SelectedAnswer,
} from "./types/types";

const MultipleChoice: FC<MultipleChoiceProps> = ({
  multipleChoiceTerms,
  terms,
  setScore,
  score,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [multipleChoiceTerms]);

  const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState<
    MultipleChoiceQuestion[]
  >([]);
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>({});

  useEffect(() => {
    const questions = generateMultipleChoiceQuestions(
      multipleChoiceTerms,
      terms
    );
    setMultipleChoiceQuestion(questions);
  }, [multipleChoiceTerms]);

  const handleClick = (
    questionIndex: number,
    answerIndex: number,
    isCorrect: boolean
  ) => {
    if (selectedAnswer[questionIndex] === undefined) {
      setSelectedAnswer((prev) => ({
        ...prev,
        [questionIndex]: answerIndex,
      }));
    }
    if (isCorrect) {
      setScore((score += 1));
    }
  };

  return (
    <>
      {!loading &&
        multipleChoiceQuestion.map((question, questionIndex) => (
          <QuestionCard
            question={question}
            questionIndex={questionIndex}
            handleClick={handleClick}
            selectedAnswer={selectedAnswer}
          />
        ))}
    </>
  );
};

export default MultipleChoice;
