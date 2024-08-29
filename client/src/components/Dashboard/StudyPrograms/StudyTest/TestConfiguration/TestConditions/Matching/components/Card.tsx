import { FC } from "react";
import styles from "../Matching.module.css";
import { Term } from "..";
import { IoIosClose } from "react-icons/io";

interface QuestionCardProps {
  term: Term;
  selectedTerms: (Term | null)[];
  removeTerm: (term: Term | null) => void;
  index: number;
}

const QuestionCard: FC<QuestionCardProps> = ({
  term,
  selectedTerms,
  removeTerm,
  index,
}) => {
  return (
    <div key={term.id} className={styles.card__wrapper}>
      <div
        className={
          selectedTerms.findIndex((term) => term === null) === index
            ? `${styles.first__empty}`
            : `${styles.unselected__term} ${
                selectedTerms[index] !== null ? `${styles.matched}` : ""
              }`
        }
      >
        {selectedTerms[index] ? selectedTerms[index]?.term : ""}
        {selectedTerms[index] !== null ? (
          <IoIosClose
            className={styles.removeBtn}
            color='#rgb(49, 49, 49)'
            onClick={() => removeTerm(selectedTerms[index])}
          />
        ) : (
          ""
        )}
      </div>
      <div className={styles.definition}>{term.definition}</div>
    </div>
  );
};

export default QuestionCard;
