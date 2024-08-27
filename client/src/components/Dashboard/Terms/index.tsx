import { useState, FC, useRef } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import styles from "./Term.module.css";
import { TermData } from "../../../types/types";

interface ITerm {
  term: TermData;
  index: string;
  removeHandler: (id: number) => void;
  changeHandler: (newTerm: string, newDefinition: string, id: number) => void;
}

const Term: FC<ITerm> = ({ term, index, removeHandler, changeHandler }) => {
  const [newTerm, setNewTerm] = useState(term.term);
  const [newDefinition, setNewDefinition] = useState(term.definition);
  const [isEditing, setIsEditing] = useState(false);
  const rootEl = useRef(document.createElement("div"));

  const changeButtonHandler = (term: TermData) => {
    if (isEditing) {
      // We complete editing and call ChangeHandler with the current values
      changeHandler(newTerm, newDefinition, term.id);
    }
    setIsEditing(!isEditing); // Switching the editing state
  };

  const handleKeyDown =
    (term: TermData) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        changeHandler(newTerm, newDefinition, term.id);
        setIsEditing(false); // Finish editing by pressing Enter
      }
    };

  return (
    <div ref={rootEl} className={styles.card}>
      <div className={styles.card_header}>
        <span>{index + 1}</span>
        <div className={styles.card_control}>
          <FaPen
            onClick={() => changeButtonHandler(term)}
            style={{
              cursor: "pointer",
              marginRight: "10px",
              color: isEditing ? "#FFDC67" : "black",
            }}
          />
          <FaTrash
            onClick={() => removeHandler(term.id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
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

export default Term;
