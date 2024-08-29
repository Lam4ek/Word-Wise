import { useEffect, useState } from "react";
import { useMultiCards } from "../../../../Hooks/useMultiCards";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../../Hooks";
import { FolderData, ModuleData, TermData } from "../../../../types/types";
import NotFoundPage from "../../../../pages/NotFoundPage/NotFoundPage";
import styles from "./styles/Cards.module.css";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { changeTerm } from "../../../../store/dataSlice";
import ControlPanel from "./components/ControlPanel";
function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFront, setIsFront] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

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

  const { step, isFirstStep, isLastStep, next, back } = useMultiCards(
    isLoading ? [] : module.terms
  );

  const [newTerm, setNewTerm] = useState(step?.term);
  const [newDefinition, setNewDefinition] = useState(step?.definition);

  useEffect(() => {
    setNewTerm(step?.term);
    setNewDefinition(step?.definition);
  }, [step]);

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

  const changeButtonHandler = (step: TermData) => {
    if (isEditing) {
      // We complete editing and call ChangeHandler with the current values
      changeHandler(newTerm, newDefinition, step.id);
    }
    setIsEditing(!isEditing); // Switching the editing state
  };

  const changeHandler = (term: string, definition: string, id: number) => {
    dispatch(
      changeTerm({
        folderId: folder.id,
        moduleId: module.id,
        termId: id,
        newTerm: term,
        newDefinition: definition,
      })
    );
  };

  const handleKeyDown =
    (step: TermData) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        changeHandler(newTerm, newDefinition, step.id);
        setIsEditing(false); // Finish editing by pressing Enter
      }
    };

  if (!module && !folder) {
    return <NotFoundPage />;
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        {!isLoading && step ? (
          <div
            className={`${styles.card} ${!isFront ? "" : styles.flipped} ${
              isAnimating ? styles.animating : ""
            }`}
            onClick={toggleCard}
          >
            <div className={styles.textContainer}>
              <p className={`${isFront ? styles.textFlipped : ""} `}>
                {isFront ? step.term : step.definition}
              </p>
            </div>
          </div>
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
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <IoMdClose
              className={styles.closeForm}
              onClick={() => changeButtonHandler(step)}
            />
            <div className={styles.form}>
              <div>
                <input
                  tabIndex={0}
                  onChange={(e) => setNewTerm(e.target.value)}
                  onKeyDown={handleKeyDown(step)}
                  type='text'
                  value={newTerm}
                  className={styles.changeInput}
                />
                <span className={styles.underLine}></span>
              </div>

              <div>
                <input
                  tabIndex={0}
                  onChange={(e) => setNewDefinition(e.target.value)}
                  onKeyDown={handleKeyDown(step)}
                  type='text'
                  value={newDefinition}
                  className={styles.changeInput}
                />
                <span className={styles.underLine}></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
