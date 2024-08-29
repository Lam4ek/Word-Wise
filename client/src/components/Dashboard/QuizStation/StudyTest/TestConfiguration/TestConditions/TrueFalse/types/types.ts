import { TermData } from "../../../../../../../../types/types";

export interface TrueFalseQuestion extends TermData {
  displayedValue: string;
  isCorrect: boolean;
  answered: boolean;
  userAnswer: boolean | null;
}
