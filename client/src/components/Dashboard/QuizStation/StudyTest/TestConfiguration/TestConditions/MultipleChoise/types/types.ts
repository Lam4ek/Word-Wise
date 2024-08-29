import { TermData } from "../../../../../../../../types/types";

export interface MultipleChoiceProps {
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

export interface QuestionCardProps {
  question: MultipleChoiceQuestion;
  questionIndex: number;
  handleClick: (
    questionIndex: number,
    answerIndex: number,
    isCorrect: boolean
  ) => void;
  selectedAnswer: SelectedAnswer;
}
