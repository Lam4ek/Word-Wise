import React from "react";
import styles from "../Matching.module.css";
import { TermData } from "../../../../../../../../types/types";
import { Term } from "../types/types";

interface ITermsSelector {
  shuffledTerms: Term[];
  HandleClick: (term: Term) => void;
  selectedTerms: (Term | null)[];
}

const TermsSelector: React.FC<ITermsSelector> = ({
  shuffledTerms,
  HandleClick,
  selectedTerms,
}) => {
  return (
    <div className={styles.terms__container}>
      {shuffledTerms.map((term: TermData) => (
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
  );
};

export default TermsSelector;
