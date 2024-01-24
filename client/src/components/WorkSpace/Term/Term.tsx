import { useState, FC, useRef, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import styles from "./Term.module.css";

type TTerm = {
  term: string;
  definition: string;
  id: number;
};

interface ITerm {
  data: TTerm;
  index: string;
  removeHandler: (id: number) => void;
}

const Term: FC<ITerm> = ({ data, index, removeHandler }) => {
  const [cardData, setCardData] = useState(data);
  const [term, setTerm] = useState(data.term);
  const [definition, setDefinition] = useState(data.definition);
  const [isChanging, setIsChanging] = useState(false);
  const changeButtonHandler = () => {
    setIsChanging(!isChanging);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setIsChanging(false);
    }
  };

  const rootEl = useRef(document.createElement("div"));

  useEffect(() => {
    const onClick = (e: any) => {
      if (rootEl.current && !rootEl.current.contains(e.target) && !isChanging) {
        setIsChanging(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const handleTermChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setTerm(target.value);
  };

  const handleDefinitionChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    setDefinition(target.value);
  };

  return (
    <div ref={rootEl} className={styles.card}>
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
          <FaTrash
            onClick={() => removeHandler(cardData.id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div className={styles.term}>
        <div>
          {!isChanging ? (
            <span>{term}</span>
          ) : (
            <input
              tabIndex={0}
              onKeyDown={handleKeyDown}
              onChange={handleTermChange}
              type='text'
              value={term}
            />
          )}
          <span className={styles.term_line}></span>
          <span style={{ fontSize: "12px" }}>term</span>
        </div>
        <div>
          {!isChanging ? (
            <span>{definition}</span>
          ) : (
            <input
              tabIndex={0}
              onKeyDown={handleKeyDown}
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
