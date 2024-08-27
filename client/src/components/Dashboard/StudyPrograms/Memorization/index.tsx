import { useEffect, useState } from "react";
import styles from "./Memorization.module.css";
import { useMultiCards } from "../../../../Hooks/useMultiCards";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../Hooks";
import { FolderData, ModuleData } from "../../../../types/types";
import Progressbar from "../../../../ui/Progressbar";

import NotFoundPage from "../../../../pages/NotFoundPage/NotFoundPage";
import Card from "./Card";

function Memorization() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

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
  const { step, steps, isLastStep, next } = useMultiCards(
    isLoading ? [] : module.terms
  );

  if (!module && !folder) {
    return <NotFoundPage />;
  }
  return (
    <>
      {!isLoading && step ? (
        <>
          {!isFinished ? (
            <div className={styles.card}>
              <Card
                step={step}
                correctAnswers={correctAnswers}
                setCorrectAnswers={setCorrectAnswers}
                setIsFinished={setIsFinished}
                isLastStep={isLastStep}
                next={next}
              />
            </div>
          ) : (
            <Progressbar score={correctAnswers} totalQuestions={steps.length} />
          )}
        </>
      ) : (
        "Loading"
      )}
    </>
  );
}

export default Memorization;
