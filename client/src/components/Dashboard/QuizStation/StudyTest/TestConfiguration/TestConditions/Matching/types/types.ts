import { TermData } from "../../../../../../../../types/types";

export interface Term extends TermData {
  matchedIndex?: number;
}

export interface MatchingProps {
  terms: Term[];
  setScore: (value: number | any) => void;
  score: number;
}
