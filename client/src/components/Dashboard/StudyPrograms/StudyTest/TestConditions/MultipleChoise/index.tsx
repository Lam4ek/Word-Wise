import { FC, useEffect, useState } from "react";
import QuestionCard from "./Card";
import { TermData } from "../../../../../../types/types";

interface MultipleChoiceProps {
  multipleChoiceTerms: TermData[];
  terms: TermData[];
  setScore: (value: number) => void;
  score: number;
}

export interface MultipleChoiceQuestion extends TermData {
  answers: string[];
}

export interface SelectedAnswer {
  [key: number]: number;
}

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

  const generateMultipleChoiceQuestions = (multipleChoiceTerms: TermData[]) => {
    return multipleChoiceTerms.map((term: TermData) => {
      const otherDefinitions = terms
        .filter((t) => t !== term)
        .map((t) => t.definition);

      const wrongAnswers = getRandomElements(otherDefinitions, 3);

      const answers = [term.definition, ...wrongAnswers];

      const shuffledAnswers = shuffleArray(answers);

      return {
        ...term,
        answers: shuffledAnswers,
      };
    });
  };

  const getRandomElements = (arr: string[], num: number) => {
    const result = [];
    const copy = [...arr];
    for (let i = 0; i < num; i++) {
      if (copy.length === 0) break;
      const index = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(index, 1)[0]);
    }
    return result;
  };

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const questions = generateMultipleChoiceQuestions(multipleChoiceTerms);
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
