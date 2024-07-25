import { FC, useEffect, useState } from "react";
import styles from "./Written.module.css";
import { TermData } from "../../../../../../types/types";

interface WrittenProps {
  terms: TermData[];
  setScore: (value: number) => void;
  score: number;
}

const Written: FC<WrittenProps> = ({ terms, score, setScore }) => {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState<string[]>(
    Array(terms.length).fill("")
  );
  const [confirmed, setConfirmed] = useState<boolean[]>(
    Array(terms.length).fill(false)
  );

  useEffect(() => {
    setLoading(false);
  }, [terms]);

  const handleAnswer = (term: TermData, index: number) => {
    const inputElement = document.querySelector(`input[data-index="${index}"]`);
    if (inputElement) {
      if (term.definition.toLowerCase() === answers[index].toLowerCase()) {
        inputElement.classList.add(styles.correct);
        setScore((score += 1));
      } else {
        inputElement.classList.add(styles.wrong);
      }
      const newConfirmed = [...confirmed];
      newConfirmed[index] = true;
      setConfirmed(newConfirmed);
    }
  };

  const handleInputChange = (value: string, index: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  return (
    <>
      {!loading &&
        terms.map((termData, index) => (
          <div className={styles.card} key={index}>
            <div className={styles.term__container}>
              <span>Term:</span>
              <h3>{termData.term}</h3>
            </div>

            <input
              className={styles.answer__input}
              type='text'
              data-index={index}
              value={answers[index]}
              onChange={(e) => handleInputChange(e.target.value, index)}
              placeholder='Write the definition'
              disabled={confirmed[index]}
            />
            <div className={styles.btn__container}>
              <button
                onClick={() => handleAnswer(termData, index)}
                disabled={confirmed[index]}
              >
                next
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default Written;
