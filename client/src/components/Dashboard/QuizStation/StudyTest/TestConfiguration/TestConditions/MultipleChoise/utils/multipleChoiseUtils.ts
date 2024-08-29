import { TermData } from "../../../../../../../../types/types";
import { MultipleChoiceQuestion } from "../types/types";

export const getRandomElements = (arr: string[], num: number): string[] => {
  const result = [];
  const copy = [...arr];
  for (let i = 0; i < num; i++) {
    if (copy.length === 0) break;
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(index, 1)[0]);
  }
  return result;
};

export const shuffleArray = (array: string[]): string[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const generateMultipleChoiceQuestions = (
  multipleChoiceTerms: TermData[],
  terms: TermData[]
): MultipleChoiceQuestion[] => {
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
