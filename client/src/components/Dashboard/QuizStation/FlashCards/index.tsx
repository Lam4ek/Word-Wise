import { useEffect, useState } from "react";
import { useMultiCards } from "../../../../Hooks/useMultiCards";
import NotFoundPage from "../../../../pages/NotFoundPage/NotFoundPage";
import styles from "./styles/Cards.module.css";

import ControlPanel from "./components/ControlPanel";
import TermEditorOverlay from "./components/TermEditorOverlay";
import { useModuleData } from "../../../../Hooks/useModuleData";
import Card from "./components/Card";
function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFront, setIsFront] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { module, folder } = useModuleData();

  useEffect(() => {
    if (module) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [module]);

  const { step, isFirstStep, isLastStep, next, back } = useMultiCards(
    isLoading ? [] : module.terms
  );

  const toggleCard = () => {
    setIsAnimating(true);
    setIsFront(!isFront);
  };

  const handleNextCard = () => {
    if (!isLastStep) {
      setIsAnimating(false);
      next();
      setIsFront(true);
    }
  };

  const handlePreviousCard = () => {
    if (!isFirstStep) {
      setIsAnimating(false);
      back();
      setIsFront(true);
    }
  };

  if (!module && !folder) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        {!isLoading && step ? (
          <Card
            isFront={isFront}
            isAnimating={isAnimating}
            toggleCard={toggleCard}
            step={step}
          />
        ) : (
          "Loading..."
        )}

        <ControlPanel
          isFirstStep={isFirstStep}
          handlePreviousCard={handlePreviousCard}
          isLastStep={isLastStep}
          handleNextCard={handleNextCard}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
        />
      </div>
      {isEditing && (
        <TermEditorOverlay
          moduleId={module.id}
          folderId={folder.id}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          step={step}
        />
      )}
    </>
  );
}

export default Index;
