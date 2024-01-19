import { useState, FC } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import styles from "./Term.module.css";

type TTerm = {
  term: string;
  definition: string;
};

interface ITerm {
  data: TTerm;
  index: string;
}

const Term: FC<ITerm> = ({ data, index }) => {
  const [term, setTerm] = useState(data.term);
  const [definition, setDefinition] = useState(data.definition);
  const [isChanging, setIsChanging] = useState(false);
  const changeButtonHandler = () => {
    setIsChanging(!isChanging);
  };

  const handleTermChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setTerm(target.value);
    console.log(term);
  };

  const handleDefinitionChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setDefinition(target.value);
    console.log(definition);
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <span>{index + 1}</span>
        <div className={styles.card_control}>
          <FaPen
            onClick={changeButtonHandler}
            style={{
              cursor: "pointer",
              marginRight: "10px",
              color: isChanging ? "#FFDC67" : "black",
            }}
          />
          <FaTrash style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className={styles.term}>
        <div>
          {!isChanging ? (
            <span>{term}</span>
          ) : (
            <input onChange={handleTermChange} type='text' value={term} />
          )}
          <span className={styles.term_line}></span>
          <span style={{ fontSize: "12px" }}>term</span>
        </div>
        <div>
          {!isChanging ? (
            <span>{definition}</span>
          ) : (
            <input
              onChange={handleDefinitionChange}
              type='text'
              value={definition}
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
