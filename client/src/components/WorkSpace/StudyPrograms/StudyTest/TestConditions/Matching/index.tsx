import React, { useState, useEffect } from "react";
import styles from "./Matching.module.css";
import QuestionCard from "./Card";

export interface Term {
  term: string;
  definition: string;
  id: number;
  matchedIndex?: number;
}

interface MatchingProps {
  terms: Term[];
  setScore: (value: number | any) => void;
  score: number;
}

const Matching: React.FC<MatchingProps> = ({ terms, setScore }) => {
  const [loading, setLoading] = useState(true);

  const [selectedTerms, setSelectedTerms] = useState<(Term | null)[]>([]);
  const [shuffledTerms, setShuffledTerms] = useState<Term[]>([]);

  useEffect(() => {
    if (terms.length > 0) {
      setSelectedTerms(Array(terms.length).fill(null));
      setShuffledTerms(shuffleArray(terms));
    }
    setLoading(false);
  }, [terms]);

  const shuffleArray = (array: Term[]): Term[] => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const HandleClick = (term: Term) => {
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

  const removeTerm = (term: Term | null) => {
    const removedTerm = selectedTerms.findIndex((t) => t === term);

    const newSelectedTerms = [...selectedTerms];
    newSelectedTerms[removedTerm] = null;
    setSelectedTerms(newSelectedTerms);
    updateScore(newSelectedTerms);
  };

  const updateScore = (newSelectedTerms: (Term | null)[]) => {
    let correctAnswers = 0;

    newSelectedTerms.forEach((term, index) => {
      if (term && term.id === terms[index].id) {
        correctAnswers++;
      }
    });

    const previousCorrectAnswers = selectedTerms.reduce(
      (count, term, index) =>
        count + (term && term.id === terms[index].id ? 1 : 0),
      0
    );

    const scoreChange = correctAnswers - previousCorrectAnswers;

    setScore((prevScore: number) => prevScore + scoreChange);
  };

  return (
    <>
      {terms.length ? (
        <div className={styles.card}>
          <div className={styles.card__container}>
            {!loading &&
              terms.map((term, index) => (
                <QuestionCard
                  term={term}
                  selectedTerms={selectedTerms}
                  removeTerm={removeTerm}
                  index={index}
                />
              ))}
            <div className={styles.terms__container}>
              {shuffledTerms.map((term) => (
                <button
                  key={term.id}
                  onClick={() => HandleClick(term)}
                  className={styles.term}
                  disabled={selectedTerms.includes(term)}
                >
                  {term.term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Matching;
