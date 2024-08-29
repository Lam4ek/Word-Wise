import React from "react";
import styles from "../TrueFalse.module.css";
import { TrueFalseQuestion } from "../types/types";

interface IHeader {
  question: TrueFalseQuestion;
}

const Header: React.FC<IHeader> = ({ question }) => {
  return (
    <div className={styles.header}>
      <div className={styles.term__container}>
        <span>Term</span>
        <h3>{question.term}</h3>
      </div>
      <span className={styles.horizontal__line}></span>
      <div className={styles.definition__container}>
        <span>Definition</span>
        <h3>{question.displayedValue}</h3>
      </div>
    </div>
  );
};

export default Header;
