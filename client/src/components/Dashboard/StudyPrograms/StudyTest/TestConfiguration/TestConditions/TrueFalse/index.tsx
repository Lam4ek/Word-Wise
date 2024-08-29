import { FC, useState, useEffect, useCallback } from "react";
import QuestionCard from "./Card";
import { TermData } from "../../../../../../../types/types";

interface TrueFalseProps {
  trueFalseTerms: TermData[];
  terms: TermData[];
  setScore: (value: number) => void;
  score: number;
}

export interface TrueFalseQuestion extends TermData {
  displayedValue: string;
  isCorrect: boolean;
  answered: boolean;
  userAnswer: boolean | null;
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

  const getRandomIncorrectValue = useCallback(
    (terms: TermData[], correctValue: string): string => {
      const incorrectTerms = terms.filter(
        (term) => term.definition !== correctValue
      );
      const randomIndex = Math.floor(Math.random() * incorrectTerms.length);
      return incorrectTerms[randomIndex].definition;
    },
    []
  );

  const generateTrueFalseQuestions = useCallback(
    (trueFalseTerms: TermData[]): TrueFalseQuestion[] => {
      return trueFalseTerms.map((term) => {
        const isCorrect = Math.random() > 0.5;
        const displayedValue = isCorrect
          ? term.definition
          : getRandomIncorrectValue(terms, term.definition);
        return {
          ...term,
          displayedValue,
          isCorrect,
          answered: false,
          userAnswer: null,
        };
      });
    },
    [getRandomIncorrectValue]
  );

  const [trueFalseQuestions, setTrueFalseQuestions] = useState<
    TrueFalseQuestion[]
  >(() => generateTrueFalseQuestions(trueFalseTerms));

  useEffect(() => {
    setTrueFalseQuestions(generateTrueFalseQuestions(trueFalseTerms));
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
