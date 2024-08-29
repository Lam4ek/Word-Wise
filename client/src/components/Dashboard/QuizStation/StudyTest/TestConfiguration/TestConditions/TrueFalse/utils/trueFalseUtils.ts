import { TermData } from "../../../../../../../../types/types";
import { TrueFalseQuestion } from "../types/types";

export const getRandomIncorrectValue = (
  terms: TermData[],
  correctValue: string
): string => {
  const incorrectTerms = terms.filter(
    (term) => term.definition !== correctValue
  );
  const randomIndex = Math.floor(Math.random() * incorrectTerms.length);
  return incorrectTerms[randomIndex].definition;
};

export const generateTrueFalseQuestions = (
  trueFalseTerms: TermData[],
  terms: TermData[]
): TrueFalseQuestion[] => {
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
};
