import { useState, FC, useRef, useEffect, KeyboardEventHandler } from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import styles from "./Term.module.css";
import { TermData } from "../../../types/types";

interface ITerm {
  data: TermData;
  index: string;
  removeHandler: (id: number) => void;
  changeHandler: (newTerm: string, newDefinition: string, id: number) => void;
}

const Term: FC<ITerm> = ({ data, index, removeHandler, changeHandler }) => {
  const [newTerm, setNewTerm] = useState(data.term);
  const [newDefinition, setNewDefinition] = useState(data.definition);
  const [isEditing, setIsEditing] = useState(false);
  const rootEl = useRef(document.createElement("div"));

  const changeButtonHandler = (term: TermData) => {
    if (isEditing) {
      // Завершаем редактирование и вызываем changeHandler с актуальными значениями
      changeHandler(newTerm, newDefinition, term.id);
    }
    setIsEditing(!isEditing); // Переключаем состояние редактирования
  };

  const handleKeyDown =
    (term: TermData) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        changeHandler(newTerm, newDefinition, term.id);
        setIsEditing(false); // Завершаем редактирование при нажатии Enter
      }
    };

  return (
    <div ref={rootEl} className={styles.card}>
      <div className={styles.card_header}>
        <span>{index + 1}</span>
        <div className={styles.card_control}>
          <FaPen
            onClick={() => changeButtonHandler(data)}
            style={{
              cursor: "pointer",
              marginRight: "10px",
              color: isEditing ? "#FFDC67" : "black",
            }}
          />
          <FaTrash
            onClick={() => removeHandler(data.id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className={styles.term}>
        <div>
          {!isEditing ? (
            <span>{data.term}</span>
          ) : (
            <input
              tabIndex={0}
              onChange={(e) => setNewTerm(e.target.value)}
              onKeyDown={handleKeyDown(data)}
              type='text'
              value={newTerm}
            />
          )}
          <span className={styles.term_line}></span>
          <span style={{ fontSize: "12px" }}>term</span>
        </div>
        <div>
          {!isEditing ? (
            <span>{data.definition}</span>
          ) : (
            <input
              tabIndex={0}
              onChange={(e) => setNewDefinition(e.target.value)}
              onKeyDown={handleKeyDown(data)}
              type='text'
              value={newDefinition}
            />
          )}
          <span className={styles.term_line}></span>
          <span style={{ fontSize: "12px" }}>definition</span>
        </div>
      </div>
    </div>
  );
};

export default Term;
