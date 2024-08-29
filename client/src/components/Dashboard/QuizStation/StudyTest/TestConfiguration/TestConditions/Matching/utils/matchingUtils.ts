import { Term } from "../types/types";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export const handleClick = (
  term: Term,
  selectedTerms: (Term | null)[],
  setSelectedTerms: React.Dispatch<React.SetStateAction<(Term | null)[]>>,
  updateScore: (terms: (Term | null)[]) => void
) => {
  const emptyIndex = selectedTerms.findIndex((term) => term === null);

  if (
    emptyIndex !== -1 &&
    !selectedTerms.some((selected) => selected?.id === term.id)
  ) {
    const newSelectedTerms = [...selectedTerms];
    newSelectedTerms[emptyIndex] = term;
    setSelectedTerms(newSelectedTerms);
    updateScore(newSelectedTerms);
  }
};

export const removeTerm = (
  term: Term | null,
  selectedTerms: (Term | null)[],
  setSelectedTerms: React.Dispatch<React.SetStateAction<(Term | null)[]>>,
  updateScore: (terms: (Term | null)[]) => void
) => {
  const removedTerm = selectedTerms.findIndex((t) => t === term);

  const newSelectedTerms = [...selectedTerms];
  newSelectedTerms[removedTerm] = null;
  setSelectedTerms(newSelectedTerms);
  updateScore(newSelectedTerms);
};

export const updateScore = (
  newSelectedTerms: (Term | null)[],
  terms: Term[],
  setScore: React.Dispatch<React.SetStateAction<number>>
) => {
  let correctAnswers = 0;

  newSelectedTerms.forEach((term, index) => {
    if (term && term.id === terms[index].id) {
      correctAnswers++;
    }
  });

  const previousCorrectAnswers = newSelectedTerms.reduce(
    (count, term, index) =>
      count + (term && term.id === terms[index].id ? 1 : 0),
    0
  );

  const scoreChange = correctAnswers - previousCorrectAnswers;

  setScore((prevScore: number) => prevScore + scoreChange);
};
