import React, { useState, useEffect } from "react";
import styles from "./Matching.module.css";
import QuestionCard from "./components/Card";
import TermsSelector from "./components/TermsSelector";
import { MatchingProps, Term } from "./types/types";
import { handleClick, removeTerm, shuffleArray } from "./utils/matchingUtils";

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

  const handleClickWrapper = (term: Term) =>
    handleClick(term, selectedTerms, setSelectedTerms, updateScore);

  const removeTermWrapper = (term: Term | null) =>
    removeTerm(term, selectedTerms, setSelectedTerms, updateScore);

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
                  removeTerm={removeTermWrapper}
                  index={index}
                />
              ))}
            <TermsSelector
              shuffledTerms={shuffledTerms}
              HandleClick={handleClickWrapper}
              selectedTerms={selectedTerms}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Matching;
