import { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./Memorization.module.css";
import { useMultiCards } from "../../../../Hooks/useMultiCards";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../Hooks";
import { FolderData, ModuleData } from "../../../../types/types";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import NotFoundPage from "../../NotFoundPage";

function Memorization() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [answer, setAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const { moduleId, folderId } = useParams<{
    folderId: string;
    moduleId: string;
  }>();
  const folder = useAppSelector((state) =>
    state.userData.folders
      ? state.userData.folders.find(
          (folder: FolderData) => folder.id === folderId
        )
      : undefined
  );

  const module = folder?.modules?.find(
    (module: ModuleData) => module.id === moduleId
  );
  useEffect(() => {
    if (module && folder) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [module, folder]);
  const { currentStepIndex, step, steps, isLastStep, next } = useMultiCards(
    isLoading ? [] : module.terms
  );
  console.log(steps.length);

  const handleAnswer = () => {
    const inputElement = document.querySelector('input[type="text"]');
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
      if (isLastStep) {
        setIsFinished(true);
      } else {
        next();
      }
    }, 2000);
  };

  if (!module && !folder) {
    return <NotFoundPage />;
  }
  return (
    <>
      {!isLoading && step ? (
        <div className={styles.card}>
          {!isFinished ? (
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
                    type='text'
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </div>

                <div className={styles.buttons}>
                  <button
                    onClick={handleAnswer}
                    className={styles.answerButton}
                  >
                    Answer
                  </button>
                  <button>Don't know?</button>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.results}>
              <div>
                <span style={{ color: "#94edcf" }}>Correct</span>
                <span style={{ color: "#fe7773" }}>Incorrect</span>
              </div>
              <div>
                <span style={{ color: "#94edcf" }}>{correctAnswers}</span>
                <span style={{ color: "#fe7773" }}>
                  {steps.length - correctAnswers}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default Memorization;
