import { FC, useState } from "react";
import styles from "./Memorization.module.css";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { TermData } from "../../../../types/types";

interface Cardprops {
  step: TermData;
  correctAnswers: number;
  setCorrectAnswers: (value: number) => void;
  setIsFinished: (value: boolean) => void;
  isLastStep: boolean;
  next: () => void;
}

const Card: FC<Cardprops> = ({
  step,
  correctAnswers,
  setCorrectAnswers,
  setIsFinished,
  isLastStep,
  next,
}) => {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [answer, setAnswer] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = () => {
    const inputElement = document.querySelector('input[type="text"]');
    setIsAnswered(true);
    if (step.definition.toLowerCase() === answer.toLowerCase()) {
      if (inputElement) {
        inputElement.classList.add(styles.correct);
        setIsAnswerCorrect(true);
        setCorrectAnswers(correctAnswers + 1);
      }
    } else {
      inputElement?.classList.add(styles.wrong);
      setIsAnswerCorrect(false);
    }
    setTimeout(() => {
      setAnswer("");
      inputElement?.classList.remove(styles.correct, styles.wrong);
      setIsAnswerCorrect(null);
      setIsAnswered(false);
      if (isLastStep) {
        setIsFinished(true);
      } else {
        next();
      }
    }, 1500);
  };

  const handleKeyDown = () => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAnswer();
    }
  };

  return (
    <>
      <div className={styles.termWrapper}>
        <span>Term</span>
        <div className={styles.textContainer}>
          <p className={styles.term}>{step.term}</p>
          <button style={{ display: "none" }}>Show hint</button>
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <span>Your answer</span>

        <div className={styles.inputWrapper}>
          <IoMdCheckmark
            style={{
              display: `${
                isAnswerCorrect !== null && isAnswerCorrect === true
                  ? "block"
                  : "none"
              }`,
            }}
            className={isAnswerCorrect ? styles.mark : ""}
            color='#94edcf'
          />
          <IoMdClose
            style={{
              display: `${
                isAnswerCorrect !== null && isAnswerCorrect === false
                  ? "block"
                  : "none"
              }`,
            }}
            className={!isAnswerCorrect ? styles.mark : ""}
            color='#fe7773'
          />

          <input
            className={styles.answerEntering}
            placeholder='Enter an answer'
            value={answer}
            disabled={isAnswered}
            type='text'
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown()}
          />
        </div>

        <div className={styles.buttons}>
          <button
            onClick={handleAnswer}
            disabled={isAnswered}
            className={styles.answerButton}
          >
            Answer
          </button>
          <button>Don't know?</button>
        </div>
      </div>
    </>
  );
};

export default Card;
