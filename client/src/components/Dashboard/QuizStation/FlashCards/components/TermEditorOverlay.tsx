import React, { useEffect, useState } from "react";
import styles from "../styles/Cards.module.css";
import { IoMdClose } from "react-icons/io";
import { useTermData } from "../../../../../Hooks/useTermData";
import { TermData } from "../../../../../types/types";

interface ITermEditod {
  folderId: string;
  moduleId: string;
  isEditing: boolean;
  setIsEditing: (el: boolean) => void;
  step: TermData;
}

const TermEditorOverlay: React.FC<ITermEditod> = ({
  folderId,
  moduleId,
  isEditing,
  setIsEditing,
  step,
}) => {
  const { changeHandler } = useTermData();
  const changeButtonHandler = (step: TermData) => {
    if (isEditing) {
      // We complete editing and call ChangeHandler with the current values
      changeHandler(folderId, moduleId, newTerm, newDefinition, step.id);
    }
    setIsEditing(!isEditing); // Switching the editing state
  };

  const handleKeyDown =
    (step: TermData) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        changeHandler(folderId, moduleId, newTerm, newDefinition, step.id);
        setIsEditing(false); // Finish editing by pressing Enter
      }
    };

  const [newTerm, setNewTerm] = useState(step?.term);
  const [newDefinition, setNewDefinition] = useState(step?.definition);

  useEffect(() => {
    setNewTerm(step?.term);
    setNewDefinition(step?.definition);
  }, [step]);
  return (
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
  );
};

export default TermEditorOverlay;
