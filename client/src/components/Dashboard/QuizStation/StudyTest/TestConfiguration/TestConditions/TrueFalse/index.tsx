import { FC, useState, useEffect, useCallback } from "react";
import QuestionCard from "./components/Card";
import { TermData } from "../../../../../../../types/types";
import { generateTrueFalseQuestions } from "./utils/trueFalseUtils";
import { TrueFalseQuestion } from "./types/types";

interface TrueFalseProps {
  trueFalseTerms: TermData[];
  terms: TermData[];
  setScore: (value: number) => void;
  score: number;
}

const TrueFalse: FC<TrueFalseProps> = ({
  trueFalseTerms,
  terms,
  setScore,
  score,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, [trueFalseTerms]);

  const [trueFalseQuestions, setTrueFalseQuestions] = useState<
    TrueFalseQuestion[]
  >(() => generateTrueFalseQuestions(trueFalseTerms, terms));

  useEffect(() => {
    setTrueFalseQuestions(generateTrueFalseQuestions(trueFalseTerms, terms));
  }, [trueFalseTerms, generateTrueFalseQuestions]);

  const handleAnswer = useCallback(
    (index: number, answer: boolean) => {
      setTrueFalseQuestions((prevQuestions) => {
        const updatedQuestions = [...prevQuestions];
        if (!updatedQuestions[index].answered) {
          if (answer === updatedQuestions[index].isCorrect) {
            setScore(score + 1);
          }
          updatedQuestions[index] = {
            ...updatedQuestions[index],
            answered: true,
            userAnswer: answer,
          };
        }
        return updatedQuestions;
      });
    },
    [score, setScore]
  );

  return (
    <>
      {!loading &&
        trueFalseQuestions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            handleAnswer={handleAnswer}
          />
        ))}
    </>
  );
};

export default TrueFalse;
