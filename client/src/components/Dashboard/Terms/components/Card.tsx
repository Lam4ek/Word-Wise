import { useState, FC, useRef } from "react";

import styles from "../Term.module.css";
import { TermData } from "../../../../types/types";
import CardHeader from "./CardHeader";
import { useTermData } from "../../../../Hooks/useTermData";

interface ICard {
  term: TermData;
  index: string;
  folderId: string;
  moduleId: string;
}

const Card: FC<ICard> = ({ term, index, folderId, moduleId }) => {
  const [newTerm, setNewTerm] = useState(term.term);
  const { changeHandler, removeHandler } = useTermData();
  const [newDefinition, setNewDefinition] = useState(term.definition);
  const [isEditing, setIsEditing] = useState(false);
  const rootEl = useRef(document.createElement("div"));

  const changeButtonHandler = (term: TermData) => {
    if (isEditing) {
      // We complete editing and call ChangeHandler with the current values
      changeHandler(folderId, moduleId, newTerm, newDefinition, term.id);
    }
    setIsEditing(!isEditing); // Switching the editing state
  };

  const handleKeyDown =
    (term: TermData) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        changeHandler(folderId, moduleId, newTerm, newDefinition, term.id);
        setIsEditing(false); // Finish editing by pressing Enter
      }
    };

  return (
    <div ref={rootEl} className={styles.card}>
      <CardHeader
        index={index}
        changeButtonHandler={changeButtonHandler}
        term={term}
        isEditing={isEditing}
        removeHandler={() => removeHandler(folderId, moduleId, term.id)}
      />
      <div className={styles.term}>
        <div>
          {!isEditing ? (
            <span>{term.term}</span>
          ) : (
            <input
              tabIndex={0}
              onChange={(e) => setNewTerm(e.target.value)}
              onKeyDown={handleKeyDown(term)}
              type='text'
              value={newTerm}
            />
          )}
          <span className={styles.underLine}></span>
          <span style={{ fontSize: "12px" }}>term</span>
        </div>
        <div>
          {!isEditing ? (
            <span>{term.definition}</span>
          ) : (
            <input
              tabIndex={0}
              onChange={(e) => setNewDefinition(e.target.value)}
              onKeyDown={handleKeyDown(term)}
              type='text'
              value={newDefinition}
            />
          )}
          <span className={styles.underLine}></span>
          <span style={{ fontSize: "12px" }}>definition</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
