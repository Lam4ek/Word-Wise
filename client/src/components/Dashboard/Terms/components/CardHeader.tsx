import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import styles from "../Term.module.css";
import { TermData } from "../../../../types/types";

interface ICardHeader {
  index: string;
  changeButtonHandler: (term: TermData) => void;
  term: TermData;
  isEditing: boolean;
  removeHandler: (id: number) => void;
}

const CardHeader: React.FC<ICardHeader> = ({
  index,
  changeButtonHandler,
  term,
  isEditing,
  removeHandler,
}) => {
  return (
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
  );
};

export default CardHeader;
